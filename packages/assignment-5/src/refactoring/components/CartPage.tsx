import { Coupon, Product } from '../../types.ts';
import { useCart } from '../hooks/useCart.ts';
import CouponApply from './cart/CouponApply.tsx';
import CartItemComponent from './cart/CartItem.tsx';
import ProductItem from './cart/ProductItem.tsx';
import OrderSummary from './cart/OrderSummary.tsx';

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
      <div>
        <h2 className="text-2xl font-semibold mb-4">상품 목록</h2>
        <div className="space-y-2">
          {products.map((product) => (
            <ProductItem
              key={product.id}
              product={product}
              cart={cart}
              addToCart={() => addToCart(product)}
            />
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-semibold mb-4">장바구니 내역</h2>
        <div className="space-y-2">
          {cart.map((item) => (
            <CartItemComponent
              key={item.product.id}
              item={item}
              updateQuantity={updateQuantity}
              removeFromCart={removeFromCart}
            />
          ))}
        </div>

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
    </div>
  );
};
