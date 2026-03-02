import { Button, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { zodResolver } from "mantine-form-zod-resolver";
import {
  ChangeGiftReceiverFormValues,
  changeGiftReceiverSchema,
} from "../../../../features/gift/gift.schema";
import { formSubmitWithFocus } from "../../../../utils/form";
import CusModal from "../../../../components/CusModal/CusModal";

type ChangeGiftReceiverModalProps = {
  opened: boolean;
  onClose: () => void;
  onSubmit: (receiverEmail: string) => void;
  defaultEmail: string;
  submitting: boolean;
};

export function ChangeGiftReceiverModal({
  opened,
  onClose,
  onSubmit,
  defaultEmail,
  submitting,
}: ChangeGiftReceiverModalProps) {
  const form = useForm<ChangeGiftReceiverFormValues>({
    mode: "uncontrolled",
    initialValues: {
      receiverEmail: defaultEmail,
    },
    validate: zodResolver(changeGiftReceiverSchema),
  });

  const handleSubmit = (values: { receiverEmail: string | undefined }) => {
    if (values.receiverEmail) {
      onSubmit(values.receiverEmail.trim());
    }
  };

  return (
    <CusModal opened={opened} onClose={onClose} title="Change Receiver Email" size="500px">
      <form onSubmit={formSubmitWithFocus(form, handleSubmit)} className="space-y-4">
        <TextInput
          label="Receiver Email"
          placeholder="newuser@example.com"
          key={form.key("receiverEmail")}
          {...form.getInputProps("receiverEmail")}
        />
        <div className="flex justify-end gap-4">
          <Button variant="subtle" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" disabled={!form.isDirty()} loading={submitting}>
            Confirm
          </Button>
        </div>
      </form>
    </CusModal>
  );
}
