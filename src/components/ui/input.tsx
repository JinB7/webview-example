import * as React from "react";
import { Input as InputPrimitive } from "@base-ui/react/input";
import { cn } from "@/src/lib/styles/cn";
import { cva, type VariantProps } from "class-variance-authority";

const inputVariants = cva(
  "w-full min-w-0 rounded-surface border border-field bg-surface text-body text-fg outline-none placeholder:text-fg-secondary focus-visible:border-focus focus-visible:ring-1 focus-visible:ring-focus aria-invalid:border-field-error aria-invalid:ring-1 aria-invalid:ring-field-error",
  {
    variants: {
      size: {
        sm: "min-h-field-sm px-3",
        md: "min-h-field-md px-4",
        lg: "min-h-field-lg px-4",
      },
    },
    defaultVariants: { size: "md" },
  },
);

type InputProps = Omit<React.ComponentProps<"input">, "size"> &
  VariantProps<typeof inputVariants>;

const Input = ({ className, type, size, ...props }: InputProps) => {
  return (
    <InputPrimitive
      type={type}
      data-slot="input"
      className={cn(inputVariants({ size, className }))}
      {...props}
    />
  );
};

export { Input, inputVariants };
