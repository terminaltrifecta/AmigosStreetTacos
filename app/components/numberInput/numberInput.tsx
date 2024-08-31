import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/esm/Button";
import "./numberInput.css";

export default function NumberInput({ decrease, increase, value }: any) {
  const [localValue, setLocalValue] = useState(value);

  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  return (
    <div className="numberContainer">
      <button className="numButton" id="decrement" onClick={decrease}>
        -
      </button>
      <input
        type="number"
        min={1}
        max={50}
        step={1}
        value={localValue}
        readOnly
      />
      <button className="numButton" id="increment" onClick={increase}>
        +
      </button>
    </div>
  );
}
