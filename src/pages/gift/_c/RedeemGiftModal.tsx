import { useForm, zodResolver } from "@mantine/form";
import { TextInput, Button } from "@mantine/core";
import CusModal from "../../../components/CusModal";
import { useRedeemGift } from "../../../react-query/gift/giftHooks";
import { formSubmitWithFocus } from "../../../utils/form";
import { z } from "zod";

type RedeemGiftModalProps = {
  open: boolean;
  onClose: () => void;
  onSubmit?: (giftCode: string) => void;
};

const redeemGiftSchema = z.object({
  giftCode: z.string().trim().min(1, { message: "Gift code is required" }),
});

export function RedeemGiftModal({ open, onClose, onSubmit }: RedeemGiftModalProps) {
  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      giftCode: "",
    },
    validate: zodResolver(redeemGiftSchema),
  });
  const redeemGiftMutation = useRedeemGift();

  const handleSubmit = (values: { giftCode: string }) => {
    redeemGiftMutation.mutate(values.giftCode.trim(), {
      onSuccess: () => {
        onClose();
        form.reset();
      },
    });
    onSubmit?.(values.giftCode.trim());
  };

  if (!open) return null;

  return (
    <CusModal opened={open} onClose={onClose} title="Redeem Gift" size="500px">
      <form onSubmit={formSubmitWithFocus(form, handleSubmit)} className="space-y-4">
        <TextInput
          label="Gift Code"
          placeholder="Enter Gift Code"
          {...form.getInputProps("giftCode")}
          key={form.key("giftCode")}
          disabled={redeemGiftMutation.isPending}
        />

        <div className="flex justify-end gap-4">
          <Button
            variant="subtle"
            color="gray"
            onClick={onClose}
            disabled={redeemGiftMutation.isPending}
          >
            Cancel
          </Button>
          <Button type="submit" loading={redeemGiftMutation.isPending}>
            Redeem
          </Button>
        </div>
      </form>
    </CusModal>
  );
}
