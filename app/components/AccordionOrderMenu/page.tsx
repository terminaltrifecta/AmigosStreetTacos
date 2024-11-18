'use client'

import { useAppDispatch } from "@/lib/hooks";
import { addToCart } from "@/slices/cartSlice";
import React from "react";
import { Accordion, Button, Dropdown, ListGroup } from "react-bootstrap";
import { useState } from "react";
import { CheckCircle } from "react-bootstrap-icons"; // Importing Bootstrap icon
import { CartPlus, PlusCircle } from "iconoir-react";

interface AccordionMenuProps {
  acchdr1: string;
  acchdr2: string;
  acchdr3: string;
  acchdr4: string;
  acchdr5: string;
  acchdr6: string;
  acchdr7: string;
}

interface Popup {
  id: number;
  message: string;
}

function AccordionMenuOrder({
  acchdr1,
  acchdr2,
  acchdr3,
  acchdr4,
  acchdr5,
  acchdr6,
  acchdr7,
}: AccordionMenuProps) {
  const menuItems = [
    {
      header: acchdr1,
      items: [
        {
          name: "Chorizo, Egg, Cheese, and Veggie Burrito (Contains Pork)",
          price: 5.99,
          quantity: 1,
          instructions: "",
        },
        {
          name: "Bacon, Egg, Cheddar, and Hash Brown Burrito",
          price: 6.49,
          quantity: 1,
          instructions: "",
        },
        {
          name: "3 Eggs, Carne Asada, Pico, and Cheese Burrito",
          price: 7.49,
          quantity: 1,
          instructions: "",
        },
        {
          name: "Two Tacos, Egg, Chorizo, Queso, Beans and Cilantro (Tacos, Pork)",
          price: 8.99,
          quantity: 1,
          instructions: "",
        },
        {
          name: "Huevos Rancheros, 3 Eggs, Veggies (Tacos)",
          price: 7.99,
          quantity: 1,
          instructions: "",
        },
      ],
    },
    {
      header: acchdr2,
      items: [
        {
          name: "Grilled Chicken",
          price: 10.99,
          quantity: 1,
          instructions: "",
        },
        {
          name: "Grilled Vegetables",
          price: 8.99,
          quantity: 1,
          instructions: "",
        },
        { name: "Chicken Mole", price: 12.49, quantity: 1, instructions: "" },
        { name: "Carne Asada", price: 13.99, quantity: 1, instructions: "" },
        {
          name: "Chicken Fajitas",
          price: 11.99,
          quantity: 1,
          instructions: "",
        },
      ],
    },
    {
      header: acchdr3,
      items: [
        {
          name: "Chicken Quesadilla",
          price: 9.99,
          quantity: 1,
          instructions: "",
        },
        {
          name: "California Quesadilla",
          price: 10.49,
          quantity: 1,
          instructions: "",
        },
        {
          name: "BBQ Chicken Quesadilla",
          price: 10.99,
          quantity: 1,
          instructions: "",
        },
      ],
    },
    {
      header: acchdr4,
      items: [
        { name: "California", price: 9.99, quantity: 1, instructions: "" },
        {
          name: "Chicken Fajitas",
          price: 11.99,
          quantity: 1,
          instructions: "",
        },
        { name: "Chicken Mole", price: 12.49, quantity: 1, instructions: "" },
        {
          name: "Grilled Vegetables",
          price: 8.99,
          quantity: 1,
          instructions: "",
        },
        { name: "Carne Asada", price: 13.99, quantity: 1, instructions: "" },
        { name: "Beef & Cheese", price: 10.49, quantity: 1, instructions: "" },
      ],
    },
    {
      header: acchdr5,
      items: [
        { name: "Chicken", price: 9.99, quantity: 1, instructions: "" },
        { name: "Carne Asada", price: 13.99, quantity: 1, instructions: "" },
        { name: "Ground Beef", price: 8.99, quantity: 1, instructions: "" },
        {
          name: "Carnitas (Pork)",
          price: 12.49,
          quantity: 1,
          instructions: "",
        },
        {
          name: "Suadero (Beef Steak)",
          price: 13.99,
          quantity: 1,
          instructions: "",
        },
        { name: "Chorizo (Pork)", price: 11.49, quantity: 1, instructions: "" },
      ],
    },
    {
      header: acchdr6,
      items: [
        {
          name: "Meatlovers Taco",
          price: 10.99,
          quantity: 1,
          instructions: "",
        },
        { name: "Taco Ranchero", price: 9.49, quantity: 1, instructions: "" },
        { name: "Taco Loco", price: 9.99, quantity: 1, instructions: "" },
        { name: "Veggie Taco", price: 7.99, quantity: 1, instructions: "" },
        {
          name: "Taco Campechano",
          price: 10.49,
          quantity: 1,
          instructions: "",
        },
        {
          name: "Quesadilla Rachera",
          price: 11.49,
          quantity: 1,
          instructions: "",
        },
      ],
    },
    {
      header: acchdr7,
      items: [
        { name: "Shrimp Tostada", price: 3.75, quantity: 1, instructions: "" },
        { name: "Shrimp Tacos", price: 12.0, quantity: 1, instructions: "" },
        { name: "Birria Tacos", price: 12.0, quantity: 1, instructions: "" },
        { name: "Asada Fries", price: 13.0, quantity: 1, instructions: "" },
        { name: "Taco Salad", price: 10.0, quantity: 1, instructions: "" },
        {
          name: "Chicken Enchiladas",
          price: 12.0,
          quantity: 1,
          instructions: "",
        },
        { name: "Combo Dinner", price: 12.0, quantity: 1, instructions: "" },
        { name: "Tamales Dinner", price: 12.0, quantity: 1, instructions: "" },
        { name: "Taco Dinner", price: 12.0, quantity: 1, instructions: "" },
        { name: "Choriqueso", price: 10.0, quantity: 1, instructions: "" },
        { name: "Crunch Wrap", price: 13.5, quantity: 1, instructions: "" },
        { name: "Chicken Tostada", price: 3.5, quantity: 1, instructions: "" },
        {
          name: "Tamales (Sold Individually, Pork or Chicken)",
          price: 2.5,
          quantity: 1,
          instructions: "",
        },
        { name: "Nachos Supreme", price: 13.0, quantity: 1, instructions: "" },
        { name: "Mangonada", price: 5.75, quantity: 1, instructions: "" },
        {
          name: "Spicy Street Corn (With Hot Cheetos)",
          price: 5.5,
          quantity: 1,
          instructions: "",
        },
        { name: "Street Corn", price: 4.0, quantity: 1, instructions: "" },
        {
          name: "Torta With French Fries",
          price: 12.0,
          quantity: 1,
          instructions: "",
        },
        {
          name: "Steak Fajitas Tacos",
          price: 12.0,
          quantity: 1,
          instructions: "",
        },
        { name: "Cajun Dinner", price: 12.0, quantity: 1, instructions: "" },
        {
          name: "Chicken Tenders with French Fries",
          price: 10.0,
          quantity: 1,
          instructions: "",
        },
        {
          name: "Choriqueso With Chips",
          price: 10.0,
          quantity: 1,
          instructions: "",
        },
        { name: "Walking Tacos", price: 8.0, quantity: 1, instructions: "" },
        { name: "Asada Dinner", price: 12.0, quantity: 1, instructions: "" },
        { name: "Chicken Flautas", price: 12.0, quantity: 1, instructions: "" },
        { name: "Fish Tacos", price: 12.0, quantity: 1, instructions: "" },
        { name: "Fish and Chips", price: 12.0, quantity: 1, instructions: "" },
        { name: "Lunch Special", price: 12.0, quantity: 1, instructions: "" },
        { name: "Amigos Burritos", price: 13.0, quantity: 1, instructions: "" },
        { name: "Amigos Salad", price: 12.0, quantity: 1, instructions: "" },
        { name: "Gorditas Dinner", price: 12.0, quantity: 1, instructions: "" },
        { name: "Buffalo Burrito", price: 11.0, quantity: 1, instructions: "" },
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
    name: string;
    price: number;
    quantity: number;
    instructions: string;
  }) => {
    dispatch(addToCart(item));

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
                    key={item.name}
                    className="d-flex justify-content-between align-items-center"
                  >
                    <span>{item.name}</span>

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
