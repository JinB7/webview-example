// 24x24 stroke icons from the design's icon registry.
const ICONS = {
  cup: "M5 7h14 M6.5 7l.9-3h9.2l.9 3 M7 7l1.2 13h7.6L17 7 M7.6 12.5h8.8",
  cake: "M4 20h16 M5 20v-6a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v6 M5 16.5c1.2.8 2.5.8 3.5 0s2.3-.8 3.5 0 2.3.8 3.5 0 2.3-.8 3.5 0 M12 13v-3 M12 7.5c-.8 0-1.3-.6-1.3-1.3S12 4 12 4s1.3 1.5 1.3 2.2-.5 1.3-1.3 1.3z",
  bag: "M5.5 8h13l-1 12h-11l-1-12z M9 8V6.5a3 3 0 0 1 6 0V8",
  ticket:
    "M4 7.5A1.5 1.5 0 0 1 5.5 6h13A1.5 1.5 0 0 1 20 7.5V10a2 2 0 0 0 0 4v2.5a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 4 16.5V14a2 2 0 0 0 0-4V7.5z M14 6v12",
} as const;

export type BottomNavItem = {
  key: string;
  label: string;
  icon: keyof typeof ICONS;
  href: string;
};

type BottomNavProps = {
  items: BottomNavItem[];
  active: string;
};

// Design board "BottomNav 컴포넌트", shown on "A. 기본" / "B. 받기 완료"
// (active "1") and "C. 모달 열림" (active "2"). The active item gets a filled
// icon pill and an action-colored label.
export function BottomNav({ items, active }: BottomNavProps) {
  return (
    <nav
      aria-label="쿠폰 메뉴"
      className="flex border-t border-divider bg-surface px-gutter pb-safe-bottom"
    >
      {items.map((item) => {
        const isActive = item.key === active;
        return (
          <a
            key={item.key}
            href={item.href}
            aria-current={isActive ? "true" : undefined}
            className={`pressable flex min-h-touch flex-1 flex-col items-center gap-1 py-2 ${isActive ? "text-action" : "text-fg-secondary"}`}
          >
            <span
              className={`flex items-center justify-center rounded-pill px-4 py-1 ${isActive ? "bg-action text-on-action" : ""}`}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d={ICONS[item.icon]} />
              </svg>
            </span>
            <span className="text-caption">{item.label}</span>
          </a>
        );
      })}
    </nav>
  );
}
