export function createShoppingCart() {
  let items = [];

  function addItem(product, quantity = 1) {
    const existingItem = items.find((item) => item.product.id === product.id);
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      items.push({ product, quantity });
    }
  }

  function removeItem(productId) {
    items = items.filter((item) => item.product.id !== productId);
  }

  function updateQuantity(productId, quantity) {
    const item = items.find((item) => item.product.id === productId);
    if (item) {
      item.quantity = quantity;
      if (item.quantity <= 0) {
        removeItem(productId);
      }
    }
  }

  function getTotal() {
    const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0);
    const originTotalPrice = items.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0
    );
    const overallDiscountRate = totalQuantity >= 30 ? 0.25 : 0;
    const total = items.reduce((sum, item) => {
      const individualDiscountRate = getProductDiscountRate(
        item.product,
        item.quantity
      );
      const individualDiscountedPrice =
        item.product.price * (1 - individualDiscountRate);
      const overallDiscountedPrice =
        item.product.price * (1 - overallDiscountRate);
      const finalPrice = Math.min(
        individualDiscountedPrice,
        overallDiscountedPrice
      );
      return sum + finalPrice * item.quantity;
    }, 0);
    return { total, discountRate: 1 - total / originTotalPrice };
  }

  function getProductDiscountRate(product, quantity) {
    if (!product.discount) {
      return 0;
    }

    let discount = 0;
    product.discount.forEach((discountInfo) => {
      if (quantity >= discountInfo[0]) {
        discount = Math.max(discount, discountInfo[1]);
      }
    });
    return discount;
  }

  function getItems() {
    return items;
  }

  return {
    addItem,
    removeItem,
    updateQuantity,
    getTotal,
    getItems,
  };
}
