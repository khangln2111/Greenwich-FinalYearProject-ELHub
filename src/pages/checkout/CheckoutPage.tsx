import { Anchor, Box } from "@mantine/core";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import CheckoutForm from "./_c/CheckoutForm";
import CheckoutSummary from "./_c/CheckoutSummary";

const checkoutItems = [
  {
    id: 1,
    name: "100 Days of Code: The Complete Python Pro Bootcamp",
    description: "By Khakha khakha",
    price: 4050000,
    quantity: 3,
    image:
      "https://hoidanit.vn/_next/image?url=https%3A%2F%2Fhoidanit.vn%2Fimages%2Fc1d33e4e76fee563c29bd4101ca7651910.png&w=3840&q=75",
  },
  {
    id: 2,
    name: "Automate the Boring Stuff with Python Programming",
    description: "By John Doe",
    price: 378000,
    quantity: 2,
    image:
      "https://hoidanit.vn/_next/image?url=https%3A%2F%2Fhoidanit.vn%2Fimages%2Fc1d33e4e76fee563c29bd4101ca7651910.png&w=3840&q=75",
  },
];

export default function CheckoutPage() {
  const [items] = useState(checkoutItems);

  const total = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className="flex-1 bg-[#EDF0F3] dark:bg-dark-5">
      <Box
        className="container pt-[20px] pb-[100px]"
        px={{ base: "0px", lg: "30px", xl: "90px" }}
        size="xl"
      >
        <Anchor
          className="text-xl font-semibold mb-4 flex items-center ml-5 lg:ml-0"
          component={Link}
          to="/cart"
        >
          <ArrowLeft className="inline-block mr-2" /> Back to cart
        </Anchor>

        <div className="grid grid-cols-1 lg:grid-cols-[2.5fr_1fr] items-start gap-6">
          {/* Left side */}
          <div>
            {/* top part */}
            <div className="bg-body lg:rounded-2xl shadow-lg p-4 space-y-6">
              <p className="flex items-center mb-2 font-semibold">
                Items in order ({items.length})
              </p>
              {items.map((item) => (
                <div key={item.id} className="flex items-start border-t pt-4 gap-4">
                  <div className="flex gap-5 items-center">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="size-20 object-cover rounded-md border"
                    />
                  </div>
                  <div className="flex-1 flex flex-col justify-between gap-2 lg:flex-row lg:gap-4 lg:self-stretch lg:items-center">
                    <div className="flex lg:block items-center">
                      <div className="flex-1 flex flex-col">
                        <p className="font-medium leading-tight">{item.name}</p>
                        <p className="text-sm text-gray-500">{item.description}</p>
                      </div>
                    </div>
                    <div className="flex gap-2 items-center lg:gap-6 lg:self-center justify-between">
                      <div className="flex flex-row items-baseline gap-3 lg:gap-1 lg:flex-col lg:items-end lg:self-center">
                        <p className="text-blue-500 font-semibold">
                          ${item.price.toLocaleString("en-US")}
                        </p>
                        <p className="text-sm text-dimmed font-semibold line-through">
                          ${item.price.toLocaleString("en-US")}
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

            {/* bottom part: Payment methods */}
            <div className="p-4 mt-5 bg-body lg:rounded-2xl">
              <CheckoutForm />
            </div>
          </div>

          {/* Right side - summary */}
          <CheckoutSummary total={total} />
        </div>
      </Box>
    </div>
  );
}
