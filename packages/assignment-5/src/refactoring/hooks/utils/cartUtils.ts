import { CartItem, Coupon } from '../../../types';

export const calculateItemTotal = (item: CartItem): number => {
  const discountRate = getMaxApplicableDiscount(item);
  return item.product.price * item.quantity * (1 - discountRate);
};

export const getMaxApplicableDiscount = (item: CartItem): number => {
  const applicableDiscount = item.product.discounts
    .filter((discount) => item.quantity >= discount.quantity)
    .reduce((max, discount) => Math.max(max, discount.rate), 0);
  return applicableDiscount;
};

export const calculateCartTotal = (
  cart: CartItem[],
  selectedCoupon: Coupon | null
) => {
  const totalBeforeDiscount = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const totalDiscount = cart.reduce((sum, item) => {
    const itemTotal = item.product.price * item.quantity;
    const itemDiscount = itemTotal * getMaxApplicableDiscount(item);
    return sum + itemDiscount;
  }, 0);

  const discountAfterItems = selectedCoupon
    ? selectedCoupon.discountType === 'amount'
      ? selectedCoupon.discountValue
      : (totalBeforeDiscount - totalDiscount) *
        (selectedCoupon.discountValue / 100)
    : 0;

  const totalAfterDiscount =
    totalBeforeDiscount - totalDiscount - discountAfterItems;

  return {
    totalBeforeDiscount,
    totalDiscount: totalDiscount + discountAfterItems,
    totalAfterDiscount,
  };
};

export const updateCartItemQuantity = (
  cart: CartItem[],
  productId: string,
  newQuantity: number
): CartItem[] => {
  return cart
    .map((item) =>
      item.product.id === productId
        ? { ...item, quantity: Math.min(newQuantity, item.product.stock) }
        : item
    )
    .filter((item) => item.quantity > 0);
};
