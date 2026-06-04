import type { RoleDetailResponse } from "@/entities/role";
import { usePermissionsLimit } from "@/features/permission";
import { usePermissionsByRole } from "@/features/permission/hooks/usePermissions";
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
import { roleSchema, type RoleSchemaType } from "../schemas/role.schema";
interface RoleFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (values: RoleSchemaType) => void;
  isPending?: boolean;
  // khi update thi truyen role vao, create thì undefine
  role?: RoleDetailResponse;
}

export function RoleFormDialog({
  open,
  onOpenChange,
  onSubmit,
  isPending = false,
  role,
}: RoleFormDialogProps) {
  const isEdit = !!role;

  // all perrmission -> picker
  const { data: permissionOptions = [], isLoading: isLoadingPermissions } = usePermissionsLimit();

  // permissions duoc gan cho role nay - chi fetch khi edit

  const { data: assignedPermissionIds, isLoading: isLoadingAssigned } = usePermissionsByRole(
    isEdit ? role.id : undefined,
  );

  const form = useForm<RoleSchemaType>({
    resolver: zodResolver(roleSchema),
    defaultValues: { name: "", description: "", permissions: [] },
  });

  // reset form moi lan mo dialog edit
  useEffect(() => {
    if (!open) return;
    form.reset({
      name: role?.name ?? "",
      description: role?.description ?? "",
      permissions: [],
    });
  }, [open, role, form]);

  // pre-fill permissions sau khi assigned load xong - only edit
  useEffect(() => {
    if (isEdit && assignedPermissionIds) {
      form.setValue("permissions", assignedPermissionIds);
    }
  }, [assignedPermissionIds, isEdit, form]);

  const isLoadingPicker = isLoadingPermissions || (isEdit && isLoadingAssigned);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-crimson-red">
            {isEdit ? "Edit Role" : "Create New Role"}
          </DialogTitle>
          <DialogDescription hidden></DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
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
                      placeholder="VD: MANAGER_HR"
                      disabled={isEdit} // khong sua ten
                      {...field}
                      onChange={(e) => field.onChange(e.target.value.toUpperCase())}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Description */}
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
                      placeholder="Description of this role"
                      className="resize-none"
                      rows={3}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Permissions picker */}
            <FormField
              control={form.control}
              name="permissions"
              render={({ field }) => (
                <FormItem>
                  <FormLabel variant="basic" required>
                    Permissions
                  </FormLabel>
                  <FormControl>
                    <MultiSelectPicker
                      options={permissionOptions}
                      value={field.value}
                      onChange={field.onChange}
                      isLoading={isLoadingPicker}
                      placeholder="Search permission..."
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
