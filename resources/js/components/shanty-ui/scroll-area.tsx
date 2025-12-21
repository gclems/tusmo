import { ScrollArea as BaseScrollArea } from "@base-ui/react/scroll-area";
import { cn } from "tailwind-variants";

function Scrollbar({
  orientation = "vertical",
}: {
  orientation: "vertical" | "horizontal";
}) {
  return (
    <BaseScrollArea.Scrollbar
      orientation={orientation}
      className={cn(
        "pointer-events-none",
        "relative flex",
        "rounded",
        "bg-accent-background",
        "before:absolute before:content-[''] data-hovering:pointer-events-auto data-hovering:opacity-100 data-hovering:delay-0",
        "data-scrolling:pointer-events-auto data-scrolling:opacity-100 data-scrolling:duration-0",
        {
          "m-2 w-1 before:left-1/2 before:h-full before:w-5 before:-translate-x-1/2":
            orientation === "vertical",
          "m-2 h-1 before:right-0 before:-bottom-2 before:left-0 before:h-5 before:w-full":
            orientation === "horizontal",
        },
      )}
    >
      <BaseScrollArea.Thumb className="w-full rounded bg-accent-foreground" />
    </BaseScrollArea.Scrollbar>
  );
}

function ScrollArea({
  vertical = false,
  horizontal = false,
  children,
  className,
}: {
  vertical?: boolean;
  horizontal?: boolean;
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <BaseScrollArea.Root className={cn("overflow-hidden", className)}>
      <BaseScrollArea.Viewport className="h-full overscroll-contain">
        <BaseScrollArea.Content
          className={cn({
            "pr-4": vertical,
            "pb-4": horizontal,
          })}
        >
          {children}
        </BaseScrollArea.Content>
      </BaseScrollArea.Viewport>
      {vertical && <Scrollbar orientation="vertical" />}
      {horizontal && <Scrollbar orientation="horizontal" />}
      {vertical && horizontal && <BaseScrollArea.Corner />}
    </BaseScrollArea.Root>
  );
}

export { ScrollArea, Scrollbar };
