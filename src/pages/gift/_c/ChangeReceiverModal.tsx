import { Button, TextInput } from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { z } from "zod";
import CusModal from "../../../components/CusModal";
import { useEffect } from "react";
import { formSubmitWithFocus } from "../../../utils/form";

const schema = z.object({
  receiverEmail: z.string().email("Invalid email address"),
});

type ChangeReceiverModalProps = {
  opened: boolean;
  onClose: () => void;
  onSubmit: (receiverEmail: string) => void;
  defaultEmail?: string;
  submitting: boolean;
};

export function ChangeReceiverModal({
  opened,
  onClose,
  onSubmit,
  defaultEmail,
  submitting,
}: ChangeReceiverModalProps) {
  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      receiverEmail: defaultEmail,
    },
    validate: zodResolver(schema),
  });

  const handleSubmit = (values: { receiverEmail: string | undefined }) => {
    if (values.receiverEmail) {
      onSubmit(values.receiverEmail.trim());
    }
  };

  useEffect(() => {
    if (opened && defaultEmail !== undefined) {
      form.setValues({ receiverEmail: defaultEmail });
      form.resetDirty();
    }
  }, [defaultEmail, opened]);

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
