import { type FC, type ReactNode, useState } from "react";
import { User01 } from "@untitledui/icons";
import { cx } from "@/components/utils/cx";
import { AvatarOnlineIndicator, VerifiedTick } from "./base-components";

type AvatarSize = "xxs" | "xs" | "sm" | "md" | "lg" | "xl" | "2xl";

export interface AvatarProps {
  size?: AvatarSize;
  className?: string;
  src?: string | null;
  alt?: string;
  /**
   * Display a contrast border around the avatar.
   */
  contrastBorder?: boolean;
  /**
   * Display a badge (i.e. company logo).
   */
  badge?: ReactNode;
  /**
   * Display a status indicator.
   */
  status?: "online" | "offline";
  /**
   * Display a verified tick icon.
   *
   * @default false
   */
  verified?: boolean;

  /**
   * The initials of the user to display if no image is available.
   */
  initials?: string;
  /**
   * An icon to display if no image is available.
   */
  placeholderIcon?: FC<{ className?: string }>;
  /**
   * A placeholder to display if no image is available.
   */
  placeholder?: ReactNode;

  /**
   * Whether the avatar should show a focus ring when the parent group is in focus.
   * For example, when the avatar is wrapped inside a link.
   *
   * @default false
   */
  focusable?: boolean;
}

const styles = {
  xxs: {
    root: "size-4 outline-[0.5px] -outline-offset-[0.5px]",
    initials: "tt-xs-semi",
    icon: "size-3",
  },
  xs: {
    root: "size-6 outline-[0.5px] -outline-offset-[0.5px]",
    initials: "tt-xs-semi",
    icon: "size-4",
  },
  sm: {
    root: "size-8 outline-[0.5px] -outline-offset-[0.5px]",
    initials: "tt-sm-semi",
    icon: "size-5",
  },
  md: {
    root: "size-10 outline-[0.75px] -outline-offset-[0.75px]",
    initials: "tt-md-semi",
    icon: "size-6",
  },
  lg: {
    root: "size-12 outline-[0.75px] -outline-offset-[0.75px]",
    initials: "tt-lg-semi",
    icon: "size-7",
  },
  xl: {
    root: "size-14 outline-[0.75px] -outline-offset-[0.75px]",
    initials: "tt-xl-semi",
    icon: "size-8",
  },
  "2xl": {
    root: "size-16 outline-[0.75px] -outline-offset-[0.75px]",
    initials: "td-xs-semi",
    icon: "size-8",
  },
};

export const Avatar = ({
  contrastBorder = true,
  size = "md",
  src,
  alt,
  initials,
  placeholder,
  placeholderIcon: PlaceholderIcon,
  badge,
  status,
  verified,
  focusable = false,
  className,
}: AvatarProps) => {
  const [isFailed, setIsFailed] = useState(false);

  const renderMainContent = () => {
    if (src && !isFailed) {
      return (
        <img
          className="size-full rounded-full object-cover"
          src={src}
          alt={alt}
          onError={() => setIsFailed(true)}
        />
      );
    }

    if (initials) {
      return (
        <span className={cx("text-tertiary", styles[size].initials)}>
          {initials}
        </span>
      );
    }

    if (PlaceholderIcon) {
      return (
        <PlaceholderIcon
          className={cx("text-utility-gray-500", styles[size].icon)}
        />
      );
    }

    return (
      placeholder || (
        <User01 className={cx("text-utility-gray-500", styles[size].icon)} />
      )
    );
  };
  const renderBadgeContent = () => {
    if (status) {
      return (
        <AvatarOnlineIndicator
          status={status}
          size={size === "xxs" ? "xs" : size}
        />
      );
    }

    if (verified) {
      return (
        <VerifiedTick
          size={size === "xxs" ? "xs" : size}
          className={cx(
            "absolute right-0 bottom-0",
            (size === "xxs" || size === "xs") && "-right-px -bottom-px",
          )}
        />
      );
    }

    return badge;
  };

  return (
    <div
      className={cx(
        "relative inline-flex shrink-0 items-center justify-center rounded-full bg-avatar-bg outline-transparent",
        // Focus styles
        focusable &&
          "group-outline-focus-ring group-focus:outline-2 group-focus:outline-offset-2",
        contrastBorder && "outline outline-avatar-contrast-border",
        styles[size].root,
        className,
      )}
    >
      {renderMainContent()}
      {renderBadgeContent()}
    </div>
  );
};
