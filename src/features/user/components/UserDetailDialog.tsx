import type { UserDetailResponse } from "@/entities/user";
import { genderData } from "@/shared/config/gender.data";
import { STATUS_CONFIG } from "@/shared/config/status.data";
import { RoleType } from "@/shared/constants/role";
import type { Status } from "@/shared/constants/status";
import { formatDateTime } from "@/shared/lib/format";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Badge,
  Button,
  Dialog,
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui";
import { zodResolver } from "@hookform/resolvers/zod";
import { DialogContent } from "@radix-ui/react-dialog";
import { Pencil, Trash2, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { updateUserByIdSchema, type UpdateUserByIdSchemaType } from "../schemas/update.schema";

const STATUS_OPTIONS = Object.keys(STATUS_CONFIG) as Status[];

interface UserDetailDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  user: UserDetailResponse | undefined;
  isLoading?: boolean;
  // Check user dang login co phai ADMIN khong
  currentUserRoles: string[];
  onUpdate: (values: UpdateUserByIdSchemaType) => void;
  onDelete: () => void;
  isUpdatePending?: boolean;
  isDeletePending?: boolean;
}

export function UserDetailDialog({
  open,
  onOpenChange,
  user,
  isLoading,
  currentUserRoles,
  onUpdate,
  onDelete,
  isUpdatePending = false,
  isDeletePending = false,
}: UserDetailDialogProps) {
  const [isEditing, setIsEditing] = useState(false);
  const isAdmin = currentUserRoles.includes(RoleType.ADMIN);
  const targetAdmin = user?.roles?.some((r) => r.name === RoleType.ADMIN) ?? false;
  const showDeleteBtn = isAdmin && !targetAdmin;

  const form = useForm<UpdateUserByIdSchemaType>({
    resolver: zodResolver(updateUserByIdSchema),
  });

  // detail
  useEffect(() => {
    if (!open) {
      setIsEditing(false);
      form.reset();
      return;
    }
    if (user) {
      form.reset({
        firstName: user.firstName,
        lastName: user.lastName,
        gender: user.gender,
        dob: user.dob,
        email: user.email,
        phoneNumber: user.phoneNumber,
        status: user.status,
      });
    }
  }, [open, user, form]);

  const handleSubmit = (values: UpdateUserByIdSchemaType) => {
    onUpdate(values);
    setIsEditing(false);
  };

  const initials =
    user?.fullName
      .split(" ")
      .slice(-2)
      .map((n) => n[0])
      .join("")
      .toUpperCase() ?? "?";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-crimson-red">User Detail</DialogTitle>
          <DialogDescription hidden />
        </DialogHeader>

        {isLoading || !user ? (
          <div className="flex items-center justify-center h-48 text-crimson-red/40 text-sm">
            Loading...
          </div>
        ) : (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="flex flex-col gap-5">
              {/* Avatar + Info header */}
              <div className="flex items-center gap-4">
                <Avatar className="size-16 shrink-0">
                  <AvatarImage src={user.profilePicture ?? undefined} alt={user.fullName} />
                  <AvatarFallback className="bg-crimson-red/10 text-crimson-red text-lg font-bold">
                    {initials}
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col gap-1 min-w-0">
                  <p className="font-semibold text-crimson-red truncate">{user.fullName}</p>
                  <div className="flex flex-wrap gap-1">
                    {user.roles?.map((r) => (
                      <Badge
                        key={r.id}
                        variant={r.name === RoleType.ADMIN ? "default" : "outline"}
                        size="sm"
                      >
                        {r.name}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-crimson-red/60">
                    <span
                      className={`size-2 rounded-full ${STATUS_CONFIG[user.status as Status]?.color ?? "bg-gray-400"}`}
                    />
                    {STATUS_CONFIG[user.status as Status]?.label ?? user.status}
                  </div>
                </div>
              </div>

              {/* Form fields */}
              <div className="flex flex-col gap-4">
                <div className="flex gap-3">
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormLabel variant="basic" required>
                          First Name
                        </FormLabel>
                        <FormControl>
                          <Input variant="basic" disabled={!isEditing} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormLabel variant="basic" required>
                          Last Name
                        </FormLabel>
                        <FormControl>
                          <Input variant="basic" disabled={!isEditing} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="flex gap-3">
                  <FormField
                    control={form.control}
                    name="gender"
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormLabel variant="basic" required>
                          Gender
                        </FormLabel>
                        <Select
                          disabled={!isEditing}
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <FormControl>
                            <SelectTrigger variant="auth">
                              <SelectValue />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {genderData.map((g) => (
                              <SelectItem key={g.value} value={g.value}>
                                {g.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="dob"
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormLabel variant="basic" required>
                          Date of Birth
                        </FormLabel>
                        <FormControl>
                          <Input variant="basic" type="date" disabled={!isEditing} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel variant="basic" required>
                        Email
                      </FormLabel>
                      <FormControl>
                        <Input variant="basic" type="email" disabled={!isEditing} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="phoneNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel variant="basic" required>
                        Phone Number
                      </FormLabel>
                      <FormControl>
                        <Input variant="basic" type="tel" disabled={!isEditing} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Status - chỉ edit khi có quyền */}
                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel variant="basic" required>
                        Status
                      </FormLabel>
                      <Select
                        disabled={!isEditing}
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger variant="auth">
                            <SelectValue />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {STATUS_OPTIONS.map((s) => (
                            <SelectItem key={s} value={s}>
                              {STATUS_CONFIG[s].label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Timestamps */}
              <div className="flex items-center justify-between text-xs text-crimson-red/50">
                <span>Created: {formatDateTime(user.createdAt)}</span>
                <span>Updated: {formatDateTime(user.updatedAt)}</span>
              </div>

              {/* Footer */}
              <DialogFooter className="flex-col sm:flex-row gap-2 pt-1">
                {/* Hard delete - chỉ ADMIN, không delete ADMIN */}
                {showDeleteBtn && (
                  <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    className="mr-auto"
                    disabled={isDeletePending || isUpdatePending}
                    onClick={onDelete}
                  >
                    <Trash2 className="size-4" />
                    {isDeletePending ? "Deleting..." : "Delete"}
                  </Button>
                )}

                {isEditing ? (
                  <>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setIsEditing(false);
                        if (user) {
                          form.reset({
                            firstName: user.firstName,
                            lastName: user.lastName,
                            gender: user.gender,
                            dob: user.dob,
                            email: user.email,
                            phoneNumber: user.phoneNumber,
                            status: user.status,
                          });
                        }
                      }}
                      disabled={isUpdatePending}
                    >
                      <X className="size-4" />
                      Cancel
                    </Button>
                    <Button type="submit" variant="authBlock" size="sm" disabled={isUpdatePending}>
                      {isUpdatePending ? "Saving..." : "Save Changes"}
                    </Button>
                  </>
                ) : (
                  <Button
                    type="button"
                    variant="panel"
                    size="sm"
                    onClick={() => setIsEditing(true)}
                  >
                    <Pencil className="size-4" />
                    Edit
                  </Button>
                )}
              </DialogFooter>
            </form>
          </Form>
        )}
      </DialogContent>
    </Dialog>
  );
}
