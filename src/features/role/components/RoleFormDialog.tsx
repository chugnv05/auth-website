import type { RoleDetailResponse } from "@/entities/role";
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
import { roleSchema, type RoleSchemaType } from "../schemas/role.schema";

type RoleFormDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (values: RoleSchemaType) => void;
  isPending?: boolean;
  // khi update thi truyen role vao, create thì undefine
  role?: RoleDetailResponse;
};

export function RoleFormDialog({
  open,
  onOpenChange,
  onSubmit,
  isPending = false,
  role,
}: RoleFormDialogProps) {
  const isEdit = !!role;
  const form = useForm<RoleSchemaType>({
    resolver: zodResolver(roleSchema),
    defaultValues: {
      name: "",
      description: "",
      permissions: [],
    },
  });

  // sync - đồng bộ khi mo dialog edit
  useEffect(() => {
    if (open) {
      if (role) {
        form.reset({
          name: role.name,
          description: role.description,
          permissions: [], // cần bổ sung list permission
        });
      } else {
        form.reset({ name: "", description: "", permissions: [] });
      }
    }
  }, [open, role]);

  const handleSubmit = (values: RoleSchemaType) => {
    onSubmit(values);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-crimson-red">
            {isEdit ? "Edit Roles" : "Create New Roles"}
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
                      placeholder="VD: MANAGER_HR"
                      disabled={isEdit} // tên không sửa được khi edit (BE logic)
                      {...field}
                      onChange={(e) => field.onChange(e.target.value.toUpperCase())}
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

            <FormField
              control={form.control}
              name="permissions"
              render={({ field }) => (
                <FormItem>
                  <FormLabel variant="basic" required>
                    Permissions - Select the permissions for this role
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
                {isPending ? "Đang Saving..." : isEdit ? "Edit" : "Add"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
