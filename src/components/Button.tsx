import type { ComponentProps } from "react";

const variantClasses = {
  primary: "bg-action text-on-action",
  outline: "border border-action bg-surface text-action",
} as const;

type ButtonProps = ComponentProps<"button"> & {
  variant?: keyof typeof variantClasses;
};

// Brew button: '쿠폰 받기' / '닫기' are primary, '상세 보기' is outline.
// disabled ('받기 완료') switches either variant to the muted fill with no border.
export const Button = ({
  variant = "primary",
  type = "button",
  className = "",
  ...props
}: ButtonProps) => {
  return (
    <button
      type={type}
      className={`pressable inline-flex cursor-pointer h-touch items-center justify-center gap-1 rounded-pill px-4 text-card-title ${variantClasses[variant]} disabled:cursor-default disabled:border-transparent disabled:bg-action-muted disabled:text-on-action-muted ${className}`}
      {...props}
    />
  );
};
