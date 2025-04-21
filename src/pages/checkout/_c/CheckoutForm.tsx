import { useComputedColorScheme } from "@mantine/core";
import { Elements, PaymentElement } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const publishableKey =
  "pk_test_51Pvuy2Rv7E2M7Ub6wfJIaUN5EFDPRJk9q74V4wiPEO4q2ncQFtFZcgZQom8VTRmwyKSiz8ri2LOUTLgiX6SmNLFD00Sdpd3qTD";

const stripePromise = loadStripe(publishableKey);

// extract theme of mantine to detect theme is dark or light

export default function CheckoutForm() {
  const computedColorScheme = useComputedColorScheme("light", {
    getInitialValueInEffect: true,
  });
  const stripeTheme = computedColorScheme === "dark" ? "night" : "stripe";
  return (
    <Elements
      stripe={stripePromise}
      options={{
        mode: "payment",
        amount: 1099, // Optionalz
        currency: "usd",
        paymentMethodCreation: "manual",
        locale: "en",
        appearance: {
          theme: stripeTheme,
        },
      }}
    >
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Payment methods</h3>
        <PaymentElement
          options={{
            layout: "tabs",
            wallets: {
              applePay: "auto",
              googlePay: "auto",
            },
            business: { name: "ELearning Hub" },
          }}
        />
      </div>
    </Elements>
  );
}
