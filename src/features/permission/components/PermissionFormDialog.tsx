import type { PermissionDetailResponse } from "@/entities/permission";
import { useRolesByPermission, useRolesLimit } from "@/features/role";
import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
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
import { MultiSelectPicker } from "@/shared/ui/custom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { permissionSchema, type PermissionSchemaType } from "../schemas/permission.schema";

interface PermissionFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (values: PermissionSchemaType) => void;
  isPending?: boolean;
  // khi update thi truyen permission vao, create thì undefine
  permission?: PermissionDetailResponse;
}

export function PermissionFormDialog({
  open,
  onOpenChange,
  onSubmit,
  isPending = false,
  permission,
}: PermissionFormDialogProps) {
  const isEdit = !!permission;

  // all role -> picker
  const { data: roleOptions = [], isLoading: isLoadingRoles } = useRolesLimit();

  // all role dang duoc gan cho permission nay
  const { data: assignedRoleIds, isLoading: isLoadingAssigned } = useRolesByPermission(
    isEdit ? permission.id : undefined,
  );

  const form = useForm<PermissionSchemaType>({
    resolver: zodResolver(permissionSchema),
    defaultValues: { name: "", description: "", roles: [] },
  });

  // sreset form moi lan mo
  useEffect(() => {
    if (!open) return;
    form.reset({
      name: permission?.name ?? "",
      description: permission?.description ?? "",
      roles: [],
    });
  }, [open, permission, form]);

  // pre-fill roles sau khi data assigned load - only edit
  useEffect(() => {
    if (isEdit && assignedRoleIds) {
      form.setValue("roles", assignedRoleIds);
    }
  }, [assignedRoleIds, isEdit, form]);

  const isLoadingPicker = isLoadingRoles || (isEdit && isLoadingAssigned);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent aria-describedby={undefined} className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-crimson-red">
            {isEdit ? "Edit Permission" : "Create New Permission"}
          </DialogTitle>
          <DialogDescription hidden></DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
            {/* name */}
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
                      placeholder="VD: user:view_dashboard"
                      disabled={isEdit} // khong sua ten
                      {...field}
                      onChange={(e) => field.onChange(e.target.value.toLocaleLowerCase())}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* description */}
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
                    Roles
                  </FormLabel>
                  <FormControl>
                    <MultiSelectPicker
                      options={roleOptions}
                      value={field.value}
                      onChange={field.onChange}
                      isLoading={isLoadingPicker}
                      placeholder="Search roles..."
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
