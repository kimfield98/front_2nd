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

  const title = document.createElement('h1');
  title.className = 'text-2xl font-bold mb-4';
  title.textContent = '장바구니';

  const cartItems = document.createElement('div');
  cartItems.id = 'cart-items';

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
        const quantity =
          parseInt(cartItem.querySelector('span').textContent.split('x ')[1]) +
          change;
        if (quantity > 0) {
          cartItem.querySelector('span').textContent =
            cartItem.querySelector('span').textContent.split('x ')[0] +
            'x ' +
            quantity;
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
    const items = cartItems.children;
    let originTotalPrice = 0;

    for (let m = 0; m < items.length; m++) {
      let item;
      for (let n = 0; n < productList.length; n++) {
        if (productList[n].productId === items[m].id) {
          item = productList[n];
          break;
        }
      }
      const quantity = parseInt(
        items[m].querySelector('span').textContent.split('x ')[1]
      );
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
    }

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
      totalDiscountResult.textContent =
        '(' + (totalDiscountRate * 100).toFixed(1) + '% 할인 적용)';
      cartTotal.appendChild(totalDiscountResult);
    }
  }

  const cartTotal = document.createElement('div');
  cartTotal.id = 'cart-total';
  cartTotal.className = 'text-xl font-bold my-4';

  const select = document.createElement('select');
  select.id = 'product-select';
  select.className = 'border rounded p-2 mr-2';

  for (let j = 0; j < productList.length; j++) {
    const selectOption = document.createElement('option');
    selectOption.value = productList[j].productId;
    selectOption.textContent =
      productList[j].productName + ' - ' + productList[j].productPrice + '원';
    select.appendChild(selectOption);
  }

  const appendItemBtn = document.createElement('button');
  appendItemBtn.id = 'add-to-cart';
  appendItemBtn.className = 'bg-blue-500 text-white px-4 py-2 rounded';
  appendItemBtn.textContent = '추가';

  appendItemBtn.onclick = function () {
    const selectedOption = select.value;
    let selectedItem;
    for (let i = 0; i < productList.length; i++) {
      if (productList[i].productId === selectedOption) {
        selectedItem = productList[i];
        break;
      }
    }
    if (selectedItem) {
      const selectedElement = document.getElementById(selectedItem.productId);
      if (selectedElement) {
        const quantity =
          parseInt(
            selectedElement.querySelector('span').textContent.split('x ')[1]
          ) + 1;
        selectedElement.querySelector('span').textContent =
          selectedItem.productName +
          ' - ' +
          selectedItem.productPrice +
          '원 x ' +
          quantity;
      } else {
        const cartItemContainer = document.createElement('div');
        const cartItemInfoContainer = document.createElement('span');
        const btnContainer = document.createElement('div');
        const minusBtn = document.createElement('button');
        const plusBtn = document.createElement('button');
        const removeBtn = document.createElement('button');
        cartItemContainer.id = selectedItem.productId;
        cartItemContainer.className = 'flex justify-between items-center mb-2';
        cartItemInfoContainer.textContent =
          selectedItem.productName +
          ' - ' +
          selectedItem.productPrice +
          '원 x 1';
        minusBtn.className =
          'quantity-change bg-blue-500 text-white px-2 py-1 rounded mr-1';
        minusBtn.textContent = '-';
        minusBtn.dataset.productId = selectedItem.productId;
        minusBtn.dataset.change = '-1';
        plusBtn.className =
          'quantity-change bg-blue-500 text-white px-2 py-1 rounded mr-1';
        plusBtn.textContent = '+';
        plusBtn.dataset.productId = selectedItem.productId;
        plusBtn.dataset.change = '1';
        removeBtn.className =
          'remove-item bg-red-500 text-white px-2 py-1 rounded';
        removeBtn.textContent = '삭제';
        removeBtn.dataset.productId = selectedItem.productId;
        btnContainer.appendChild(minusBtn);
        btnContainer.appendChild(plusBtn);
        btnContainer.appendChild(removeBtn);
        cartItemContainer.appendChild(cartItemInfoContainer);
        cartItemContainer.appendChild(btnContainer);
        cartItems.appendChild(cartItemContainer);
      }
      updateCartTotal();
    }
  };

  app.appendChild(body);
  body.appendChild(contentBox);
  contentBox.appendChild(title);
  contentBox.appendChild(cartItems);
  contentBox.appendChild(cartTotal);
  contentBox.appendChild(select);
  contentBox.appendChild(appendItemBtn);
}

main();
