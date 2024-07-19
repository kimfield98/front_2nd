import { Product, Coupon } from '../../../types';

// 상품 관련
export const addProductToList = (
  products: Product[],
  newProduct: Product
): Product[] => {
  return [...products, newProduct];
};

export const updateProductInList = (
  products: Product[],
  updatedProduct: Product
): Product[] => {
  return products.map((product) =>
    product.id === updatedProduct.id ? updatedProduct : product
  );
};

// 쿠폰 관련
export const addCouponToList = (
  coupons: Coupon[],
  newCoupon: Coupon
): Coupon[] => {
  return [...coupons, newCoupon];
};
