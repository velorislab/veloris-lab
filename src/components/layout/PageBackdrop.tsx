import Image from "next/image";

/**
 * The pair of corner light rays (and optional grid) that sits behind the hero
 * of every standalone page. Same 541×715 artwork the home hero uses.
 */
export function PageBackdrop({ grid = false }: { grid?: boolean }) {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-[902px] overflow-hidden">
      <Image
        src="/images/backgrounds/page-ray-left.jpg"
        alt=""
        width={541}
        height={715}
        priority
        className="absolute top-0 left-0 h-[715px] w-[541px] object-contain"
      />
      <Image
        src="/images/backgrounds/page-ray-right.jpg"
        alt=""
        width={541}
        height={715}
        priority
        className="absolute top-0 right-0 h-[715px] w-[541px] object-contain"
      />
      {grid && (
        <Image
          src="/images/backgrounds/page-grid.svg"
          alt=""
          width={481}
          height={339}
          className="absolute top-[240px] left-1/2 hidden w-[481px] -translate-x-1/2 desktop:block"
        />
      )}
    </div>
  );
}
