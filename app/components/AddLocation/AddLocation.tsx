import { useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { supabase } from "@/app/supabase";

export default function AddLocation() {
  const [locationName, setLocationName] = useState("");
  const [lattitude, setLattitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [franchiseId, setFranchiseId] = useState("");

  async function handleSubmit(event: any) {
    event.preventDefault();

    const { data, error } = await supabase
      .from("locations")
      .insert([
        {
            franchise_id: franchiseId,
            location_name: locationName,
            location: "POINT("+lattitude+" "+longitude+")",
        },
      ]);

    if (error) {
      console.error("Error adding location:", error);
    } else {
      console.log("Location added successfully:", data);
      // Handle success, e.g., redirect to a success page or display a success message
    }
  }

  return (
    <form onSubmit={handleSubmit} className="form flex flex-col space-y-3">
      <input
        type="text"
        placeholder="Location Name"
        value={locationName}
        onChange={(e) => setLocationName(e.target.value)}
        className="p-4 rounded-2xl active:border-black"
      />
      <input
        type="text"
        placeholder="Lattitude"
        value={lattitude}
        onChange={(e) => setLattitude(e.target.value)}
        className="p-4 rounded-2xl active:border-black"
      />
      <input
        type="text"
        placeholder="Longitude"
        value={longitude}
        onChange={(e) => setLongitude(e.target.value)}
        className="p-4 rounded-2xl active:border-black"
      />
      <input
        type="number"
        placeholder="Franchise ID"
        value={franchiseId}
        onChange={(e) => setFranchiseId(e.target.value)}
        className="p-4 rounded-2xl active:border-black"
      />
      <button type="submit" id="buttonParent" className="black">
          <div className="d-flex align-items-center justify-content-center p-4">
            Add Location
          </div>
        </button>
    </form>
  );
}
