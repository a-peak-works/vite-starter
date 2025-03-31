import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  DetailedHTMLProps,
} from "react";
import type { ButtonProps as AriaButtonProps } from "react-aria-components";
import { Button as AriaButton } from "react-aria-components";
import { cx, sortCx } from "@/components/utils/cx";
import {
  AppleLogo,
  DribbleLogo,
  FacebookLogo,
  FigmaLogo,
  FigmaLogoOutlined,
  GoogleLogo,
  TwitterLogo,
} from "./social-logos";

export const styles = sortCx({
  common: {
    root: "group relative inline-flex h-max cursor-pointer items-center justify-center font-semibold whitespace-nowrap outline-focus-ring transition duration-100 ease-linear before:absolute focus:outline-2 focus:outline-offset-2 disabled:cursor-not-allowed disabled:stroke-fg-disabled disabled:text-fg-disabled disabled:*:text-fg-disabled",
    icon: "pointer-events-none shrink-0 transition-inherit-all",
  },

  sizes: {
    sm: {
      root: "gap-2 rounded-lg px-3 py-2 text-sm leading-sm before:rounded-[7px] data-icon-only:p-2",
    },
    md: {
      root: "gap-2.5 rounded-lg px-3.5 py-2.5 text-sm leading-sm before:rounded-[7px] data-icon-only:p-2.5",
    },
    lg: {
      root: "gap-3 rounded-lg px-4 py-2.5 text-md leading-md before:rounded-[7px] data-icon-only:p-2.5",
    },
    xl: {
      root: "gap-3.5 rounded-lg px-4.5 py-3 text-md leading-md before:rounded-[7px] data-icon-only:p-3.5",
    },
    "2xl": {
      root: "gap-4 rounded-[10px] px-5.5 py-4 text-lg leading-lg before:rounded-[9px] data-icon-only:p-4",
    },
  },

  colors: {
    gray: {
      root: "bg-primary text-secondary shadow-xs-skeumorphic ring-1 ring-border-primary ring-inset hover:bg-primary_hover hover:text-secondary_hover",
      icon: "text-fg-quaternary group-hover:text-fg-quaternary_hover",
    },
    black: {
      root: "bg-black text-white shadow-xs-skeumorphic ring-1 ring-transparent ring-inset before:absolute before:inset-px before:border before:border-white/12 before:mask-image-b",
      icon: "",
    },

    facebook: {
      root: "bg-[#1877F2] text-white shadow-xs-skeumorphic ring-1 ring-transparent ring-inset before:absolute before:inset-px before:border before:border-white/12 before:mask-image-b hover:bg-[#0C63D4]",
      icon: "",
    },

    dribble: {
      root: "bg-[#EA4C89] text-white shadow-xs-skeumorphic ring-1 ring-transparent ring-inset before:absolute before:inset-px before:border before:border-white/12 before:mask-image-b hover:bg-[#E62872]",
      icon: "",
    },
  },
});

interface CommonProps {
  social: "google" | "facebook" | "apple" | "twitter" | "figma" | "dribble";
  disabled?: boolean;
  theme?: "brand" | "color" | "gray";
  size?: keyof typeof styles.sizes;
}

interface ButtonProps
  extends CommonProps,
    DetailedHTMLProps<
      Omit<ButtonHTMLAttributes<HTMLButtonElement>, "color" | "slot">,
      HTMLButtonElement
    > {
  slot?: AriaButtonProps["slot"];
}

interface LinkProps
  extends CommonProps,
    DetailedHTMLProps<
      Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "color">,
      HTMLAnchorElement
    > {}

export type SocialButtonProps = ButtonProps | LinkProps;

const SocialButton = ({
  size = "lg",
  theme = "brand",
  social,
  className,
  children,
  onClick,
  disabled,
  ...rest
}: SocialButtonProps) => {
  const Component = "href" in rest ? "a" : AriaButton;

  const isIconOnly = !children;

  const socialToColor = {
    google: "gray",
    facebook: "facebook",
    apple: "black",
    twitter: "black",
    figma: "black",
    dribble: "dribble",
  } as const;

  const colorStyles =
    theme === "brand"
      ? styles.colors[socialToColor[social]]
      : styles.colors.gray;

  const logos = {
    google: GoogleLogo,
    facebook: FacebookLogo,
    apple: AppleLogo,
    twitter: TwitterLogo,
    figma: theme === "gray" ? FigmaLogoOutlined : FigmaLogo,
    dribble: DribbleLogo,
  };

  const Logo = logos[social];

  return (
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
      data-icon-only={isIconOnly ? true : undefined}
      className={cx(
        styles.common.root,
        styles.sizes[size].root,
        colorStyles.root,
        className,
      )}
    >
      <Logo
        className={cx(
          styles.common.icon,
          theme === "gray"
            ? colorStyles.icon
            : theme === "brand" &&
                (social === "facebook" ||
                  social === "apple" ||
                  social === "twitter")
              ? "text-white"
              : theme === "color" &&
                  (social === "apple" || social === "twitter")
                ? "text-alpha-black"
                : "",
        )}
        colorful={
          (theme === "brand" && (social === "google" || social === "figma")) ||
          (theme === "color" &&
            (social === "google" ||
              social === "facebook" ||
              social === "figma" ||
              social === "dribble"))
        }
      />

      {children}
    </Component>
  );
};

export default SocialButton;
