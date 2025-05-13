"use client";

import type { ComponentType, HTMLAttributes, ReactNode, Ref } from "react";
import { HelpCircle, InfoCircle } from "@untitledui/icons";
import type { InputProps as AriaInputProps, TextFieldProps as AriaTextFieldProps } from "react-aria-components";
import { Input as AriaInput, TextField as AriaTextField, Group } from "react-aria-components";
import HintText from "@/components/shared/input/hint-text";
import Label from "@/components/shared/input/label";
import { Tooltip, TooltipTrigger } from "@/components/shared/tooltip/tooltip";
import { cx, sortCx } from "@/components/utils/cx";

export interface InputBaseProps extends TextFieldProps {
    tooltip?: string;
    size?: "sm" | "md";
    placeholder?: string;
    iconClassName?: string;
    inputClassName?: string;
    wrapperClassName?: string;
    tooltipClassName?: string;
    shortcut?: string | boolean;
    ref?: Ref<HTMLInputElement>;
    groupRef?: Ref<HTMLDivElement>;
    icon?: ComponentType<HTMLAttributes<HTMLOrSVGElement>>;
}

export const InputBase = ({
    size = "sm",
    placeholder,
    icon: Icon,
    isDisabled,
    isInvalid,
    tooltip,
    shortcut,
    ref,
    groupRef,
    wrapperClassName,
    tooltipClassName,
    inputClassName,
    iconClassName,
    ...inputProps
}: InputBaseProps) => {
    // Check if the input has a leading icon or tooltip
    const hasTrailingIcon = tooltip || isInvalid;
    const hasLeadingIcon = Icon;

    const sizes = sortCx({
        sm: {
            root: cx("px-3 py-2", hasTrailingIcon && "pr-9", hasLeadingIcon && "pl-10"),
            iconLeading: "left-3",
            iconTrailing: "right-3",
            shortcut: "pr-2.5",
        },
        md: {
            root: cx("px-3.5 py-2.5", hasTrailingIcon && "pr-9.5", hasLeadingIcon && "pl-10.5"),
            iconLeading: "left-3.5",
            iconTrailing: "right-3.5",
            shortcut: "pr-3",
        },
    });

    return (
        <Group
            {...{ isDisabled, isInvalid }}
            ref={groupRef}
            className={({ isFocusWithin, isDisabled, isInvalid }) =>
                cx(
                    "relative flex w-full flex-row place-content-center place-items-center rounded-lg bg-primary shadow-xs ring-1 ring-border-primary transition-shadow duration-100 ease-linear ring-inset",

                    isFocusWithin && !isDisabled && "ring-2 ring-border-brand",

                    // Disabled state styles
                    isDisabled && "cursor-not-allowed bg-disabled_subtle ring-border-disabled",
                    "group-disabled:cursor-not-allowed group-disabled:bg-disabled_subtle group-disabled:ring-border-disabled",

                    // Invalid state styles
                    isInvalid && "ring-border-error_subtle",
                    "group-invalid:ring-border-error_subtle",

                    // Invalid state with focus-within styles
                    isInvalid && isFocusWithin && "ring-2 ring-border-error",
                    isFocusWithin && "group-invalid:ring-2 group-invalid:ring-border-error",

                    wrapperClassName,
                )
            }
        >
            {/* Leading icon and Payment icon */}
            {Icon && (
                <Icon
                    className={cx(
                        "pointer-events-none absolute size-5 text-fg-quaternary",
                        isDisabled && "text-fg-disabled",
                        sizes[size].iconLeading,
                        iconClassName,
                    )}
                />
            )}

            {/* Input field */}
            <AriaInput
                {...(inputProps as AriaInputProps)}
                ref={ref}
                placeholder={placeholder}
                className={cx(
                    "m-0 w-full bg-transparent text-md text-primary ring-0 outline-hidden placeholder:text-placeholder autofill:rounded-lg autofill:text-primary",
                    isDisabled && "cursor-not-allowed text-disabled",
                    sizes[size].root,
                    inputClassName,
                )}
            />

            {/* Tooltip and help icon */}
            {tooltip && !isInvalid && (
                <Tooltip title={tooltip} placement="top">
                    <TooltipTrigger
                        className={cx(
                            "absolute cursor-pointer text-fg-quaternary transition duration-200 hover:text-fg-quaternary_hover focus:text-fg-quaternary_hover",
                            sizes[size].iconTrailing,
                            tooltipClassName,
                        )}
                    >
                        <HelpCircle className="size-4" />
                    </TooltipTrigger>
                </Tooltip>
            )}

            {/* Invalid icon */}
            {isInvalid && (
                <InfoCircle className={cx("pointer-events-none absolute size-4 text-fg-error-secondary", sizes[size].iconTrailing, tooltipClassName)} />
            )}

            {/* Shortcut */}
            {shortcut && (
                <div
                    className={cx(
                        "absolute inset-y-0.5 right-0.5 z-10 flex items-center rounded-r-[inherit] bg-linear-to-r from-transparent to-bg-primary to-40% pl-8",
                        sizes[size].shortcut,
                    )}
                >
                    <span
                        className={cx(
                            "pointer-events-none rounded px-1 py-px text-xs font-medium text-quaternary ring-1 ring-border-secondary select-none ring-inset",
                            isDisabled && "bg-transparent text-disabled",
                        )}
                        aria-hidden="true"
                    >
                        {typeof shortcut === "string" ? shortcut : "⌘K"}
                    </span>
                </div>
            )}
        </Group>
    );
};

InputBase.displayName = "InputBase";

interface TextFieldProps extends AriaTextFieldProps {
    ref?: Ref<HTMLDivElement>;
    label?: string;
    hint?: ReactNode;
}

export const TextField = ({ className, ...props }: TextFieldProps) => {
    return (
        <AriaTextField
            {...props}
            className={(state) =>
                cx("group flex h-max w-full flex-col items-start justify-start gap-1.5", typeof className === "function" ? className(state) : className)
            }
        >
            {props.children}
        </AriaTextField>
    );
};

TextField.displayName = "TextField";

interface InputProps extends InputBaseProps {
    hideRequiredIndicator?: boolean;
    label?: string;
    hint?: ReactNode;
}

export const Input = ({
    size = "sm",
    placeholder,
    icon: Icon,
    label,
    hint,
    shortcut,
    hideRequiredIndicator,
    className,
    ref,
    groupRef,
    tooltip,
    iconClassName,
    inputClassName,
    wrapperClassName,
    tooltipClassName,
    ...props
}: InputProps) => {
    return (
        <TextField aria-label={!label ? placeholder : undefined} {...props} className={className}>
            {label && <Label isRequired={hideRequiredIndicator ? !hideRequiredIndicator : undefined}>{label}</Label>}

            <InputBase
                {...{ ref, groupRef, size, placeholder, icon: Icon, shortcut, iconClassName, inputClassName, wrapperClassName, tooltipClassName, tooltip }}
            />

            {hint && <HintText>{hint}</HintText>}
        </TextField>
    );
};

Input.displayName = "Input";
