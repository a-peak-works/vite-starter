import { Plus } from "@untitledui/icons";
import type { ButtonProps } from "react-aria-components";
import { cx } from "@/components/utils/cx";
import { Tooltip, TooltipTrigger } from "../../tooltips/tooltips";

const sizes = {
  xs: "size-6",
  sm: "size-8",
  md: "size-10",
};

interface AvatarAddButtonProps extends ButtonProps {
  size: "xs" | "sm" | "md";
  title?: string;
  className?: string;
}

export const AvatarAddButton = ({
  size,
  className,
  title = "Add user",
  ...props
}: AvatarAddButtonProps) => (
  <Tooltip title={title}>
    <TooltipTrigger
      {...props}
      className={cx(
        "flex cursor-pointer items-center justify-center rounded-full border border-dashed border-primary bg-primary text-fg-quaternary outline-focus-ring transition duration-100 ease-linear hover:bg-primary_hover hover:text-fg-quaternary_hover focus:outline-2 focus:outline-offset-2 disabled:border-gray-200 disabled:bg-secondary disabled:text-gray-200",
        sizes[size],
        className,
      )}
    >
      <Plus className="size-4 text-current transition-inherit-all" />
    </TooltipTrigger>
  </Tooltip>
);
