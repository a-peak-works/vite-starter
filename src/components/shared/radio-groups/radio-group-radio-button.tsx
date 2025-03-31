import type { FC } from "react";
import type { RadioGroupProps } from "react-aria-components";
import { Label, Radio, RadioGroup, Text } from "react-aria-components";
import { cx } from "@/components/utils/cx";

type RadioGroupItemType = {
  value: string;
  title: string;
  disabled?: boolean;
  description: string;
  secondaryTitle: string;
  icon: FC<{ className?: string }>;
};

interface RadioGroupRadioButtonProps extends RadioGroupProps {
  size?: "sm" | "md";
  items: RadioGroupItemType[];
}

export const RadioGroupRadioButton = ({
  items,
  size = "sm",
  className,
  ...props
}: RadioGroupRadioButtonProps) => {
  return (
    <RadioGroup
      {...props}
      className={(states) =>
        cx(
          "flex flex-col gap-3",
          typeof className === "function" ? className(states) : className,
        )
      }
    >
      {items.map((plan) => (
        <Radio
          isDisabled={plan.disabled}
          key={plan.value}
          value={plan.value}
          className={({ isDisabled, isSelected, isFocusVisible }) =>
            cx(
              "relative flex cursor-pointer rounded-xl bg-primary p-4 transition duration-100 ring-inset",
              size === "md" ? "gap-3" : "gap-2",
              isSelected
                ? "ring-2 ring-border-brand"
                : "ring-1 ring-border-secondary",
              isDisabled &&
                "cursor-not-allowed bg-disabled_subtle ring-border-disabled_subtle",
              isFocusVisible && "outline-2 outline-offset-2 outline-focus-ring",
            )
          }
        >
          {({ isSelected, isDisabled, isFocusVisible }) => (
            <>
              <div
                className={cx(
                  "relative mt-0.5 inline-flex shrink-0 items-center justify-center rounded-full transition-inherit-all ring-inset",
                  size === "md" ? "size-5" : "size-4",
                  isSelected ? "bg-brand-solid" : "ring-1 ring-border-primary",
                  isDisabled &&
                    "bg-disabled_subtle ring-1 ring-border-disabled",
                  isFocusVisible &&
                    "outline-2 outline-offset-2 outline-focus-ring",
                )}
              >
                <div
                  className={cx(
                    "absolute rounded-full bg-fg-white opacity-0 transition-inherit-all",
                    size === "md" ? "size-2" : "size-1.5",
                    isSelected ? "opacity-100" : "opacity-0",
                    isDisabled && "bg-fg-disabled_subtle",
                  )}
                />
              </div>

              <div
                className={cx("flex flex-col", size === "md" ? "gap-0.5" : "")}
              >
                <Label
                  className={cx(
                    "pointer-events-none flex",
                    size === "md" ? "gap-1.5" : "gap-1",
                  )}
                >
                  <span
                    className={cx(
                      "tt-sm-md text-secondary",
                      size === "md" ? "tt-md-md" : "tt-sm-md",
                    )}
                  >
                    {plan.title}
                  </span>
                  <span
                    className={cx(
                      "text-tertiary",
                      size === "md" ? "tt-md" : "tt-sm",
                    )}
                  >
                    {plan.secondaryTitle}
                  </span>
                </Label>
                <Text
                  slot="description"
                  className={cx(
                    "tt-sm text-tertiary",
                    size === "md" ? "tt-md" : "tt-sm",
                  )}
                >
                  {plan.description}
                </Text>
              </div>
            </>
          )}
        </Radio>
      ))}
    </RadioGroup>
  );
};
