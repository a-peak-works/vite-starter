import type { RefAttributes } from "react";
import { XClose } from "@untitledui/icons";
import { Button as AriaButton, type ButtonProps } from "react-aria-components";
import { cx } from "@/components/utils/cx";

interface TagCloseXProps extends ButtonProps, RefAttributes<HTMLButtonElement> {
  size?: "sm" | "md" | "lg";
  className?: string;
}

const styles = {
  sm: { root: "p-0.5", icon: "size-2.5" },
  md: { root: "p-0.5", icon: "size-3" },
  lg: { root: "p-[3px]", icon: "size-3.5" },
};

export const TagCloseX = ({
  size = "md",
  className,
  isDisabled,
  ...otherProps
}: TagCloseXProps) => {
  return (
    <AriaButton
      slot="remove"
      aria-label="Remove this tag"
      className={cx(
        "flex cursor-pointer rounded-[3px] text-fg-quaternary outline-focus-ring transition duration-100 ease-linear hover:bg-primary_hover hover:text-fg-quaternary_hover focus:outline-2 focus:outline-offset-2 disabled:cursor-not-allowed",
        styles[size].root,
        className,
      )}
      {...otherProps}
    >
      <XClose
        className={cx("transition-inherit-all", styles[size].icon)}
        strokeWidth="3"
      />
    </AriaButton>
  );
};
