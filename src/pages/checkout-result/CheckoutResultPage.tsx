import { Button } from "@mantine/core";
import { useQueryClient } from "@tanstack/react-query";
import { CheckCircle, XCircle } from "lucide-react";
import { Link, Navigate, useSearchParams } from "react-router-dom";
import CenterLoader from "../../components/CenterLoader";
import { useConfirmPaymentIntent } from "../../react-query/order/orderHooks";

export default function CheckoutResultPage() {
  const [searchParams] = useSearchParams();
  const paymentIntentId = searchParams.get("payment_intent");

  const queryClient = useQueryClient();
  if (!paymentIntentId) return <Navigate to="/cart" />;

  const { isPending, isError, isSuccess } = useConfirmPaymentIntent(paymentIntentId);

  if (isPending) return <CenterLoader />;

  if (isSuccess) {
    queryClient.invalidateQueries();
  }

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="bg-white dark:bg-dark rounded-2xl shadow-lg p-8 w-full text-center max-w-[576px]">
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

        {isError && (
          <>
            <XCircle className="text-red-500 w-16 h-16 mx-auto" />
            <h1 className="text-2xl font-bold mt-4">Payment Failed</h1>
            <p className="text-gray-600 dark:text-gray-300 mt-2">
              Something went wrong with your payment. Please try again or contact support.
            </p>
            <Button
              variant="light"
              className="mt-6 w-full bg-red-600 hover:bg-red-700 text-white rounded-full"
              component="a"
              href="/cart"
            >
              Return to Cart
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
