import { Coupon } from '../../types.ts';
import { useState } from 'react';
import { addCouponToList } from './utils/cartUtils.ts';

export const useCoupons = (initialCoupons: Coupon[]) => {
  const [coupons, setCoupons] = useState<Coupon[]>(initialCoupons);

  const addCoupon = (newCoupon: Coupon) => {
    setCoupons((prevCoupons) => addCouponToList(prevCoupons, newCoupon));
  };

  return { coupons, addCoupon };
};
