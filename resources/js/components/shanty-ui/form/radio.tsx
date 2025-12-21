import { Radio as BaseRadio } from "@base-ui/react/radio";
import { cn } from "tailwind-variants";

function Radio({
  label,
  className,
  ...props
}: BaseRadio.Root.Props & {
  label?: string;
  className?: string;
}) {
  return (
    <label className={cn("group/radio flex items-center gap-x-1", className)}>
      <BaseRadio.Root
        className={cn(
          "inline-flex size-5 items-center justify-center",
          "rounded-full",
          "outline-2 outline-offset-2 outline-transparent",
          "focus-visible:outline-primary",
          "data-checked:bg-primary",
          "group-hover/radio:outline-muted-primary",
          "data-unchecked:border data-unchecked:border-input-border data-unchecked:bg-input",
        )}
        {...props}
      >
        <BaseRadio.Indicator
          className={cn(
            "size-2.5 rounded-full",
            "flex bg-primary-foreground data-unchecked:hidden",
            "transition-all duration-150 ease-[cubic-bezier(0.45,1.005,0,1.005)]",
            "data-ending-style:size-0 data-ending-style:ease-[cubic-bezier(0.375,0.015,0.545,0.455)]",
            "data-starting-style:size-2.5",
          )}
        />
      </BaseRadio.Root>
      {label}
    </label>
  );
}

export { Radio };
