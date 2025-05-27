import type { RadioGroupProps } from "react-aria-components";
import { Label, Radio, RadioGroup, Text } from "react-aria-components";
import { Avatar as AvatarComponent } from "@/components/shared/avatar/avatar";
import { CheckboxBase } from "@/components/shared/checkbox/checkbox";
import { cx } from "@/components/utils/cx";

interface AvatarItemType {
    id: string;
    name: string;
    username: string;
    title: string;
    avatarUrl: string;
    disabled?: boolean;
}

interface RadioGroupAvatarProps extends RadioGroupProps {
    size?: "sm" | "md";
    items: AvatarItemType[];
}

export const RadioGroupAvatar = ({ items, size = "sm", className, ...props }: RadioGroupAvatarProps) => {
    return (
        <RadioGroup {...props} className={(state) => cx("flex flex-col gap-3", typeof className === "function" ? className(state) : className)}>
            {items.map((person) => (
                <Radio
                    isDisabled={person.disabled}
                    key={person.id}
                    value={person.id}
                    className={({ isDisabled, isSelected, isFocusVisible }) =>
                        cx(
                            "relative flex cursor-pointer items-start gap-1 rounded-xl bg-primary p-4 outline-focus-ring ring-inset",
                            isSelected ? "ring-2 ring-border-brand" : "ring-1 ring-border-secondary",
                            isDisabled && "cursor-not-allowed bg-disabled_subtle ring-border-disabled_subtle",
                            isFocusVisible && "outline-2 outline-offset-2",
                        )
                    }
                >
                    {({ isDisabled, isSelected, isFocusVisible }) => (
                        <>
                            <div className={cx("flex flex-1", size === "md" ? "gap-3 md:gap-4" : "gap-3")}>
                                <AvatarComponent alt={person.name} src={person.avatarUrl} size={size === "md" ? "md" : "sm"} />

                                <div className={cx("flex flex-col", size === "md" ? "gap-0.5" : "")}>
                                    <Label className={cx("pointer-events-none flex", size === "md" ? "gap-1.5" : "gap-1")}>
                                        <span className={cx("text-secondary", size === "md" ? "text-md font-medium" : "text-sm font-medium")}>
                                            {person.name}
                                        </span>
                                        <span className={cx("text-tertiary", size === "md" ? "text-md" : "text-sm")}>{person.username}</span>
                                    </Label>
                                    <Text slot="description" className={cx("text-tertiary", size === "md" ? "text-md" : "text-sm")}>
                                        {person.title}
                                    </Text>
                                </div>
                            </div>
                            <CheckboxBase size={size === "md" ? "md" : "sm"} isDisabled={isDisabled} isSelected={isSelected} isFocusVisible={isFocusVisible} />
                        </>
                    )}
                </Radio>
            ))}
        </RadioGroup>
    );
};
