import type { ComponentProps } from "react";
import { Textarea } from "@/src/components/ui/textarea";

type TextAreaFieldProps = Omit<
  ComponentProps<typeof Textarea>,
  "id" | "value"
> & {
  id: string;
  label: string;
  value: string;
  helper?: string;
  error?: string;
};

// Design board "TextArea 컴포넌트": 라벨 줄 오른쪽에 maxLength가 있을 때만
// 카운터를 두고, 에러가 있으면 helper 대신 아이콘+에러 문구를 보여 준다.
export const TextAreaField = ({
  id,
  label,
  value,
  maxLength,
  rows = 3,
  helper,
  error,
  ...props
}: TextAreaFieldProps) => {
  const helpId = `${id}-help`;

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-baseline justify-between gap-2">
        <label htmlFor={id} className="text-caption text-fg">
          {label}
        </label>
        {maxLength ? (
          <span className="text-caption text-fg-secondary">
            {value.length}/{maxLength}
          </span>
        ) : null}
      </div>
      <div className="flex flex-col gap-1">
        <Textarea
          {...props}
          id={id}
          value={value}
          maxLength={maxLength}
          rows={rows}
          aria-invalid={error ? true : undefined}
          aria-describedby={error || helper ? helpId : undefined}
        />
        {error ? (
          <p
            id={helpId}
            className="flex items-start gap-1 text-caption break-keep text-error"
          >
            {/* 아이콘을 첫 줄 높이(20px) 안에서 세로 가운데에 둔다 */}
            <svg
              viewBox="0 0 16 16"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
              className="h-lh w-4 shrink-0"
            >
              <circle cx="8" cy="8" r="6.25" />
              <path d="M8 4.75v3.75 M8 11h.01" />
            </svg>
            <span>{error}</span>
          </p>
        ) : helper ? (
          <p id={helpId} className="text-caption break-keep text-fg-secondary">
            {helper}
          </p>
        ) : null}
      </div>
    </div>
  );
};
