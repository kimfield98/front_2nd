import { useState } from 'react';
import { Coupon, Product } from '../../types';
import { useProducts } from './useProduct';
import { useCoupons } from './useCoupon';

export const useAdminToggle = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const toggleAdmin = () => setIsAdmin(!isAdmin);
  return { isAdmin, toggleAdmin };
};

export const useProductsData = (initialProducts: Product[]) => {
  const { products, updateProduct, addProduct } = useProducts(initialProducts);
  return { products, updateProduct, addProduct };
};

export const useCouponsData = (initialCoupons: Coupon[]) => {
  const { coupons, addCoupon } = useCoupons(initialCoupons);
  return { coupons, addCoupon };
};
