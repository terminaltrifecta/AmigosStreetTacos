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
          price: 5.99,
          quantity: 1,
          item_id: 1,
          comments: "",
        },
        {
          item_name: "Bacon, Egg, Cheddar, and Hash Brown Burrito",
          price: 6.49,
          quantity: 1,
          item_id: 1,
          comments: "",
        },
        {
          item_name: "3 Eggs, Carne Asada, Pico, and Cheese Burrito",
          price: 7.49,
          quantity: 1,
          item_id: 1,
          comments: "",
        },
        {
          item_name:
            "Two Tacos, Egg, Chorizo, Queso, Beans and Cilantro (Tacos, Pork)",
          price: 8.99,
          quantity: 1,
          item_id: 1,
          comments: "",
        },
        {
          item_name: "Huevos Rancheros, 3 Eggs, Veggies (Tacos)",
          price: 7.99,
          quantity: 1,
          item_id: 1,
          comments: "",
        },
      ],
    },
    {
      header: "Bowls - $12",
      items: [
        {
          item_name: "Grilled Chicken",
          price: 10.99,
          quantity: 1,
          item_id: 1,
          comments: "",
        },
        {
          item_name: "Grilled Vegetables",
          price: 8.99,
          quantity: 1,
          item_id: 1,
          comments: "",
        },
        {
          item_name: "Chicken Mole",
          price: 12.49,
          quantity: 1,
          item_id: 1,
          comments: "",
        },
        {
          item_name: "Carne Asada",
          price: 13.99,
          quantity: 1,
          item_id: 1,
          comments: "",
        },
        {
          item_name: "Chicken Fajitas",
          price: 11.99,
          quantity: 1,
          item_id: 1,
          comments: "",
        },
      ],
    },
    {
      header: "Quesadillas - $11",
      items: [
        {
          item_name: "Chicken Quesadilla",
          price: 9.99,
          quantity: 1,
          item_id: 1,
          comments: "",
        },
        {
          item_name: "California Quesadilla",
          price: 10.49,
          quantity: 1,
          item_id: 1,
          comments: "",
        },
        {
          item_name: "BBQ Chicken Quesadilla",
          price: 10.99,
          quantity: 1,
          item_id: 1,
          comments: "",
        },
      ],
    },
    {
      header: "Burritos - $11",
      items: [
        {
          item_name: "California",
          price: 9.99,
          quantity: 1,
          item_id: 1,
          comments: "",
        },
        {
          item_name: "Chicken Fajitas",
          price: 11.99,
          quantity: 1,
          item_id: 1,
          comments: "",
        },
        {
          item_name: "Chicken Mole",
          price: 12.49,
          quantity: 1,
          item_id: 1,
          comments: "",
        },
        {
          item_name: "Grilled Vegetables",
          price: 8.99,
          quantity: 1,
          item_id: 1,
          comments: "",
        },
        {
          item_name: "Carne Asada",
          price: 13.99,
          quantity: 1,
          item_id: 1,
          comments: "",
        },
        {
          item_name: "Beef & Cheese",
          price: 10.49,
          quantity: 1,
          item_id: 1,
          comments: "",
        },
      ],
    },
    {
      header: "Tacos - $3.00",
      items: [
        {
          item_name: "Chicken",
          price: 3,
          quantity: 1,
          item_id: 2,
          comments: "",
        },
        {
          item_name: "Carne Asada",
          price: 3,
          quantity: 1,
          item_id: 1,
          comments: "",
        },
        {
          item_name: "Ground Beef",
          price: 8.99,
          quantity: 1,
          item_id: 1,
          comments: "",
        },
        {
          item_name: "Carnitas (Pork)",
          price: 12.49,
          quantity: 1,
          item_id: 1,
          comments: "",
        },
        {
          item_name: "Suadero (Beef Steak)",
          price: 13.99,
          quantity: 1,
          item_id: 1,
          comments: "",
        },
        {
          item_name: "Chorizo (Pork)",
          price: 11.49,
          quantity: 1,
          item_id: 1,
          comments: "",
        },
      ],
    },
    {
      header: "Gourmet Tacos - $3.75",
      items: [
        {
          item_name: "Meatlovers Taco",
          price: 10.99,
          quantity: 1,
          item_id: 1,
          comments: "",
        },
        {
          item_name: "Taco Ranchero",
          price: 9.49,
          quantity: 1,
          item_id: 1,
          comments: "",
        },
        {
          item_name: "Taco Loco",
          price: 9.99,
          quantity: 1,
          item_id: 1,
          comments: "",
        },
        {
          item_name: "Veggie Taco",
          price: 7.99,
          quantity: 1,
          item_id: 1,
          comments: "",
        },
        {
          item_name: "Taco Campechano",
          price: 10.49,
          quantity: 1,
          item_id: 1,
          comments: "",
        },
        {
          item_name: "Quesadilla Rachera",
          price: 11.49,
          quantity: 1,
          item_id: 1,
          comments: "",
        },
      ],
    },
    {
      header: "Amigos Specials",
      items: [
        {
          item_name: "Shrimp Tostada",
          price: 3.75,
          quantity: 1,
          item_id: 1,
          comments: "",
        },
        {
          item_name: "Shrimp Tacos",
          price: 12.0,
          quantity: 1,
          item_id: 1,
          comments: "",
        },
        {
          item_name: "Birria Tacos",
          price: 12.0,
          quantity: 1,
          item_id: 1,
          comments: "",
        },
        {
          item_name: "Asada Fries",
          price: 13.0,
          quantity: 1,
          item_id: 1,
          comments: "",
        },
        {
          item_name: "Taco Salad",
          price: 10.0,
          quantity: 1,
          item_id: 1,
          comments: "",
        },
        {
          item_name: "Chicken Enchiladas",
          price: 12.0,
          quantity: 1,
          item_id: 1,
          comments: "",
        },
        {
          item_name: "Combo Dinner",
          price: 12.0,
          quantity: 1,
          item_id: 1,
          comments: "",
        },
        {
          item_name: "Tamales Dinner",
          price: 12.0,
          quantity: 1,
          item_id: 1,
          comments: "",
        },
        {
          item_name: "Taco Dinner",
          price: 12.0,
          quantity: 1,
          item_id: 1,
          comments: "",
        },
        {
          item_name: "Choriqueso",
          price: 10.0,
          quantity: 1,
          item_id: 1,
          comments: "",
        },
        {
          item_name: "Crunch Wrap",
          price: 13.5,
          quantity: 1,
          item_id: 1,
          comments: "",
        },
        {
          item_name: "Chicken Tostada",
          price: 3.5,
          quantity: 1,
          item_id: 1,
          comments: "",
        },
        {
          item_name: "Tamales (Sold Individually, Pork or Chicken)",
          price: 2.5,
          quantity: 1,
          item_id: 1,
          comments: "",
        },
        {
          item_name: "Nachos Supreme",
          price: 13.0,
          quantity: 1,
          item_id: 1,
          comments: "",
        },
        {
          item_name: "Mangonada",
          price: 5.75,
          quantity: 1,
          item_id: 1,
          comments: "",
        },
        {
          item_name: "Spicy Street Corn (With Hot Cheetos)",
          price: 5.5,
          quantity: 1,
          item_id: 1,
          comments: "",
        },
        {
          item_name: "Street Corn",
          price: 4.0,
          quantity: 1,
          item_id: 1,
          comments: "",
        },
        {
          item_name: "Torta With French Fries",
          price: 12.0,
          quantity: 1,
          item_id: 1,
          comments: "",
        },
        {
          item_name: "Steak Fajitas Tacos",
          price: 12.0,
          quantity: 1,
          item_id: 1,
          comments: "",
        },
        {
          item_name: "Cajun Dinner",
          price: 12.0,
          quantity: 1,
          item_id: 1,
          comments: "",
        },
        {
          item_name: "Chicken Tenders with French Fries",
          price: 10.0,
          quantity: 1,
          item_id: 1,
          comments: "",
        },
        {
          item_name: "Choriqueso With Chips",
          price: 10.0,
          quantity: 1,
          item_id: 1,
          comments: "",
        },
        {
          item_name: "Walking Tacos",
          price: 8.0,
          quantity: 1,
          item_id: 1,
          comments: "",
        },
        {
          item_name: "Asada Dinner",
          price: 12.0,
          quantity: 1,
          item_id: 1,
          comments: "",
        },
        {
          item_name: "Chicken Flautas",
          price: 12.0,
          quantity: 1,
          item_id: 1,
          comments: "",
        },
        {
          item_name: "Fish Tacos",
          price: 12.0,
          quantity: 1,
          item_id: 1,
          comments: "",
        },
        {
          item_name: "Fish and Chips",
          price: 12.0,
          quantity: 1,
          item_id: 1,
          comments: "",
        },
        {
          item_name: "Lunch Special",
          price: 12.0,
          quantity: 1,
          item_id: 1,
          comments: "",
        },
        {
          item_name: "Amigos Burritos",
          price: 13.0,
          quantity: 1,
          item_id: 1,
          comments: "",
        },
        {
          item_name: "Amigos Salad",
          price: 12.0,
          quantity: 1,
          item_id: 1,
          comments: "",
        },
        {
          item_name: "Gorditas Dinner",
          price: 12.0,
          quantity: 1,
          item_id: 1,
          comments: "",
        },
        {
          item_name: "Buffalo Burrito",
          price: 11.0,
          quantity: 1,
          item_id: 1,
          comments: "",
        },
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
    price: number;
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
                  <ListGroup.Item className="d-flex justify-content-between align-items-center">
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
