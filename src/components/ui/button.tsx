"use client";

import Link from "next/link";
import { motion } from "framer-motion";

interface ButtonProps {
  children: React.ReactNode;
  href?: string;
  type?: "button" | "submit";
  onClick?: () => void;
  className?: string;
  variant?: "primary" | "outline";
}

const ArrowIcon = () => (
  <span className="text-xs leading-none">^</span>
);

export function Button({
  children,
  href,
  type = "button",
  onClick,
  className = "",
  variant = "primary",
}: ButtonProps) {
  const baseStyles =
    "inline-flex items-center gap-2 rounded-full px-8 py-4 font-sans text-sm font-medium tracking-wide uppercase transition-all duration-300";
  const variants = {
    primary:
      "glass text-ink hover:bg-white/70",
    outline:
      "glass text-ink hover:bg-white/70",
  };

  const styles = `${baseStyles} ${variants[variant]} ${className}`;

  if (href) {
    return (
      <motion.div whileHover={{ y: -2 }} whileTap={{ y: 0 }} className="inline-block">
        <Link href={href} className={styles}>
          {children}
          <ArrowIcon />
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.button
      type={type}
      onClick={onClick}
      className={styles}
      whileHover={{ y: -2 }}
      whileTap={{ y: 0 }}
    >
      {children}
      <ArrowIcon />
    </motion.button>
  );
}
