import React from "react";
import "./dropdownButton.css";

export default function DropdownButton({ children }: any) {
  return (
    <div className="">
      <div className="fs-5 dropdownButton">{children}</div>

      <div className="menuOptions">
        
      </div>
    </div>
  );
}
