import * as React from "react";
import Button from "../../button";
import Dialog from "../../ui/dialog";

const FilterTransactionsDialog = ({
  open,
  title,
  description,
  onOpenChange,
  onConfirmAction,
  onClearFilters,
  isFullScreen = false,
  showCloseButton = false,
  children,
}: {
  open: boolean;
  title: string;
  description?: string;
  onOpenChange: (open: boolean) => void;
  onConfirmAction: () => void;
  onClearFilters: () => void;
  isFullScreen?: boolean;
  showCloseButton?: boolean;
  children?: React.ReactNode;
}) => {
  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
      actionComponent={
        <Button
          text="Mostrar resultados"
          colors="green"
          onClick={() => {
            onConfirmAction();
            onOpenChange(false);
          }}
        />
      }
      cancelComponent={
        <Button
          text="Limpar e fechar"
          colors="black"
          onClick={() => {
            onClearFilters();
          }}
        />
      }
      title={title}
      description={description}
      isFullScreen={isFullScreen}
      showCloseButton={showCloseButton}
    >
      {children || null}
    </Dialog>
  );
};
export default FilterTransactionsDialog;
