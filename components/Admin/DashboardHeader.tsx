interface DashboardHeaderProps {
  title: string;
  subtitle?: string;
  className?: string;
}

export default function DashboardHeader({
  title,
  subtitle,
  className = "",
}: DashboardHeaderProps) {
  return (
    <div className={`space-y-2 ${className}`}>
      <h1 className="text-2xl md:text-3xl font-semibold text-foreground">{title}</h1>
      {subtitle && <p className="text-sm text-gray-600">{subtitle}</p>}
    </div>
  );
}
