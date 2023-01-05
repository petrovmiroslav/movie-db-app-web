import React from "react";
import { Icons } from "../../Icons/Icons";
import { useRouter } from "next/router";
import { cn, commonCss } from "../../../utils/styles";
import css from "./BackButton.module.scss";

type BackButtonProps = {
  className?: string;
};

export const BackButton = React.memo<BackButtonProps>((props) => {
  const { className } = props;
  const router = useRouter();

  return (
    <button
      className={cn(commonCss.interactive, css.button, className)}
      aria-label="go back"
      onClick={router.back}
    >
      <Icons.ArrowLeft className={css.icon} />
    </button>
  );
});

BackButton.displayName = "BackButton";
