import type { FocusEventHandler, PointerEventHandler, RefAttributes } from "react";
import { useCallback, useContext, useRef, useState } from "react";
import { SearchLg as SearchIcon } from "@untitledui/icons";
import type { ComboBoxProps as AriaComboBoxProps, ListBoxProps as AriaListBoxProps } from "react-aria-components";
import {
    Button as AriaButton,
    ComboBox as AriaComboBox,
    Group as AriaGroup,
    Input as AriaInput,
    ListBox as AriaListBox,
    ComboBoxStateContext,
} from "react-aria-components";
import { cx } from "@/components/utils/cx";
import { useResizeObserver } from "@/hooks/use-resize-observer";
import { HintText } from "../input/hint-text";
import { Label } from "../input/label";
import { Popover } from "./popover";
import { type CommonProps, SelectContext, type SelectItemType, sizes } from "./select";

interface ComboBoxProps extends Omit<AriaComboBoxProps<SelectItemType>, "children" | "items">, RefAttributes<HTMLDivElement>, CommonProps {
    shortcut?: boolean;
    items?: SelectItemType[];
    popoverClassName?: string;
    shortcutClassName?: string;
    children: AriaListBoxProps<SelectItemType>["children"];
}

interface ComboBoxValueProps extends RefAttributes<HTMLDivElement> {
    size: "sm" | "md";
    shortcut: boolean;
    isDisabled: boolean;
    placeholder?: string;
    shortcutClassName?: string;
    onFocus?: FocusEventHandler;
    onPointerEnter?: PointerEventHandler;
}

const ComboBoxValue = ({ size, isDisabled, shortcut, placeholder, shortcutClassName, ...otherProps }: ComboBoxValueProps) => {
    const state = useContext(ComboBoxStateContext);

    const value = state?.selectedItem?.value || null;
    const inputValue = state?.inputValue || null;

    const first = inputValue?.split(value?.supportingText)?.[0] || "";
    const last = inputValue?.split(first)[1];

    return (
        <AriaGroup
            {...otherProps}
            className={({ isFocusWithin, isDisabled }) =>
                cx(
                    "relative flex w-full items-center gap-2 rounded-lg bg-primary shadow-xs ring-1 ring-border-primary outline-hidden transition-shadow duration-100 ease-linear ring-inset",
                    isDisabled && "cursor-not-allowed bg-disabled_subtle",
                    isFocusWithin && "ring-2 ring-border-brand",
                    sizes[size].root,
                )
            }
        >
            <AriaButton>
                <SearchIcon className="size-5 text-fg-quaternary" />
            </AriaButton>

            <div className="relative flex w-full items-center gap-2">
                {inputValue && (
                    <span className="absolute top-1/2 z-0 inline-flex w-full -translate-y-1/2 gap-2 truncate" aria-hidden="true">
                        <p className={cx("text-md font-medium text-primary", isDisabled && "text-disabled")}>{first}</p>
                        {last && <p className={cx("-ml-[3px] text-md text-tertiary", isDisabled && "text-disabled")}>{last}</p>}
                    </span>
                )}

                <AriaInput
                    placeholder={placeholder}
                    className="z-10 w-full appearance-none bg-transparent text-md text-transparent caret-alpha-black/90 placeholder:text-placeholder focus:outline-hidden disabled:cursor-not-allowed disabled:text-disabled disabled:placeholder:text-disabled"
                />
            </div>

            {shortcut && (
                <div
                    className={cx(
                        "absolute inset-y-0.5 right-0.5 z-10 flex items-center rounded-r-[inherit] bg-linear-to-r from-transparent to-bg-primary to-40% pl-8",
                        sizes[size].shortcut,
                        shortcutClassName,
                    )}
                >
                    <span
                        className={cx(
                            "pointer-events-none rounded px-1 py-px text-xs font-medium text-quaternary ring-1 ring-border-secondary select-none ring-inset",
                            isDisabled && "bg-transparent text-disabled",
                        )}
                        aria-hidden="true"
                    >
                        ⌘K
                    </span>
                </div>
            )}
        </AriaGroup>
    );
};

export const ComboBox = ({ placeholder = "Search", shortcut = true, size = "sm", children, items, ...rest }: ComboBoxProps) => {
    const placeholderRef = useRef<HTMLDivElement>(null);
    const [popoverWidth, setPopoverWidth] = useState("");

    // Resize observer for popover width
    const onResize = useCallback(() => {
        if (!placeholderRef.current) return;

        const divRect = placeholderRef.current?.getBoundingClientRect();

        setPopoverWidth(divRect.width + "px");
    }, [placeholderRef, setPopoverWidth]);

    useResizeObserver({
        ref: placeholderRef,
        box: "border-box",
        onResize,
    });

    return (
        <SelectContext.Provider value={{ size }}>
            <AriaComboBox menuTrigger="focus" {...rest}>
                {(state) => (
                    <div className="flex flex-col gap-1.5">
                        {rest.label && (
                            <Label isRequired={state.isRequired} tooltip={rest.tooltip}>
                                {rest.label}
                            </Label>
                        )}

                        <ComboBoxValue
                            ref={placeholderRef}
                            placeholder={placeholder}
                            shortcut={shortcut}
                            size={size}
                            // This is a workaround to correctly calculating the trigger width
                            // while using ResizeObserver wasn't 100% reliable.
                            onFocus={onResize}
                            onPointerEnter={onResize}
                            {...state}
                            {...rest}
                        />

                        <Popover size={size} triggerRef={placeholderRef} style={{ width: popoverWidth }} className={rest.popoverClassName}>
                            <AriaListBox items={items} className="size-full outline-hidden">
                                {children}
                            </AriaListBox>
                        </Popover>

                        {rest.hint && <HintText isInvalid={state.isInvalid}>{rest.hint}</HintText>}
                    </div>
                )}
            </AriaComboBox>
        </SelectContext.Provider>
    );
};
