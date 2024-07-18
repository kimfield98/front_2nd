type OrderSummaryProps = {
  totalBeforeDiscount: number;
  totalDiscount: number;
  totalAfterDiscount: number;
};

const OrderSummary = ({
  totalBeforeDiscount,
  totalDiscount,
  totalAfterDiscount,
}: OrderSummaryProps) => {
  return (
    <div className="space-y-1">
      <p>상품 금액: {totalBeforeDiscount.toLocaleString()}원</p>
      <p className="text-green-600">
        할인 금액: {totalDiscount.toLocaleString()}원
      </p>
      <p className="text-xl font-bold">
        최종 결제 금액: {totalAfterDiscount.toLocaleString()}원
      </p>
    </div>
  );
};

export default OrderSummary;
