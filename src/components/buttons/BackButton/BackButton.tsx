import React from "react";
import { Icons } from "../../Icons/Icons";
import { useRouter } from "next/router";
import { cn } from "../../../utils/styles";
import { Button } from "../Button/Button";
import { useTranslation } from "next-i18next";
import css from "./BackButton.module.scss";

type BackButtonProps = {
  className?: string;
};

export const BackButton = React.memo<BackButtonProps>((props) => {
  const { className } = props;
  const router = useRouter();
  const { t } = useTranslation(["common"]);

  return (
    <Button
      className={cn(css.button, className)}
      aria-label={t("components.BackButton.backButtonAriaLabel")}
      onClick={router.back}
    >
      <Icons.ArrowLeft className={css.icon} />
    </Button>
  );
});

BackButton.displayName = "BackButton";
