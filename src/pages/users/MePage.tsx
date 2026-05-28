import { useAuthStore } from "@/features/auth/store/auth.store";
import { MeCard } from "@/features/user/components/MeCard";
import { MeHeader } from "@/features/user/components/MeHeader";
import useUpdateMe from "@/features/user/hooks/useUpdateMe";
import { updateMeSchema, type UpdateMeSchemaType } from "@/features/user/schemas/update.schema";
import { Button, Form } from "@/shared/ui";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";

export default function MePage() {
  const user = useAuthStore((s) => s.user);
  const updateMe = useUpdateMe();
  const [isEditing, setIsEditing] = useState(false);
  const [avatarFile, setAvatarFile] = useState<File | undefined>(undefined);

  const form = useForm<UpdateMeSchemaType>({
    resolver: zodResolver(updateMeSchema),
    values: {
      firstName: user?.firstName ?? "undefined",
      lastName: user?.lastName ?? "undefined",
      gender: user?.gender ?? "UNKNOWN",
      dob: user?.dob ?? "",
      phoneNumber: user?.phoneNumber ?? "",
    },
  });

  if (!user) return null;

  const onCancel = () => {
    form.reset();
    setAvatarFile(undefined); // reset file khi cancel
    setIsEditing(false);
  };

  const onSubmit = (values: UpdateMeSchemaType) => {
    updateMe.mutate(
      { data: values, file: avatarFile },
      {
        onSuccess: () => {
          setIsEditing(false);
          setAvatarFile(undefined);
        },
      },
    );
  };
  return (
    <div className="page-container max-w-xl md:max-w-xl lg:max-w-2xl mx-auto py-10">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-8">
          <MeHeader user={user} isEditing={isEditing} onFileChange={setAvatarFile} />
          <MeCard form={form} user={user} isEditing={isEditing} />
          <div className="flex justify-between items-center">
            <Button
              type="button"
              variant={isEditing ? "outline" : "authBlock"}
              className="w-28"
              onClick={isEditing ? onCancel : () => setIsEditing(true)}
            >
              {isEditing ? "Cancel" : "Edit"}
            </Button>

            {isEditing && (
              <Button
                type="submit"
                variant="authBlock"
                className="w-28"
                disabled={updateMe.isPending}
              >
                {updateMe.isPending ? "Saving..." : "Save"}
              </Button>
            )}
          </div>
        </form>
      </Form>
    </div>
  );
}
