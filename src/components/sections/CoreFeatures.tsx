import { FeatureCard } from "@/components/ui/FeatureCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { coreFeatures } from "@/data/home";

/** "Explore Our Core Features" — 3-column card grid (1080px shell). */
export function CoreFeatures() {
  return (
    <section
      id="features"
      className="flex w-full max-w-[1080px] flex-col items-center gap-10 desktop:gap-20"
    >
      <SectionHeading
        badge={coreFeatures.badge}
        title={coreFeatures.title}
        description={coreFeatures.description}
        textWidth={780}
      />
      <div className="grid w-full grid-cols-1 gap-[30px] tablet:grid-cols-2 desktop:grid-cols-3">
        {coreFeatures.items.map((item) => (
          <FeatureCard key={item.title} item={item} />
        ))}
      </div>
    </section>
  );
}
