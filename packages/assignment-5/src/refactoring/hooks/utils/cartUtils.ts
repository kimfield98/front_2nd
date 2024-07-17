import { CartItem, Coupon, Product } from '../../../types';

// 할인 계산 관련
export const calculateItemTotal = (item: CartItem): number => {
  const discountRate = getMaxApplicableDiscount(item);
  return item.product.price * item.quantity * (1 - discountRate);
};

export const getMaxDiscount = (
  discounts: { quantity: number; rate: number }[]
) => {
  return discounts.reduce((max, discount) => Math.max(max, discount.rate), 0);
};

export const getMaxApplicableDiscount = (item: CartItem): number => {
  const applicableDiscount = item.product.discounts
    .filter((discount) => item.quantity >= discount.quantity)
    .reduce((max, discount) => Math.max(max, discount.rate), 0);
  return applicableDiscount;
};

export const getAppliedDiscount = (item: CartItem) => {
  const { discounts } = item.product;
  const { quantity } = item;
  let appliedDiscount = 0;
  for (const discount of discounts) {
    if (quantity >= discount.quantity) {
      appliedDiscount = Math.max(appliedDiscount, discount.rate);
    }
  }
  return appliedDiscount;
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

// 장바구니 아이템 관련
export const addItemToCart = (
  cart: CartItem[],
  product: Product
): CartItem[] => {
  const existingItem = cart.find((item) => item.product.id === product.id);
  if (existingItem) {
    return updateCartItemQuantity(cart, product.id, existingItem.quantity + 1);
  }
  return [...cart, { product, quantity: 1 }];
};

export const removeItemFromCart = (
  cart: CartItem[],
  productId: string
): CartItem[] => {
  return cart.filter((item) => item.product.id !== productId);
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

// 제품 리스트 관련
export const updateProductInList = (
  products: Product[],
  updatedProduct: Product
): Product[] => {
  return products.map((product) =>
    product.id === updatedProduct.id ? updatedProduct : product
  );
};

export const addProductToList = (
  products: Product[],
  newProduct: Product
): Product[] => {
  return [...products, newProduct];
};

// 쿠폰 관련
export const addCouponToList = (
  coupons: Coupon[],
  newCoupon: Coupon
): Coupon[] => {
  return [...coupons, newCoupon];
};

// 재고 확인
export const getRemainingStock = (product: Product, cart: CartItem[]) => {
  const cartItem = cart.find((item) => item.product.id === product.id);
  return product.stock - (cartItem?.quantity || 0);
};