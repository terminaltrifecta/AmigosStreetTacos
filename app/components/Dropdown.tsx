import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { setTime } from "@/slices/timeSlice";
import { ChevronDown } from "lucide-react";
import React, { useState } from "react";

export default function Dropdown() {

  const dispatch = useAppDispatch();
  const time = useAppSelector((state) => state.time);

  const [open, setOpen] = useState(false);
  const options = [20, 30, 45];

  return (
    <div className="relative">
      <div className="text-sm text-slate-500">Select a time</div>
      <div
        onClick={() => {
          setOpen(!open);
        }}
        className="flex justify-between cursor-pointer bg-white w-full p-3 rounded-xl border border-slate-300 normal-case"
      >
        <div className="">{time + " minutes"}</div>
        <ChevronDown className={open ? "transform rotate-180 transition-all" : "transition-all"} size={24} />
      </div>
      {open && (
        <div className="mt-2 bg-white border border-slate-300 rounded-xl absolute z-10 w-full">
          {options.map((option, i) => (
            <div
              key={option}
              onClick={() => {
                dispatch(setTime(option));
                setOpen(false);
              }}
              className="cursor-pointer p-3 hover:bg-slate-100"
            >
              {i === 0 ? "ASAP: " + option + " minutes" : option + " minutes"}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}