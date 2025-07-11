// Copyright © Aptos
// SPDX-License-Identifier: Apache-2.0
"use client";

import { type Transition, motion } from "motion/react";
import useMeasure from "react-use-measure";

interface ExpandingContainerProps {
  children: React.ReactNode;
  className?: string;
  initialHeight?: number;
  transition?: Transition;
  debounce?: number;
}

export default function ExpandingContainer({
  children,
  className,
  initialHeight = 0,
  transition = { duration: 0.4, ease: [0.19, 1, 0.22, 1] },
  debounce,
}: ExpandingContainerProps) {
  const [contentRef, { height }] = useMeasure({ offsetSize: true, debounce });

  return (
    <motion.div
      className={"overflow-hidden"}
      initial={{ height: initialHeight }}
      animate={{ height }}
      transition={transition}
    >
      <div ref={contentRef} className={className}>
        {children}
      </div>
    </motion.div>
  );
}
