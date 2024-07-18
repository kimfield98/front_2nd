// useCart.ts
import { useState } from 'react';
import { CartItem, Coupon, Product } from '../../../../types';
import {
  addItemToCart,
  calculateCartTotal,
  removeItemFromCart,
  updateCartItemQuantity,
} from '../../../hooks/utils/cartUtils';

export const useCart = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedCoupon, setSelectedCoupon] = useState<Coupon | null>(null);

  // 장바구니 아이템 관련
  const addToCart = (product: Product) => {
    setCart((prevCart) => addItemToCart(prevCart, product));
  };

  const removeFromCart = (productId: string) => {
    setCart((prevCart) => removeItemFromCart(prevCart, productId));
  };

  const updateQuantity = (productId: string, newQuantity: number) => {
    setCart((prevCart) =>
      updateCartItemQuantity(prevCart, productId, newQuantity)
    );
  };

  // 쿠폰 관련
  const applyCoupon = (coupon: Coupon) => {
    setSelectedCoupon(coupon);
  };

  const checkAndApplyCoupon = (
    e: React.ChangeEvent<HTMLSelectElement>,
    coupons: Coupon[]
  ) => {
    const selectedIndex = parseInt(e.target.value);
    if (cart.length === 0) {
      alert('장바구니에 상품이 있어야 쿠폰을 적용할 수 있습니다.');
      return;
    }
    if (!isNaN(selectedIndex) && selectedIndex >= 0) {
      applyCoupon(coupons[selectedIndex]);
    }
  };

  // 총 금액 관련
  const calculateTotal = () => {
    return calculateCartTotal(cart, selectedCoupon);
  };

  const { totalBeforeDiscount, totalAfterDiscount, totalDiscount } =
    calculateTotal();

  const cartItemsCount = cart.length;

  return {
    cart,
    cartItemsCount,
    addToCart,
    removeFromCart,
    updateQuantity,
    applyCoupon,
    calculateTotal,
    checkAndApplyCoupon,
    selectedCoupon,
    totalBeforeDiscount,
    totalAfterDiscount,
    totalDiscount,
  };
};
