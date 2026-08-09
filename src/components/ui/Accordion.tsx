"use client";

import Image from "next/image";
import { useId, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

import { transitions } from "@/lib/motion";

export interface AccordionItem {
  title: string;
  body: string;
}

interface AccordionProps {
  items: AccordionItem[];
  /** Index open on first render. Pass -1 for all closed. */
  defaultOpen?: number;
  variant?: "plain" | "card";
}

/**
 * Shared accordion. `plain` is the divider-separated list used by "Who Can Use";
 * `card` is the boxed FAQ style with a dark round toggle.
 */
export function Accordion({
  items,
  defaultOpen = 0,
  variant = "plain",
}: AccordionProps) {
  const [openIndex, setOpenIndex] = useState(defaultOpen);
  const baseId = useId();

  return (
    <div
      className={
        variant === "card"
          ? "flex w-full flex-col gap-6"
          : "flex w-full flex-col bg-page"
      }
    >
      {items.map((item, index) => {
        const isOpen = index === openIndex;
        const panelId = `${baseId}-panel-${index}`;
        const buttonId = `${baseId}-button-${index}`;

        return (
          <div
            key={item.title}
            className={
              variant === "card"
                ? // Overlay hairline, as in the source — a real border would
                  // add 2px to every row.
                  "overflow-hidden rounded-card bg-surface-muted shadow-[inset_0_0_0_1px_var(--color-line),0_0_0_4px_#ffffff]"
                : index > 0
                  ? "border-t border-black/5"
                  : ""
            }
          >
            <h3>
              <button
                type="button"
                id={buttonId}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpenIndex(isOpen ? -1 : index)}
                className={`flex w-full cursor-pointer items-center justify-between gap-3 text-left ${
                  variant === "card"
                    ? "px-5 py-4 tablet:px-[30px]"
                    : "px-4 py-[25.5px] tablet:px-8"
                }`}
              >
                <span
                  className={
                    variant === "card"
                      ? "font-display text-[18px] leading-[27px] text-ink-600 tablet:text-[20px] tablet:leading-[30px]"
                      : "font-display text-[20px] leading-[30px] text-ink-600 tablet:text-[22px] tablet:leading-[33px]"
                  }
                >
                  {item.title}
                </span>
                <span
                  className={`flex shrink-0 items-center justify-center rounded-pill ${
                    variant === "card" ? "size-10 bg-ink-600" : "size-7"
                  }`}
                >
                  <motion.span
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={transitions.accordion}
                    className="flex items-center justify-center"
                  >
                    <Image
                      src={
                        variant === "card"
                          ? "/images/icons/plus.svg"
                          : "/images/icons/plus-outline.svg"
                      }
                      alt=""
                      width={variant === "card" ? 24 : 28}
                      height={variant === "card" ? 24 : 28}
                    />
                  </motion.span>
                </span>
              </button>
            </h3>

            <AnimatePresence initial={false}>
              {isOpen && item.body && (
                <motion.div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={transitions.accordion}
                  className="overflow-hidden"
                >
                  <p
                    className={`text-[16px] leading-6 text-ink-300 tablet:text-[18px] tablet:leading-[27px] ${
                      variant === "card"
                        ? "px-5 pb-4 tablet:px-[30px]"
                        : "px-4 pb-[29px] tablet:px-8"
                    }`}
                  >
                    {item.body}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
