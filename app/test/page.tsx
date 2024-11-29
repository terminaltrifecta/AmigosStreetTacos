"use client";

import React from "react";
import { supabase } from '../supabase';
import AddLocation from "../components/AddLocation/AddLocation";
import usePostMutation, { PostData } from "../hooks/usePosts";

export default function About() {

    const { mutate, error } = usePostMutation();

    function functionAdd() {
      const postData: PostData = {
        customer_first_name: "Aiden",
        customer_last_name: "Alazo",
        email: "luvnataliehanna798@gmail.com",
        phone_number: "5863501415",
        location_id: 2,
        time_placed: "2024-11-26T14:30:00Z",
        time_requested: "2024-11-26T14:30:00Z",
        location: "POINT (-73.935242 40.730610)",
        is_pickup: true,
        status_id: 6,
        cart: [{
          "item_name": "Carne Asada Taco",
          "item_id": 1,
          "quantity": 3,
          "comments": "Garlic on da side!"
      },
      {
          "item_name": "Chicken Taco",
          "item_id": 2,
          "quantity": 2,
          "comments": "errrxtra garlic chile!"
      }]
      };
      mutate(postData);
    };

  return (
    <div className="gap-3 bg-white p-4 min-h-screen space-y-4">
        <button id="buttonParent" className="bigRed" onClick={functionAdd}>
          <div className="d-flex align-items-center justify-content-center p-4">
            Supabase
          </div>
        </button>
    </div>
  );
}