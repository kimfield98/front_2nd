import { CartItem, CartTotal } from './templates.js';

export function createCartView(cart) {
  const cartItemsContainer = document.querySelector('#cart-items');
  const cartTotalContainer = document.querySelector('#cart-total');

  function render() {
    const items = cart.getItems();
    cartItemsContainer.innerHTML = items.map(CartItem).join('');
    const { total, discountRate } = cart.getTotal();
    cartTotalContainer.innerHTML = CartTotal({ total, discountRate });
  }

  return {
    render
  };
}