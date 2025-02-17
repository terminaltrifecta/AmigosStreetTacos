"use client";

import React, { useState } from "react";
import Modal from "./Modal";
import { useAppSelector, useAppDispatch } from "@/lib/hooks";
import { RootState } from "@/lib/store";
import { CategoryData, MenuItemData } from "@/app/interfaces";
import { ListGroup } from "react-bootstrap";
import { useRouter } from 'next/navigation';
import { addToCart } from "@/slices/cartSlice";

interface LastMinuteAddOnsModalProps {
  open: boolean;
  onClose: () => void;
}

export default function LastMinuteAddOnsModal({
  open,
  onClose,
}: LastMinuteAddOnsModalProps) {
  const menu = useAppSelector((state: RootState) => state.menu);
  const [selectedItems, setSelectedItems] = useState<MenuItemData[]>([]);

  const toggleSelectItem = (item: MenuItemData) => {
    if (
      selectedItems.some(
        (selectedItem) => selectedItem.item_id === item.item_id
      )
    ) {
      setSelectedItems(
        selectedItems.filter(
          (selectedItem) => selectedItem.item_id !== item.item_id
        )
      );
    } else {
      setSelectedItems([...selectedItems, item]);
    }
  };

  const handleProceed = () => {
    selectedItems.forEach(item => {
      dispatch(addToCart(item));
    });
    router.push('/payment');
    onClose();
  };

  const dispatch = useAppDispatch();
  const router = useRouter();
  const dessertAndDrinksItems: MenuItemData[] = menu.menuItems.filter(
    (item: MenuItemData) => item.category_id === 9
  );

  return (
    <Modal open={open} onClose={onClose}>
      <div className="text-center flex flex-col items-center w-56 lg:w-96">
        <div className="my-4 space-y-2">
          <div className="text-lg font-black text-gray-800">
            Last Minute Add-ons
          </div>
          <div className="text-sm text-gray-500">Desserts and Drinks</div>
        </div>
        <ListGroup variant="flush">
          {dessertAndDrinksItems.map((item: MenuItemData) => (
            <ListGroup.Item
              key={item.item_id}
              className={`cursor-pointer hover:bg-red-200 ${
                selectedItems.some(
                  (selectedItem) => selectedItem.item_id === item.item_id
                )
                  ? "bg-red-100"
                  : ""
              }`}
              onClick={() => toggleSelectItem(item)}
            >
              <div className="p-2">
                {item?.name} - ${item?.price}
              </div>
            </ListGroup.Item>
          ))}
        </ListGroup>
        <div className="flex gap-4 w-full mt-4">
          <button
            className="btn btn-light w-full normal-case"
            onClick={onClose}
          >
            No Thanks
          </button>
          <button
            className="btn btn-primary w-full normal-case"
            onClick={handleProceed}
          >
            Proceed
          </button>
        </div>
      </div>
    </Modal>
  );
}
