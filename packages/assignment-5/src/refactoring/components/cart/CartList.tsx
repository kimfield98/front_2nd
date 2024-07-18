import { CartItem } from '../../../types';
import CartItemComponent from './CartItem';

type CartListProps = {
  cart: CartItem[];
  updateQuantity: (productId: string, newQuantity: number) => void;
  removeFromCart: (productId: string) => void;
};
const CartList = ({ cart, updateQuantity, removeFromCart }: CartListProps) => {
  return (
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
    </div>
  );
};

export default CartList;
