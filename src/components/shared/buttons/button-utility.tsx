"use client";

import type { DetailedHTMLProps, FC, HTMLAttributes, ReactNode } from "react";
import React, { isValidElement } from "react";
import type { ButtonProps as AriaButtonProps } from "react-aria-components";
import { Button as AriaButton } from "react-aria-components";
import { cx, sortCx } from "@/components/utils/cx";
import { isReactComponent } from "@/components/utils/is-react-component";
import { Tooltip } from "../tooltip/tooltip";

export const styles = sortCx({
    common: {
        root: "group relative inline-flex h-max cursor-pointer items-center justify-center outline-focus-ring transition duration-100 ease-linear focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:text-fg-disabled_subtle",
        icon: "pointer-events-none shrink-0 text-current transition-inherit-all",
    },

    sizes: {
        xs: {
            root: "rounded-md p-1.5",
            icon: "size-4",
        },
        sm: {
            root: "rounded-md p-1.5",
            icon: "size-5",
        },
    },

    colors: {
        secondary: {
            root: "bg-primary text-fg-quaternary shadow-xs-skeumorphic ring-1 ring-border-primary ring-inset hover:bg-primary_hover hover:text-fg-quaternary_hover disabled:shadow-xs disabled:ring-border-disabled_subtle",
        },
        tertiary: {
            root: "text-fg-quaternary hover:bg-primary_hover hover:text-fg-quaternary_hover",
        },
    },
});

export interface ButtonUtilityProps extends DetailedHTMLProps<Omit<HTMLAttributes<HTMLButtonElement>, "color" | "slot">, HTMLButtonElement> {
    disabled?: boolean;
    color?: keyof typeof styles.colors;
    size?: keyof typeof styles.sizes;
    icon?: FC<{ className?: string }> | ReactNode;
    slot?: AriaButtonProps["slot"];
    tooltip?: string;
}

const ButtonUtility = ({ size = "sm", color = "secondary", className, icon: Icon, children, onClick, disabled, tooltip, ...rest }: ButtonUtilityProps) => {
    const Component = "href" in rest ? "a" : AriaButton;

    const content = (
        <Component
            isDisabled={disabled}
            type="button"
            // Remove `any` type assertion after splitting
            // Component into Link and Button.
            {...(rest as any)}
            onPress={(event) => {
                // @ts-expect-error FIX ME
                rest.onPress?.(event);
                onClick?.(event as any);
            }}
            className={cx(
                styles.common.root,
                styles.sizes[size].root,
                styles.colors[color].root,

                color === "tertiary" && size === "xs" && "p-2",
                className,
            )}
        >
            {isReactComponent(Icon) && <Icon data-icon="leading" className={cx(styles.common.icon, styles.sizes[size].icon)} />}
            {isValidElement(Icon) && Icon}
        </Component>
    );

    if (tooltip) {
        return (
            <Tooltip title={tooltip} offset={size === "xs" ? 4 : 6}>
                {content}
            </Tooltip>
        );
    }

    return content;
};

export default ButtonUtility;
