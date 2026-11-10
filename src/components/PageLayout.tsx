import type { ReactNode } from "react";

type PageLayoutProps = {
  title: string;
  description?: string;
  children: ReactNode;
};

// Design's shared frame: dark banner on top, stacked content on the canvas.
export function PageLayout({ title, description, children }: PageLayoutProps) {
  return (
    <div className="flex flex-1 flex-col">
      <header className="flex flex-col gap-2 bg-banner px-gutter pt-[calc(var(--space-24)+var(--safe-area-top))] pb-6">
        <h1 className="text-banner-title break-keep text-on-dark">{title}</h1>
        {description && (
          <p className="text-caption break-keep text-on-dark-secondary">
            {description}
          </p>
        )}
      </header>
      <main className="flex flex-1 flex-col gap-3 px-gutter pt-6 pb-6">
        {children}
      </main>
    </div>
  );
}
