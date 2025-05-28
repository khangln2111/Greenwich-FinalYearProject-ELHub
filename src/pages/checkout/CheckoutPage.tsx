import { Anchor, Box, Divider, Loader, useComputedColorScheme } from "@mantine/core";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { ArrowLeft } from "lucide-react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { CartItemVm } from "../../react-query/cart/cart.types";
import CheckoutForm from "./_c/CheckoutForm";
import CheckoutSummary from "./_c/CheckoutSummary";
import CheckoutItem from "./_c/CheckoutItem";
import SummaryDecorator from "../../components/SummaryDecorator";

const stripePromise = loadStripe(
  "pk_test_51RRb7XRoRYlKkzyrjHFredaX8Ha0wJNHj0v60IJa1BycyHTVgTeO7VlUkveFVbN2GVbtvaQkcCPDoXLJPmR1WKMv00fBzMO0yS",
);

export default function CheckoutPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const computedColorScheme = useComputedColorScheme("light", {
    getInitialValueInEffect: true,
  });
  const stripeTheme = computedColorScheme === "dark" ? "night" : "stripe";

  const items: CartItemVm[] | undefined = location.state?.selectedItems;
  const clientSecret: string | null = location.state?.clientSecret ?? null;

  // Nếu không có item được chọn -> về lại cart
  if (!items || items.length === 0 || !clientSecret) {
    return <Navigate to="/cart" replace />;
  }

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
            {/* Left section: checkout items + payment form */}
            <div>
              {/* Checkout items */}
              <div className="bg-body lg:rounded-2xl shadow-lg p-4">
                <p className="flex items-center font-semibold">Items in order ({items.length})</p>

                <Divider className="-mx-4 mt-2 border-[#EDF0F3] dark:border-dark-5" size="md" />

                <div className="divide-y">
                  {items.map((item) => (
                    <CheckoutItem key={item.id} item={item} className="last:pb-0" />
                  ))}
                </div>
              </div>

              {/* Payment form */}
              <div className="p-4 mt-5 bg-body lg:rounded-2xl">
                <CheckoutForm />
              </div>
            </div>

            {/* right section: checkout summary*/}
            <div>
              <CheckoutSummary items={items} clientSecret={clientSecret} />
              <SummaryDecorator />
            </div>
          </div>
        </Box>
      </div>
    </Elements>
  );
}
