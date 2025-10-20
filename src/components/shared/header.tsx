import { cn } from "@/lib/utils";
import { codeFont } from "../fonts";

interface HeaderProps {
  title?: string;
  subtitle?: string;
}

export default function Header({ title, subtitle }: HeaderProps) {
  return (
    <div className="flex flex-col items-center gap-2 text-center">
      <span className={cn(codeFont.className,"text-primary text-4xl font-semibold tracking-tight italic md:text-6xl")}>{title}</span>
      <p className="text-sm md:text-lg text-muted-foreground">{subtitle}</p>
    </div>
  );
}
