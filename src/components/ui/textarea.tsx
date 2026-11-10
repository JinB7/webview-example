import * as React from "react";
import { cn } from "@/src/lib/styles/cn";

// Brew TextArea: md 필드와 같은 좌우 px-4, 위아래 py-3. 높이는 rows × 24px로 정해진다.
const Textarea = ({
  className,
  ...props
}: React.ComponentProps<"textarea">) => {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "flex w-full min-w-0 resize-none rounded-surface border border-field bg-surface px-4 py-3 text-body text-fg outline-none placeholder:text-fg-secondary focus-visible:border-focus focus-visible:ring-1 focus-visible:ring-focus aria-invalid:border-field-error aria-invalid:ring-1 aria-invalid:ring-field-error",
        className,
      )}
      {...props}
    />
  );
};

export { Textarea };
