import { ComponentProps } from "react";

import { Dialog as BaseDialog } from "@base-ui/react/dialog";
import { cn } from "tailwind-variants";

import { Button } from "../button";
import { Dialog, dialogPopupSizeClassName } from "./dialog";
import { ScrollArea } from "../scroll-area";

function Root(props: BaseDialog.Root.Props) {
  return <BaseDialog.Root {...props} />;
}

function Trigger(props: BaseDialog.Trigger.Props) {
  return <BaseDialog.Trigger render={<Button />} {...props} />;
}

function Popup({
  children,
  size = "md",
  ...props
}: BaseDialog.Portal.Props & {
  size?: "sm" | "md" | "lg" | "xl";
}) {
  return (
    <BaseDialog.Portal {...props}>
      <Dialog.Backdrop />
      <BaseDialog.Viewport className="group/drawer fixed inset-0 flex justify-end">
        <BaseDialog.Popup
          className={cn(
            "@container/drawer relative space-y-6 py-6",
            "relative flex",
            "h-full max-h-full min-h-0",
            "flex-col overflow-hidden bg-modal text-modal-foreground shadow-xl",
            "transition-all duration-300 ease-[cubic-bezier(0.45,1.005,0,1.005)]",
            "data-ending-style:translate-x-[max(100dvw,100%)] data-ending-style:duration-150 data-ending-style:ease-[cubic-bezier(0.375,0.015,0.545,0.455)]",
            "data-starting-style:translate-x-[100dvw]",
            dialogPopupSizeClassName(size),
          )}
        >
          {children}
        </BaseDialog.Popup>
      </BaseDialog.Viewport>
    </BaseDialog.Portal>
  );
}

function Body(props: ComponentProps<typeof Dialog.Body>) {
  return (
    <ScrollArea vertical>
      <Dialog.Body {...props} className={cn("pr-2 pl-6")} />
    </ScrollArea>
  );
}

const DrawerDialog = Object.assign(Root, {
  Trigger,
  Popup,
  Header: Dialog.Header,
  Body: Body,
  Footer: Dialog.Footer,
  CloseButton: Dialog.CloseButton,
});

export { DrawerDialog };
