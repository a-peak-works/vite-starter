import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  DetailedHTMLProps,
  FC,
  ReactNode,
} from "react";
import { isValidElement } from "react";
import type {
  ButtonProps as AriaButtonProps,
  PressEvent,
} from "react-aria-components";
import { Button as AriaButton } from "react-aria-components";
import { cx, sortCx } from "@/components/utils/cx";
import { isReactComponent } from "@/components/utils/is-react-component";

export const styles = sortCx({
  common: {
    root: [
      "group relative inline-flex h-max cursor-pointer items-center justify-center whitespace-nowrap outline-brand transition duration-100 ease-linear before:absolute focus-visible:outline-2 focus-visible:outline-offset-2",
      // Disabled styles
      "disabled:cursor-not-allowed disabled:text-fg-disabled",
      // Icon styles
      "disabled:*:data-icon:text-fg-disabled_subtle",
    ].join(" "),
    icon: "pointer-events-none shrink-0 transition-inherit-all",
  },

  sizes: {
    sm: {
      root: "gap-1 rounded-lg px-3 py-2 text-sm font-semibold before:rounded-[7px] data-icon-only:p-2",
      linkRoot: "gap-1",
      icon: "size-5",
    },
    md: {
      root: "gap-1 rounded-lg px-3.5 py-2.5 text-sm font-semibold before:rounded-[7px] data-icon-only:p-2.5",
      linkRoot: "gap-1",
      icon: "size-5",
    },
    lg: {
      root: "gap-1.5 rounded-lg px-4 py-2.5 text-md font-semibold before:rounded-[7px] data-icon-only:p-3",
      linkRoot: "gap-1.5",
      icon: "size-5",
    },
    xl: {
      root: "gap-1.5 rounded-lg px-4.5 py-3 text-md font-semibold before:rounded-[7px] data-icon-only:p-3.5",
      linkRoot: "gap-1.5",
      icon: "size-5",
    },
    "2xl": {
      root: "gap-2 rounded-[10px] px-5.5 py-4 text-lg font-semibold before:rounded-[9px] data-icon-only:p-4",
      linkRoot: "gap-2",
      icon: "size-6",
    },
  },

  colors: {
    primary: {
      root: [
        "bg-brand-solid text-white shadow-xs-skeumorphic ring-1 ring-transparent ring-inset hover:bg-brand-solid_hover data-loading:bg-brand-solid_hover",
        // Inner border gradient
        "before:absolute before:inset-px before:border before:border-white/12 before:mask-image-b",
        // Disabled styles
        "disabled:bg-disabled disabled:shadow-xs disabled:ring-border-disabled_subtle",
        // Icon styles
        "*:data-icon:text-button-primary-icon hover:*:data-icon:text-button-primary-icon_hover",
      ].join(" "),
    },
    secondary: {
      root: [
        "bg-primary text-secondary shadow-xs-skeumorphic ring-1 ring-border-primary ring-inset hover:bg-primary_hover hover:text-secondary_hover data-loading:bg-primary_hover",
        // Disabled styles
        "disabled:shadow-xs disabled:ring-border-disabled_subtle",
        // Icon styles
        "*:data-icon:text-fg-quaternary hover:*:data-icon:text-fg-quaternary_hover",
      ].join(" "),
    },
    tertiary: {
      root: [
        "text-tertiary hover:bg-primary_hover hover:text-tertiary_hover data-loading:bg-primary_hover",
        // Icon styles
        "*:data-icon:text-fg-quaternary hover:*:data-icon:text-fg-quaternary_hover",
      ].join(" "),
    },
    "link-gray": {
      root: [
        "justify-normal rounded-xs p-0! text-tertiary hover:text-tertiary_hover hover:underline hover:underline-offset-2",
        // Icon styles
        "*:data-icon:text-fg-quaternary hover:*:data-icon:text-fg-quaternary_hover",
      ].join(" "),
    },
    "link-color": {
      root: [
        "justify-normal rounded-xs p-0! text-brand-secondary hover:text-brand-secondary_hover hover:underline hover:underline-offset-2",
        // Icon styles
        "*:data-icon:text-fg-brand-secondary_alt hover:*:data-icon:text-fg-brand-secondary_hover",
      ].join(" "),
    },
    "primary-destructive": {
      root: [
        "bg-error-solid text-white shadow-xs-skeumorphic ring-1 ring-transparent outline-error ring-inset",
        // Inner border gradient
        "before:absolute before:inset-px before:border before:border-white/12 before:mask-image-b",
        // Disabled styles
        "disabled:bg-disabled disabled:shadow-xs disabled:ring-border-disabled_subtle",
        // Icon styles
        "*:data-icon:text-button-destructive-primary-icon hover:*:data-icon:text-button-destructive-primary-icon_hover",
      ].join(" "),
    },
    "secondary-destructive": {
      root: [
        "bg-primary text-error-primary shadow-xs-skeumorphic ring-1 ring-border-error_subtle outline-error ring-inset hover:bg-error-primary hover:text-error-primary_hover data-loading:bg-error-primary",
        // Disabled styles
        "disabled:bg-primary disabled:shadow-xs disabled:ring-border-disabled_subtle",
        // Icon styles
        "*:data-icon:text-fg-error-secondary hover:*:data-icon:text-fg-error-primary",
      ].join(" "),
    },
    "tertiary-destructive": {
      root: [
        "text-error-primary outline-error hover:bg-error-primary hover:text-error-primary_hover data-loading:bg-error-primary",
        // Icon styles
        "*:data-icon:text-fg-error-secondary hover:*:data-icon:text-fg-error-primary",
      ].join(" "),
    },
    "link-destructive": {
      root: [
        "justify-normal rounded-xs p-0! text-error-primary outline-error hover:text-error-primary_hover hover:underline hover:underline-offset-2",
        // Icon styles
        "*:data-icon:text-fg-error-secondary hover:*:data-icon:text-fg-error-primary",
      ].join(" "),
    },
  },
});

/**
 * Common props shared between button and anchor variants
 */
export interface CommonProps {
  /** Whether the link should open in a new tab */
  isExternal?: boolean;
  /** Disables the button and shows a disabled state */
  isDisabled?: boolean;
  /** Shows a loading spinner and disables the button */
  isLoading?: boolean;
  /** The size variant of the button */
  size?: keyof typeof styles.sizes;
  /** The color variant of the button */
  color?: keyof typeof styles.colors;
  /** Icon component or element to show before the text */
  iconLeading?: FC<{ className?: string }> | ReactNode;
  /** Icon component or element to show after the text */
  iconTrailing?: FC<{ className?: string }> | ReactNode;
  /** Removes horizontal padding from the text content */
  noTextPadding?: boolean;
  /** When true, keeps the text visible during loading state */
  showTextWhileLoading?: boolean;
}

/**
 * Props for the button variant (non-link)
 */
export interface ButtonProps
  extends CommonProps,
    DetailedHTMLProps<
      Omit<ButtonHTMLAttributes<HTMLButtonElement>, "color" | "slot">,
      HTMLButtonElement
    > {
  /** Slot name for react-aria component */
  slot?: AriaButtonProps["slot"];
}

/**
 * Props for the link variant (anchor tag)
 */
interface LinkProps
  extends CommonProps,
    DetailedHTMLProps<
      Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "color">,
      HTMLAnchorElement
    > {}

/** Union type of button and link props */
export type Props = ButtonProps | LinkProps;

export const Button = ({
  size = "sm",
  color = "primary",
  className,
  noTextPadding,
  iconLeading: IconLeading,
  iconTrailing: IconTrailing,
  children,
  onClick,
  isDisabled: disabled,
  isExternal: external,
  isLoading: loading,
  showTextWhileLoading,
  ...rest
}: Props) => {
  const href = "href" in rest ? rest.href : undefined;
  // Feel free to replace `a` with `Link`
  const Component = href ? "a" : AriaButton;

  const isIcon = (IconLeading || IconTrailing) && !children;
  const isLinkType = ["link-gray", "link-color", "link-destructive"].includes(
    color,
  );

  noTextPadding = isLinkType || noTextPadding;

  let props = {};

  if (href) {
    props = {
      onClick,

      href: disabled ? undefined : href,
      target: external ? "_blank" : undefined,
      rel: external ? "noopener noreferrer" : undefined,

      // Since anchor elements do not support the `disabled` attirbute and state,
      // we need to spefiify `data-rac` and `data-disabled` in order to be able
      // to use the `disabled:` selector in classes.
      ...(disabled ? { "data-rac": true, "data-disabled": true } : {}),
    };
  } else {
    props = {
      type: rest.type || "button",
      isPending: loading,
      isDisabled: disabled,
      onPress: (event: PressEvent) => {
        // @ts-expect-error FIX ME
        rest.onPress?.(event);
        onClick?.(event as any);
      },
    };
  }

  return (
    <Component
      data-loading={loading ? true : undefined}
      data-icon-only={isIcon ? true : undefined}
      // Remove `any` type assertion after splitting
      // Component into Link and Button.
      {...(rest as any)}
      {...props}
      className={cx(
        styles.common.root,
        styles.sizes[size].root,
        styles.colors[color].root,
        isLinkType && styles.sizes[size].linkRoot,
        (loading || (href && (disabled || loading))) && "pointer-events-none",
        // If in `loading` state, hide everything except the loading icon (and text if `showTextWhileLoading` is true).
        loading &&
          (showTextWhileLoading
            ? "[&>*:not([data-icon=loading]):not([data-text])]:hidden"
            : "[&>*:not([data-icon=loading])]:invisible"),
        className,
      )}
    >
      {/* Leading icon */}
      {isValidElement(IconLeading) && IconLeading}
      {isReactComponent(IconLeading) && (
        <IconLeading
          data-icon="leading"
          className={cx(styles.common.icon, styles.sizes[size].icon)}
        />
      )}

      {loading && (
        <svg
          data-icon="loading"
          viewBox="0 0 20 20"
          fill="none"
          className={cx(
            styles.common.icon,
            styles.sizes[size].icon,
            !showTextWhileLoading &&
              "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
          )}
        >
          {/* Background circle */}
          <circle
            className="stroke-current opacity-30"
            cx="10"
            cy="10"
            r="8"
            fill="none"
            strokeWidth="2"
          />
          {/* Spinning circle */}
          <circle
            className="origin-center animate-spin stroke-current"
            cx="10"
            cy="10"
            r="8"
            fill="none"
            strokeWidth="2"
            strokeDasharray="12.5 50"
            strokeLinecap="round"
          />
        </svg>
      )}

      {children && (
        <span data-text className={cx(!noTextPadding && "px-0.5")}>
          {children}
        </span>
      )}

      {/* Trailing icon */}
      {isValidElement(IconTrailing) && IconTrailing}
      {isReactComponent(IconTrailing) && (
        <IconTrailing
          data-icon="trailing"
          className={cx(styles.common.icon, styles.sizes[size].icon)}
        />
      )}
    </Component>
  );
};
