"use client";

import { useAppDispatch } from "@/lib/hooks";
import { addToCart } from "@/slices/cartSlice";
import React from "react";
import { Accordion, Button, Dropdown, ListGroup } from "react-bootstrap";
import { useState } from "react";
import { CheckCircle } from "react-bootstrap-icons"; // Importing Bootstrap icon
import { CartPlus, PlusCircle } from "iconoir-react";
import "../Accordion Menu/AccordionMenu.css";

interface Popup {
  id: number;
  message: string;
}

function AccordionMenuOrder() {
  const menuItems = [
    {
      header: "Breakfast - $7",
      items: [
        {
          item_name: "Chorizo, Egg, Cheese, and Veggie Burrito (Contains Pork)",
          item_id: 280, 
          quantity: 1,
          comments: "",
        },
        {
          item_name: "Bacon, Egg, Cheddar, and Hash Brown Burrito",
          item_id: 281, 
          quantity: 1,
          comments: "",
        },
        {
          item_name: "3 Eggs, Carne Asada, Pico, and Cheese Burrito",
          item_id: 282, 
          quantity: 1,
          comments: "",
        },
        {
          item_name: "Two Tacos, Egg, Chorizo, Queso, Beans and Cilantro (Tacos, Pork)",
          item_id: 283, 
          quantity: 1,
          comments: "",
        },
        {
          item_name: "Huevos Rancheros, 3 Eggs, Veggies (Tacos)",
          item_id: 284, 
          quantity: 1,
          comments: "",
        },
      ],
    },
    {
      header: "Bowls - $12",
      items: [
        {
          item_name: "Grilled Chicken",
          item_id: 295, 
          quantity: 1,
          comments: "",
        },
        {
          item_name: "Grilled Vegetables",
          item_id: 296, 
          quantity: 1,
          comments: "",
        },
        { item_name: "Chicken Mole", item_id: 297, quantity: 1, comments: "" },
        { item_name: "Carne Asada", item_id: 298, quantity: 1, comments: "" },
        {
          item_name: "Chicken Fajitas",
          item_id: 299, 
          quantity: 1,
          comments: "",
        },
      ],
    },
    {
      header: "Quesadillas - $11",
      items: [
        {
          item_name: "Chicken Quesadilla",
          item_id: 291, 
          quantity: 1,
          comments: "",
        },
        {
          item_name: "California Quesadilla",
          item_id: 290, 
          quantity: 1,
          comments: "",
        },
        {
          item_name: "BBQ Chicken Quesadilla",
          item_id: 292, 
          quantity: 1,
          comments: "",
        },
      ],
    },
    {
      header: "Burritos - $11",
      items: [
        { item_name: "California", item_id: 285, quantity: 1, comments: "" },
        {
          item_name: "Chicken Fajitas",
          item_id: 286, 
          quantity: 1,
          comments: "",
        },
        { item_name: "Chicken Mole", item_id: 297, quantity: 1, comments: "" },
        {
          item_name: "Grilled Vegetables",
          item_id: 288, 
          quantity: 1,
          comments: "",
        },
        { item_name: "Carne Asada", item_id: 287, quantity: 1, comments: "" },
        { item_name: "Beef & Cheese", item_id: 289, quantity: 1, comments: "" },
      ],
    },
    {
      header: "Tacos - $3.00",
      items: [
        { item_name: "Chicken", item_id: 2, quantity: 1, comments: "" },
        { item_name: "Carne Asada", item_id: 1, quantity: 1, comments: "" },
        { item_name: "Ground Beef", item_id: 309, quantity: 1, comments: "" },
        {
          item_name: "Carnitas (Pork)",
          item_id: 311, 
          quantity: 1,
          comments: "",
        },
        {
          item_name: "Suadero (Beef Steak)",
          item_id: 312, 
          quantity: 1,
          comments: "",
        },
        { item_name: "Chorizo (Pork)", item_id: 313, quantity: 1, comments: "" },
      ],
    },
    {
      header: "Gourmet Tacos - $3.75",
      items: [
        {
          item_name: "Meatlovers Taco",
          item_id: 301, 
          quantity: 1,
          comments: "",
        },
        { item_name: "Taco Ranchero", item_id: 302, quantity: 1, comments: "" },
        { item_name: "Taco Loco", item_id: 304, quantity: 1, comments: "" },
        { item_name: "Veggie Taco", item_id: 306, quantity: 1, comments: "" },
        {
          item_name: "Taco Campechano",
          item_id: 305, 
          quantity: 1,
          comments: "",
        },
        {
          item_name: "Quesadilla Rachera",
          item_id: 303, 
          quantity: 1,
          comments: "",
        },
      ],
    },
    {
      header: "Amigos Specials",
      items: [
        { item_name: "Shrimp Tostada", item_id: 314, quantity: 1, comments: "" },
        { item_name: "Shrimp Tacos", item_id: 315, quantity: 1, comments: "" },
        { item_name: "Birria Tacos", item_id: 316, quantity: 1, comments: "" },
        { item_name: "Asada Fries", item_id: 323, quantity: 1, comments: "" },
        { item_name: "Taco Salad", item_id: 300, quantity: 1, comments: "" },
        {
          item_name: "Chicken Enchiladas",
          item_id: 324, quantity: 1, comments: "" },
        { item_name: "Combo Dinner", item_id: 325, quantity: 1, comments: "" },
        { item_name: "Tamales Dinner", item_id: 326, quantity: 1, comments: "" },
        { item_name: "Taco Dinner", item_id: 327, quantity: 1, comments: "" },
        { item_name: "Choriqueso", item_id: 330, quantity: 1, comments: "" },
        { item_name: "Crunch Wrap", item_id: 318, quantity: 1, comments: "" },
        { item_name: "Chicken Tostada", item_id: 322, quantity: 1, comments: "" },
        {
          item_name: "Tamales (Sold Individually, Pork or Chicken)",
          item_id: 335, 
          quantity: 1,
          comments: "",
        },
        { item_name: "Nachos Supreme", item_id: 317, quantity: 1, comments: "" },
        { item_name: "Mangonada", item_id: 347, quantity: 1, comments: "" },
        {
          item_name: "Spicy Street Corn (With Hot Cheetos)",
          item_id: 345, 
          quantity: 1,
          comments: "",
        },
        { item_name: "Street Corn", item_id: 345, quantity: 1, comments: "" },
      ],
    },
  ];

  const dispatch = useAppDispatch();
  const [popups, setPopups] = useState<Popup[]>([]);

  // Function to trigger haptic feedback
  const triggerHapticFeedback = () => {
    if ("vibrate" in navigator) {
      navigator.vibrate(100); // Vibrate for 100ms
    }
  };

  const playSound = (soundUrl: string) => {
    const audio = new Audio(soundUrl);
    audio.play();
  };

  const handleAddToCart = (item: {
    item_name: string;
    item_id: number;
    quantity: number;
    comments: string;
  }) => {
    dispatch(addToCart(item));

    const newPopup: Popup = {
      id: Date.now(),
      message: `${item.item_name} added to cart!`,
    };

    setPopups((prevPopups) => [...prevPopups, newPopup]);

    // Trigger haptic feedback
    triggerHapticFeedback();

    setTimeout(() => {
      setPopups((prevPopups) =>
        prevPopups.filter((popup) => popup.id !== newPopup.id)
      );
    }, 3000);
  };

  return (
    <>
      <Accordion>
        {menuItems.map((section, index) => (
          <Accordion.Item eventKey={`${index + 1}`} key={section.header}>
            <Accordion.Header>
              <h4>{section.header}</h4>
            </Accordion.Header>
            <Accordion.Body>
              <ListGroup variant="flush">
                {section.items.map((item) => (
                  <ListGroup.Item
                    className="d-flex justify-content-between align-items-center"
                  >
                    <span>{item.item_name}</span>

                    <div className="icon" onClick={() => handleAddToCart(item)}>
                      <PlusCircle width={24} height={24} strokeWidth={2} />
                    </div>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Accordion.Body>
          </Accordion.Item>
        ))}
      </Accordion>

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
