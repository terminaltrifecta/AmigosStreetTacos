import { useAppDispatch } from "@/lib/hooks";
import {
  removeFromCart,
  removeModification,
  setInstructions,
  setQuantity,
} from "@/slices/cartSlice";
import React from "react";
import NumberInput from "../numberInput/numberInput";
import { Xmark } from "iconoir-react";
import { ModificationData, OrderedItemData } from "@/app/interfaces";

// The CartItem functional component takes CartItemProps as props
export default function CartItem({
  item_name,
  item_index,
  price,
  quantity,
  modifications,
  comments,
}: any) {
  const dispatch = useAppDispatch();

  return (
    <div className="whiteBackground whiteBorder space-y-2 px-4 py-2 my-4">
      <div className="flex justify-between items-center">
        <div className="flex flex-col">
          <div className="cardTitle">{item_name}</div>{" "}
          {/* Display the name of the item as the card title */}
          <div className="cardTitle fw-light">
            {" "}
            ${(price * quantity).toFixed(2)}
          </div>
        </div>
        <div className="d-flex">
          <NumberInput
            value={quantity}
            increase={() => {
              dispatch(
                setQuantity({
                  quantity: quantity + 1,
                  item_name: item_name,
                  comments: comments,
                })
              );
              console.log("increased!!");
            }}
            decrease={() => {
              dispatch(
                setQuantity({
                  quantity: quantity - 1,
                  item_name: item_name,
                  comments: comments,
                })
              );
            }}
          />
          {/* Display the price, formatted to two decimal places */}
          <div
            className="clickable ps-2"
            onClick={() => {
              dispatch(
                removeFromCart({ item_name: item_name, comments: comments })
              );
            }}
          >
            <Xmark className="icon" width={24} height={24} strokeWidth={2.2} />
          </div>
        </div>
      </div>

      <div className="">
        {modifications.map((modification: ModificationData, i: number) => (
          <div className="flex space-x-2">
            <div className="text-gray-500">
              {modification.modification}
            </div>
            <div className="flex h-full align-middle cursor-pointer" 
              onClick={() => {
                dispatch(removeModification({itemIndex: item_index, modificationIndex: i}))
              }}  
            >
              <Xmark
                className="icon"
                width={16}
                height={24}
                strokeWidth={2.2}
              />
            </div>
          </div>
        ))}
      </div>

      <input
        placeholder={"Custom Instructions"}
        value={comments}
        className="px-2 py-1 rounded-lg border-2 border-[#e2d3c0] focus:border-amigosred focus:outline-none transition-all"
        type="text"
        onChange={(event: any) => {
          dispatch(
            setInstructions({
              item_name: item_name,
              oldComments: comments,
              comments: event.target.value,
            })
          );
        }}
      />
    </div>
  );
}
