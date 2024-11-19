"use client";

import React from "react";
import { supabase } from '../supabase';

export default function About() {

  async function supabaseCall() {
    const { data, error } = await supabase
      .from('locations')
      .select('*');

    if (error) {
      console.error(error);
    } else {
      console.log(data);
    }
  }

  return (
    <div className="gap-3 bg-white p-4 min-h-screen">
        <button id="buttonParent" className="bigRed" onClick={supabaseCall}>
          <div className="d-flex align-items-center justify-content-center p-4">
            Supabase
          </div>
        </button>
    </div>
  );
}