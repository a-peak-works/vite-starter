import type { ReactNode, Ref } from "react";
import type {
  TextAreaProps as AriaTextAreaProps,
  TextFieldProps as AriaTextFieldProps,
} from "react-aria-components";
import { TextArea as AriaTextArea } from "react-aria-components";
import HintText from "@/components/shared/input/hint-text";
import Label from "@/components/shared/input/label";
import { cx } from "@/components/utils/cx";
import { TextField } from "../input";

interface TextAreaBaseProps extends AriaTextAreaProps {
  ref?: Ref<HTMLTextAreaElement>;
}

export const TextAreaBase = ({ className, ...props }: TextAreaBaseProps) => {
  return (
    <AriaTextArea
      {...props}
      className={(state) =>
        cx(
          "w-full scroll-py-3 rounded-lg bg-primary px-3.5 py-3 tt-md text-primary shadow-xs ring-1 ring-border-primary transition duration-100 ease-linear ring-inset placeholder:text-placeholder autofill:rounded-lg autofill:text-primary focus:outline-hidden",

          // Resize handle
          "[&::-webkit-resizer]:bg-[url(/assets/shared/textarea-resize-handle-light-mode.svg)] [&::-webkit-resizer]:bg-contain dark:[&::-webkit-resizer]:bg-[url(/assets/shared/textarea-resize-handle-dark-mode.svg)]",

          state.isFocused && !state.isDisabled && "ring-2 ring-border-brand",
          state.isDisabled &&
            "cursor-not-allowed bg-disabled_subtle text-disabled ring-border-disabled",
          state.isInvalid && "ring-border-error_subtle",
          state.isInvalid && state.isFocused && "ring-2 ring-border-error",

          typeof className === "function" ? className(state) : className,
        )
      }
    />
  );
};

TextAreaBase.displayName = "TextAreaBase";

interface TextFieldProps extends AriaTextAreaProps {
  label?: string;
  hint?: ReactNode;
  tooltip?: string;
  ref?: Ref<HTMLDivElement>;
  isInvalid?: AriaTextFieldProps["isInvalid"];
  isDisabled?: AriaTextFieldProps["isDisabled"];
  isRequired?: AriaTextFieldProps["isRequired"];
  isReadOnly?: AriaTextFieldProps["isReadOnly"];
  wrapperClassName?: AriaTextFieldProps["className"];
}

export const TextArea = ({
  label,
  hint,
  wrapperClassName,
  isDisabled,
  isInvalid,
  isRequired,
  isReadOnly,
  tooltip,
  value,
  defaultValue,
  ref,
  ...textAreaProps
}: TextFieldProps) => {
  return (
    <TextField
      {...{
        ref,
        isDisabled,
        isInvalid,
        isReadOnly,
        isRequired,
        className: wrapperClassName,
      }}
      value={value as string}
      defaultValue={defaultValue as string}
    >
      {label && <Label tooltip={tooltip}>{label}</Label>}

      <TextAreaBase {...textAreaProps} />

      {hint && <HintText>{hint}</HintText>}
    </TextField>
  );
};

TextArea.displayName = "TextArea";
