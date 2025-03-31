import { type ReactNode } from "react";
import { cx } from "@/components/utils/cx";
import { Avatar, type AvatarProps } from "./avatar";

const styles = {
  sm: { root: "gap-2", title: "tt-sm-semi", subtitle: "tt-xs" },
  md: { root: "gap-2", title: "tt-sm-semi", subtitle: "tt-sm" },
  lg: { root: "gap-3", title: "tt-md-semi", subtitle: "tt-md" },
  xl: { root: "gap-4", title: "tt-lg-semi", subtitle: "tt-md" },
};

interface AvatarLabelGroupProps extends AvatarProps {
  size: "sm" | "md" | "lg" | "xl";
  title: string | ReactNode;
  subtitle: string | ReactNode;
}

const AvatarLabelGroup = ({
  title,
  subtitle,
  className,
  ...props
}: AvatarLabelGroupProps) => {
  return (
    <div
      className={cx(
        "group flex min-w-0 flex-1 items-center",
        styles[props.size].root,
        className,
      )}
    >
      <Avatar {...props} />
      <div className="min-w-0 flex-1">
        <p className={cx("text-primary", styles[props.size].title)}>{title}</p>
        <p
          className={cx("truncate text-tertiary", styles[props.size].subtitle)}
        >
          {subtitle}
        </p>
      </div>
    </div>
  );
};

export default AvatarLabelGroup;
