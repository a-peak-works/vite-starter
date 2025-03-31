import type { ReactNode, Ref, RefAttributes } from "react";
import { createContext } from "react";
import { ChevronDown, User01 } from "@untitledui/icons";
import type { SelectProps as AriaSelectProps } from "react-aria-components";
import {
  Button as AriaButton,
  ListBox as AriaListBox,
  Select as AriaSelect,
  SelectValue as AriaSelectValue,
} from "react-aria-components";
import { Avatar } from "@/components/shared/avatar/avatar";
import type { IconComponentType } from "@/components/shared/badges/badge-types";
import HintText from "@/components/shared/input/hint-text";
import Label from "@/components/shared/input/label";
import { cx } from "@/components/utils/cx";
import { ComboBox } from "./combobox";
import { Popover } from "./popover";
import Item from "./select-item";

export type SelectItemType = {
  id: string;
  label?: string;
  avatarUrl?: string;
  isDisabled?: boolean;
  supportingText?: string;
  icon?: IconComponentType;
};

type Types = "default" | "iconLeading" | "avatarLeading" | "search" | "tags";
type SelectTypes = "default" | "iconLeading" | "avatarLeading";

export interface CommonProps {
  hint?: string;
  label?: string;
  tooltip?: string;
  size?: "sm" | "md";
  placeholder?: string;
}

interface SelectProps
  extends Omit<AriaSelectProps<SelectItemType>, "children" | "items">,
    RefAttributes<HTMLDivElement>,
    CommonProps {
  type?: SelectTypes;
  items?: SelectItemType[];
  popoverClassName?: string;
  placeholderIcon?: IconComponentType;
  children: ReactNode | ((item: SelectItemType) => ReactNode);
}

interface SelectValueProps {
  isOpen: boolean;
  size: "sm" | "md";
  type: SelectTypes;
  isFocused: boolean;
  isDisabled: boolean;
  placeholder?: string;
  ref?: Ref<HTMLButtonElement>;
  placeholderIcon?: IconComponentType;
}

export const sizes = {
  sm: { root: "py-2 px-3", shortcut: "pr-2.5" },
  md: { root: "py-2.5 px-3.5", shortcut: "pr-3" },
};

const SelectValue = (props: SelectValueProps) => {
  return (
    <AriaButton
      className={cx(
        "relative flex w-full cursor-pointer items-center rounded-lg bg-primary shadow-xs ring-1 ring-border-primary outline-hidden transition duration-100 ease-linear ring-inset",
        (props.isFocused || props.isOpen) && "ring-2 ring-border-brand",
        props.isDisabled &&
          "cursor-not-allowed bg-disabled_subtle text-disabled",
      )}
    >
      <AriaSelectValue<SelectItemType>
        className={cx(
          "flex h-max w-full items-center justify-start gap-2 truncate text-left align-middle",
          sizes[props.size].root,
        )}
      >
        {(state) => {
          const Icon = state?.selectedItem?.icon || props.placeholderIcon;

          return (
            <>
              {state?.selectedItem?.avatarUrl ? (
                <Avatar
                  size="xs"
                  src={state.selectedItem.avatarUrl}
                  alt={state.selectedItem.label}
                />
              ) : Icon ? (
                <Icon
                  aria-hidden="true"
                  className={cx(
                    "size-5 shrink-0 text-fg-quaternary",
                    props.isDisabled && "text-fg-disabled",
                  )}
                />
              ) : null}

              {state.selectedItem ? (
                <section className="flex w-full gap-2 truncate">
                  <p className="truncate tt-md-md text-primary">
                    {state.selectedItem?.label}
                  </p>
                  {state.selectedItem?.supportingText && (
                    <p className="tt-md text-tertiary">
                      {state.selectedItem?.supportingText}
                    </p>
                  )}
                </section>
              ) : (
                <p
                  className={cx(
                    "tt-md text-placeholder",
                    props.isDisabled && "text-disabled",
                  )}
                >
                  {props.placeholder}
                </p>
              )}

              <ChevronDown
                size={20}
                aria-hidden="true"
                className="ml-auto shrink-0 text-fg-quaternary"
              />
            </>
          );
        }}
      </AriaSelectValue>
    </AriaButton>
  );
};

export const SelectContext = createContext<{ type: Types; size: "sm" | "md" }>({
  type: "default",
  size: "sm",
});

const Select = ({
  type = "default",
  placeholder = "Select",
  placeholderIcon,
  size = "sm",
  children,
  items,
  label,
  hint,
  tooltip,
  ...rest
}: SelectProps) => {
  return (
    <SelectContext.Provider value={{ type, size }}>
      <AriaSelect {...rest}>
        {(state) => (
          <div className="flex flex-col gap-1.5">
            {label && (
              <Label isRequired={state.isRequired} tooltip={tooltip}>
                {label}
              </Label>
            )}

            <SelectValue
              {...state}
              {...{ type, size, placeholder }}
              placeholderIcon={
                type === "avatarLeading" || type === "iconLeading"
                  ? placeholderIcon || User01
                  : undefined
              }
            />

            <Popover size={size} className={rest.popoverClassName}>
              <AriaListBox items={items} className="size-full outline-hidden">
                {children}
              </AriaListBox>
            </Popover>

            {hint && <HintText isInvalid={state.isInvalid}>{hint}</HintText>}
          </div>
        )}
      </AriaSelect>
    </SelectContext.Provider>
  );
};

const _Select = Select as typeof Select & {
  ComboBox: typeof ComboBox;
  Item: typeof Item;
};
_Select.ComboBox = ComboBox;
_Select.Item = Item;

export { _Select as Select };
