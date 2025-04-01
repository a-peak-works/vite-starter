import { useState } from "react";
import { User01 } from "@untitledui/icons";
import { cx } from "@/components/utils/cx";
import { type AvatarProps } from "./avatar";
import { AvatarOnlineIndicator, VerifiedTick } from "./base-components";

const styles = {
  sm: {
    root: "size-18",
    icon: "size-9",
    initials: "text-display-sm font-semibold",
    ring: "ring-3 shadow-md",
    status: "bottom-0.5 right-0.5",
    tick: "bottom-0 right-0",
  },
  md: {
    root: "size-24",
    icon: "size-12",
    initials: "text-display-md font-semibold",
    ring: "ring-4 shadow-lg",
    status: "bottom-1 right-1",
    tick: "bottom-0.5 right-0.5",
  },
  lg: {
    root: "size-40",
    icon: "size-20",
    initials: "text-display-xl font-semibold",
    ring: "ring-4 shadow-lg",
    status: "bottom-3 right-3",
    tick: "bottom-1 right-1",
  },
};

const tickSizeMap = {
  sm: "2xl",
  md: "3xl",
  lg: "4xl",
} as const;

interface AvatarProfilePhotoProps extends AvatarProps {
  size: "sm" | "md" | "lg";
}

const AvatarProfilePhoto = ({
  contrastBorder = true,
  size = "md",
  src,
  alt,
  initials,
  placeholder,
  placeholderIcon: PlaceholderIcon,
  verified,
  badge,
  status,
  className,
}: AvatarProfilePhotoProps) => {
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
          size={tickSizeMap[size]}
          className={styles[size].status}
        />
      );
    }

    if (verified) {
      return (
        <VerifiedTick
          size={tickSizeMap[size]}
          className={cx("absolute", styles[size].tick)}
        />
      );
    }

    return badge;
  };

  return (
    <div
      className={cx(
        "relative inline-flex shrink-0 items-center justify-center rounded-full bg-avatar-bg",
        contrastBorder &&
          "outline-1 -outline-offset-1 outline-avatar-contrast-border",
        styles[size].root,
        className,
      )}
    >
      {renderMainContent()}
      {renderBadgeContent()}
      <div
        className={cx(
          "absolute inset-0 rounded-full ring-avatar-profile-photo-border",
          styles[size].ring,
        )}
      ></div>
    </div>
  );
};

export default AvatarProfilePhoto;
