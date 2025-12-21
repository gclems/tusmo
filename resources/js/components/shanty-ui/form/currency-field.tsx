import { ComponentProps } from "react";

import { Field as BaseField } from "@base-ui/react";
import { cn } from "tailwind-variants";

import { CurrencyInput } from "./currency-input";
import { InputDescription } from "./input-description";
import { InputError } from "./input-error";
import { Label } from "./label";

function CurrencyField({
  rootProps,
  inputProps,
  label,
  required,
  error,
  description,
}: {
  rootProps?: BaseField.Root.Props;
  inputProps?: ComponentProps<typeof CurrencyInput>;
  label?: React.ReactNode;
  required?: boolean;
  error?: React.ReactNode;
  description?: React.ReactNode;
}) {
  return (
    <BaseField.Root
      {...rootProps}
      className={cn("space-y-1", rootProps?.className)}
    >
      <Label render={<BaseField.Label />} required={required}>
        {label}
      </Label>

      {!!description && (
        <InputDescription render={<BaseField.Description />}>
          {description}
        </InputDescription>
      )}

      <CurrencyInput {...inputProps} />

      {!!error && (
        <InputError render={<BaseField.Error match />}>{error}</InputError>
      )}
    </BaseField.Root>
  );
}

export { CurrencyField };
