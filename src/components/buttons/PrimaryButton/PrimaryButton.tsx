import { Button, ButtonProps } from "../Button/Button";
import { cn } from "../../../utils/styles";
import css from "./PrimaryButton.module.scss";

type PrimaryButtonProps = ButtonProps;

export const PrimaryButton = (props: PrimaryButtonProps) => {
  const { className, ...restProps } = props;

  return <Button className={cn(css.button, className)} {...restProps} />;
};
