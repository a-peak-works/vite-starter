import {
  type PropsWithChildren,
  type RefAttributes,
  createContext,
  useContext,
} from "react";
import {
  Tag as AriaTag,
  TagGroup as AriaTagGroup,
  type TagGroupProps as AriaTagGroupProps,
  TagList as AriaTagList,
  type TagProps as AriaTagProps,
} from "react-aria-components";
import Dot from "@/components/foundations/dot-icon";
import { cx } from "@/components/utils/cx";
import { Avatar } from "../avatar/avatar";
import TagCheckbox from "./base-components/tag-checkbox";
import { TagCloseX } from "./base-components/tag-close-x";

export interface TagItem {
  id: string;
  label: string;
  count?: number;
  avatarSrc?: string;
  avatarContrastBorder?: boolean;
  dot?: boolean;
  dotClassName?: string;
  isDisabled?: boolean;
  onClose?: (id: string) => void;
}

const TagGroupContext = createContext<{
  selectionMode: "none" | "single" | "multiple";
  size: "sm" | "md" | "lg";
}>({
  selectionMode: "none",
  size: "sm",
});

interface TagGroupProps
  extends AriaTagGroupProps,
    RefAttributes<HTMLDivElement> {
  label: string;
  size?: "sm" | "md" | "lg";
}

export const TagGroup = ({
  label,
  selectionMode = "none",
  size = "sm",
  children,
  ...otherProps
}: TagGroupProps) => {
  return (
    <TagGroupContext.Provider value={{ selectionMode, size }}>
      <AriaTagGroup
        aria-label={label}
        selectionMode={selectionMode}
        disallowEmptySelection={selectionMode === "single"}
        {...otherProps}
      >
        {children}
      </AriaTagGroup>
    </TagGroupContext.Provider>
  );
};

export const TagList = AriaTagList;

const styles = {
  sm: {
    root: {
      base: "px-2 py-[3px] tt-xs-md",
      withCheckbox: "pl-[5px]",
      withAvatar: "pl-1",
      withDot: "pl-1.5",
      withCount: "pr-1",
      withClose: "pr-1",
    },
    content: "gap-1",
    count: "px-1 tt-xs-md",
  },
  md: {
    root: {
      base: "px-[9px] py-[2px] tt-sm-md",
      withCheckbox: "pl-1",
      withAvatar: "pl-[5px]",
      withDot: "pl-[7px]",
      withCount: "pr-[3px]",
      withClose: "pr-1",
    },
    content: "gap-[5px]",
    count: "px-[5px] tt-xs-md",
  },
  lg: {
    root: {
      base: "px-2.5 py-[4px] tt-sm-md",
      withCheckbox: "pl-[5px]",
      withAvatar: "pl-[7px]",
      withDot: "pl-[9px]",
      withCount: "pr-1",
      withClose: "pr-1",
    },
    content: "gap-1.5",
    count: "px-1.5 tt-sm-md",
  },
};

interface TagProps
  extends AriaTagProps,
    RefAttributes<object>,
    Omit<TagItem, "label" | "id"> {}

export const Tag = ({
  id,
  avatarSrc,
  avatarContrastBorder,
  dot,
  dotClassName,
  isDisabled,
  count,
  className,
  children,
  onClose,
}: PropsWithChildren<TagProps>) => {
  const context = useContext(TagGroupContext);

  const leadingContent = avatarSrc ? (
    <Avatar
      size="xxs"
      src={avatarSrc}
      alt="Avatar"
      contrastBorder={avatarContrastBorder}
    />
  ) : dot ? (
    <Dot className={cx("text-fg-success-secondary", dotClassName)} size="sm" />
  ) : null;

  return (
    <AriaTag
      id={id}
      isDisabled={isDisabled}
      className={(state) =>
        cx(
          "flex cursor-default items-center gap-[3px] rounded-md bg-primary text-secondary ring-1 ring-border-primary ring-inset focus:outline-hidden focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus-ring",
          styles[context.size].root.base,

          // With avatar
          avatarSrc && styles[context.size].root.withAvatar,
          // With X button
          (onClose || state.allowsRemoving) &&
            styles[context.size].root.withClose,
          // With dot
          dot && styles[context.size].root.withDot,
          // With count
          typeof count === "number" && styles[context.size].root.withCount,
          // With checkbox
          context.selectionMode !== "none" &&
            styles[context.size].root.withCheckbox,
          // Disabled
          isDisabled && "cursor-not-allowed",

          typeof className === "function" ? className(state) : className,
        )
      }
    >
      {({ isSelected, isDisabled, allowsRemoving }) => (
        <>
          <div
            className={cx(
              "flex items-center gap-1",
              styles[context.size].content,
            )}
          >
            {context.selectionMode !== "none" && (
              <TagCheckbox
                size={context.size}
                isSelected={isSelected}
                isDisabled={isDisabled}
              />
            )}

            {leadingContent}

            {children}

            {typeof count === "number" && (
              <span
                className={cx(
                  "flex items-center justify-center rounded-[3px] bg-tertiary text-center",
                  styles[context.size].count,
                )}
              >
                {count}
              </span>
            )}
          </div>

          {(onClose || allowsRemoving) && (
            <TagCloseX
              size={context.size}
              onPress={() => id && onClose?.(id.toString())}
            />
          )}
        </>
      )}
    </AriaTag>
  );
};
