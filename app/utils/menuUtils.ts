import {
  setCategories,
  setHours,
  setMenuItems,
  setModifications,
  setPopularItems,
} from "@/slices/menuSlice";
import { supabase } from "../supabase";

import { Dispatch } from "redux";
import {
  LocationData,
  LocationHoursData,
  MenuItemData,
  ModificationData,
  OrderedItemData,
  PopularityItem,
} from "../interfaces";
import { formatInTimeZone } from "date-fns-tz";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/lib/store";
import { isAfter, isBefore, isEqual, subMinutes } from "date-fns";
import { setLocations, LocationState } from "@/slices/locationSlice";
import { validatePromoCode } from "./databaseUtils";

export async function initializeMenu(dispatch: Dispatch) {
  try {
    const { data, error } = await supabase.from("category").select("*");
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
      .eq("franchise_id", process.env.NEXT_PUBLIC_FRANCHISE_ID!);
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

  // Fetches popular items
  try {
    const { data, error } = await supabase
      .from("popularity")
      .select(
        `
            item_id,
            total_quantity,
            items (
            *
            )
          `,
      )
      .eq("items.franchise_id", process.env.NEXT_PUBLIC_FRANCHISE_ID!)
      .order("total_quantity", { ascending: false }) // Order by total_quantity DESC
      .limit(3); // Limit to 3 rows

    if (error || !data) {
      throw new Error("Failed to fetch locations");
    } else {
      console.log("Dispatched popular items!");
      const popularItems = data.map((item: any) => ({
        ...item.items,
      }));

      dispatch(setPopularItems(popularItems));
    }
  } catch (err) {
    console.error(err);
    throw new Error("Failed to fetch popular items");
  }
}

export async function initializeHours(
  dispatch: Dispatch,
  locations: LocationData[],
  location_id: number | null,
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

export async function calculateCartPrice(
  cart: OrderedItemData[],
  promoCode?: string,
): Promise<number> {
  let amount = 0; // Base amount in cents
  try {
    // 1. Fetch item prices
    const itemIds = cart.map((item) => item.item_id);
    const { data: itemsData, error: itemsError } = await supabase
      .from("items")
      .select("item_id, price")
      .in("item_id", itemIds);

    if (itemsError) {
      throw new Error(
        `Supabase error fetching item prices: ${itemsError.message}`,
      );
    }
    if (!itemsData || itemsData.length === 0) {
      throw new Error("No items found for the given item IDs");
    }

    // Create a lookup for item prices (assumed to be in dollars)
    const itemPriceMap = new Map(
      itemsData.map((item: any) => [item.item_id, item.price]),
    );

    // 2. Fetch modification prices
    let modificationPriceMap = new Map<number, number>();
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
          `Supabase error fetching modification prices: ${modificationsError.message}`,
        );
      }
      if (!modificationsData || modificationsData.length === 0) {
        throw new Error(
          "No modifications found for the given modification IDs",
        );
      }

      // Create a lookup for modification prices (assumed to already be in cents)
      modificationPriceMap = new Map(
        modificationsData.map((mod: any) => [mod.modification_id, mod.price]),
      );
    }

    // 3. Calculate the base amount (subtotal) in cents
    for (const item of cart) {
      const price = itemPriceMap.get(item.item_id);
      if (price === undefined) {
        throw new Error(`Price not found for item ID: ${item.item_id}`);
      }
      // Convert dollars to cents and multiply by quantity
      amount += item.quantity * price * 100;

      // Add the modifications (assumed to be in cents)
      for (const mod of item.modifications) {
        const modPrice = modificationPriceMap.get(mod.modification_id);
        if (modPrice === undefined) {
          throw new Error(
            `Price not found for modification ID: ${mod.modification_id}`,
          );
        }
        amount += modPrice * item.quantity;
      }
    }

    // 4. Apply promotion if promoCode is provided
    let discount = 0;
    if (promoCode) {
      // Fetch the promotion record from the promotions table
      const { valid, promotion, message } = await validatePromoCode(promoCode);

      if (!valid) {
        console.error("Error fetching promotion:", message);
      } else if (promotion) {
        // Validate the promotion's eligibility (date check, etc.)
        if (promotion.promotion_type_id === 1) {
          //percentage
          discount = amount * (promotion.discount_value / 100);
        } else if (promotion.promotion_type_id === 2) {
          //fixed
          discount = promotion.discount_value;
        }
      }
    }

    // 5. Compute the final amount (ensure it never drops below zero)
    const finalAmount = Math.max(amount - discount, 0);
    return finalAmount;
  } catch (err: any) {
    console.error("Error calculating cart price:", err.message);
    throw new Error(`Error in calculateCartPrice: ${err.message}`);
  }
}

export function isClosed(
  time: Date,
  hours: LocationHoursData,
  forceClose: boolean | undefined,
): boolean {
  if (forceClose) {
    return true;
  }

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
    parseInt(openTimeStr!.split(":")[2]),
  );
  const closeTime = new Date(
    2025,
    1,
    1,
    parseInt(closeTimeStr!.split(":")[0]),
    parseInt(closeTimeStr!.split(":")[1]),
    parseInt(closeTimeStr!.split(":")[2]),
  );

  // Convert the input 'time' (which is in UTC from new Date()) to EST
  const timeInEst = formatInTimeZone(time, "America/New_York", "HH:mm:ss");
  const dateInEst = new Date(
    2025,
    1,
    1,
    parseInt(timeInEst.split(":")[0]),
    parseInt(timeInEst.split(":")[1]),
    parseInt(timeInEst.split(":")[2]),
  );

  // Check if the current time (in EST) is within the open interval [openDateEst, closeDateEst)
  const isAfterOpen =
    isAfter(dateInEst, openTime) || isEqual(dateInEst, openTime);
  const isBeforeClose = isBefore(dateInEst, closeTime);

  return !(isAfterOpen && isBeforeClose);
}
