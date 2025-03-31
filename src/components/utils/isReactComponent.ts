import type React from "react";

type ReactComponent = React.FC<any> | React.ComponentClass<any, any>;

export const isFunctionComponent = (
  component: any,
): component is React.FC<any> => {
  return typeof component === "function";
};

export const isClassComponent = (
  component: any,
): component is React.ComponentClass<any, any> => {
  return (
    typeof component === "function" &&
    component.prototype &&
    (!!component.prototype.isReactComponent || !!component.prototype.render)
  );
};

export const isForwardRefComponent = (
  component: any,
): component is React.ForwardRefExoticComponent<any> => {
  return (
    typeof component === "object" &&
    component !== null &&
    component.$$typeof.toString() === "Symbol(react.forward_ref)"
  );
};

/**
 * Checks if a given value is a valid React component.
 */
export const isReactComponent = (
  component: any,
): component is ReactComponent => {
  return (
    isFunctionComponent(component) ||
    isForwardRefComponent(component) ||
    isClassComponent(component)
  );
};
