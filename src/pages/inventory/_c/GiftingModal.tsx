// components/GiftModal.tsx
import { Button, Modal, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useCreateGift } from "../../../react-query/gift/giftHooks";
import { CreateGiftCommand } from "../../../react-query/gift/gift.types";
import { formSubmitWithFocus } from "../../../utils/form";

interface GiftingModalProps {
  opened: boolean;
  onClose: () => void;
  inventoryItemId: string;
}

const GiftingModal = ({ opened, onClose, inventoryItemId }: GiftingModalProps) => {
  const form = useForm<CreateGiftCommand>({
    mode: "uncontrolled",
    validate: { receiverEmail: (v) => (/^\S+@\S+$/.test(v) ? null : "Invalid email") },
  });

  const createGiftMutation = useCreateGift();

  const handleSubmit = (values: CreateGiftCommand) => {
    createGiftMutation.mutate(
      { receiverEmail: values.receiverEmail, inventoryItemId },
      {
        onSuccess: () => {
          form.reset();
          onClose();
        },
      },
    );
  };

  return (
    <Modal opened={opened} onClose={onClose} title="Gift this course" centered>
      <form onSubmit={formSubmitWithFocus(form, handleSubmit)} className="space-y-4">
        <TextInput
          label="Receiver Email"
          placeholder="friend@example.com"
          {...form.getInputProps("receiverEmail")}
          key={form.key("receiverEmail")}
        />
        <Button type="submit" loading={createGiftMutation.isPending} fullWidth>
          Send Gift
        </Button>
      </form>
    </Modal>
  );
};

export default GiftingModal;
