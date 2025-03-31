"use client";

import { useRef, useState, useEffect } from "react";
import { useMotionValue, motion, useSpring, useTransform } from "framer-motion";

type SpotlightProps = {
  children?: React.ReactNode;
  className?: string;
  fill?: string;
};

export function Spotlight({
  children,
  className = "",
  fill = "white",
}: SpotlightProps) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const ref = useRef<HTMLDivElement>(null);
  const [rect, setRect] = useState<DOMRect | null>(null);
  const size = 400;

  const spotlightOpacity = useSpring(0, { stiffness: 100, damping: 30 });
  const spotlightLeft = useTransform(mouseX, (x: number) => `${x - size / 2}px`);
  const spotlightTop = useTransform(mouseY, (y: number) => `${y - size / 2}px`);

  useEffect(() => {
    if (!ref.current) return;
    const updateRect = () => {
      if (ref.current) {
        setRect(ref.current.getBoundingClientRect());
      }
    };
    
    window.addEventListener("resize", updateRect);
    updateRect();
    
    return () => window.removeEventListener("resize", updateRect);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!rect) return;
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    mouseX.set(x);
    mouseY.set(y);
    spotlightOpacity.set(0.6);
  };

  const handleMouseLeave = () => {
    spotlightOpacity.set(0);
  };

  return (
    <div
      ref={ref}
      className={`relative overflow-hidden ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        className="pointer-events-none absolute z-10 opacity-0"
        style={{
          width: size,
          height: size,
          borderRadius: "50%",
          background: `radial-gradient(circle at center, ${fill} 0%, transparent 65%)`,
          opacity: spotlightOpacity,
          left: spotlightLeft,
          top: spotlightTop,
        }}
      />
      {children}
    </div>
  );
} 