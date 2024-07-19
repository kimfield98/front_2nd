import { CartItem, Product } from '../../../types';
import ProductItem from './ProductItem';

type ProductListProps = {
  products: Product[];
  cart: CartItem[];
  addToCart: (product: Product) => void;
};

const ProductList = ({ products, cart, addToCart }: ProductListProps) => {
  return (
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
  );
};

export default ProductList;
