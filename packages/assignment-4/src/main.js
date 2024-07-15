function main() {
  const productList = [
    { productId: 'p1', productName: '상품1', productPrice: 10000 },
    { productId: 'p2', productName: '상품2', productPrice: 20000 },
    { productId: 'p3', productName: '상품3', productPrice: 30000 },
  ];

  const app = document.getElementById('app');
  const body = document.createElement('div');
  body.className = 'bg-gray-100 p-8';

  const contentBox = document.createElement('div');
  contentBox.className =
    'max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl p-8';

  contentBox.innerHTML = `
    <h1 class="text-2xl font-bold mb-4">장바구니</h1>
    <div id="cart-items"></div>
    <div id="cart-total" class="text-xl font-bold my-4"></div>
    <select id="product-select" class="border rounded p-2 mr-2"></select>
    <button id="add-to-cart" class="bg-blue-500 text-white px-4 py-2 rounded">추가</button>
  `;

  const cartItems = contentBox.querySelector('#cart-items');
  const cartTotal = contentBox.querySelector('#cart-total');
  const select = contentBox.querySelector('#product-select');
  const appendItemBtn = contentBox.querySelector('#add-to-cart');

  function addOptionToSelect(select, product) {
    const option = document.createElement('option');
    option.value = product.productId;
    option.textContent = `${product.productName} - ${product.productPrice}원`;
    select.appendChild(option);
  }

  function addItemToCart(cartItems, selectedItem) {
    const cartItemContainer = document.createElement('div');
    cartItemContainer.id = selectedItem.productId;
    cartItemContainer.className = 'flex justify-between items-center mb-2';
    cartItemContainer.innerHTML = `
      <span>${selectedItem.productName} - ${selectedItem.productPrice}원 x 1</span>
      <div>
        <button class="quantity-change bg-blue-500 text-white px-2 py-1 rounded mr-1" data-product-id="${selectedItem.productId}" data-change="-1">-</button>
        <button class="quantity-change bg-blue-500 text-white px-2 py-1 rounded mr-1" data-product-id="${selectedItem.productId}" data-change="1">+</button>
        <button class="remove-item bg-red-500 text-white px-2 py-1 rounded" data-product-id="${selectedItem.productId}">삭제</button>
      </div>
    `;
    cartItems.appendChild(cartItemContainer);
  }

  productList.forEach(product => addOptionToSelect(select, product));

  cartItems.onclick = function (event) {
    const target = event.target;
    if (
      target.classList.contains('quantity-change') ||
      target.classList.contains('remove-item')
    ) {
      const productId = target.dataset.productId;
      const cartItem = document.getElementById(productId);
      if (target.classList.contains('quantity-change')) {
        const change = parseInt(target.dataset.change);
        const quantity = parseInt(cartItem.querySelector('span').textContent.split('x ')[1]) + change;
        if (quantity > 0) {
          cartItem.querySelector('span').textContent =
            cartItem.querySelector('span').textContent.split('x ')[0] + 'x ' + quantity;
        } else {
          cartItem.remove();
        }
      } else if (target.classList.contains('remove-item')) {
        cartItem.remove();
      }
      updateCartTotal();
    }
  };

  function updateCartTotal() {
    let totalPrice = 0;
    let totalQuantity = 0;
    let originTotalPrice = 0;

    Array.from(cartItems.children).forEach(cartItem => {
      const item = productList.find(product => product.productId === cartItem.id);
      const quantity = parseInt(cartItem.querySelector('span').textContent.split('x ')[1]);
      const itemTotal = item.productPrice * quantity;
      let discountRate = 0;

      totalQuantity += quantity;
      originTotalPrice += itemTotal;
      if (quantity >= 10) {
        if (item.productId === 'p1') discountRate = 0.1;
        else if (item.productId === 'p2') discountRate = 0.15;
        else if (item.productId === 'p3') discountRate = 0.2;
      }
      totalPrice += itemTotal * (1 - discountRate);
    });

    let totalDiscountRate = 0;
    if (totalQuantity >= 30) {
      const bulkDiscount = totalPrice * 0.25;
      const individualDiscount = originTotalPrice - totalPrice;
      if (bulkDiscount > individualDiscount) {
        totalPrice = originTotalPrice * 0.75;
        totalDiscountRate = 0.25;
      } else {
        totalDiscountRate = (originTotalPrice - totalPrice) / originTotalPrice;
      }
    } else {
      totalDiscountRate = (originTotalPrice - totalPrice) / originTotalPrice;
    }

    cartTotal.textContent = '총액: ' + Math.round(totalPrice) + '원';
    if (totalDiscountRate > 0) {
      const totalDiscountResult = document.createElement('span');
      totalDiscountResult.className = 'text-green-500 ml-2';
      totalDiscountResult.textContent = `(${(totalDiscountRate * 100).toFixed(1)}% 할인 적용)`;
      cartTotal.appendChild(totalDiscountResult);
    }
  }

  appendItemBtn.onclick = function () {
    const selectedOption = select.value;
    const selectedItem = productList.find(product => product.productId === selectedOption);
    if (selectedItem) {
      const selectedElement = document.getElementById(selectedItem.productId);
      if (selectedElement) {
        const quantity = parseInt(selectedElement.querySelector('span').textContent.split('x ')[1]) + 1;
        selectedElement.querySelector('span').textContent =
          `${selectedItem.productName} - ${selectedItem.productPrice}원 x ${quantity}`;
      } else {
        addItemToCart(cartItems, selectedItem);
      }
      updateCartTotal();
    }
  };

  app.appendChild(body);
  body.appendChild(contentBox);
}

main();