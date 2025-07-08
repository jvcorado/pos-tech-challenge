import * as React from "react";
import Button from "../../button";
import Dialog from "../../ui/dialog";

const FilterTransactionsDialog = ({
  open,
  title,
  description,
  onOpenChange,
  onConfirmAction,
  isFullScreen = false,
  children,
}: {
  open: boolean;
  title: string;
  description?: string;
  onOpenChange: (open: boolean) => void;
  onConfirmAction: () => void;
  isFullScreen?: boolean;
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
          text="Limpar"
          colors="black"
          onClick={() => onOpenChange(false)}
        />
      }
      title={title}
      description={description}
      isFullScreen={isFullScreen}
    >
      {children || null}
    </Dialog>
  );
};
export default FilterTransactionsDialog;
