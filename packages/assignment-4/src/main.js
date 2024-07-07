function main() {

  var productList = [
    {productId: 'p1', productName: '상품1', productPrice: 10000 },
    {productId: 'p2', productName: '상품2', productPrice: 20000 },
    {productId: 'p3', productName: '상품3', productPrice: 30000 }
  ];

  var app = document.getElementById('app');
  var body = document.createElement('div');
  var contentBox = document.createElement('div');
  var title = document.createElement('h1');
  var cartItems = document.createElement('div');
  var cartTotal = document.createElement('div');
  var select = document.createElement('select');
  var appendItemBtn = document.createElement('button');

  cartItems.id = 'cart-items';
  cartTotal.id = 'cart-total';
  select.id = 'product-select';
  appendItemBtn.id = 'add-to-cart';
  body.className = 'bg-gray-100 p-8';
  contentBox.className = 'max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl p-8';
  title.className = 'text-2xl font-bold mb-4';
  cartTotal.className = 'text-xl font-bold my-4';
  select.className = 'border rounded p-2 mr-2';
  appendItemBtn.className = 'bg-blue-500 text-white px-4 py-2 rounded';
  title.textContent = '장바구니';
  appendItemBtn.textContent = '추가';

  for (var j = 0; j < productList.length; j++) {
    var selectOption = document.createElement('option');
    selectOption.value = productList[j].productId;
    selectOption.textContent = productList[j].productName + ' - ' + productList[j].productPrice + '원';
    select.appendChild(selectOption);
  }

  contentBox.appendChild(title);
  contentBox.appendChild(cartItems);
  contentBox.appendChild(cartTotal);
  contentBox.appendChild(select);
  contentBox.appendChild(appendItemBtn);
  body.appendChild(contentBox);
  app.appendChild(body);

  function updateCartTotal() {
    var totalPrice = 0;
    var totalQuantity = 0;
    var items = cartItems.children;
    var originTotalPrice = 0;

    for (var m = 0; m < items.length; m++) {
      var item;
      for (var n = 0; n < productList.length; n++) {
        if (productList[n].productId === items[m].id) {
          item = productList[n];
          break;
        }
      }
      var quantity = parseInt(items[m].querySelector('span').textContent.split('x ')[1]);
      var itemTotal = item.productPrice * quantity;
      var discountRate = 0;

      totalQuantity += quantity;
      originTotalPrice += itemTotal;
      if (quantity >= 10) {
        if (item.productId === 'p1') discountRate = 0.1;
        else if (item.productId === 'p2') discountRate = 0.15;
        else if (item.productId === 'p3') discountRate = 0.2;
      }
      totalPrice += itemTotal * (1 - discountRate);
    }

    var totalDiscountRate = 0;
    if (totalQuantity >= 30) {
      var bulkDiscount = totalPrice * 0.25;
      var individualDiscount = originTotalPrice - totalPrice;
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
      var totalDiscountResult = document.createElement('span');
      totalDiscountResult.className = 'text-green-500 ml-2';
      totalDiscountResult.textContent = '(' + (totalDiscountRate * 100).toFixed(1) + '% 할인 적용)';
      cartTotal.appendChild(totalDiscountResult);
    }
  }

  appendItemBtn.onclick = function() {
    var selectedOption = select.value;
    var selectedItem;
    for (var i = 0; i < productList.length; i++) {
      if (productList[i].productId === selectedOption) {
        selectedItem = productList[i];
        break;
      }
    }
    if (selectedItem) {
      var selectedElement = document.getElementById(selectedItem.productId);
      if (selectedElement) {
        var quantity = parseInt(selectedElement.querySelector('span').textContent.split('x ')[1]) + 1;
        selectedElement.querySelector('span').textContent = selectedItem.productName + ' - ' + selectedItem.productPrice + '원 x ' + quantity;
      } else {
        var cartItemContainer = document.createElement('div');
        var cartItemInfoContainer = document.createElement('span');
        var btnContainer = document.createElement('div');
        var minusBtn = document.createElement('button');
        var plusBtn = document.createElement('button');
        var removeBtn = document.createElement('button');
        cartItemContainer.id = selectedItem.productId;
        cartItemContainer.className = 'flex justify-between items-center mb-2';
        cartItemInfoContainer.textContent = selectedItem.productName + ' - ' + selectedItem.productPrice + '원 x 1';
        minusBtn.className = 'quantity-change bg-blue-500 text-white px-2 py-1 rounded mr-1';
        minusBtn.textContent = '-';
        minusBtn.dataset.productId = selectedItem.productId;
        minusBtn.dataset.change = '-1';
        plusBtn.className = 'quantity-change bg-blue-500 text-white px-2 py-1 rounded mr-1';
        plusBtn.textContent = '+';
        plusBtn.dataset.productId = selectedItem.productId;
        plusBtn.dataset.change = '1';
        removeBtn.className = 'remove-item bg-red-500 text-white px-2 py-1 rounded';
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

  cartItems.onclick = function(event) {
    var target = event.target;
    if (target.classList.contains('quantity-change') || target.classList.contains('remove-item')) {
      var productId = target.dataset.productId;
      var cartItem = document.getElementById(productId);
      if (target.classList.contains('quantity-change')) {
        var change = parseInt(target.dataset.change);
        var quantity = parseInt(cartItem.querySelector('span').textContent.split('x ')[1]) + change;
        if (quantity > 0) {
          cartItem.querySelector('span').textContent = cartItem.querySelector('span').textContent.split('x ')[0] + 'x ' + quantity;
        } else {
          cartItem.remove();
        }
      } else if (target.classList.contains('remove-item')) {
        cartItem.remove();
      }
      updateCartTotal();
    }
  };
}

main();
