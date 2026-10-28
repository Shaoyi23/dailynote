export type TrackTurn = {
  number: number;
  name: string;
  direction: string;
  speed: string;
  type: string;
  description: string;
  challenge: string;
  overtaking?: boolean;
  story?: string;
  x: number;
  y: number;
};

export type Track = {
  slug: string;
  name: string;
  shortName: string;
  country: string;
  city: string;
  tagline: string;
  summary: string;
  lengthKm: number;
  turnCount: number;
  direction: string;
  lapRecord: {
    time: string;
    driver: string;
    year: number;
  };
  drsZones: number;
  laps: number;
  firstGrandPrix: number;
  mapNote: string;
  path: string;
  turns: TrackTurn[];
};
