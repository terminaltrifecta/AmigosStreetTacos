import { PromotionData } from "../interfaces";
import { supabase } from "../supabase";

interface PromoValidationResult {
  valid: boolean;
  message?: string;
  promotion?: PromotionData;
}

export async function validatePromoCode(
  promoCode: string,
  locationId?: number,
  itemIds?: number[]
): Promise<PromoValidationResult> {
  const currentDate = new Date().toISOString();

  const { data: promo, error } = await supabase
    .from("promotions")
    .select("*")
    .eq("name", promoCode)
    .eq("franchise_id", process.env.NEXT_PUBLIC_FRANCHISE_ID!)
    .lte("start_date", currentDate)
    .gte("end_date", currentDate)
    .order("start_date", { ascending: false }) // Ensures we get the most recent active promo
    .limit(1)
    .single();

  if (error || !promo) {
    return { valid: false, message: error?.message || "Invalid or expired promo code." };
  }

  if (promo.location_id && promo.location_id !== locationId) {
    return { valid: false, message: "This promo code is not valid at this location." };
  }
  if (promo.item_id && (!itemIds || !itemIds.includes(promo.item_id))) {
    return { valid: false, message: "This promo code does not apply to the selected items." };
  }
  if (!promo.promotion_type_id || promo.discount_value <= 0) {
    return { valid: false, message: "Invalid promotion details." };
  }

  return { valid: true, message: "Promo code applied successfully!", promotion: promo };
}