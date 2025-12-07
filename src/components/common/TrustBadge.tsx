import { ClipboardCheck, Shield, Lock, BadgeCheck, LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

const iconMap: Record<string, LucideIcon> = {
  ClipboardCheck,
  Shield,
  Lock,
  BadgeCheck,
};

interface TrustBadgeProps {
  icon: string;
  label: string;
  className?: string;
  variant?: 'default' | 'compact';
}

export function TrustBadge({ icon, label, className, variant = 'default' }: TrustBadgeProps) {
  const Icon = iconMap[icon] || Shield;

  if (variant === 'compact') {
    return (
      <div className={cn(
        "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium",
        "bg-primary/5 text-primary border border-primary/10",
        className
      )}>
        <Icon className="h-3 w-3" />
        <span>{label}</span>
      </div>
    );
  }

  return (
    <div className={cn(
      "flex items-center gap-2 px-4 py-2 rounded-xl",
      "bg-card border border-border shadow-soft",
      className
    )}>
      <div className="p-1.5 rounded-lg bg-primary/10">
        <Icon className="h-4 w-4 text-primary" />
      </div>
      <span className="text-sm font-medium text-foreground">{label}</span>
    </div>
  );
}
