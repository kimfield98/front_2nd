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
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-6">
          {isAdmin ? '관리자 페이지' : '장바구니 페이지'}
        </h1>
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
      </div>
    </main>
  );
};

export default Main;
