import { Json } from "@/database.types";

export interface CartState {
  value: OrderedItemData[];
}

export interface PopularityItem {
  item_id: number;
  total_quantity: number;
  items: MenuItemData; // Matches the items table structure
}

//Interface for promotions
export interface PromotionData {
  id: number; // Unique identifier for the promotion
  name: string; // Promo code (e.g., "SUMMER50")
  description?: string; // Optional human-readable description of the promo
  promotion_type_id: number; // Type of discount
  discount_value: number; // Value of the discount (percentage or fixed amount)
  start_date: string; // ISO string format (e.g., "2025-03-08T00:00:00Z")
  end_date: string; // ISO string format
  franchise_id?: number; // Nullable: If set, applies to all locations under this franchise
  location_id?: number; // Nullable: If set, applies to this specific location
  item_id?: number; // Nullable: If set, applies to this specific item
  customer_id?: number; // Nullable: If set, applies only to this customer
}

//Interface for promotions
export interface PromotionTypes {
  id: number; // Unique identifier for the promotion
  promotion_type_id: "percentage" | "fixed"; // Type of discount
}

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
  phone_number: string | null;
  location_id: number;
  time_requested: number | null;
  location: string | null;
  is_pickup: boolean;
  status_id: number;
  cart: OrderedItemData[];
  customer_id: number;
  promotion_id: number | null;
}

export interface CustomerData {
  customer_id: number;
  first_name: string;
  last_name: string;
  email: string;
  points: number;
  phone_number: string;
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
