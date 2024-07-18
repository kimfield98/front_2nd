import { useCouponsData, useProductsData } from '../hooks/useApp';
import { initialCoupons } from '../mock/initialCoupons';
import { initialProducts } from '../mock/initialProducts';
import { AdminPage } from './AdminPage';
import { CartPage } from './CartPage';

type MainProps = {
  isAdmin: boolean;
};

const Main: React.FC<MainProps> = ({ isAdmin }) => {
  const { products, updateProduct, addProduct } =
    useProductsData(initialProducts);
  const { coupons, addCoupon } = useCouponsData(initialCoupons);

  return (
    <main className="container mx-auto mt-6">
      {isAdmin ? (
        <AdminPage
          products={products}
          coupons={coupons}
          onProductUpdate={updateProduct}
          onProductAdd={addProduct}
          onCouponAdd={addCoupon}
        />
      ) : (
        <CartPage products={products} coupons={coupons} />
      )}
    </main>
  );
};

export default Main;
