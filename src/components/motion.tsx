"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type Variants,
} from "framer-motion";
import {
  type ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";

const easeOut = [0.22, 1, 0.36, 1] as const;

/** false on server + first client paint → no hydration mismatch with motion styles */
export function useHasMounted() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return mounted;
}

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: easeOut },
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { duration: 0.6, ease: easeOut },
  },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.94, y: 20 },
  show: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.75, ease: easeOut },
  },
};

export const stagger: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.05,
    },
  },
};

export const staggerFast: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.02,
    },
  },
};

type RevealProps = {
  children: ReactNode;
  className?: string;
  variants?: Variants;
  delay?: number;
  once?: boolean;
  amount?: number;
  as?: "div" | "section" | "article" | "header" | "footer" | "li" | "ul";
};

export function Reveal({
  children,
  className,
  variants = fadeUp,
  delay = 0,
  once = true,
  amount = 0.2,
  as = "div",
}: RevealProps) {
  const mounted = useHasMounted();
  const reduce = useReducedMotion();
  const Tag = motion[as];

  if (!mounted || reduce) {
    return <div className={className}>{children}</div>;
  }

  return (
    <Tag
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="show"
      viewport={{ once, amount, margin: "0px 0px -8% 0px" }}
      transition={{ delay }}
    >
      {children}
    </Tag>
  );
}

export function Stagger({
  children,
  className,
  as = "div",
  fast = false,
  amount = 0.15,
}: {
  children: ReactNode;
  className?: string;
  as?: "div" | "section" | "ul" | "header";
  fast?: boolean;
  amount?: number;
}) {
  const mounted = useHasMounted();
  const reduce = useReducedMotion();
  const Tag = motion[as];

  if (!mounted || reduce) {
    return <div className={className}>{children}</div>;
  }

  return (
    <Tag
      className={className}
      variants={fast ? staggerFast : stagger}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount, margin: "0px 0px -6% 0px" }}
    >
      {children}
    </Tag>
  );
}

export function Item({
  children,
  className,
  variants = fadeUp,
}: {
  children: ReactNode;
  className?: string;
  variants?: Variants;
}) {
  const mounted = useHasMounted();
  const reduce = useReducedMotion();

  if (!mounted || reduce) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div className={className} variants={variants}>
      {children}
    </motion.div>
  );
}

export function HoverLift({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const mounted = useHasMounted();
  const reduce = useReducedMotion();

  // Plain div until mounted — avoid tabindex / motion style hydration diffs
  if (!mounted || reduce) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      whileHover={{ y: -6, scale: 1.01 }}
      whileTap={{ scale: 0.985 }}
      transition={{ type: "spring", stiffness: 380, damping: 28 }}
    >
      {children}
    </motion.div>
  );
}

export function Float({
  children,
  className,
  amplitude = 10,
  duration = 5.5,
}: {
  children: ReactNode;
  className?: string;
  amplitude?: number;
  duration?: number;
}) {
  const mounted = useHasMounted();
  const reduce = useReducedMotion();

  if (!mounted || reduce) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      animate={{ y: [0, -amplitude, 0] }}
      transition={{ duration, repeat: Infinity, ease: "easeInOut" }}
    >
      {children}
    </motion.div>
  );
}

export function Parallax({
  children,
  className,
  offset = 48,
}: {
  children: ReactNode;
  className?: string;
  offset?: number;
}) {
  const mounted = useHasMounted();
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [offset, -offset]);
  const smoothY = useSpring(y, { stiffness: 80, damping: 22, mass: 0.4 });

  if (!mounted || reduce) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div ref={ref} className={className} style={{ y: smoothY }}>
      {children}
    </motion.div>
  );
}

export function ProgressBar({
  value,
  className,
}: {
  value: number;
  className?: string;
}) {
  const mounted = useHasMounted();
  const reduce = useReducedMotion();

  return (
    <div
      className={`h-1.5 overflow-hidden rounded-full bg-zinc-100 ${className ?? ""}`}
    >
      {!mounted || reduce ? (
        <div
          className="h-full origin-left rounded-full bg-black"
          style={{ width: `${value}%` }}
        />
      ) : (
        <motion.div
          className="h-full origin-left rounded-full bg-black"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: value / 100 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 1.1, ease: easeOut, delay: 0.15 }}
          style={{ width: "100%" }}
        />
      )}
    </div>
  );
}

export function MagneticButton({
  children,
  className,
  href,
}: {
  children: ReactNode;
  className?: string;
  href: string;
}) {
  const mounted = useHasMounted();
  const reduce = useReducedMotion();

  if (!mounted || reduce) {
    return (
      <a href={href} className={className}>
        {children}
      </a>
    );
  }

  return (
    <motion.a
      href={href}
      className={className}
      whileHover={{ scale: 1.035 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 420, damping: 24 }}
    >
      {children}
    </motion.a>
  );
}

export function BlurFade({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const mounted = useHasMounted();
  const reduce = useReducedMotion();

  if (!mounted || reduce) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, filter: "blur(10px)", y: 18 }}
      animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
      transition={{ duration: 0.85, ease: easeOut, delay }}
    >
      {children}
    </motion.div>
  );
}

/** Only enable mount-time enter animation after hydration */
export function Enter({
  children,
  className,
  delay = 0,
  y = 24,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
}) {
  const mounted = useHasMounted();
  const reduce = useReducedMotion();

  if (!mounted || reduce) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: easeOut, delay }}
    >
      {children}
    </motion.div>
  );
}
