"use client";

import type { ReactNode } from "react";
import type { RadioGroupProps } from "react-aria-components";
import { Label, Radio, RadioGroup, Text } from "react-aria-components";
import { Button } from "@/components/shared/buttons/button";
import { CheckboxBase } from "@/components/shared/checkbox/checkbox";
import { cx } from "@/components/utils/cx";

interface PaymentCardItemType {
    value: string;
    title: string;
    description: string;
    logo: ReactNode;
    disabled?: boolean;
}

interface RadioGroupPaymentIconProps extends RadioGroupProps {
    size?: "sm" | "md";
    items: PaymentCardItemType[];
}

export const RadioGroupPaymentIcon = ({ items, size = "sm", className, ...props }: RadioGroupPaymentIconProps) => {
    return (
        <RadioGroup {...props} className={(state) => cx("flex flex-col gap-3", typeof className === "function" ? className(state) : className)}>
            {items.map((card) => (
                <Radio
                    isDisabled={card.disabled}
                    key={card.value}
                    value={card.value}
                    className={({ isDisabled, isSelected, isFocusVisible }) =>
                        cx(
                            "relative flex cursor-pointer items-start gap-1 rounded-xl bg-primary p-4 outline-focus-ring ring-inset",
                            isSelected ? "ring-2 ring-border-brand" : "ring-1 ring-border-secondary",
                            isDisabled && "cursor-not-allowed bg-disabled_subtle ring-border-disabled_subtle",
                            isFocusVisible && "outline-2 outline-offset-2",
                        )
                    }
                >
                    {({ isDisabled, isSelected, isFocusVisible }) => (
                        <>
                            <div className={cx("flex flex-1", size === "md" ? "gap-3 md:gap-4" : "gap-3")}>
                                <span className="shrink-0">{card.logo}</span>
                                <div>
                                    <div className={cx("flex flex-col", size === "md" ? "gap-0.5" : "")}>
                                        <Label
                                            className={cx("pointer-events-none text-secondary", size === "md" ? "text-md font-medium" : "text-sm font-medium")}
                                        >
                                            {card.title}
                                        </Label>
                                        <Text slot="description" className={cx("text-tertiary", size === "md" ? "text-md" : "text-sm")}>
                                            {card.description}
                                        </Text>
                                    </div>
                                    <div className={cx("flex gap-3", size === "md" ? "mt-3" : "mt-2")}>
                                        <Button color="link-gray" size={size === "md" ? "md" : "sm"} isDisabled={isDisabled}>
                                            Set as default
                                        </Button>
                                        <Button color="link-color" size={size === "md" ? "md" : "sm"} isDisabled={isDisabled}>
                                            Edit
                                        </Button>
                                    </div>
                                </div>
                            </div>

                            <CheckboxBase size={size === "md" ? "md" : "sm"} isDisabled={isDisabled} isSelected={isSelected} isFocusVisible={isFocusVisible} />
                        </>
                    )}
                </Radio>
            ))}
        </RadioGroup>
    );
};
