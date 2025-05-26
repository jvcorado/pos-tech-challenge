import * as React from "react";
import Button from "./button";
import Dialog from "./ui/dialog";

const EditTransactionDialog = ({
  open,
  title,
  description,
  onOpenChange,
  onConfirmAction,
  children,
}: {
  open: boolean;
  title: string;
  description?: string;
  onOpenChange: (open: boolean) => void;
  onConfirmAction: () => void;
  children?: React.ReactNode;
}) => {
  return (
    <div className="z-999">
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
      actionComponent={
        <Button
          text="Confirmar"
          colors="green"
          onClick={() => {
            onConfirmAction();
            onOpenChange(false);
          }}
        />
      }
      cancelComponent={
        <Button
          text="Cancelar"
          colors="black"
          onClick={() => onOpenChange(false)}
        />
      }
      title={title}
      description={description}
    >
      {children || null}
    </Dialog>
    </div>
  );
};
export default EditTransactionDialog;
