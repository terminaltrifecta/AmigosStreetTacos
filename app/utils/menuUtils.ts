import {
  setCategories,
  setHours,
  setMenuItems,
  setModifications,
} from "@/slices/menuSlice";
import { supabase } from "../supabase";

import { Dispatch } from "redux";
import {
  LocationData,
  LocationHoursData,
  ModificationData,
  OrderedItemData,
} from "../interfaces";
import { formatInTimeZone } from "date-fns-tz";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/lib/store";
import { isAfter, isBefore, isEqual, subMinutes } from "date-fns";
import { setLocations, LocationState } from "@/slices/locationSlice";

export async function initializeMenu(dispatch: Dispatch) {
  try {
    const { data, error } = await supabase
      .from("category")
      .select("*")
      //.eq("franchise_id", process.env.NEXT_PUBLIC_FRANCHISE_ID!);
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
    const { data, error } = await supabase
      .from("items")
      .select("*")
      .eq("franchise_id", process.env.NEXT_PUBLIC_FRANCHISE_ID!);
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

  // Fetches locations
  try {
    const { data, error } = await supabase
      .from("locations")
      .select("*")
      .eq("franchise_id", process.env.NEXT_PUBLIC_FRANCHISE_ID!)
    if (error || !data) {
      throw new Error("Failed to fetch locations");
    } else {
      console.log("dispatched locations!");
      dispatch(setLocations(data));
    }
  } catch (err) {
    console.error(err);
    throw new Error("Failed to fetch locations");
  }
}

export async function initializeHours(
  dispatch: Dispatch,
  locations: LocationData[],
  location_id: number | null
) {
  const location = locations.find((loc) => loc.location_id === location_id);
  if (!location) {
    throw new Error("Location not found in Redux store");
  } else {
    // Extract hours from location object
    const hoursData: LocationHoursData = {
      monday_open: location.monday_open,
      monday_close: location.monday_close,
      tuesday_open: location.tuesday_open,
      tuesday_close: location.tuesday_close,
      wednesday_open: location.wednesday_open,
      wednesday_close: location.wednesday_close,
      thursday_open: location.thursday_open,
      thursday_close: location.thursday_close,
      friday_open: location.friday_open,
      friday_close: location.friday_close,
      saturday_open: location.saturday_open,
      saturday_close: location.saturday_close,
      sunday_open: location.sunday_open,
      sunday_close: location.sunday_close,
    };
    dispatch(setHours(hoursData));
  }
}

export async function calculateCartPrice(cart: OrderedItemData[]) {
  let amount = 0; // Base amount

  try {
    // Fetch all item prices and modifications in a single query
    const itemIds = cart.map((item) => item.item_id);
    const { data: itemsData, error: itemsError } = await supabase
      .from("items")
      .select("item_id, price")
      .in("item_id", itemIds);

    if (itemsError) {
      throw new Error(
        `Supabase error fetching item prices: ${itemsError.message}`
      );
    }

    if (!itemsData || itemsData.length === 0) {
      throw new Error("No items found for the given item IDs");
    }

    // Create a map of item prices for quick lookup
    const itemPriceMap = new Map(
      itemsData.map((item) => [item.item_id, item.price])
    );
    let modificationPriceMap = new Map<number, number>();

    // Fetch all modification prices in a single query
    const modificationIds = cart
      .flatMap((item) => item.modifications || [])
      .map((mod) => mod.modification_id);

    if (modificationIds.length > 0) {
      const { data: modificationsData, error: modificationsError } =
        await supabase
          .from("modifications")
          .select("modification_id, price")
          .in("modification_id", modificationIds);

      if (modificationsError) {
        throw new Error(
          `Supabase error fetching modification prices: ${modificationsError.message}`
        );
      }

      if (!modificationsData || modificationsData.length === 0) {
        throw new Error(
          "No modifications found for the given modification IDs"
        );
      }

      // Create a map of modification prices for quick lookup
      modificationPriceMap = new Map(
        modificationsData.map((mod) => [mod.modification_id, mod.price])
      );
    }

    // Calculate the total amount
    for (const item of cart) {
      const price = itemPriceMap.get(item.item_id);
      if (price === undefined) {
        throw new Error(`Price not found for item ID: ${item.item_id}`);
      }
      amount += item.quantity * price * 100;

      for (const mod of item.modifications) {
        const modPrice = modificationPriceMap.get(mod.modification_id);
        if (modPrice === undefined) {
          throw new Error(
            `Price not found for modification ID: ${mod.modification_id}`
          );
        }
        amount += modPrice * item.quantity;
      }
    }

    return amount;
  } catch (err: any) {
    console.error("Error calculating cart price:", err.message);
    throw new Error(`Error in calculateCartPrice: ${err.message}`);
  }
}

export function isClosed(time: Date, hours: LocationHoursData): boolean {
  const dayOfWeek = time.getDay(); // 0 (Sunday) to 6 (Saturday)
  const days = [
    "sunday",
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
  ];
  const dayName = days[dayOfWeek];

  const openKey = `${dayName}_open` as keyof LocationHoursData;
  const closeKey = `${dayName}_close` as keyof LocationHoursData;

  const openTimeStr = hours[openKey];
  const closeTimeStr = hours[closeKey];

  // If there's no opening or closing time, the location is closed
  if (!openTimeStr || !closeTimeStr) {
    return true;
  }

  const openTime = new Date(
    2025,
    1,
    1,
    parseInt(openTimeStr!.split(":")[0]),
    parseInt(openTimeStr!.split(":")[1]),
    parseInt(openTimeStr!.split(":")[2])
  );
  const closeTime = new Date(
    2025,
    1,
    1,
    parseInt(closeTimeStr!.split(":")[0]),
    parseInt(closeTimeStr!.split(":")[1]),
    parseInt(closeTimeStr!.split(":")[2])
  );

  // Convert the input 'time' (which is in UTC from new Date()) to EST
  const timeInEst = formatInTimeZone(time, "America/New_York", "HH:mm:ss");
  const dateInEst = new Date(
    2025,
    1,
    1,
    parseInt(timeInEst.split(":")[0]),
    parseInt(timeInEst.split(":")[1]),
    parseInt(timeInEst.split(":")[2])
  );

  // Check if the current time (in EST) is within the open interval [openDateEst, closeDateEst)
  const isAfterOpen =
    isAfter(dateInEst, openTime) || isEqual(dateInEst, openTime);
  const isBeforeClose = isBefore(dateInEst, closeTime);

  return !(isAfterOpen && isBeforeClose);
}
