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
  // Check for empty password (optional)
  if (password.length === 0) return 0;

  const passedCount = requirements.filter((r) => r.validate(password)).length;

  let strength = (passedCount / requirements.length) * 100;

  // Ensure a minimum strength of 10
  return Math.max(Math.round(strength), 10);
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
