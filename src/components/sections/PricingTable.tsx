import Image from "next/image";
import Link from "next/link";

import { pricingPage } from "@/data/pages";

const CHIP_ICONS = [
  "/images/icons/plan-users-a.svg",
  "/images/icons/plan-users-b.svg",
  "/images/icons/plan-users-c.svg",
];

function Cell({ value }: { value: string | boolean }) {
  if (typeof value === "string") {
    return (
      <span className="text-[16px] leading-6 text-ink-500">{value}</span>
    );
  }
  return (
    <Image
      src={value ? "/images/icons/table-tick.svg" : "/images/icons/table-cross.svg"}
      alt={value ? "Included" : "Not included"}
      width={24}
      height={24}
      className="size-6"
    />
  );
}

/**
 * "Compare plans and features" — the wide feature matrix on /pricing.
 * Scrolls horizontally below the desktop breakpoint rather than reflowing.
 */
export function PricingTable() {
  return (
    <section className="flex w-full flex-col items-center gap-10 desktop:gap-[60px]">
      <div className="flex w-full items-center gap-5">
        <div aria-hidden className="h-px flex-1 bg-line" />
        <h2 className="text-center font-display text-[24px] leading-[1.1] text-ink-900 tablet:text-[28px] desktop:text-[34px] desktop:leading-[37.4px]">
          {pricingPage.tableTitle}
        </h2>
        <div aria-hidden className="h-px flex-1 bg-line" />
      </div>

      <div className="w-full overflow-x-auto">
        <div className="flex min-w-[900px] flex-col items-start">
          {/* ---- column headers ---- */}
          <div className="flex w-full items-end gap-3 px-5">
            <div className="flex w-[303px] shrink-0 items-center rounded-t-[12px] bg-surface p-5">
              <p className="text-[22px] leading-[33px] text-ink-700">
                {pricingPage.featuresColumnLabel}
              </p>
            </div>
            <div className="flex flex-1 items-end gap-3">
              {pricingPage.columns.map((column, index) => (
                <div
                  key={column.name}
                  className="relative flex flex-1 flex-col items-start gap-6 rounded-t-panel bg-surface px-5 pt-[30px] pb-5"
                >
                  <span
                    aria-hidden
                    className={`absolute inset-x-0 top-0 h-[10px] rounded-t-panel ${
                      column.accent === "accent" ? "bg-accent" : "bg-accent-100"
                    }`}
                  />
                  <div className="flex w-full flex-col justify-center gap-[6px]">
                    <div className="flex items-center gap-[2px]">
                      <p className="font-display text-[20px] leading-[30px] text-ink-800">
                        {column.name}
                      </p>
                      <span className="flex items-center gap-1 rounded-pill bg-page py-1 pr-[10px] pl-2">
                        <Image
                          src={CHIP_ICONS[index]}
                          alt=""
                          width={20}
                          height={20}
                          className="size-5"
                        />
                        <span className="text-[14px] leading-[21px] whitespace-nowrap text-ink-800">
                          {column.audience}
                        </span>
                      </span>
                    </div>
                    <p className="text-[16px] leading-6 text-ink-300">{column.price}</p>
                  </div>
                  <Link
                    href={pricingPage.ctaHref}
                    className="flex h-[49.5px] w-full items-center justify-center gap-[2px] rounded-pill bg-[#edf5fb] px-6 py-3 text-[17px] leading-[25.5px] font-semibold text-ink-700 transition-colors duration-200 hover:bg-surface-tint"
                  >
                    {pricingPage.ctaLabel}
                    <Image
                      src="/images/icons/arrow-right.svg"
                      alt=""
                      width={20}
                      height={20}
                      className="size-5"
                    />
                  </Link>
                </div>
              ))}
            </div>
          </div>

          {/* ---- rows ---- */}
          <table className="w-full rounded-panel bg-[#f8f9fa] py-6 shadow-[0_0_0_5px_#ffffff]">
            <caption className="sr-only">
              Feature comparison across the Personal, Team and Enterprise plans
            </caption>
            <thead className="sr-only">
              <tr>
                <th scope="col">{pricingPage.featuresColumnLabel}</th>
                {pricingPage.columns.map((column) => (
                  <th key={column.name} scope="col">
                    {column.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {pricingPage.rows.map((row) => (
                <tr key={row.label}>
                  <th
                    scope="row"
                    className="w-[329px] py-[18px] pr-8 pl-10 text-left text-[16px] leading-6 font-medium text-ink-700"
                  >
                    {row.label}
                  </th>
                  {row.cells.map((cell, index) => (
                    <td key={index} className="py-[18px] text-center">
                      <span className="flex items-center justify-center">
                        <Cell value={cell} />
                      </span>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
