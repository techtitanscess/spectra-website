import EventsSection from "./sections/events";
import HeroSection from "./sections/hero";
import HackerwrathSection from "./sections/hackerwrath";
import ShopSection from "./sections/shop";
import SponsorsSection from "./sections/sponsors";

export default function LandingView() {
  return (
    <div className="flex flex-col">
      <HeroSection />
      <HackerwrathSection />
      <EventsSection />
      <ShopSection />
      <div className="py-20">
        <SponsorsSection />
      </div>
    </div>
  );
}
