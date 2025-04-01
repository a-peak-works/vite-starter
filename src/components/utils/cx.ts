import { extendTailwindMerge } from "tailwind-merge";

const twMerge = extendTailwindMerge<"spacing">({});

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
