import Image from "next/image";

import { SectionBadge } from "@/components/ui/SectionBadge";
import { team } from "@/data/home";

/** "Our Team Members" — four portrait cards. */
export function Team() {
  return (
    <section className="section-shell items-start gap-10 desktop:gap-[60px]">
      <div className="flex w-full flex-col items-center gap-4">
        <SectionBadge {...team.badge} />
        <h2 className="text-center text-[32px] leading-[1.2] text-ink-900 tablet:text-[42px] desktop:text-[56px] desktop:leading-[72.8px]">
          {team.title}
        </h2>
      </div>

      <ul className="grid w-full grid-cols-1 gap-6 tablet:grid-cols-2 desktop:grid-cols-4">
        {team.members.map((member) => (
          <li
            key={member.name}
            className="relative flex flex-col items-start overflow-hidden rounded-t-panel rounded-b-card border border-line shadow-[0_17px_24px_0_rgba(178,178,178,0.04),0_0_0_5px_#ffffff]"
          >
            <Image
              src="/images/backgrounds/team-card.svg"
              alt=""
              fill
              sizes="(min-width: 1320px) 282px, (min-width: 810px) 50vw, 100vw"
              className="rounded-t-panel rounded-b-card object-cover"
            />
            <div className="relative flex w-full items-center overflow-hidden rounded-t-panel px-[6px] pt-[6px]">
              <div className="relative aspect-[270/244] w-full overflow-hidden rounded-t-card shadow-[inset_0_2px_0_0_#fff,inset_2px_0_0_0_#fff,inset_-2px_0_0_0_#fff]">
                <Image
                  src="/images/backgrounds/team-card-lights.png"
                  alt=""
                  fill
                  sizes="270px"
                  className="object-cover mix-blend-hard-light"
                />
                <Image
                  src={member.photo}
                  alt={member.name}
                  fill
                  sizes="270px"
                  className="object-cover"
                />
              </div>
            </div>
            <div className="relative flex w-full items-center justify-between px-6 py-5">
              <div className="flex flex-col">
                <p className="font-display text-[18px] leading-[27px] text-ink-700">
                  {member.name}
                </p>
                <p className="text-[16px] leading-6 text-ink-250">{member.role}</p>
              </div>
              <a
                href={member.social}
                target="_blank"
                rel="noreferrer noopener"
                aria-label={`${member.name} on X`}
                className="shrink-0 transition-opacity duration-200 hover:opacity-70"
              >
                <Image
                  src="/images/icons/x-social-dark.svg"
                  alt=""
                  width={24}
                  height={24}
                  className="size-6"
                />
              </a>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
