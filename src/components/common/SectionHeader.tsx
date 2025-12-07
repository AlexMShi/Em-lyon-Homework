import { cn } from '@/lib/utils';

interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
  className?: string;
}

export function SectionHeader({ 
  eyebrow, 
  title, 
  description, 
  align = 'center',
  className 
}: SectionHeaderProps) {
  return (
    <div className={cn(
      "max-w-3xl",
      align === 'center' && "mx-auto text-center",
      className
    )}>
      {eyebrow && (
        <span className="inline-block px-3 py-1 mb-4 text-xs font-semibold uppercase tracking-wider text-primary bg-primary/10 rounded-full">
          {eyebrow}
        </span>
      )}
      <h2 className="text-3xl md:text-4xl font-display font-semibold text-foreground mb-4">
        {title}
      </h2>
      {description && (
        <p className="text-lg text-muted-foreground">
          {description}
        </p>
      )}
    </div>
  );
}
