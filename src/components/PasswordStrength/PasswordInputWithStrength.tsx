import { useState } from "react";
import { PasswordInput, Progress, Popover, PasswordInputProps } from "@mantine/core";
import { PasswordRequirement } from "./PasswordRequirement";

// Type for password requirements
type Requirement = {
  label: string;
  validate: (value: string) => boolean;
};

interface PasswordInputWithStrengthProps extends PasswordInputProps {
  requirements: Requirement[];
  password: string;
  onPasswordChange: (value: string) => void;
}

function getStrength(password: string, requirements: Requirement[]) {
  let failedCount = 0;

  // Check requirements defined in the requirements array
  requirements.forEach((requirement) => {
    if (!requirement.validate(password)) {
      failedCount += 1; // Count failed requirements
    }
  });

  return Math.max(100 - (100 / (requirements.length + 1)) * failedCount, 10);
}

const PasswordInputWithStrength = ({
  requirements,
  password,
  onPasswordChange,
  ...rest
}: PasswordInputWithStrengthProps) => {
  const [popoverOpened, setPopoverOpened] = useState(false);
  const strength = getStrength(password, requirements);
  const color = strength === 100 ? "teal" : strength > 50 ? "yellow" : "red";

  return (
    <Popover
      opened={popoverOpened}
      position="bottom"
      width="target"
      transitionProps={{ transition: "pop" }}
    >
      <Popover.Target>
        <div
          onFocusCapture={() => setPopoverOpened(true)}
          onBlurCapture={() => setPopoverOpened(false)}
        >
          <PasswordInput
            value={password}
            onChange={(event) => onPasswordChange(event.currentTarget.value)}
            error={strength < 100 && password.length > 0 ? "Password is too weak" : null}
            {...rest}
          />
        </div>
      </Popover.Target>
      <Popover.Dropdown className="shadow-2xl">
        <Progress color={color} value={strength} size={5} mb="xs" />
        <div className="flex flex-col gap-2">
          {requirements.map((requirement, index) => (
            <PasswordRequirement
              key={index}
              label={requirement.label}
              meets={requirement.validate(password)}
            />
          ))}
        </div>
      </Popover.Dropdown>
    </Popover>
  );
};

export default PasswordInputWithStrength;
