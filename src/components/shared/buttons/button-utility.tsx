"use client";

import type { DetailedHTMLProps, FC, HTMLAttributes, ReactNode } from "react";
import { isValidElement } from "react";
import type { Placement } from "react-aria";
import type { ButtonProps as AriaButtonProps } from "react-aria-components";
import { Button as AriaButton, Link as AriaLink } from "react-aria-components";
import { cx } from "@/components/utils/cx";
import { isReactComponent } from "@/components/utils/is-react-component";
import { Tooltip } from "../tooltip/tooltip";

export const styles = {
    secondary:
        "bg-primary text-fg-quaternary shadow-xs-skeumorphic ring-1 ring-border-primary ring-inset hover:bg-primary_hover hover:text-fg-quaternary_hover disabled:shadow-xs disabled:ring-border-disabled_subtle",
    tertiary: "text-fg-quaternary hover:bg-primary_hover hover:text-fg-quaternary_hover",
};

export interface ButtonUtilityProps extends DetailedHTMLProps<Omit<HTMLAttributes<HTMLButtonElement>, "color" | "slot">, HTMLButtonElement> {
    isDisabled?: boolean;
    color?: "secondary" | "tertiary";
    size?: "xs" | "sm";
    icon?: FC<{ className?: string }> | ReactNode;
    slot?: AriaButtonProps["slot"];
    tooltip?: string;
    tooltipPlacement?: Placement;
}

export const ButtonUtility = ({
    tooltip,
    children,
    className,
    isDisabled,
    icon: Icon,
    size = "sm",
    color = "secondary",
    tooltipPlacement = "top",
    ...otherProps
}: ButtonUtilityProps) => {
    const Component = "href" in otherProps ? AriaLink : AriaButton;

    const content = (
        <Component
            type="button"
            aria-label={tooltip}
            isDisabled={isDisabled}
            // Remove `any` type assertion after splitting
            // Component into Link and Button.
            {...(otherProps as any)}
            className={cx(
                "group relative inline-flex h-max cursor-pointer items-center justify-center rounded-md p-1.5 outline-focus-ring transition duration-100 ease-linear focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:text-fg-disabled_subtle",
                styles[color],

                // Icon styles
                "*:data-icon:pointer-events-none *:data-icon:shrink-0 *:data-icon:text-current *:data-icon:transition-inherit-all",
                size === "xs" ? "*:data-icon:size-4" : "*:data-icon:size-5",

                className,
            )}
        >
            {isReactComponent(Icon) && <Icon data-icon />}
            {isValidElement(Icon) && Icon}
        </Component>
    );

    if (tooltip) {
        return (
            <Tooltip title={tooltip} placement={tooltipPlacement} isDisabled={isDisabled} offset={size === "xs" ? 4 : 6}>
                {content}
            </Tooltip>
        );
    }

    return content;
};
