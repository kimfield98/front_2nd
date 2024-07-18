import { Coupon, Product } from '../../types.ts';
import { useCart } from './cart/hooks/useCart.ts';
import CouponApply from './cart/CouponApply.tsx';
import OrderSummary from './cart/OrderSummary.tsx';
import ProductList from './cart/ProductList.tsx';
import CartList from './cart/CartList.tsx';

type Props = {
  products: Product[];
  coupons: Coupon[];
};

const CartPage = ({ products, coupons }: Props) => {
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
      <div>
        <CartList
          cart={cart}
          updateQuantity={updateQuantity}
          removeFromCart={removeFromCart}
        />
        <CouponApply
          coupons={coupons}
          selectedCoupon={selectedCoupon}
          applyCoupon={applyCoupon}
        />
        <OrderSummary
          totalBeforeDiscount={totalBeforeDiscount}
          totalAfterDiscount={totalAfterDiscount}
          totalDiscount={totalDiscount}
        />
      </div>
    </div>
  );
};

export default CartPage;
