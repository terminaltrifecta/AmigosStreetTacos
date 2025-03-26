import { PromotionData } from "../interfaces";

interface promoValidationResult {
  valid: boolean;
  message?: string;
  promotion?: PromotionData;
}

export function validatePromoCode(
  promoCode: string,
  promotions: PromotionData[], // Redux state promotions
  locationId?: number,
  itemIds?: number[]
): promoValidationResult {
  // Find the promotion by name
  const promo = promotions.find((p) => p.name === promoCode);
  console.log("promo", promo);

  if (!promo) {
    return { valid: false, message: "Invalid promo code." };
  }

  const currentDate = new Date().toISOString();

  // Check if the promotion is active
  if (promo.start_date > currentDate || promo.end_date < currentDate) {
    return {
      valid: false,
      message: "Promo code is expired or not yet active.",
    };
  }

  // Check if the promotion is specific to a location
  if (promo.location_id && promo.location_id !== locationId) {
    return {
      valid: false,
      message: "This promo code is not valid at this location.",
    };
  }

  // Check if the promotion applies to specific items
  if (promo.item_id && (!itemIds || !itemIds.includes(promo.item_id))) {
    return {
      valid: false,
      message: "This promo code does not apply to the selected items.",
    };
  }

  // Ensure the discount type and value are valid
  if (!promo.promotion_type_id || promo.discount_value <= 0) {
    return { valid: false, message: "Invalid promotion details." };
  }

  // If all checks pass, return the promo details
  return {
    valid: true,
    message: "Promo code applied successfully!",
    promotion: promo,
  };
}
