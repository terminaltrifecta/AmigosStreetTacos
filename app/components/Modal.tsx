"use client";

import { X } from "lucide-react";
import React from "react";

export default function Modal({
  open,
  onClose,
  children,
}: {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}) {
  return (
    // backdrop
    <div
      onClick={onClose}
      className={`fixed inset-0 flex justify-center items-center transition-colors ${
        open ? "visible bg-amigosblack/20" : "invisible"
      }`}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`bg-amigoswhite rounded-xl shadow p-6 transition-all ${
          open ? "scale-100 opacity-100" : "scale-125 opacity-0"
        }`}
      >
        <button 
        onClick={onClose}
        className="absolute top-2 right-2 p-1 rounded-lg text-gray-40 hover:text-gray-600">
          <X size={24}/>
        </button>
        {children}
      </div>
    </div>
  );
}
