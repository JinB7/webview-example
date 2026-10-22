import { Button } from "@/src/components/Button";

type CouponCardProps = {
  discount: string;
  title: string;
  claimed: boolean;
  onClaim: () => void;
  onDetail: () => void;
};

// Design boards "A. 기본" / "B. 받기 완료": claimed greys the discount and
// turns '쿠폰 받기' into a disabled '받기 완료'.
export function CouponCard({
  discount,
  title,
  claimed,
  onClaim,
  onDetail,
}: CouponCardProps) {
  return (
    <article className="flex flex-col gap-4 rounded-surface bg-surface p-4 shadow-card">
      <div className="flex flex-col gap-1">
        <div
          className={`text-discount ${claimed ? "text-fg-secondary" : "text-accent"}`}
        >
          {discount}
        </div>
        <h2 className="text-card-title text-fg break-keep">{title}</h2>
      </div>
      <div className="flex gap-2">
        <Button className="flex-1" disabled={claimed} onClick={onClaim}>
          {claimed ? (
            <>
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M3 8.5l3.2 3L13 4.5" />
              </svg>
              받기 완료
            </>
          ) : (
            "쿠폰 받기"
          )}
        </Button>
        <Button variant="outline" className="flex-1" onClick={onDetail}>
          상세 보기
        </Button>
      </div>
    </article>
  );
}
