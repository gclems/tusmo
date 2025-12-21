import * as React from "react";

import { Checkbox as BaseCheckbox } from "@base-ui/react/checkbox";
import { cn } from "tailwind-variants";

import { Label } from "./label";

function Checkbox({
  required = false,
  label,
  className,
  ...rootProps
}: BaseCheckbox.Root.Props & {
  label?: React.ReactNode;
  required?: boolean;
  className?: string;
}) {
  return (
    <Label
      required={required}
      className={cn("group/checkbox flex items-center gap-x-1", className)}
    >
      <BaseCheckbox.Root
        {...rootProps}
        className={cn(
          "inline-flex size-5 items-center justify-center",
          "outline-2 outline-offset-2 outline-transparent",
          "focus-visible:outline-primary",
          "data-checked:bg-primary",
          "group-hover/checkbox:outline-muted-primary",
          "data-unchecked:border data-unchecked:border-input-border data-unchecked:bg-input",
        )}
      >
        <BaseCheckbox.Indicator
          className={cn(
            "flex text-primary-foreground data-unchecked:hidden",
            "transition-all duration-150 ease-[cubic-bezier(0.45,1.005,0,1.005)]",
            "data-ending-style:size-0 data-ending-style:ease-[cubic-bezier(0.375,0.015,0.545,0.455)]",
            "data-starting-style:opacity-100",
          )}
        >
          <CheckIcon className="size-3" />
        </BaseCheckbox.Indicator>
      </BaseCheckbox.Root>
      {label}
    </Label>
  );
}

function CheckIcon(props: React.ComponentProps<"svg">) {
  return (
    <svg
      fill="currentcolor"
      width="10"
      height="10"
      viewBox="0 0 10 10"
      {...props}
    >
      <path d="M9.1603 1.12218C9.50684 1.34873 9.60427 1.81354 9.37792 2.16038L5.13603 8.66012C5.01614 8.8438 4.82192 8.96576 4.60451 8.99384C4.3871 9.02194 4.1683 8.95335 4.00574 8.80615L1.24664 6.30769C0.939709 6.02975 0.916013 5.55541 1.19372 5.24822C1.47142 4.94102 1.94536 4.91731 2.2523 5.19524L4.36085 7.10461L8.12299 1.33999C8.34934 0.993152 8.81376 0.895638 9.1603 1.12218Z" />
    </svg>
  );
}

export { Checkbox };
