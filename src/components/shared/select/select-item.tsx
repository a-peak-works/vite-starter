import { useContext } from "react";
import { Check } from "@untitledui/icons";
import type { ListBoxItemProps as AriaListBoxItemProps } from "react-aria-components";
import { ListBoxItem as AriaListBoxItem, Text } from "react-aria-components";
import { Avatar } from "@/components/shared/avatar/avatar";
import { cx } from "@/components/utils/cx";
import type { SelectItemType } from "./select";
import { SelectContext } from "./select";

const sizes = {
  sm: "p-2 pr-2.5",
  md: "p-2.5 pl-2",
};

interface SelectItemProps
  extends Omit<AriaListBoxItemProps<SelectItemType>, "id">,
    SelectItemType {}

export const SelectItem = ({
  label,
  id,
  value,
  avatarUrl,
  supportingText,
  isDisabled,
  icon: Icon,
  className,
  children,
  ...props
}: SelectItemProps) => {
  const { size } = useContext(SelectContext);

  const textValue = supportingText ? label + " " + supportingText : label;

  return (
    <AriaListBoxItem
      id={id}
      value={value as unknown as object}
      textValue={textValue}
      isDisabled={isDisabled}
      {...props}
      className={(state) =>
        cx(
          "w-full px-1.5 py-px outline-hidden",
          typeof className === "function" ? className(state) : className,
        )
      }
    >
      {(state) => (
        <div
          className={cx(
            "flex cursor-pointer items-center gap-2 rounded-md outline-hidden select-none",
            state.isSelected && "bg-active",
            state.isDisabled && "cursor-not-allowed",
            state.isFocused && "bg-primary_hover",
            state.isFocusVisible && "ring-2 ring-focus-ring ring-inset",
            sizes[size],
          )}
        >
          {avatarUrl ? (
            <Avatar aria-hidden="true" size="xs" src={avatarUrl} alt={label} />
          ) : Icon ? (
            <Icon
              aria-hidden="true"
              className={cx(
                "size-5 shrink-0 text-fg-quaternary",
                state.isDisabled && "text-fg-disabled",
              )}
            />
          ) : null}

          <section className="flex w-full min-w-0 flex-1 flex-wrap gap-x-2">
            <Text
              slot="label"
              className={cx(
                "truncate tt-md-md whitespace-nowrap text-primary",
                state.isDisabled && "text-disabled",
              )}
            >
              {label ||
                (typeof children === "function" ? children(state) : children)}
            </Text>

            {supportingText && (
              <Text
                slot="description"
                className={cx(
                  "tt-md whitespace-nowrap text-tertiary",
                  state.isDisabled && "text-disabled",
                )}
              >
                {supportingText}
              </Text>
            )}
          </section>
          {state.isSelected && (
            <Check
              className={cx(
                "ml-auto size-5 text-fg-brand-primary",
                state.isDisabled && "text-fg-disabled",
              )}
              aria-hidden="true"
            />
          )}
        </div>
      )}
    </AriaListBoxItem>
  );
};

export default SelectItem;
