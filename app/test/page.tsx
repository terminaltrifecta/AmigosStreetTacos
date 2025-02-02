"use client";

import { useState } from "react";
import Modal from "../components/Modal";
import Dropdown from "../components/Dropdown";

export default function Page() {

  const [selected, setSelected] = useState(20);

  return (
    <main className="App">
      <div className="max-w-screen-md flex flex-col space-y-4 p-4">
        <Dropdown/>
        <div className="flex space-x-4 w-full">
          <input
            className="w-1/2 p-3 rounded-xl border border-slate-300 normal-case"
            placeholder="First Name"
          />
          <input
            className="w-1/2 p-3 rounded-xl border border-slate-300 normal-case"
            placeholder="First Name"
          />
        </div>
      </div>
    </main>
  );
}
