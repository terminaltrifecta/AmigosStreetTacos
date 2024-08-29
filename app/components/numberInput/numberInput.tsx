import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/esm/Button";

export default function NumberInput({ decrease, increase, value }: any) {
  const [localValue, setLocalValue] = useState(value);

  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  return (
    <div className="px-4 d-flex">
      <Button variant="secondary" onClick={decrease}>
        -
      </Button>

      <div className="px-2">{localValue}</div>

      <Button variant="secondary" onClick={increase}>
        +
      </Button>
    </div>
  );
}
