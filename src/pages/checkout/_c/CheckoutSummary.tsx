import { Button, Text, Title } from "@mantine/core";
import { useElements, useStripe } from "@stripe/react-stripe-js";
import { PaymentIntentResult } from "@stripe/stripe-js";
import { LockIcon } from "lucide-react";
import { useState } from "react";
import { CartItem } from "../../../react-query/cart/cart.types";
import { cn } from "../../../utils/cn";
import { showErrorToast } from "../../../utils/toastHelper";

type CheckoutSummaryProps = {
  items: CartItem[];
  className?: string;
  clientSecret: string;
};

export default function CheckoutSummary({ items, className, clientSecret }: CheckoutSummaryProps) {
  const provisional = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const totalDirectDiscount = items.reduce(
    (acc, item) => acc + (item.price - item.discountedPrice) * item.quantity,
    0,
  );
  const finalTotalAmount = provisional - totalDirectDiscount;

  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);

  const handleConfirmPayment = async () => {
    if (!stripe || !elements) return;

    setLoading(true);

    // ✅ Submit các field trong PaymentElement trước khi confirm
    const { error: submitError } = await elements.submit();
    if (submitError) {
      setLoading(false);
      return;
    }

    const result: PaymentIntentResult = await stripe.confirmPayment({
      elements,
      clientSecret,
      confirmParams: {
        return_url: `${window.location.origin}/checkout/result`,
      },
    });

    if (result.error) {
      console.error(result.error.message);
      showErrorToast("Payment failed", result.error.message);
    }
    setLoading(false);
  };

  return (
    <div className={cn("bg-body lg:rounded-t-2xl shadow p-4", className)}>
      <Title order={3} className="text-xl font-semibold mb-4">
        Order Summary
      </Title>
      <div className="bg-primary-filled w-[45px] h-[2px] mt-sm"></div>

      <div className="mt-4 space-y-2 text-lg">
        <div className="flex justify-between">
          <span>Provisional</span>
          <span className="font-semibold">${provisional.toLocaleString("en-US")}</span>
        </div>
        <div className="flex justify-between">
          <span>Direct discount</span>
          <span className="text-orange-500">
            {totalDirectDiscount !== 0 && "- "}${totalDirectDiscount.toLocaleString("en-US")}
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
          ${finalTotalAmount.toLocaleString("en-US")}
        </span>
      </div>

      <Button
        size="lg"
        className="w-full mt-4 bg-blue-600 text-white hover:bg-blue-800 dark:bg-blue-700 rounded-full"
        leftSection={<LockIcon className="ml-2" />}
        onClick={handleConfirmPayment}
        loading={loading}
        disabled={!stripe || !elements || loading}
      >
        Proceed
      </Button>

      <Text className="text-sm text-center mt-3 text-gray-8 dark:text-dark-1">
        By proceeding with your purchase, you agree to the <br />
        <span className="underline">Terms of Service</span> and{" "}
        <span className="underline">Privacy Policy</span>
        <br /> of ElearningHub.
      </Text>
    </div>
  );
}
