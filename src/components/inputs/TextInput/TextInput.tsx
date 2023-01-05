import React, { useCallback } from 'react'
import { cn } from '../../../utils/styles'
import css from './TextInput.module.scss'

export type TextInputProps = {
  inputClassName?: string
  leftIcon?: React.ReactNode
  onValueChange?: (value: HTMLInputElement['value']) => void
} & React.InputHTMLAttributes<HTMLInputElement>

export const TextInput = React.forwardRef<HTMLInputElement, TextInputProps>((props, ref) => {
  const { className, inputClassName, leftIcon, onValueChange, onChange, ...restInputProps } = props

  const onChangeHandler = useCallback<React.ChangeEventHandler<HTMLInputElement>>(
    e => {
      onChange?.(e)
      onValueChange?.(e.currentTarget.value)
    },
    [onChange, onValueChange],
  )

  return (
    <div className={cn(css.wrapper, className)}>
      <input
        ref={ref}
        className={cn(css.input, leftIcon && css.input_withLeftIcon, inputClassName)}
        onChange={onChangeHandler}
        {...restInputProps}
      />

      {leftIcon && (
        <span className={cn(css.iconContainer, css.iconContainer_left)}>{leftIcon}</span>
      )}
    </div>
  )
})
TextInput.displayName = 'TextInput'
