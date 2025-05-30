import type { HTMLAttributes } from "react";
import type { InputBaseProps } from "@/components/shared/input";
import { InputBase, TextField } from "@/components/shared/input";
import { HintText } from "@/components/shared/input/hint-text";
import { Label } from "@/components/shared/input/label";
import { cx } from "@/components/utils/cx";

interface InputPrefixProps extends HTMLAttributes<HTMLDivElement> {
    position?: "leading" | "trailing";
    size?: "sm" | "md";
    isDisabled?: boolean;
}

export const InputPrefix = ({ position = "leading", size = "sm", isDisabled, children, ...props }: InputPrefixProps) => {
    const styles = {
        sm: "px-3 py-2",
        md: "py-2.5 pl-3.5 pr-3",
    };

    return (
        <div
            {...props}
            className={cx(
                "flex text-md text-tertiary shadow-xs ring-1 ring-border-primary ring-inset",
                styles[size],
                position === "leading" && "-mr-px rounded-l-lg",
                position === "trailing" && "-ml-px rounded-r-lg",

                // Disabled state
                isDisabled && "border-disabled bg-disabled_subtle text-tertiary",
                "group-disabled:border-disabled group-disabled:bg-disabled_subtle group-disabled:text-tertiary",

                props.className,
            )}
        >
            {children}
        </div>
    );
};

interface InputWithPrefixProps extends Omit<InputBaseProps, "icon"> {
    leadingText?: string;
    trailingText?: string;
}

export const InputWithPrefix = ({ size = "sm", placeholder, leadingText, trailingText, className, label, hint, ...props }: InputWithPrefixProps) => {
    return (
        <TextField aria-label={!label ? placeholder : undefined} {...props} className={className}>
            {label && <Label>{label}</Label>}

            <div className="flex w-full">
                {leadingText && (
                    <InputPrefix position="leading" size={size}>
                        {leadingText}
                    </InputPrefix>
                )}

                <InputBase {...props} {...{ size, placeholder }} wrapperClassName={cx(trailingText && "rounded-r-none", leadingText && "rounded-l-none")} />

                {trailingText && (
                    <InputPrefix position="trailing" size={size}>
                        {trailingText}
                    </InputPrefix>
                )}
            </div>

            {hint && <HintText>{hint}</HintText>}
        </TextField>
    );
};

InputWithPrefix.displayName = "InputWithPrefix";
