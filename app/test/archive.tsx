"use client";

import React from "react";
import { supabase } from '../supabase';
import AddLocation from "../components/AddLocation/AddLocation";

export default function About() {

   async function supabaseCall() {
    const { data, error } = await supabase
      .from('locations')
      .select('*, franchise(name)');

    if (error) {
      console.error(error);
    } else {
      console.log(data);
    }
  }

  async function supabaseAdd(event:any) {
    event.preventDefault();
  
    const locationName = event.target.locationName.value;
    const address = event.target.address.value;
    const franchiseId = event.target.franchiseId.value;
  
    const { data, error } = await supabase
      .from('locations')
      .insert([{ location_name: locationName, address: address, franchise_id: franchiseId }]);
  
    if (error) {
      console.error('Error adding location:', error);
    } else {
      console.log('Location added successfully:', data);
      // Handle success, e.g., redirect to a success page or display a success message
    }
  }

  return (
    <div className="gap-3 bg-white p-4 min-h-screen space-y-4">
        
        <button id="buttonParent" className="bigRed" onClick={supabaseCall}>
          <div className="d-flex align-items-center justify-content-center p-4">
            Supabase
          </div>
        </button>

        <AddLocation/>
    </div>
  );
}