import { Coupon, Product } from '../../types.ts';
import { useCart } from '../hooks/useCart.ts';
import CouponApply from './cart/CouponApply.tsx';
import OrderSummary from './cart/OrderSummary.tsx';
import ProductList from './cart/ProductList.tsx';
import CartList from './cart/CartList.tsx';

interface Props {
  products: Product[];
  coupons: Coupon[];
}

export const CartPage = ({ products, coupons }: Props) => {
  const {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    applyCoupon,
    selectedCoupon,
    totalBeforeDiscount,
    totalAfterDiscount,
    totalDiscount,
  } = useCart();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <ProductList products={products} cart={cart} addToCart={addToCart} />
      <CartList
        cart={cart}
        updateQuantity={updateQuantity}
        removeFromCart={removeFromCart}
      />

      <div className="mt-6 bg-white p-4 rounded shadow">
        <h2 className="text-2xl font-semibold mb-2">쿠폰 적용</h2>
        <CouponApply
          coupons={coupons}
          selectedCoupon={selectedCoupon}
          applyCoupon={applyCoupon}
        />
      </div>

      <div className="mt-6 bg-white p-4 rounded shadow">
        <h2 className="text-2xl font-semibold mb-2">주문 요약</h2>
        <OrderSummary
          totalBeforeDiscount={totalBeforeDiscount}
          totalAfterDiscount={totalAfterDiscount}
          totalDiscount={totalDiscount}
        />
      </div>
    </div>
  );
};
