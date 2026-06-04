import type { PermissionDetailResponse } from "@/entities/permission";
import {
  Button,
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Textarea,
} from "@/shared/ui";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { permissionSchema, type PermissionSchemaType } from "../schemas/permission.schema";

type PermissionFormDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (values: PermissionSchemaType) => void;
  isPending?: boolean;
  // khi update thi truyen permission vao, create thì undefine
  permission?: PermissionDetailResponse;
};

export function PermissionFormDialog({
  open,
  onOpenChange,
  onSubmit,
  isPending = false,
  permission,
}: PermissionFormDialogProps) {
  const isEdit = !!permission;
  const form = useForm<PermissionSchemaType>({
    resolver: zodResolver(permissionSchema),
    defaultValues: {
      name: "",
      description: "",
      roles: [],
    },
  });

  // sync - đồng bộ khi mo dialog edit
  useEffect(() => {
    if (open) {
      if (permission) {
        form.reset({
          name: permission.name,
          description: permission.description,
          roles: [], // cần bổ sung list role
        });
      } else {
        form.reset({ name: "", description: "", roles: [] });
      }
    }
  }, [open, permission]);

  const handleSubmit = (values: PermissionSchemaType) => {
    onSubmit(values);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-crimson-red">
            {isEdit ? "Edit Permissions" : "Create New Permissions"}
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="flex flex-col gap-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel variant="basic" required>
                    Name
                  </FormLabel>
                  <FormControl>
                    <Input
                      variant="basic"
                      placeholder="VD: user:view_self"
                      disabled={isEdit} // tên không sửa được khi edit (BE logic)
                      {...field}
                      onChange={(e) => field.onChange(e.target.value.toLocaleLowerCase())}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel variant="basic" required>
                    Description
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      variant="basic"
                      placeholder="Description of this permission"
                      className="resize-none"
                      rows={3}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="roles"
              render={({ field }) => (
                <FormItem>
                  <FormLabel variant="basic" required>
                    Roles - Select the roles for this permission
                  </FormLabel>
                  <FormControl>
                    <Input
                      variant="basic"
                      placeholder="id1, id2, id3"
                      value={field.value.join(", ")}
                      onChange={(e) => {
                        const ids = e.target.value
                          .split(",")
                          .map((s) => s.trim())
                          .filter(Boolean);
                        field.onChange(ids);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter className="pt-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
                disabled={isPending}
              >
                Cancel
              </Button>
              <Button type="submit" variant="authBlock" disabled={isPending}>
                {isPending ? "Saving..." : isEdit ? "Edit" : "Add"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
