import type { FC } from "react";
import type { RadioGroupProps } from "react-aria-components";
import { Label, Radio, RadioGroup, Text } from "react-aria-components";
import { CheckboxBase } from "@/components/shared/checkbox/checkbox";
import { cx } from "@/components/utils/cx";

type RadioGroupItemType = {
  value: string;
  title: string;
  disabled?: boolean;
  description: string;
  secondaryTitle: string;
  icon: FC<{ className?: string }>;
};

interface RadioGroupCheckboxProps extends RadioGroupProps {
  size?: "sm" | "md";
  items: RadioGroupItemType[];
}

export const RadioGroupCheckbox = ({
  items,
  size = "sm",
  className,
  ...props
}: RadioGroupCheckboxProps) => {
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
          className={({ isDisabled, isFocusVisible, isSelected }) =>
            cx(
              "relative flex cursor-pointer items-start gap-1 rounded-xl bg-primary p-4 transition duration-100 ring-inset",
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
          {({ isDisabled, isSelected, isFocusVisible }) => (
            <>
              <CheckboxBase
                size={size === "md" ? "md" : "sm"}
                isDisabled={isDisabled}
                isSelected={isSelected}
                isFocusVisible={isFocusVisible}
                className="mt-0.5"
              />

              <div
                className={cx(
                  "flex flex-col",

                  size === "md" ? "gap-0.5" : "",
                )}
              >
                <Label
                  className={cx(
                    "pointer-events-none flex",
                    size === "md" ? "gap-1.5" : "gap-1",
                  )}
                >
                  <span
                    className={cx(
                      "text-secondary",
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
                    "text-tertiary",
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
