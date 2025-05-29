import { Title } from "@mantine/core";
import { OrderDetailVm, OrderStatus } from "../../../react-query/order/order.types";

export function getPaymentBrandIcon(brand?: string): string {
  switch (brand?.toLowerCase()) {
    case "visa":
      return "https://upload.wikimedia.org/wikipedia/commons/0/04/Visa.svg";
    case "mastercard":
      return "https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg";
    default:
      return "https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/Credit_card_font_awesome.svg/1200px-Credit_card_font_awesome.svg.png";
  }
}

const OrderSummary = ({ data }: { data: OrderDetailVm }) => (
  <div className="bg-body rounded-t-lg shadow p-4">
    <Title order={3} className="text-xl font-semibold mb-4">
      Order Summary
    </Title>
    <div className="bg-primary-filled w-[45px] h-[2px] mt-sm" />
    <div className="mt-4 space-y-2 text-lg">
      <div className="flex justify-between">
        <span>Provisional</span>
        <span className="font-semibold">${data.provisionalAmount.toLocaleString("en-US")}</span>
      </div>
      <div className="flex justify-between">
        <span>Direct discount</span>
        <span className="text-orange-500">
          - ${data.totalDirectDiscount.toLocaleString("en-US")}
        </span>
      </div>
      <div className="flex justify-between">
        <span>Voucher discount</span>
        <span className="text-orange-500">$0</span>
      </div>
    </div>

    <div className="border-t mt-4 pt-4 flex justify-between items-center text-lg font-semibold">
      <span>Total Amount</span>
      <span className="text-blue-500 dark:text-blue-600 text-xl font-bold">
        ${data.totalAmount.toLocaleString("en-US")}
      </span>
    </div>

    {data.status !== OrderStatus.Incomplete && (
      <div className="mt-2 flex items-center justify-between text-sm text-muted-foreground">
        <span>Paid via</span>
        <div className="flex items-center gap-2">
          <img
            src={getPaymentBrandIcon(data.paymentMethodBrand)}
            alt={data.paymentMethodBrand ?? "Card"}
            className="h-5"
          />
          <span className="font-medium text-gray-700 dark:text-gray-300 capitalize">
            {data.paymentMethodBrand ?? "Card"} •••• {data.paymentMethodLast4 ?? "XXXX"}
          </span>
        </div>
      </div>
    )}
  </div>
);

export default OrderSummary;
