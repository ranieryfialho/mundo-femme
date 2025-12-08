import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface BreadcrumbItem {
  label: string;
  href?: string; // Se não tiver href, é o item atual (não clicável)
}

interface CustomBreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
}

export function CustomBreadcrumb({ items, className }: CustomBreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" className={cn("flex items-center space-x-2", className)}>
      <Link 
        href="/" 
        className="text-xs font-sans font-medium uppercase tracking-widest text-gray-400 hover:text-brand-dark transition-colors"
      >
        Home
      </Link>
      
      {items.map((item, index) => (
        <div key={index} className="flex items-center space-x-2">
          <ChevronRight className="w-3 h-3 text-gray-300" />
          {item.href ? (
            <Link 
              href={item.href}
              className="text-xs font-sans font-medium uppercase tracking-widest text-gray-400 hover:text-brand-dark transition-colors"
            >
              {item.label}
            </Link>
          ) : (
            <span className="text-xs font-sans font-bold uppercase tracking-widest text-brand-dark">
              {item.label}
            </span>
          )}
        </div>
      ))}
    </nav>
  );
}