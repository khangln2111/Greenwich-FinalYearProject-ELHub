import { Anchor, Box, useComputedColorScheme, Loader } from "@mantine/core";
import { ArrowLeft } from "lucide-react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { CartItemType } from "../../react-query/cart/cart.types";
import CheckoutForm from "./_c/CheckoutForm";
import CheckoutSummary from "./_c/CheckoutSummary";
import { useState, useEffect } from "react";
import { useCreatePaymentIntent } from "../../react-query/order/orderHooks";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(
  "pk_test_51Pvuy2Rv7E2M7Ub6wfJIaUN5EFDPRJk9q74V4wiPEO4q2ncQFtFZcgZQom8VTRmwyKSiz8ri2LOUTLgiX6SmNLFD00Sdpd3qTD",
);

export default function CheckoutPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const computedColorScheme = useComputedColorScheme("light", {
    getInitialValueInEffect: true,
  });
  const stripeTheme = computedColorScheme === "dark" ? "night" : "stripe";
  const createPaymentIntentMutation = useCreatePaymentIntent();

  const items: CartItemType[] | undefined = location.state?.selectedItems;

  // Nếu không có item được chọn -> về lại cart
  if (!items || items.length === 0) {
    return <Navigate to="/cart" replace />;
  }

  const total = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

  useEffect(() => {
    if (items.length === 0) return;

    createPaymentIntentMutation.mutate(
      {
        cartItemIds: items.map((item) => item.id),
      },
      {
        onSuccess: (data) => {
          setClientSecret(data.data?.clientSecret ?? null);
        },
        onError: (error) => {
          console.error("Failed to create PaymentIntent", error);
        },
      },
    );
  }, [items]);

  if (!clientSecret)
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader />
      </div>
    );

  return (
    <Elements
      stripe={stripePromise}
      options={{
        clientSecret: clientSecret,
        locale: "en",
        appearance: {
          theme: stripeTheme,
        },
      }}
    >
      <div className="flex-1 bg-[#EDF0F3] dark:bg-dark-5">
        <Box
          className="container pt-[20px] pb-[100px]"
          px={{ base: "0px", lg: "30px", xl: "90px" }}
          size="xl"
        >
          <Anchor
            className="text-xl font-semibold mb-4 flex items-center ml-5 lg:ml-0"
            component="button"
            onClick={() => navigate("/cart")}
          >
            <ArrowLeft className="inline-block mr-2" /> Back to cart
          </Anchor>

          <div className="grid grid-cols-1 lg:grid-cols-[2.5fr_1fr] items-start gap-6">
            {/* Left section */}
            <div>
              {/* Cart items */}
              <div className="bg-body lg:rounded-2xl shadow-lg p-4 space-y-6">
                <p className="flex items-center mb-2 font-semibold">
                  Items in order ({items.length})
                </p>
                {items.map((item) => (
                  <div key={item.id} className="flex items-start border-t pt-4 gap-4">
                    <img
                      src={item.courseImageUrl}
                      alt={item.courseDescription}
                      className="size-20 object-cover rounded-md border"
                    />
                    <div className="flex-1 flex flex-col justify-between gap-2 lg:flex-row lg:gap-4 lg:self-stretch lg:items-center">
                      <div className="flex lg:block items-center">
                        <div className="flex-1 flex flex-col">
                          <p className="font-medium leading-tight">{item.courseTitle}</p>
                          <p className="text-sm text-gray-500 line-clamp-1">
                            {item.courseDescription}
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-2 items-center lg:gap-6 lg:self-center justify-between">
                        <div className="flex flex-row items-baseline gap-3 lg:gap-1 lg:flex-col lg:items-end lg:self-center">
                          <p className="text-sm text-dimmed font-semibold line-through">
                            ${item.price.toLocaleString("en-US")}
                          </p>
                          <p className="text-blue-500 font-semibold">
                            ${item.discountedPrice.toLocaleString("en-US")}
                          </p>
                        </div>
                        <div className="text-md text-gray-600 dark:text-gray-300">
                          x{item.quantity}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Payment form */}
              <div className="p-4 mt-5 bg-body lg:rounded-2xl">
                <CheckoutForm />
              </div>
            </div>

            {/* Summary section */}
            <CheckoutSummary total={total} clientSecret={clientSecret} />
          </div>
        </Box>
      </div>
    </Elements>
  );
}
