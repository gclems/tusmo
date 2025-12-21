import { useRef } from "react";

import { Dialog as BaseDialog } from "@base-ui/react/dialog";
import { ScrollArea as BaseScrollArea } from "@base-ui/react/scroll-area";
import { cn } from "tailwind-variants";

import { Button } from "../button";
import { Dialog, dialogPopupSizeClassName } from "./dialog";

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
  const popupRef = useRef<HTMLDivElement>(null);

  return (
    <BaseDialog.Portal {...props}>
      <Dialog.Backdrop />
      <BaseDialog.Viewport className="group/dialog fixed inset-0">
        <BaseScrollArea.Root
          style={{ position: undefined }}
          className="h-full overscroll-contain group-data-ending-style/dialog:pointer-events-none"
        >
          <BaseScrollArea.Viewport className="h-full overscroll-contain group-data-ending-style/dialog:pointer-events-none">
            <BaseScrollArea.Content className="fkex min-h-full items-center justify-center">
              <BaseDialog.Popup
                ref={popupRef}
                initialFocus={popupRef}
                className={cn(
                  "@container/dialog relative space-y-6 py-6",
                  "mx-auto my-18",
                  "bg-modal text-modal-foreground shadow-xl outline-0",
                  "transition-transform duration-700 ease-[cubic-bezier(0.45,1.005,0,1.005)]",
                  "data-ending-style:translate-y-[max(100dvh,100%)] data-ending-style:duration-150 data-ending-style:ease-[cubic-bezier(0.375,0.015,0.545,0.455)] data-starting-style:translate-y-[100dvh]",
                  "motion-reduce:transition-none",
                  dialogPopupSizeClassName(size),
                )}
              >
                {children}
              </BaseDialog.Popup>
            </BaseScrollArea.Content>
          </BaseScrollArea.Viewport>
        </BaseScrollArea.Root>
      </BaseDialog.Viewport>
    </BaseDialog.Portal>
  );
}

const ModalDialog = Object.assign(Root, {
  Trigger,
  Popup,
  Header: Dialog.Header,
  Body: Dialog.Body,
  Footer: Dialog.Footer,
  CloseButton: Dialog.CloseButton,
});

export { ModalDialog };
