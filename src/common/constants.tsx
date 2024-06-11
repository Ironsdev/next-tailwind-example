export interface CardType {
  title: string;
  id: string;
  imageSrc: string;
  location?: string;
}

export const DEFAULT_CARDS: CardType[] = [
  {
    id: "1",
    title: "Scotland Island",
    location: "Sydney, Australia",
    imageSrc: "/scotland_island.svg",
  },
  {
    id: "2",
    title: "The Charles Grand Brasserie & Bar",
    location: "Lorem ipsum, Dolor",
    imageSrc: "/charles_grand.svg",
  },
  {
    id: "3",
    title: "Bridge Climb",
    location: "Dolor, Sir amet",
    imageSrc: "/bridge_climb.svg",
  },
  {
    id: "4",
    title: "Scotland Island",
    location: "Sydney, Australia",
    imageSrc: "/scotland_island2.svg",
  },
  {
    id: "5",
    title: "Clam Bar",
    location: "Etcetera veni, Vidi vici",
    imageSrc: "/clam_bar.svg",
  },
  {
    id: "6",
    title: "Vidid Festival",
    location: "Syndney, Australia",
    imageSrc: "/vivid_festival.svg",
  },
];
