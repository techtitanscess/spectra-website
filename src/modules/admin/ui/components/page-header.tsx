import { codeFont } from "@/components/fonts";
import { cn } from "@/lib/utils";

interface PageHeaderProps {
  header?: string;
  desc?: string;
}

export default function PageHeader({ header, desc }: PageHeaderProps) {
  return (
    <div className="flex flex-col  items-start">
      <span
        className={cn(
          codeFont.className,
          "text-primary text-xl md:text-4xl tracking-tight font-semibold"
        )}
      >
        {header}
      </span>
      <p className="text-muted-foreground hidden md:flex text-sm">{desc}</p>
    </div>
  );
}
