import type { ReactNode, Ref } from "react";
import type { TextProps as AriaTextProps } from "react-aria-components";
import { Text as AriaText } from "react-aria-components";
import { cx } from "@/components/utils/cx";

interface HintTextProps extends AriaTextProps {
  children: ReactNode;
  isInvalid?: boolean;
  ref?: Ref<HTMLElement>;
}

const HintText = ({ isInvalid, className, ...props }: HintTextProps) => {
  return (
    <AriaText
      {...props}
      slot={isInvalid ? "errorMessage" : "description"}
      className={cx(
        "tt-sm text-tertiary",

        // Invalid state
        isInvalid && "text-error-primary",
        "group-invalid:text-error-primary",

        className,
      )}
    />
  );
};

HintText.displayName = "HintText";

export default HintText;
