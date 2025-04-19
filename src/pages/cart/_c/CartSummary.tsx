import { Button, Text } from "@mantine/core";
import { IconArrowRight } from "@tabler/icons-react";
import { cn } from "../../../utils/cn";
type CartSummaryProps = {
  total: number;
  className?: string;
};

export default function CartSummary({ total, className }: CartSummaryProps) {
  return (
    <div className={cn("bg-body lg:rounded-2xl shadow p-4", className)}>
      <Button variant="light" autoContrast size="md" className="rounded-xl text-start w-full">
        Apply voucher to get discount
      </Button>

      <div className="mt-4 space-y-2 text-lg">
        <div className="flex justify-between">
          <span>Provisional</span>
          <span className="font-semibold">${total.toLocaleString("en-US")}</span>
        </div>
        <div className="flex justify-between">
          <span>Direct discount</span>
          <span className="text-orange-500">$0</span>
        </div>
        <div className="flex justify-between">
          <span>Voucher discount</span>
          <span className="text-orange-500">$0</span>
        </div>
      </div>

      <div className="border-t mt-4 pt-4 flex justify-between items-center text-lg font-semibold">
        <span>Total Amount</span>
        <span className="text-primary">${total.toLocaleString("en-US")}</span>
      </div>

      <Button
        size="lg"
        className="w-full mt-4 bg-blue-600 text-white hover:bg-blue-800 dark:bg-blue-700 rounded-full"
        rightSection={<IconArrowRight className="ml-2" />}
      >
        Proceed to checkout
      </Button>

      <Text size="xs" className="text-center mt-3 text-gray-500">
        By proceeding with your purchase, you agree to the <br />
        <span className="underline">Terms of Service</span> and{" "}
        <span className="underline">Privacy Policy</span>
        <br /> of ElearningHub.
      </Text>
    </div>
  );
}
