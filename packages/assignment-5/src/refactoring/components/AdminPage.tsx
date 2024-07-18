import { Coupon, Product } from '../../types';
import { useAdmin } from './admin/hooks/useAdmin';
import ProductForm from './admin/ProductForm';
import ProductItem from './admin/ProductItem';

type Props = {
  products: Product[];
  coupons: Coupon[];
  onProductUpdate: (updatedProduct: Product) => void;
  onProductAdd: (newProduct: Product) => void;
  onCouponAdd: (newCoupon: Coupon) => void;
};

const AdminPage = ({
  products,
  coupons,
  onProductUpdate,
  onProductAdd,
  onCouponAdd,
}: Props) => {
  const {
    openProductIds,
    editingProduct,
    newDiscount,
    newCoupon,
    showNewProductForm,
    newProduct,
    toggleProductAccordion,
    handleEditProduct,
    handleProductNameUpdate,
    handlePriceUpdate,
    handleStockUpdate,
    handleEditComplete,
    handleAddDiscount,
    handleRemoveDiscount,
    handleAddCoupon,
    handleAddNewProduct,
    setShowNewProductForm,
    setNewProduct,
    setNewDiscount,
    setNewCoupon,
  } = useAdmin({
    products,
    coupons,
    onProductUpdate,
    onProductAdd,
    onCouponAdd,
  });

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <h2 className="text-2xl font-semibold mb-4">상품 관리</h2>
        <button
          onClick={() => setShowNewProductForm(!showNewProductForm)}
          className="bg-green-500 text-white px-4 py-2 rounded mb-4 hover:bg-green-600"
        >
          {showNewProductForm ? '취소' : '새 상품 추가'}
        </button>
        {showNewProductForm && (
          <ProductForm
            newProduct={newProduct}
            setNewProduct={setNewProduct}
            handleAddNewProduct={handleAddNewProduct}
          />
        )}
        <div className="space-y-2">
          {products.map((product, index) => (
            <ProductItem
              key={index}
              product={product}
              openProductIds={openProductIds}
              editingProduct={editingProduct}
              newDiscount={newDiscount}
              index={index}
              toggleProductAccordion={toggleProductAccordion}
              handleEditProduct={handleEditProduct}
              handleProductNameUpdate={handleProductNameUpdate}
              handlePriceUpdate={handlePriceUpdate}
              handleStockUpdate={handleStockUpdate}
              handleEditComplete={handleEditComplete}
              handleAddDiscount={handleAddDiscount}
              handleRemoveDiscount={handleRemoveDiscount}
              setNewDiscount={setNewDiscount}
            />
          ))}
        </div>
      </div>
      <div>
        <h2 className="text-2xl font-semibold mb-4">쿠폰 관리</h2>
        <div className="bg-white p-4 rounded shadow">
          <div className="space-y-2 mb-4">
            <input
              type="text"
              placeholder="쿠폰 이름"
              value={newCoupon.name}
              onChange={(e) =>
                setNewCoupon({ ...newCoupon, name: e.target.value })
              }
              className="w-full p-2 border rounded"
            />
            <input
              type="text"
              placeholder="쿠폰 코드"
              value={newCoupon.code}
              onChange={(e) =>
                setNewCoupon({ ...newCoupon, code: e.target.value })
              }
              className="w-full p-2 border rounded"
            />
            <div className="flex gap-2">
              <select
                value={newCoupon.discountType}
                onChange={(e) =>
                  setNewCoupon({
                    ...newCoupon,
                    discountType: e.target.value as 'amount' | 'percentage',
                  })
                }
                className="w-full p-2 border rounded"
              >
                <option value="amount">금액(원)</option>
                <option value="percentage">할인율(%)</option>
              </select>
              <input
                type="number"
                placeholder="할인 값"
                value={newCoupon.discountValue}
                onChange={(e) =>
                  setNewCoupon({
                    ...newCoupon,
                    discountValue: parseInt(e.target.value),
                  })
                }
                className="w-full p-2 border rounded"
              />{' '}
            </div>
            <button
              onClick={handleAddCoupon}
              className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600"
            >
              쿠폰 추가
            </button>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">현재 쿠폰 목록</h3>
            <div className="space-y-2">
              {coupons.map((coupon, index) => (
                <div
                  key={index}
                  data-testid={`coupon-${index + 1}`}
                  className="bg-gray-100 p-2 rounded"
                >
                  {coupon.name} ({coupon.code}):
                  {coupon.discountType === 'amount'
                    ? `${coupon.discountValue}원`
                    : `${coupon.discountValue}%`}{' '}
                  할인
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
