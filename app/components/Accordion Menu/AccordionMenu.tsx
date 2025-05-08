"use client";

import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { addToCart } from "@/slices/cartSlice";
import React, { use, useEffect } from "react";
import { Accordion, ListGroup } from "react-bootstrap";
import { useState } from "react";
import { CartPlusFill, CheckCircle, Icon2Square } from "react-bootstrap-icons"; // Importing Bootstrap icon
import { CartAlt, PlusCircle } from "iconoir-react";
import "../Accordion Menu/AccordionMenu.css";
import { supabase } from "@/app/supabase";
import {
  CategoryData,
  MenuItemData,
  ModificationData,
  OrderedItemData,
} from "@/app/interfaces";
import Modal from "../Modal";
import NumberInput from "../numberInput/numberInput";
import { RootState } from "@/lib/store";
import { initializeMenu, isClosed } from "@/app/utils/menuUtils";
import Button from "../Button";
import { CartPlus } from "iconoir-react/regular";

interface Popup {
  id: number;
  message: string;
}

export default function AccordionMenuOrder() {
  // Redux state and dispatch
  const dispatch = useAppDispatch();
  const menu = useAppSelector((state: RootState) => state.menu);
  const popularItems = useAppSelector((state) => state.menu.popularItems);

  //current item state for modal
  const [selectedItem, setSelectedItem] = useState<MenuItemData | null>(null);
  const [price, setPrice] = useState(0);
  const [selectedModifications, setSelectedModifications] = useState<
    ModificationData[]
  >([]);
  const [quantity, setQuantity] = useState(1);
  const [instructions, setInstructions] = useState("");

  const [open, setOpen] = useState(false);
  const [popups, setPopups] = useState<Popup[]>([]);

  // Function to trigger haptic feedback
  const triggerHapticFeedback = () => {
    if ("vibrate" in navigator) {
      navigator.vibrate(100); // Vibrate for 100ms
    }
  };

  function openModifications(item: MenuItemData) {
    setSelectedItem(item);
    setPrice(item.price);
    setQuantity(1);
    setInstructions("");
    setSelectedModifications([]);
    setOpen(true);
  }

  function handleAddToCart(item: MenuItemData) {
    // Converts from MenuItemData to OrderedItemData
    const orderedItem: OrderedItemData = {
      item_name: item.name,
      item_id: item.item_id,
      price: price,
      quantity: quantity,
      comments: instructions,
      modifications: selectedModifications,
    };

    dispatch(addToCart(orderedItem));
    setOpen(false);

    const newPopup: Popup = {
      id: Date.now(),
      message: `${item.name} added to cart!`,
    };

    setPopups((prevPopups) => [...prevPopups, newPopup]);

    // Trigger haptic feedback
    triggerHapticFeedback();

    setTimeout(() => {
      setPopups((prevPopups) =>
        prevPopups.filter((popup) => popup.id !== newPopup.id)
      );
    }, 3000);
  }

  const handleModificationChange = (modification: ModificationData) => {
    if (selectedModifications.includes(modification)) {
      setPrice(price - modification.price / 100);
      setSelectedModifications(
        selectedModifications.filter((modId) => modId !== modification)
      );
    } else {
      setPrice(price + modification.price / 100);
      setSelectedModifications((prevSelectedMods) => [
        ...prevSelectedMods,
        modification,
      ]);
    }
  };

  return (
    <div className="gap-y-4 grid">
      <div className="w-full grid md:grid-cols-3 gap-2">
        {popularItems.map((item: MenuItemData, index: number) => {
          return (
            <div
              key={index}
              className="p-3 grid grid-cols-4 justify-between rounded-xl bg-amigoswhite"
            >
              <div className="col-span-3">
                <div className="text-xl text-amigosred font-bold">
                  #{index + 1} most ordered item!
                </div>
                <div className="flex gap-4">
                  <div className="text-xl font-bold">{item.name}</div>
                  <div className="text-xl">${item.price}</div>
                </div>
              </div>

              <div className="flex items-center justify-center">
                <PlusCircle
                  onClick={() => openModifications(item)}
                  className="transition hover:rotate-12 hover:text-amigosred"
                  width={36}
                  height={36}
                  strokeWidth={2}
                />
              </div>
            </div>
          );
        })}
      </div>

      <Accordion>
        {menu.categories.map((category: CategoryData, index) => (
          <Accordion.Item eventKey={`${index + 1}`} key={category.name}>
            <Accordion.Header>
              <div className="text-xl font-bold">{category.name}</div>
            </Accordion.Header>
            <Accordion.Body>
              <ListGroup variant="flush">
                {menu.menuItems
                  .filter(
                    (item: MenuItemData) =>
                      item.category_id === category.category_id
                  )
                  .map((item: MenuItemData) => (
                    <ListGroup.Item
                      key={item.item_id}
                      className="d-flex justify-content-between align-items-center"
                    >
                      <span>{item.name + " - $" + item.price}</span>
                      <div
                        className="icon"
                        onClick={() => openModifications(item)}
                      >
                        <PlusCircle width={24} height={24} strokeWidth={2} />
                      </div>
                    </ListGroup.Item>
                  ))}
              </ListGroup>
            </Accordion.Body>
          </Accordion.Item>
        ))}
      </Accordion>

      <Modal open={open} onClose={() => setOpen(false)}>
        <div className="text-center flex flex-col items-center w-56 lg:w-96">
          <div className="my-4 space-y-2">
            <div className="">
              <div className="text-lg font-black text-gray-800">
                {selectedItem?.name}
              </div>
              <div className="text-sm text-gray-500">
                {"$" + (price * quantity).toFixed(2)}
              </div>
            </div>

            <div className="space-y-1 max-h-32 overflow-y-auto">
              {menu.modifications
                .filter(
                  (modification: ModificationData) =>
                    modification.category_id === selectedItem?.category_id ||
                    modification.item_id === selectedItem?.item_id
                )
                .map((modification: ModificationData) => (
                  <div
                    key={modification.modification_id}
                    className="flex space-x-2 cursor-pointer"
                    onClick={() => handleModificationChange(modification)}
                  >
                    <input
                      type="checkbox"
                      checked={selectedModifications.includes(modification)}
                    />
                    <div className="text-gray-500">
                      {modification.modification}
                    </div>
                    <div>${(modification.price / 100).toFixed(2)}</div>
                  </div>
                ))}
            </div>

            <NumberInput
              value={quantity}
              increase={() => {
                setQuantity(quantity + 1);
              }}
              decrease={() => {
                if (quantity > 1) {
                  setQuantity(quantity - 1);
                }
              }}
            />
            <input
              placeholder={"Custom Instructions"}
              value={instructions}
              className="input p-2 border-2 rounded-md w-full"
              type="text"
              onChange={(event: any) => {
                setInstructions(event.target.value);
              }}
            />
          </div>
          <div className="flex gap-4 w-full">
            <div
              className="btn btn-danger w-full"
              onClick={() => handleAddToCart(selectedItem as MenuItemData)}
            >
              <div className="normal-case">ADD</div>
            </div>

            <div
              className="btn btn-light w-full"
              onClick={() => setOpen(false)}
            >
              <div className="normal-case">CANCEL</div>
            </div>
          </div>
        </div>
      </Modal>

      {/* Centered Stackable Popups at the Bottom */}
      <div
        className="position-fixed bottom-0 start-50 translate-middle-x p-3"
        style={{ zIndex: 1051, maxWidth: "300px", width: "100%" }}
      >
        {popups.map((popup) => (
          <div
            key={popup.id}
            className="toast show mb-2"
            style={{
              backgroundColor: "#140a02",
              color: "#fff6eb",
              animation: "fade-in-out 3s",
              borderRadius: "8px",
            }}
          >
            <div className="toast-body d-flex align-items-center">
              <CheckCircle className="me-2" size={24} />
              {popup.message}
              <div
                className="progress ms-2"
                style={{ height: "4px", flexGrow: 1 }}
              >
                <div
                  className="progress-bar"
                  style={{ width: "100%", animation: "progress 3s linear" }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      <style jsx>{`
        @keyframes fade-in-out {
          0% {
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            opacity: 0;
          }
        }
        @keyframes progress {
          from {
            width: 100%;
          }
          to {
            width: 0;
          }
        }
      `}</style>
    </div>
  );
}
