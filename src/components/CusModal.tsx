import { Portal, rem, ScrollArea, Transition } from "@mantine/core";
import { X } from "lucide-react";
import { createContext, useContext, useEffect } from "react";
import { RemoveScroll } from "react-remove-scroll";
import { cn } from "../utils/cn";

interface CustomModalProps {
  opened: boolean;
  onClose: () => void;
  title?: string | React.ReactNode; // If title is provided, it will be used as the header title
  footer?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  classNames?: {
    inner?: string;
    header?: string;
    body?: string;
    footer?: string;
  };
  size?: string; // ex: "600px", "40rem"
  bodyMaxHeight?: string; // ex: "80vh", "700px"
  keepMounted?: boolean; // Keep mounted when closed
}

const ModalContext = createContext<Pick<CustomModalProps, "title" | "onClose" | "classNames">>({
  title: "",
  onClose: () => {},
  classNames: {},
});

function Header({ children }: { children?: React.ReactNode }) {
  const { title, onClose, classNames } = useContext(ModalContext);

  return (
    <div
      className={cn(
        "flex items-center justify-between p-4 border-b border-gray-200 dark:border-zinc-700",
        classNames?.header,
      )}
    >
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white">{children ?? title}</h2>
      <button onClick={onClose} className="text-gray-500 hover:text-gray-900 dark:hover:text-white">
        <X className="w-5 h-5" />
      </button>
    </div>
  );
}

function Body({ children }: { children: React.ReactNode }) {
  const { classNames } = useContext(ModalContext);
  return (
    <ScrollArea.Autosize className="max-h-(--modal-body-max-height)">
      <div className={cn("p-4", classNames?.body)}>{children}</div>
    </ScrollArea.Autosize>
  );
}

function Footer({ children }: { children: React.ReactNode }) {
  const { classNames } = useContext(ModalContext);
  return (
    <div className={cn("p-4 border-t border-gray-200 dark:border-zinc-700", classNames?.footer)}>
      {children}
    </div>
  );
}

function CusModal({
  opened,
  onClose,
  title,
  children,
  footer,
  className,
  classNames = {},
  size = "1000px",
  bodyMaxHeight = "70dvh",
  keepMounted = false,
}: CustomModalProps) {
  const hasCustomHeader = (children as any)?.type === Header;
  const hasCustomBody = (children as any)?.type === Body;
  const hasCustomFooter = (children as any)?.type === Footer;

  // Logic to close modal when press Escape key
  useEffect(() => {
    if (!opened) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [opened, onClose]);

  return (
    <Portal>
      <Transition
        mounted={opened}
        transition="fade"
        duration={200}
        timingFunction="ease"
        keepMounted={keepMounted}
      >
        {(styles) => (
          <RemoveScroll enabled={opened}>
            <div
              className={cn(
                "fixed inset-0 z-modal bg-black/60 flex items-center justify-center p-4",
                className,
              )}
              style={styles}
              onClick={onClose}
            >
              <div
                className={cn(
                  "relative bg-white dark:bg-zinc-900 rounded-2xl shadow-xl w-[var(--modal-width)] flex flex-col",
                  classNames?.inner,
                )}
                style={
                  {
                    "--modal-width": rem(size),
                    "--modal-body-max-height": bodyMaxHeight,
                  } as React.CSSProperties
                }
                onClick={(e) => e.stopPropagation()}
              >
                <ModalContext.Provider value={{ title, onClose, classNames }}>
                  {!hasCustomHeader && <Header />}

                  {/* Nếu user không dùng Custom.Body thì wrap content */}
                  {!hasCustomBody && <Body>{children}</Body>}

                  {/* Nếu user dùng custom Header/Body/Footer thì render thẳng */}
                  {hasCustomHeader || hasCustomBody || hasCustomFooter ? children : null}

                  {!hasCustomFooter && footer && <Footer>{footer}</Footer>}
                </ModalContext.Provider>
              </div>
            </div>
          </RemoveScroll>
        )}
      </Transition>
    </Portal>
  );
}

CusModal.Header = Header;
CusModal.Body = Body;
CusModal.Footer = Footer;

export default CusModal;
