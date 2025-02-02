import { useAppDispatch } from "@/lib/hooks";
import { setCategories, setHours, setMenuItems, setModifications } from "@/slices/menuSlice";
import { supabase } from "../supabase";

import { Dispatch } from "redux";
import { LocationHoursData, ModificationData } from "../interfaces";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store";
import { isAfter, isBefore, isEqual, subMinutes } from "date-fns";


export async function initializeMenu(dispatch: Dispatch, location_id: number) {
    
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

    // Fetches hours of operation
    try {
      const { data, error } = await supabase.from("locations").select("monday_open, monday_close, tuesday_open, tuesday_close, wednesday_open, wednesday_close, thursday_open, thursday_close, friday_open, friday_close, saturday_open, saturday_close, sunday_open, sunday_close")
        .eq("location_id", location_id).single();
      if (error || !data) {
        throw new Error("Failed to fetch hours of operation");
      } else {
        dispatch(setHours(data));
      }
    } catch (err) {
      console.error(err);
      throw new Error("Failed to fetch hours of operation");
    }
}

export function isClosed(time: Date, hours: LocationHoursData): boolean {
  const dayOfWeek = time.getDay(); // 0 (Sunday) to 6 (Saturday)
  const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
  const dayName = days[dayOfWeek];

  const openKey = `${dayName}_open` as keyof LocationHoursData;
  const closeKey = `${dayName}_close` as keyof LocationHoursData;

  const openTimeStr = hours[openKey];
  const closeTimeStr = hours[closeKey];

  // If there's no opening or closing time, the location is closed
  if (!openTimeStr || !closeTimeStr) {
    return true;
  }

  // Parse open and close times into hours, minutes, seconds
  const [openHours, openMinutes, openSeconds] = openTimeStr.split(':').map(Number);
  const [closeHours, closeMinutes, closeSeconds] = closeTimeStr.split(':').map(Number);

  // Create open and close dates based on the input time's date
  const openDate = new Date(time.getFullYear(), time.getMonth(), time.getDate(), openHours, openMinutes, openSeconds);
  let closeDate = new Date(time.getFullYear(), time.getMonth(), time.getDate(), closeHours, closeMinutes, closeSeconds);
  closeDate = subMinutes(closeDate, 15); //close 15 minutes before

  // Check if the current time is within the open interval [openDate, closeDate)
  const isAfterOpen = isAfter(time, openDate) || isEqual(time, openDate);
  const isBeforeClose = isBefore(time, closeDate);

  return !(isAfterOpen && isBeforeClose);
}