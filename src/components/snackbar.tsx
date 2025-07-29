import * as Toast from "@radix-ui/react-toast";

export type SnackbarProps = {
  show: boolean;
  setShow: (show: boolean) => void;
  type?: "info" | "success" | "error" | "warning";
  title?: string;
  description?: string;
  showAction?: boolean;
  actionText?: string;
  direction?: "up" | "down" | "left" | "right";
  duration?: number;
};

export default function Snackbar({
  show = false,
  setShow,
  type = "info",
  title,
  description,
  showAction = false,
  actionText = "Fechar",
  direction = "down",
  duration = 3000,
}: SnackbarProps) {
  const colorsMap = {
    info: "bg-blue-500",
    success: "bg-green-600",
    error: "bg-red-500",
    warning: "bg-yellow-500",
  };

  return (
    <>
      <Toast.Provider
        swipeDirection={direction}
        duration={duration}
      >
        {show && (
          <Toast.Root
            defaultOpen
            onOpenChange={setShow}
            duration={duration}
            className={`${colorsMap[type]} text-white p-4 rounded-lg shadow-lg transition-all flex items-start gap-4`}
          >
            <div>
              {title && (
                <Toast.Title className="font-semibold">{title}</Toast.Title>
              )}
              {description && (
                <Toast.Description className="text-sm">
                  {description}
                </Toast.Description>
              )}
            </div>

            {showAction && (
              <Toast.Action asChild altText={actionText}>
                <button>{actionText}</button>
              </Toast.Action>
            )}
          </Toast.Root>
        )}

        <Toast.Viewport className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-[9999] w-auto max-w-sm outline-none" />
      </Toast.Provider>
    </>
  );
}
