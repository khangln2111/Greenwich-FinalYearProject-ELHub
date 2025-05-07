import { TextInput, Button, Title, Stack } from "@mantine/core";

interface Props {
  price: number;
  discount: number;
}

export default function PricingForm({ price, discount }: Props) {
  return (
    <div className="bg-white dark:bg-neutral-900 shadow-sm rounded-xl p-6 space-y-6">
      <Title order={3} className="text-xl font-semibold">
        Pricing
      </Title>
      <Stack gap="md">
        <TextInput label="Price ($)" type="number" defaultValue={price} />
        <TextInput label="Discount (%)" type="number" defaultValue={discount} />
        <div className="pt-2">
          <Button>Save Pricing</Button>
        </div>
      </Stack>
    </div>
  );
}
