"use client";

import type { ReactNode } from "react";
import { Copy01 } from "@untitledui/icons";
import { TextField } from "react-aria-components";
import type { CommonProps } from "@/components/shared/buttons/button";
import { Button } from "@/components/shared/buttons/button";
import type { InputBaseProps } from "@/components/shared/input";
import { InputBase } from "@/components/shared/input";
import HintText from "@/components/shared/input/hint-text";
import Label from "@/components/shared/input/label";
import { cx } from "@/components/utils/cx";

interface InputWithButtonProps extends Omit<InputBaseProps, "icon"> {
    buttonText: string;
    onClick?: () => void;
    buttonColor?: CommonProps["color"];
    iconLeading?: CommonProps["iconLeading"];
    iconTrailing?: CommonProps["iconTrailing"];
    hint?: ReactNode;
}

export const InputWithButton = ({
    size = "sm",
    buttonColor = "secondary",
    iconLeading = Copy01,
    onClick,
    className,
    buttonText,
    label,
    hint,
    ...props
}: InputWithButtonProps) => {
    return (
        <TextField
            aria-label={!label ? props?.placeholder : undefined}
            {...props}
            className={(state) =>
                cx("flex h-max w-full flex-col items-start justify-start gap-1.5", typeof className === "function" ? className(state) : className)
            }
        >
            {({ isDisabled, isInvalid, isRequired }) => (
                <>
                    {label && <Label {...{ isRequired }}>{label}</Label>}

                    <div className="flex h-max w-full flex-row justify-center">
                        <InputBase {...props} {...{ isDisabled, isInvalid }} wrapperClassName="rounded-r-none z-10" />

                        {/* TODO: Take this button out of here and move it to be a prop so the user can fully control the button. */}
                        <Button
                            onClick={onClick}
                            color={buttonColor}
                            iconLeading={iconLeading}
                            size={size === "sm" ? "md" : "lg"}
                            className="-ml-px rounded-l-none shadow-xs! ring-1 ring-border-primary ring-inset focus:z-10"
                        >
                            {buttonText}
                        </Button>
                    </div>

                    {hint && <HintText {...{ isInvalid }}>{hint}</HintText>}
                </>
            )}
        </TextField>
    );
};

InputWithButton.displayName = "InputWithButton";
