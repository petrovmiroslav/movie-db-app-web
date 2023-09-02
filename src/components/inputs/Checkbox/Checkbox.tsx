import React from "react";
import { cn, commonCss } from "../../../utils/styles";
import css from "./Checkbox.module.scss";

export type CheckboxProps = {
  labelProps?: React.ComponentPropsWithoutRef<"label">;
  inputProps: {
    id: NonNullable<React.ComponentPropsWithoutRef<"input">["id"]>;
  } & React.ComponentPropsWithoutRef<"input">;
} & React.ComponentPropsWithoutRef<"span">;

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  (props, ref) => {
    const { inputProps, labelProps, className, ...restProps } = props;

    const {
      type = "checkbox",
      className: inputClassName,
      id: inputId,
      ...restInputProps
    } = inputProps ?? {};

    const { className: labelClassName, ...restLabelProps } = labelProps ?? {};

    return (
      <span className={cn(css.container, className)} {...restProps}>
        <input
          ref={ref}
          className={cn(commonCss.visuallyHidden, inputClassName)}
          type={type}
          id={inputId}
          {...restInputProps}
        />

        <label
          className={cn(commonCss.interactive, css.label, labelClassName)}
          htmlFor={inputId}
          {...restLabelProps}
        >
          {props.children}
        </label>
      </span>
    );
  }
);

Checkbox.displayName = "Checkbox";
