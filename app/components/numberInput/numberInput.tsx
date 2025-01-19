import React, { useEffect, useState } from 'react';

const NumberInput = ({ value, decrease, increase }: any) => {
  const [localValue, setLocalValue] = useState(value);

  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  return (
    <div className="flex items-center border-2 border-[#e2d3c0] rounded-full w-full">
      <button
        className="bg-white text-red-500 hover:text-black px-6 py-4 rounded-l-full"
        id="decrement"
        onClick={decrease}
      >
        -
      </button>
      <div
        className="text-center text-lg font-bold bg-white text-black py-4 w-full h-full appearance-textfield"
      >{value}</div>
      <button
        className="bg-white text-red-500 hover:text-black px-6 py-4 rounded-r-full"
        id="increment"
        onClick={increase}
      >
        +
      </button>
    </div>
  );
};

export default NumberInput;