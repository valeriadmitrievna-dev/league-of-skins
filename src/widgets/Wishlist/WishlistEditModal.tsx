import { useEffect, useState, type FC, type PropsWithChildren } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router";
import { toast } from 'sonner';

import { useUpdateWishlistMutation } from "@/api";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Field } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/ui/spinner";
import { Switch } from "@/components/ui/switch";
import type { WishlistFullDto } from "@/types/wishlist";

interface EditWishlistProps extends PropsWithChildren {
  wishlist: WishlistFullDto;
}

interface EditWishlistFormInput {
  name: string;
}

const WishlistEditModal: FC<EditWishlistProps> = ({ wishlist, children }) => {
  const { t } = useTranslation();
  const { wishlistId } = useParams();

  const [updateWishlist, { isLoading: isWishlistUpdating }] = useUpdateWishlistMutation();

  const [open, setOpen] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
  } = useForm<EditWishlistFormInput>({
    defaultValues: { name: wishlist.name },
  });

  const [isPublic, setPublic] = useState(!wishlist.private);

  const closeHandler = () => {
    setOpen(false);
  };

  const openChangeHandler = (value: boolean) => {
    if (value) {
      setOpen(true);
      setPublic(!wishlist.private);
      reset({ name: wishlist.name });
    } else {
      closeHandler();
    }
  };

  const hasChanges = isDirty || isPublic !== !wishlist.private;

  const submitHandler: SubmitHandler<EditWishlistFormInput> = async (formData) => {
    try {
      await updateWishlist({ wishlistId: wishlistId ?? "", body: { name: formData.name, private: !isPublic } });
      toast.success('Вишлист успешно изменен')
      setOpen(false);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    setPublic(!wishlist.private);
  }, [wishlist]);

  return (
    <Dialog open={open} onOpenChange={openChangeHandler}>
      <DialogTrigger asChild>{children ?? <Button>{t("wishlist.edit")}</Button>}</DialogTrigger>
      <DialogContent showCloseButton className="gap-y-5">
        <DialogTitle>{t("wishlist.edit_title")}</DialogTitle>
        <form className="flex flex-col gap-y-4">
          <Field className="gap-y-2">
            <Label htmlFor="name">{t("wishlist.edit_name_title")}</Label>
            <Input
              id="name"
              {...register("name", { required: true })}
              autoFocus
              placeholder={t("wishlist.edit_name_placeholder")}
              aria-invalid={errors.name ? "true" : "false"}
            />
          </Field>

          <Field className="gap-y-2 justify-between" orientation="horizontal">
            <Label htmlFor="visibility">{t("wishlist.edit_public_title")}</Label>
            <Switch id="visibility" checked={isPublic} onCheckedChange={setPublic} />
          </Field>

          <div className="flex flex-col gap-y-2">
            <Button
              onClick={handleSubmit(submitHandler)}
              disabled={isWishlistUpdating || !hasChanges}
              type="submit"
            >
              {isWishlistUpdating && <Spinner />}
              {t("shared.save")}
            </Button>
            <Button type="button" variant="outline" onClick={closeHandler}>
              {t("shared.cancel")}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default WishlistEditModal;
