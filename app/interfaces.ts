//interface for each item in the cart
export interface ItemData {
    item_name: string;
    item_id: number;
    quantity: number;
    comments: string;
  }
  
//interface for the entire order data
export interface PostData {
    customer_first_name: string;
    customer_last_name: string;
    email: string;
    phone_number: number;
    location_id: number;
    time_placed: Date;
    time_requested: Date | null;
    location: string | null;
    is_pickup: boolean;
    status_id: number;
    cart: ItemData[];
    customer_id: number;
}

export interface CustomerData {
    customer_id: number,
    first_name: string,
    last_name: string,
    email: string,
    points: number,
    phone_number: number
}