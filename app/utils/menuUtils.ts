import { useAppDispatch } from "@/lib/hooks";
import { setCategories, setMenuItems, setModifications } from "@/slices/menuSlice";
import { supabase } from "../supabase";

import { Dispatch } from "redux";
import { ModificationData } from "../interfaces";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store";


export async function initializeMenu(dispatch: Dispatch) {
    
    // Fetches menu categories
    try {
      const { data, error } = await supabase.from("category").select("*");
      if (error || !data) {
        throw new Error("Failed to fetch menu categories");
      } else {
        dispatch(setCategories(data));
      }
    } catch (err) {
      console.error(err);
      throw new Error("Failed to fetch menu categories");
    }

    // Fetches menu items
    try {
      const { data, error } = await supabase.from("items").select("*");
      if (error || !data) {
        throw new Error("Failed to fetch menu items");
      } else {
        dispatch(setMenuItems(data));
      }
    } catch (err) {
      console.error(err);
      throw new Error("Failed to fetch menu items");
    }

    // Fetches modifications
    try {
      const { data, error } = await supabase
        .from("modifications")
        .select("*")
        .eq("location_id", 2);
      if (error || !data) {
        throw new Error("Failed to fetch modifications");
      } else {
        dispatch(setModifications(data));
      }
    } catch (err) {
      console.error(err);
      throw new Error("Failed to fetch modifications");
    }
}