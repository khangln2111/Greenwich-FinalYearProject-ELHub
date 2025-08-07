// components/GiftModal.tsx
import { Button, Modal, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { zodResolver } from "mantine-form-zod-resolver";
import {
  CreateGiftSchemaFormValues,
  createGiftSchema,
} from "../../../react-query/gift/gift.schema";
import { CreateGiftCommand } from "../../../react-query/gift/gift.types";
import { useCreateGift } from "../../../react-query/gift/giftHooks";
import { formSubmitWithFocus } from "../../../utils/form";

interface GiftingModalProps {
  opened: boolean;
  onClose: () => void;
  inventoryItemId: string;
}

const GiftingModal = ({ opened, onClose, inventoryItemId }: GiftingModalProps) => {
  const form = useForm<CreateGiftSchemaFormValues>({
    mode: "uncontrolled",
    validate: zodResolver(createGiftSchema),
  });

  const createGiftMutation = useCreateGift();

  const handleSubmit = (values: CreateGiftSchemaFormValues) => {
    const payload: CreateGiftCommand = {
      receiverEmail: values.receiverEmail.trim(),
      inventoryItemId,
    };
    createGiftMutation.mutate(payload, {
      onSuccess: () => {
        form.reset();
        onClose();
      },
    });
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
