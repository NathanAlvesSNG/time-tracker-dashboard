type DashboardSectionProps = {
  title?: string;
  filters?: React.ReactNode;
  children: React.ReactNode;
};

export default function DashboardSection({
  title,
  filters,
  children,
}: DashboardSectionProps) {
  return (
    <section className="rounded-xl border bg-background">
      {(title || filters) && (
        <header className="border-b px-4 py-3 lg:px-6 space-y-2">
          {title && (
            <h2 className="text-base font-semibold text-foreground">{title}</h2>
          )}
          {filters}
        </header>
      )}

      <div className="px-4 py-6 lg:px-6">{children}</div>
    </section>
  );
}
