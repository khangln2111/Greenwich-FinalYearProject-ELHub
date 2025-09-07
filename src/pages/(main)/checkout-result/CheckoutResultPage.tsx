import { Button, Loader } from "@mantine/core";
import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { CheckCircle, XCircle } from "lucide-react";
import { Link, Navigate, useSearchParams } from "react-router-dom";
import { useProcessOrder } from "../../../features/order/order.hooks";
import { OrderStatus } from "../../../features/order/order.types";
import { usePageSEO } from "../../../hooks/usePageSEO";

export default function CheckoutResultPage() {
  usePageSEO({ title: "Checkout Result" });
  const [searchParams] = useSearchParams();
  const paymentIntentId = searchParams.get("payment_intent");
  const orderId = searchParams.get("orderId");

  const validId = orderId || paymentIntentId;
  const queryClient = useQueryClient();

  const { data, isPending, isError, isSuccess } = useProcessOrder(validId || "");

  const isCompleted = data?.data?.status === OrderStatus.Completed;

  // Redirect if no valid ID
  if (!validId) return <Navigate to="/cart" />;

  // Invalidate caches after successful payment confirmation
  useEffect(() => {
    if (isSuccess) {
      queryClient.invalidateQueries();
    }
  }, [isSuccess, queryClient]);

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 bg-gray-2 dark:bg-dark-7">
      <div className="bg-white dark:bg-dark-9 rounded-2xl shadow-xl p-8 w-full text-center max-w-xl">
        {isPending && <PaymentProcessing />}
        {isSuccess && isCompleted && <PaymentSuccess />}
        {(isError || (isSuccess && !isCompleted)) && <PaymentFailed />}
      </div>
    </div>
  );
}

function PaymentProcessing() {
  return (
    <>
      <Loader size={48} color="blue" className="mx-auto" />
      <h1 className="text-2xl font-bold mt-4">Processing Payment</h1>
      <p className="text-gray-600 dark:text-gray-300 mt-2">
        Please do not close or leave this page while we confirm your payment.
      </p>
    </>
  );
}

function PaymentSuccess() {
  return (
    <>
      <CheckCircle className="text-green-500 w-16 h-16 mx-auto" />
      <h1 className="text-2xl font-bold mt-4">Payment Successful</h1>
      <p className="text-gray-600 dark:text-gray-300 mt-2">
        Thank you for your purchase! You can now access your course materials.
      </p>
      <Button className="mt-6 w-full rounded-full" component={Link} to="/dashboard/inventory">
        Go to My Inventory
      </Button>
    </>
  );
}

function PaymentFailed() {
  return (
    <>
      <XCircle className="text-red-500 w-16 h-16 mx-auto" />
      <h1 className="text-2xl font-bold mt-4">Payment Failed</h1>
      <p className="text-gray-600 dark:text-gray-300 mt-2">
        Your payment failed because we didn't receive a payment confirmation. Please contact support
        if you think this is an error.
      </p>
      <Button
        variant="light"
        className="mt-6 w-full bg-red-600 hover:bg-red-700 text-white rounded-full"
        component={Link}
        to="/dashboard/order-history"
      >
        Return to Order History
      </Button>
    </>
  );
}
