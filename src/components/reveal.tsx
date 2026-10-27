"use client";

import type { ReactNode } from "react";
import { MotionConfig, motion, type Variants } from "motion/react";

const groupVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      delayChildren: 0.08,
      staggerChildren: 0.075,
    },
  },
};

const itemVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 8,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.72,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export function RevealGroup({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <MotionConfig reducedMotion="user">
      <motion.div
        data-reveal=""
        className={className}
        variants={groupVariants}
        initial="hidden"
        animate="visible"
      >
        {children}
      </motion.div>
    </MotionConfig>
  );
}

export function RevealItem({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      data-reveal=""
      className={className}
      variants={itemVariants}
    >
      {children}
    </motion.div>
  );
}
