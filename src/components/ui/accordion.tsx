"use client"

import React, { useState, useRef } from "react";
import { cn } from "../../lib/utils";

interface AccordionProps {
  type?: "single" | "multiple";
  collapsible?: boolean;
  children: React.ReactNode;
  className?: string;
}

interface AccordionItemProps {
  value: string;
  children: React.ReactNode;
  className?: string;
}

interface AccordionTriggerProps {
  children: React.ReactNode;
  className?: string;
}

interface AccordionContentProps {
  children: React.ReactNode;
  className?: string;
}

interface AccordionContextValue {
  openItems: string[];
  toggleItem: (value: string) => void;
}

const AccordionContext = React.createContext<AccordionContextValue | undefined>(undefined);

export function Accordion({ 
  type = "single", 
  collapsible = false, 
  children,
  className
}: AccordionProps) {
  const [openItems, setOpenItems] = useState<string[]>([]);

  const toggleItem = (value: string) => {
    if (type === "single") {
      if (collapsible && openItems.includes(value)) {
        setOpenItems([]);
      } else {
        setOpenItems([value]);
      }
    } else {
      if (openItems.includes(value)) {
        setOpenItems(openItems.filter(item => item !== value));
      } else {
        setOpenItems([...openItems, value]);
      }
    }
  };

  return (
    <AccordionContext.Provider value={{ openItems, toggleItem }}>
      <div className={cn("space-y-1", className)}>
        {children}
      </div>
    </AccordionContext.Provider>
  );
}

export function AccordionItem({ value, children, className }: AccordionItemProps) {
  const context = React.useContext(AccordionContext);
  const isOpen = context?.openItems.includes(value);
  
  return (
    <div 
      className={cn("border-b", className)} 
      data-state={isOpen ? "open" : "closed"}
      data-value={value}
    >
      {children}
    </div>
  );
}

export function AccordionTrigger({ children, className }: AccordionTriggerProps) {
  const context = React.useContext(AccordionContext);
  if (!context) {
    throw new Error("AccordionTrigger must be used within an Accordion");
  }

  const triggerRef = useRef<HTMLDivElement>(null);

  const handleClick = (e: React.MouseEvent) => {
    // Find the closest AccordionItem parent
    const item = (e.currentTarget as HTMLElement).closest('[data-value]');
    if (item) {
      const value = item.getAttribute('data-value') || '';
      context.toggleItem(value);
    }
  };

  // Get parent accordion item value
  const getItemValue = () => {
    if (triggerRef.current) {
      const item = triggerRef.current.closest('[data-value]');
      return item?.getAttribute('data-value') || '';
    }
    return '';
  };
  
  // Check if this trigger's accordion item is open
  const isOpen = context.openItems.includes(getItemValue());
  
  return (
    <div className="flex" ref={triggerRef}>
      <button
        type="button"
        onClick={handleClick}
        className={cn(
          "flex flex-1 items-center justify-between py-4 text-sm font-medium transition-all hover:underline",
          className
        )}
      >
        {children}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={cn(
            "h-4 w-4 shrink-0 text-amber-500 transition-transform duration-200",
            isOpen ? "rotate-180" : ""
          )}
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </button>
    </div>
  );
}

export function AccordionContent({ children, className }: AccordionContentProps) {
  const context = React.useContext(AccordionContext);
  if (!context) {
    throw new Error("AccordionContent must be used within an Accordion");
  }
  
  const contentRef = useRef<HTMLDivElement>(null);
  
  // Find closest AccordionItem parent value
  const getItemValue = () => {
    if (contentRef.current) {
      const item = contentRef.current.closest('[data-value]');
      return item?.getAttribute('data-value') || '';
    }
    return '';
  };
  
  const isOpen = context.openItems.includes(getItemValue());
  
  return (
    <div 
      className={cn(
        "overflow-hidden transition-all duration-300",
        isOpen ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0",
        className
      )}
    >
      <div ref={contentRef} className="pb-4 pt-0">
        {children}
      </div>
    </div>
  );
} 