"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Modal from "./Modal";
import { ListGroup } from "react-bootstrap";
import NumberInput from "./numberInput/numberInput";
import { useAppSelector, useAppDispatch } from "@/lib/hooks";
import { RootState } from "@/lib/store";
import { MenuItemData, ModificationData, OrderedItemData } from "@/app/interfaces";
import { addToCart } from "@/slices/cartSlice";
import { CheckCircle } from "react-bootstrap-icons";

interface Popup {
  id: number;
  message: string;
}

interface LastMinuteAddOnsModalProps {
  open: boolean;
  onClose: () => void;
}

export default function LastMinuteAddOnsModal({ open, onClose }: LastMinuteAddOnsModalProps) {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const menu = useAppSelector((state: RootState) => state.menu);

  // Cast the arrays so TypeScript knows their element types.
  const dessertAndDrinksItems = (menu.menuItems as MenuItemData[]).filter(
    (item) => item.category_id === 9
  );
  const modifications = menu.modifications as ModificationData[];

  // State for modifications view (for a single selected item)
  const [selectedItem, setSelectedItem] = useState<MenuItemData | null>(null);
  const [price, setPrice] = useState(0);
  const [selectedModifications, setSelectedModifications] = useState<ModificationData[]>([]);
  const [quantity, setQuantity] = useState(1);
  const [instructions, setInstructions] = useState("");

  // Popup state for confirmation feedback
  const [popups, setPopups] = useState<Popup[]>([]);

  // Disable background scrolling when modal is open.
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [open]);

  // Opens the modifications view for a tapped item
  const openModifications = (item: MenuItemData) => {
    setSelectedItem(item);
    setPrice(item.price);
    setQuantity(1);
    setInstructions("");
    setSelectedModifications([]);
  };

  // Add the item (with any modifications) to the cart
  const handleAddToCart = (item: MenuItemData) => {
    const orderedItem: OrderedItemData = {
      item_name: item.name,
      item_id: item.item_id,
      price: price,
      quantity: quantity,
      comments: instructions,
      modifications: selectedModifications,
    };

    dispatch(addToCart(orderedItem));
    // Reset modifications view
    setSelectedItem(null);

    // Show confirmation popup
    const newPopup: Popup = {
      id: Date.now(),
      message: `${item.name} added to cart!`,
    };
    setPopups((prev) => [...prev, newPopup]);

    // Trigger haptic feedback if available
    if ("vibrate" in navigator) {
      navigator.vibrate(100);
    }

    // Remove the popup after 3 seconds
    setTimeout(() => {
      setPopups((prev) => prev.filter((popup) => popup.id !== newPopup.id));
    }, 3000);
  };

  // Toggle a modification selection and update the price accordingly
  const handleModificationChange = (modification: ModificationData) => {
    const alreadySelected = selectedModifications.some(
      (mod) => mod.modification_id === modification.modification_id
    );
    if (alreadySelected) {
      setPrice((prev) => prev - modification.price / 100);
      setSelectedModifications(
        selectedModifications.filter(
          (mod) => mod.modification_id !== modification.modification_id
        )
      );
    } else {
      setPrice((prev) => prev + modification.price / 100);
      setSelectedModifications([...selectedModifications, modification]);
    }
  };

  // Navigate to checkout
  const handleCheckout = () => {
    onClose();
    router.push("/payment");
  };

  return (
    <Modal open={open} onClose={onClose}>
      {selectedItem === null ? (
        // List view of dessert & drinks items
        <div className="flex flex-col h-full max-h-[70vh] w-full max-w-xl bg-amigoswhite rounded-2xl overflow-hidden">
          {/* Header */}
          <div className="space-y-2 p-6 border-b border-amigoslightgray">
            <h2 className="text-3xl text-center font-bold tracking-wide text-amigosblack">
              Last Minute Add-ons
            </h2>
            <p className="text-center text-amigogray">Desserts and Drinks</p>
          </div>
          {/* Items List */}
          <div className="flex-1 overflow-y-auto p-4 space-y-2">
            <ListGroup variant="flush">
              {dessertAndDrinksItems.slice(0, 3).map((item) => (
                <ListGroup.Item
                  key={item.item_id}
                  className="p-4 rounded-xl cursor-pointer transition-all border-2 border-amigoslightgray hover:border-amigosred/30 mb-2 last:mb-0"
                  onClick={() => openModifications(item)}
                >
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-amigosblack truncate">{item.name}</span>
                    <span className="text-amigosred font-semibold">
                      ${item.price.toFixed(2)}
                    </span>
                  </div>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </div>
          {/* Footer with Checkout and Close buttons */}
          <div className="p-6 border-t border-amigoslightgray flex gap-4">
            <button
              type="button"
              className="btn rounded-2xl py-4 text-amigosblack font-semibold border-2 border-amigoslightgray hover:border-amigosred/30 hover:bg-amigosred/5 transition-colors w-full"
              onClick={handleCheckout}
            >
              Checkout
            </button>
            <button
              type="button"
              className="btn rounded-2xl py-4 text-amigosblack font-semibold border-2 border-amigoslightgray hover:border-amigosred/30 hover:bg-amigosred/5 transition-colors w-full"
              onClick={onClose}
            >
              Close
            </button>
          </div>
        </div>
      ) : (
        // Modifications view for the selected item
        <div className="text-center flex flex-col items-center w-56 lg:w-96">
          <div className="my-4 space-y-2">
            <div>
              <div className="text-lg font-black text-gray-800">{selectedItem.name}</div>
              <div className="text-sm text-gray-500">
                {"$" + (price * quantity).toFixed(2)}
              </div>
            </div>
            {/* Modifications list */}
            <div className="space-y-1">
              {modifications
                .filter(
                  (modification) =>
                    modification.category_id === selectedItem.category_id ||
                    modification.item_id === selectedItem.item_id
                )
                .map((modification) => (
                  <div
                    key={modification.modification_id}
                    className="flex space-x-2 cursor-pointer"
                    onClick={() => handleModificationChange(modification)}
                  >
                    <input
                      type="checkbox"
                      checked={selectedModifications.some(
                        (mod) => mod.modification_id === modification.modification_id
                      )}
                      readOnly
                    />
                    <div className="text-gray-500">{modification.modification}</div>
                    <div>${(modification.price / 100).toFixed(2)}</div>
                  </div>
                ))}
            </div>
            {/* Quantity input */}
            <NumberInput
              value={quantity}
              increase={() => setQuantity(quantity + 1)}
              decrease={() => {
                if (quantity > 1) setQuantity(quantity - 1);
              }}
            />
            {/* Custom instructions */}
            <input
              placeholder="Custom Instructions"
              value={instructions}
              className="input p-2 border-2 rounded-md w-full"
              type="text"
              onChange={(e) => setInstructions(e.target.value)}
            />
          </div>
          <div className="flex gap-4 w-full">
            <button
              type="button"
              className="btn btn-danger w-full"
              onClick={() => selectedItem && handleAddToCart(selectedItem)}
            >
              <div className="normal-case">Add</div>
            </button>
            <button
              type="button"
              className="btn btn-light w-full"
              onClick={() => setSelectedItem(null)}
            >
              <div className="normal-case">Cancel</div>
            </button>
          </div>
        </div>
      )}

      {/* Popup notifications */}
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
    </Modal>
  );
}
