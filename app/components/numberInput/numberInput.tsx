import React, { useEffect, useState } from "react";

const NumberInput = ({ value, decrease, increase }: any) => {
  const [localValue, setLocalValue] = useState(value);

  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  return (
    <div className="flex items-center border-2 border-[#e2d3c0] rounded-full w-full h-16"> {/* Adjust height here */}
      <button
        className="bg-white text-red-500 hover:text-black px-4 py-2 rounded-l-full h-full w-full"
        id="decrement"
        onClick={decrease}
      >
        -
      </button>
      <div className="text-center text-md font-bold bg-white text-black py-2 appearance-textfield w-full h-full flex items-center justify-center">
        {value}
      </div>
      <button
        className="bg-white text-red-500 hover:text-black px-4 py-2 rounded-r-full h-full w-full"
        id="increment"
        onClick={increase}
      >
        +
      </button>
    </div>
  );
};

export default NumberInput;