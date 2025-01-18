"use client";

import { useAppDispatch } from "@/lib/hooks";
import { addToCart } from "@/slices/cartSlice";
import React, { useEffect } from "react";
import { Accordion, ListGroup } from "react-bootstrap";
import { useState } from "react";
import { CheckCircle, Icon2Square } from "react-bootstrap-icons"; // Importing Bootstrap icon
import { PlusCircle } from "iconoir-react";
import "../Accordion Menu/AccordionMenu.css";
import { supabase } from "@/app/supabase";
import { MenuItemData, OrderedItemData } from "@/app/interfaces";
import Modal from "../Modal";
import NumberInput from "../numberInput/numberInput";

interface Popup {
  id: number;
  message: string;
}

function AccordionMenuOrder() {
  // State to store menu items and categories
  const [menuItems, setMenuItems] = useState<MenuItemData[]>([]);
  const [categories, setCategories] = useState<any[]>([]);

  const [selectedItem, setSelectedItem] = useState<MenuItemData | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [open, setOpen] = useState(false);
  const dispatch = useAppDispatch();
  const [popups, setPopups] = useState<Popup[]>([]);

  // Function to trigger haptic feedback
  const triggerHapticFeedback = () => {
    if ("vibrate" in navigator) {
      navigator.vibrate(100); // Vibrate for 100ms
    }
  };

  function openModifications(item: MenuItemData) {
    setOpen(true);
    setSelectedItem(item);
  }

  function handleAddToCart(item: MenuItemData) {
    // Converts from MenuItemData to OrderedItemData
    const orderedItem: OrderedItemData = {
      item_name: item.name,
      item_id: item.item_id,
      price: item.price,
      quantity: 1,
      comments: "",
    };

    dispatch(addToCart(orderedItem));

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

  async function initializeMenu() {
    // Fetches menu categories
    try {
      const { data, error } = await supabase.from("category").select("*");
      if (error || !data) {
        throw new Error("Failed to fetch menu categories");
      } else {
        setCategories(data);
      }
    } catch (err) {
      console.error(err);
      throw new Error("Failed to fetch menu categories");
    }

    // Fetches menu items
    try {
      const { data, error } = await supabase.from("items").select("*");
      if (error || !data) {
        throw new Error("Failed to fetch menu items");
      } else {
        setMenuItems(data);
      }
    } catch (err) {
      console.error(err);
      throw new Error("Failed to fetch menu items");
    }
  }

  // Fetches menu items on component mount
  useEffect(() => {
    initializeMenu();
  }, []);

  return (
    <>
      <Accordion>
        {categories.map((category, index) => (
          <Accordion.Item eventKey={`${index + 1}`} key={category.name}>
            <Accordion.Header>
              <h4>{category.name}</h4>
            </Accordion.Header>
            <Accordion.Body>
              <ListGroup variant="flush">
                {menuItems
                  .filter((item) => item.category_id === category.category_id)
                  .map((item) => (
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
        <div className="text-center w-56">
          <div className="mx-auto my-4 w-48">
            <h3 className="text-lg font-black text-gray-800">
              {selectedItem?.name}
            </h3>
            <p className="text-sm text-gray-500">Add modifications</p>
            <NumberInput
              value={quantity}
              increase={() => {
                setQuantity(quantity + 1);
                console.log("increased!!");
              }}
              decrease={() => {
                if (quantity > 1) {
                  setQuantity(quantity - 1);
                }
                console.log("decreased!!");
              }}
            />
          </div>
          <div className="flex gap-4">
            <button className="btn btn-danger w-full">Delete</button>
            <button
              className="btn btn-light w-full"
              onClick={() => setOpen(false)}
            >
              Cancel
            </button>
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
    </>
  );
}

export default AccordionMenuOrder;
