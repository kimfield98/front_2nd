import { createShoppingCart } from './createShoppingCart.js';
import { MainLayout } from './templates.js';
import { createCartView } from './createCartView.js';

const products = [
  { id: 'p1', name: '상품1', price: 10000, discount: [[10, 0.1]] },
  { id: 'p2', name: '상품2', price: 20000, discount: [[10, 0.15]] },
  { id: 'p3', name: '상품3', price: 30000, discount: [[10, 0.2]] }
];

const cart = createShoppingCart();
const app = document.querySelector('#app');
app.innerHTML = MainLayout({ items: products });

const cartView = createCartView(cart);

document.querySelector('#add-to-cart').addEventListener('click', () => {
  const select = document.querySelector('#product-select');
  const product = products.find(p => p.id === select.value);
  cart.addItem(product);
  cartView.render();
});

document.addEventListener('click', (e) => {
  if (e.target.classList.contains('quantity-change')) {
    const productId = e.target.dataset.productId;
    const change = parseInt(e.target.dataset.change);
    const item = cart.getItems().find(item => item.product.id === productId);
    cart.updateQuantity(productId, item.quantity + change);
    cartView.render();
  }

  if (e.target.classList.contains('remove-item')) {
    const productId = e.target.dataset.productId;
    cart.removeItem(productId);
    cartView.render();
  }
});