import { PaymentElement } from "@stripe/react-stripe-js";

export default function CheckoutForm() {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Payment methods</h3>
      <PaymentElement
        options={{
          layout: "tabs",
          business: { name: "ELearning Hub" },
        }}
      />
    </div>
  );
}
