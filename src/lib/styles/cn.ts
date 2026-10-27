import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

const twMerge = extendTailwindMerge({
  extend: {
    theme: {
      text: ["banner-title", "discount", "card-title", "body", "caption"],
      radius: ["surface", "pill"],
      shadow: ["card", "modal"],
      spacing: [
        "gutter",
        "safe-top",
        "safe-bottom",
        "touch",
        "field-sm",
        "field-md",
        "field-lg",
      ],
      container: ["viewport", "app"],
    },
  },
});

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};
