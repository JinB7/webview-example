"use client";

import { useEffect, useId, useRef } from "react";
import { Button } from "@/src/components/Button";
import { useModal } from "@/src/hooks/useModal";

type CouponDetailModalProps = {
  title: string;
  conditions: string[];
  period: string;
};

// Design board "C. 모달 열림". Open with useModal().open(<CouponDetailModal … />).
export function CouponDetailModal({
  title,
  conditions,
  period,
}: CouponDetailModalProps) {
  const { close } = useModal();
  const titleId = useId();
  const dialogRef = useRef<HTMLElement>(null);

  useEffect(() => {
    dialogRef.current?.focus();
  }, []);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-overlay px-gutter pt-[calc(var(--space-24)+var(--safe-area-top))] pb-[calc(var(--space-24)+var(--safe-area-bottom))]"
      onClick={(e) => {
        if (e.target === e.currentTarget) close();
      }}
    >
      <section
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        tabIndex={-1}
        className="flex max-h-full w-full max-w-[calc(var(--container-app)-2*var(--space-gutter))] flex-col gap-6 overflow-y-auto rounded-surface bg-surface p-6 shadow-modal outline-none"
      >
        <div className="flex flex-col gap-4">
          <h2 id={titleId} className="text-card-title text-accent break-keep">
            {title}
          </h2>
          <div className="flex flex-col gap-3">
            <h3 className="text-caption text-fg-secondary">사용 조건</h3>
            <div className="flex flex-col gap-1">
              {conditions.map((condition) => (
                <p key={condition} className="text-body text-fg break-keep">
                  {condition}
                </p>
              ))}
            </div>
          </div>
          <div role="presentation" className="h-px bg-divider" />
          <div className="flex flex-col gap-3">
            <h3 className="text-caption text-fg-secondary">유효기간</h3>
            <p className="text-body text-fg">{period}</p>
          </div>
        </div>
        <Button className="w-full" onClick={close}>
          닫기
        </Button>
      </section>
    </div>
  );
}
