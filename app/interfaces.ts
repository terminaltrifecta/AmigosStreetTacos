import { Json } from "@/database.types";

//interface for each item in the cart
export interface OrderedItemData {
  item_name: string;
  item_id: number;
  price: number;
  quantity: number;
  modifications: ModificationData[];
  comments: string;
}

//interface for each modification in the cart
export interface ModificationData {
  modification_id: number;
  modification: string;
  location_id: number;
  price: number;
  category_id: number;
  item_id: number;
}

//interface for items table in supabase
export interface MenuItemData {
  item_id: number;
  franchise_id: number;
  name: string;
  price: number;
  ingredients: any; // or a more specific type if known
  status_id: number;
  category_id: number;
}

//interface for the categories table in supabase
export interface CategoryData {
  category_id: number;
  name: string;
  location_id: number;
}

//interface for the entire order data
export interface PostData {
  customer_first_name: string;
  customer_last_name: string;
  email: string;
  phone_number: number | null;
  location_id: number;
  time_requested: number | null;
  location: string | null;
  is_pickup: boolean;
  status_id: number;
  cart: OrderedItemData[];
  customer_id: number;
}

export interface CustomerData {
  customer_id: number;
  first_name: string;
  last_name: string;
  email: string;
  points: number;
  phone_number: number;
}

export interface LocationHoursData {
  monday_open: string | null;
  monday_close: string | null;
  tuesday_open: string | null;
  tuesday_close: string | null;
  wednesday_open: string | null;
  wednesday_close: string | null;
  thursday_open: string | null;
  thursday_close: string | null;
  friday_open: string | null;
  friday_close: string | null;
  saturday_open: string | null;
  saturday_close: string | null;
  sunday_open: string | null;
  sunday_close: string | null;
}

export interface LocationData {
  force_close: boolean;
  franchise_id: number;
  friday_close: string | null;
  friday_open: string | null;
  location: unknown;
  location_id: number;
  location_name: string | null;
  monday_close: string | null;
  monday_open: string | null;
  saturday_close: string | null;
  saturday_open: string | null;
  schedule: any;
  sunday_close: string | null;
  sunday_open: string | null;
  thursday_close: string | null;
  thursday_open: string | null;
  tuesday_close: string | null;
  tuesday_open: string | null;
  user_id: string | null;
  wednesday_close: string | null;
  wednesday_open: string | null;
}
