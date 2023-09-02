import React from "react";
import { cn, commonCss } from "../../../utils/styles";

export type ButtonProps = React.ComponentPropsWithoutRef<"button">;

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (props, ref) => {
    const { type = "button", className, ...restProps } = props;

    return (
      <button
        ref={ref}
        className={cn(commonCss.interactive, className)}
        type={type}
        {...restProps}
      />
    );
  }
);

Button.displayName = "Button";
