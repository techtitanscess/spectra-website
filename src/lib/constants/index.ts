import {
  FoodIcon,
  MerchIcon,
  GameIcon,
  MusicIcon,
} from "@/modules/home/ui/components/icons";

export const events = [
  {
    link: "#",
    text: "Fashion Show",
    image: "/assets/fest.jpg",
  },

  {
    link: "#",
    text: "Roadies",
    image: "https://picsum.photos/600/400?random=2",
  },

  {
    link: "#",
    text: "Arm Wrestling",
    image: "https://picsum.photos/600/400?random=3",
  },

  {
    link: "#",
    text: "Singing",
    image: "https://picsum.photos/600/400?random=4",
  },
];

export const shops = [
  {
    id: "food",
    title: "Food Court",
    description: "Street bites, beverages, and desserts from student chefs.",
    Icon: FoodIcon,
    className: "sm:col-span-4 sm:row-span-2 lg:col-span-7 lg:row-span-2",
  },
  {
    id: "security",
    title: "Merch Shop",
    description: "Limited tees, stickers, and souvenirs to remember the fest.",
    Icon: MerchIcon,
    className: "sm:col-span-2 sm:row-span-2 lg:col-span-5 lg:row-span-2",
  },
  {
    id: "games",
    title: "Games Arena",
    description: "Arcade classics and mini challenges. Win goodies!",
    Icon: GameIcon,
    className: "sm:col-span-2 sm:row-span-2 lg:col-span-5 lg:row-span-2",
  },
  {
    id: "music",
    title: "Music Stage",
    description: "Live performances and open mic sessions through the day.",
    Icon: MusicIcon,
    className: "sm:col-span-4 sm:row-span-2 lg:col-span-7 lg:row-span-2",
  },
];

export const sponsors = [
  { name: "Triumph", src: "/assets/sponsors/triumph.png" },
  { name: "Zoreko", src: "/assets/sponsors/zoreko.png" },
  { name: "Samsung", src: "/assets/sponsors/samsung.png" },
  { name: "Microsoft", src: "/assets/sponsors/microsoft.webp" },
  { name: "Lakme", src: "/assets/sponsors/lakme.png" },
  { name: "TVS", src: "/assets/sponsors/tvs.png" },
];