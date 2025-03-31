import type { DetailedReactHTMLElement, ReactNode, RefAttributes } from "react";
import { cloneElement, useRef } from "react";
import type { Placement } from "@react-types/overlays";
import type { FocusableElement } from "@react-types/shared";
import { mergeProps, useFocusable } from "react-aria";
import {
  Tooltip as AriaTooltip,
  TooltipTrigger as AriaTooltipTrigger,
  Button,
  OverlayArrow,
} from "react-aria-components";
import type {
  TooltipProps as AriaTooltipProps,
  ButtonProps,
  TooltipTriggerComponentProps,
} from "react-aria-components";
import { cx } from "@/components/utils/cx";

const padding: Partial<Record<Placement, string>> = {
  "top left": "px-2.5",
  "top right": "px-2.5",
  "bottom left": "px-2.5",
  "bottom right": "px-2.5",
  left: "-ml-px",
  "left top": "-ml-px",
  "left bottom": "-ml-px",
  start: "-ml-px",
  "start top": "-ml-px",
  "start bottom": "-ml-px",
  right: "-mr-px",
  "right top": "-mr-px",
  "right bottom": "-mr-px",
  end: "-mr-px",
  "end top": "-mr-px",
  "end bottom": "-mr-px",
};

interface TooltipProps
  extends TooltipTriggerComponentProps,
    Omit<AriaTooltipProps, "children"> {
  title: ReactNode;
  description?: ReactNode;
  /**
   * Whether to show the arrow on the tooltip.
   *
   * @default false
   */
  arrow?: boolean;
  /**
   * Delay in milliseconds before the tooltip is shown.
   *
   * @default 300
   */
  delay?: number;
}

export const Tooltip = ({
  title,
  description,
  children,
  arrow = false,
  delay = 300,
  closeDelay,
  trigger,
  isDisabled,
  isOpen,
  defaultOpen,
  onOpenChange,
  ...tooltipProps
}: TooltipProps) => {
  return (
    <AriaTooltipTrigger
      {...{
        trigger,
        delay,
        closeDelay,
        isDisabled,
        isOpen,
        defaultOpen,
        onOpenChange,
      }}
    >
      {children}

      <AriaTooltip
        offset={6}
        {...tooltipProps}
        className={({ isEntering, isExiting }) =>
          cx(
            isEntering &&
              "ease-out animate-in fade-in zoom-in-95 placement-top:origin-bottom placement-top:slide-in-from-bottom-0.5 placement-bottom:origin-top placement-bottom:slide-in-from-top-0.5",
            isExiting &&
              "ease-in animate-out fade-out zoom-out-95 placement-top:origin-bottom placement-top:slide-out-to-bottom-0.5 placement-bottom:origin-top placement-bottom:slide-out-to-top-0.5",
          )
        }
      >
        {arrow && (
          <OverlayArrow
            className={cx(
              tooltipProps.placement &&
                padding[tooltipProps.placement as keyof typeof padding],
              "group",
            )}
          >
            <svg
              width={8}
              height={8}
              viewBox="0 0 8 8"
              className="fill-bg-primary-solid group-data-[placement=bottom]:rotate-180 group-data-[placement=left]:-rotate-90 group-data-[placement=right]:rotate-90 group-data-[placement=top]:rotate-0"
            >
              <path d="M0 0 L4 4 L8 0" />
            </svg>
          </OverlayArrow>
        )}
        <div
          className={cx(
            "z-50 flex max-w-xs flex-col items-start gap-1 rounded-lg bg-primary-solid px-3 shadow-lg",
            description ? "py-3" : "py-2",
          )}
        >
          <span className="tt-xs-semi text-white">{title}</span>

          {description && (
            <span className="tt-xs-md text-tooltip-supporting-text">
              {description}
            </span>
          )}
        </div>
      </AriaTooltip>
    </AriaTooltipTrigger>
  );
};

type TooltipTriggerProps =
  | (ButtonProps &
      RefAttributes<HTMLButtonElement> & {
        /**
         * If true, the tooltip trigger props will be passed down to the child element
         * instead of wrapping the child element in a button.
         */
        asChild?: never;
      })
  | {
      /**
       * If true, the tooltip trigger props will be passed down to the child element
       * instead of wrapping the child element in a button.
       */
      asChild: true;
      isDisabled?: boolean;
      children: Omit<DetailedReactHTMLElement<any, any>, "ref">;
    };

export const TooltipTrigger = (props: TooltipTriggerProps) => {
  if (props.asChild) {
    const triggerRef = useRef<FocusableElement>(null);

    const { focusableProps } = useFocusable(
      {
        isDisabled: props.isDisabled,
      },
      triggerRef,
    );

    return cloneElement(
      props.children,
      mergeProps(focusableProps, props.children.props, { ref: triggerRef }),
    );
  }

  const { asChild: _, className, ...buttonProps } = props;

  return (
    <Button
      {...buttonProps}
      className={(values) =>
        cx(
          "h-max w-max outline-hidden",
          typeof className === "function" ? className(values) : className,
        )
      }
    >
      {props.children}
    </Button>
  );
};
