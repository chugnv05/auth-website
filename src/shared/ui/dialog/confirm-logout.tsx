import { DialogContent, DialogDescription, DialogTitle } from "@radix-ui/react-dialog";
import { Button } from "../button";
import { Dialog, DialogFooter, DialogHeader } from "../dialog";

type ConfirmDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title?: string;
  description?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm: () => void;
  loading?: boolean;
};

export function ConfirmLogout({
  open,
  onOpenChange,
  title = "Bạn có chắc chắn không?",
  description = "Hành động này không thể hoàn tác.",
  confirmLabel = "Xác nhận",
  cancelLabel = "Huỷ",
  onConfirm,
  loading = false,
}: ConfirmDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <DialogFooter className="gap-2">
          <Button variant="outline" onClick={() => onOpenChange(false)} disabled={loading}>
            {cancelLabel}
          </Button>
          <Button variant="destructive" onClick={onConfirm} disabled={loading}>
            {confirmLabel}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
