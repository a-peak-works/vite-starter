import { extendTailwindMerge } from "tailwind-merge";

const twMerge = extendTailwindMerge<"spacing">({
  extend: {
    classGroups: {
      "font-size": [
        "tt-xs",
        "tt-sm",
        "tt-md",
        "tt-lg",
        "tt-xl",
        "td-xs",
        "td-sm",
        "td-md",
        "td-lg",
        "td-xl",

        "tt-xs-md",
        "tt-sm-md",
        "tt-md-md",
        "tt-lg-md",
        "tt-xl-md",
        "td-xs-md",
        "td-sm-md",
        "td-md-md",
        "td-lg-md",
        "td-xl-md",

        "tt-xs-semi",
        "tt-sm-semi",
        "tt-md-semi",
        "tt-lg-semi",
        "tt-xl-semi",
        "td-xs-semi",
        "td-sm-semi",
        "td-md-semi",
        "td-lg-semi",
        "td-xl-semi",
      ],
    },
  },
});

export const cx = twMerge;

export function sortCx<
  T extends Record<
    string,
    | string
    | number
    | Record<string, string | number | Record<string, string | number>>
  >,
>(classes: T): T {
  return classes;
}
