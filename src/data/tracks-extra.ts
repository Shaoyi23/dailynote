import trackMapsJson from "./track-maps.json";
import type { Track, TrackTurn } from "./track-types";

type MapTurn = {
  x: number;
  y: number;
  direction: string;
  angle: number;
};

type TrackMap = {
  path: string;
  turns: MapTurn[];
};

type TurnOverride = Partial<
  Omit<TrackTurn, "number" | "x" | "y">
>;

type TrackInput = Omit<Track, "path" | "turns" | "turnCount"> & {
  map: keyof typeof trackMaps;
  overrides?: Record<number, TurnOverride>;
};

const trackMaps = trackMapsJson as Record<string, TrackMap>;

function cornerType(angle: number) {
  if (angle >= 80) return "hairpin";
  if (angle >= 55) return "slow corner";
  if (angle >= 35) return "medium-speed corner";
  if (angle >= 20) return "fast corner";
  return "flat-out kink";
}

function cornerSpeed(angle: number) {
  if (angle >= 80) return "≈ 85 km/h";
  if (angle >= 55) return "≈ 120 km/h";
  if (angle >= 35) return "≈ 170 km/h";
  if (angle >= 20) return "≈ 230 km/h";
  return "≈ 270 km/h";
}

function cornerDescription(
  direction: string,
  type: string,
) {
  const side = direction === "left" ? "left" : "right";

  if (type === "hairpin") {
    return "A tight hairpin where the car has to rotate at low speed and put the power down cleanly. The exit matters more than the entry.";
  }

  if (type === "slow corner") {
    return `A slow ${side}-hander that rewards patient braking and a tidy line. The car needs to be settled before the throttle goes down.`;
  }

  if (type === "medium-speed corner") {
    return `A medium-speed ${side}-hander that exposes the balance of the car. A clean entry makes the exit feel easy.`;
  }

  if (type === "fast corner") {
    return `A fast ${side}-hander where commitment matters. A small lift costs speed all the way to the next braking zone.`;
  }

  return `A quick ${side} kink that is easy to underestimate. The car needs a stable platform to carry speed without running wide.`;
}

function cornerChallenge(type: string) {
  if (type === "hairpin") {
    return "Brake late without locking, rotate the car, and get on the throttle early enough to use the full exit.";
  }

  if (type === "slow corner") {
    return "Stay off the kerbs on entry and keep the rear settled through the exit.";
  }

  if (type === "medium-speed corner") {
    return "Find the balance between rotation and exit speed; too much steering will cost you.";
  }

  if (type === "fast corner") {
    return "Commit to the entry and keep the car on the racing line; the corner is faster than it looks.";
  }

  return "Keep the steering smooth and let the car breathe over the exit.";
}

function buildTurns(
  trackMap: TrackMap,
  overrides: Record<number, TurnOverride>,
): TrackTurn[] {
  return trackMap.turns.map((marker, index) => {
    const number = index + 1;
    const override = overrides[number] ?? {};
    const type = override.type ?? cornerType(marker.angle);
    const direction = override.direction ?? marker.direction;

    return {
      number,
      name: override.name ?? `turn ${number}`,
      direction,
      speed: override.speed ?? cornerSpeed(marker.angle),
      type,
      description:
        override.description ?? cornerDescription(direction, type),
      challenge: override.challenge ?? cornerChallenge(type),
      overtaking: override.overtaking,
      story: override.story,
      x: marker.x,
      y: marker.y,
    };
  });
}

function makeTrack(input: TrackInput): Track {
  const { map, overrides = {}, ...meta } = input;
  const trackMap = trackMaps[map];

  if (!trackMap) {
    throw new Error(`Missing track map: ${map}`);
  }

  const turns = buildTurns(trackMap, overrides);

  return {
    ...meta,
    turnCount: turns.length,
    path: trackMap.path,
    turns,
  };
}

export const extraTracks: Track[] = [
  makeTrack({
    map: "shanghai",
    slug: "shanghai",
    name: "Shanghai International Circuit",
    shortName: "shanghai",
    country: "China",
    city: "Shanghai",
    tagline: "the snail",
    summary:
      "A Hermann Tilke design built around a giant opening spiral and one of the longest back straights in Formula 1. Shanghai rewards traction, patience, and a car that can change direction while still loaded.",
    lengthKm: 5.451,
    direction: "clockwise",
    lapRecord: { time: "1:32.238", driver: "Michael Schumacher", year: 2004 },
    drsZones: 2,
    laps: 56,
    firstGrandPrix: 2004,
    mapNote: "illustrative layout · not to scale",
    overrides: {
      1: {
        name: "turn 1",
        direction: "right",
        speed: "≈ 95 km/h",
        type: "opening right",
        description:
          "The opening corner starts downhill and tightens as it runs away from the main straight. The car has to be patient with the steering while the braking load comes off.",
        challenge:
          "Brake deep, keep the front tyres alive, and do not run wide on the exit before the spiral begins.",
        overtaking: true,
        story:
          "The first braking zone is often the busiest of the lap, especially on the opening lap.",
      },
      2: {
        name: "the snail",
        direction: "right",
        speed: "≈ 80 km/h",
        type: "spiral corner",
        description:
          "The track curls back on itself here, asking for a second, slower turn of the wheel before the car can be released towards the next straight.",
        challenge:
          "Resist the urge to get on the power early; the car has to rotate through the whole spiral before the exit opens.",
      },
      6: {
        name: "the hairpin",
        direction: "right",
        speed: "≈ 80 km/h",
        type: "hairpin",
        description:
          "A tight hairpin brings the car to its lowest speed of the lap. The braking zone is a real overtaking opportunity, but the exit is long and easy to lose.",
        challenge:
          "Get the car stopped, rotated, and pointed straight before asking for throttle. Wheelspin here is expensive.",
        overtaking: true,
      },
      15: {
        name: "turn 15",
        direction: "right",
        speed: "≈ 90 km/h",
        type: "slow right",
        description:
          "A slow right that follows the long back straight. The braking zone is short, and the exit feeds the final sequence.",
        challenge:
          "Brake late enough to defend, but leave enough front grip to rotate the car for the exit.",
        overtaking: true,
      },
      16: {
        name: "final corner",
        direction: "left",
        speed: "≈ 140 km/h",
        type: "traction corner",
        description:
          "The last corner is all about the exit onto the main straight. A good launch here is worth more than a brave entry.",
        challenge:
          "Unwind the steering early and use the throttle without running wide on the exit curb.",
      },
    },
  }),
  makeTrack({
    map: "spa",
    slug: "spa",
    name: "Circuit de Spa-Francorchamps",
    shortName: "spa",
    country: "Belgium",
    city: "Spa-Francorchamps",
    tagline: "the forest rollercoaster",
    summary:
      "Seven kilometres of elevation, forest, and high-speed commitment. Spa is a lap where the weather can change in one sector and the best corners refuse to feel easy.",
    lengthKm: 7.004,
    direction: "clockwise",
    lapRecord: { time: "1:46.286", driver: "Valtteri Bottas", year: 2018 },
    drsZones: 2,
    laps: 44,
    firstGrandPrix: 1950,
    mapNote: "illustrative layout · not to scale",
    overrides: {
      1: {
        name: "La Source",
        direction: "right",
        speed: "≈ 80 km/h",
        type: "hairpin",
        description:
          "The lap begins with a tight right hairpin after the main straight. It is slow, but the exit launches the car down the hill towards Eau Rouge.",
        challenge:
          "Brake late enough to make a move, but not so late that the exit is compromised.",
        overtaking: true,
      },
      2: {
        name: "Eau Rouge",
        direction: "left",
        speed: "≈ 280 km/h",
        type: "high-speed kink",
        description:
          "The famous left-hand kink at the bottom of the valley is followed immediately by the climb to Raidillon. The car compresses, then goes light as the track rises.",
        challenge:
          "Commit before the corner and keep the steering stable; the uphill exit is already in the next corner.",
        story:
          "Eau Rouge is one of the few corners where a modern F1 car can still feel under-loaded in the middle of the lap.",
      },
      3: {
        name: "Raidillon",
        direction: "right",
        speed: "≈ 270 km/h",
        type: "uphill right",
        description:
          "The track climbs steeply through a blind right. The car needs total commitment, and the exit sets up the long Kemmel Straight.",
        challenge:
          "Do not add steering after the apex; the car will already be using every bit of the available grip.",
      },
      5: {
        name: "Les Combes",
        direction: "right",
        speed: "≈ 110 km/h",
        type: "braking chicane",
        description:
          "After the long Kemmel Straight, Les Combes is a hard braking zone into a tight right-left sequence. It is one of the best overtaking spots on the lap.",
        challenge:
          "Hit the first apex without locking a front, then keep the car tight for the second part.",
        overtaking: true,
      },
      6: {
        name: "Les Combes exit",
        direction: "left",
        speed: "≈ 120 km/h",
        type: "chicane exit",
        description:
          "The second half of Les Combes opens onto the descent towards Malmedy. A clean exit matters more than a spectacular first apex.",
        challenge:
          "Get the car straight early and let the rear settle before the next downhill section.",
      },
      8: {
        name: "Rivage",
        direction: "left",
        speed: "≈ 85 km/h",
        type: "hairpin",
        description:
          "A slow left hairpin in the middle of the forest. The corner is tighter than it looks and punishes a wide entry.",
        challenge:
          "Brake in a straight line, rotate the car at the apex, and get on the power without wheelspin.",
        overtaking: true,
      },
      10: {
        name: "Pouhon",
        direction: "left",
        speed: "≈ 240 km/h",
        type: "double left",
        description:
          "Pouhon is a long, fast double-left that loads the car for several seconds. The first movement is gentle; the second is where the lap can be made or lost.",
        challenge:
          "Carry speed through the first part without pinching the second, and let the car use the full width on exit.",
        story:
          "Drivers talk about Pouhon as a corner where confidence in the front axle matters more than bravery.",
      },
      17: {
        name: "Blanchimont",
        direction: "left",
        speed: "≈ 250 km/h",
        type: "high-speed left",
        description:
          "A flat-out left before the final chicane, taken with the car already thinking about the braking zone ahead. The corner is quick enough to expose any instability at high speed.",
        challenge:
          "Keep the car settled and do not lift before the braking zone; the exit is narrow and fast.",
      },
      18: {
        name: "Bus Stop entry",
        direction: "right",
        speed: "≈ 85 km/h",
        type: "chicane",
        description:
          "The final chicane is a tight right-left that brings the lap to a close. It is slow, but the exit is everything because the pit straight follows.",
        challenge:
          "Brake hard, use the first apex, and leave enough room to rotate for the second part.",
        overtaking: true,
      },
      19: {
        name: "Bus Stop exit",
        direction: "left",
        speed: "≈ 95 km/h",
        type: "chicane exit",
        description:
          "The last part of the Bus Stop sends the car onto the main straight. It is easy to lose a good lap here with a nervous throttle.",
        challenge:
          "Open the steering early and get the power down cleanly for the run to La Source.",
      },
    },
  }),
  makeTrack({
    map: "singapore",
    slug: "singapore",
    name: "Marina Bay Street Circuit",
    shortName: "singapore",
    country: "Singapore",
    city: "Singapore",
    tagline: "the night street fight",
    summary:
      "A floodlit street circuit that punishes mistakes with concrete walls. The lap is long, the humidity is brutal, and the safety car is rarely far from the story.",
    lengthKm: 4.94,
    direction: "anticlockwise",
    lapRecord: { time: "1:35.867", driver: "Lewis Hamilton", year: 2023 },
    drsZones: 2,
    laps: 62,
    firstGrandPrix: 2008,
    mapNote: "illustrative layout · not to scale",
    overrides: {
      1: {
        name: "turn 1",
        direction: "right",
        speed: "≈ 90 km/h",
        type: "opening braking zone",
        description:
          "The first corner is a heavy braking zone after the start straight. The walls are close and the run-off is minimal, so a mistake here rarely stays small.",
        challenge:
          "Brake late but leave room for the car to rotate; the exit leads into a sequence of quick direction changes.",
        overtaking: true,
        story:
          "The opening lap around Marina Bay has produced more than its share of safety cars and lost races.",
      },
      2: {
        name: "turn 2",
        direction: "right",
        speed: "≈ 95 km/h",
        type: "street corner",
        description:
          "The second corner comes almost immediately after the first. The car is still unsettled when the driver asks it to change direction again.",
        challenge:
          "Use the first corner exit to place the car precisely; a wide line here puts you into the wall on the next corner.",
      },
      7: {
        name: "turn 7",
        direction: "right",
        speed: "≈ 90 km/h",
        type: "street right",
        description:
          "A tight right between concrete walls. There is no room to explore the limit, so the corner rewards a clean, conservative entry.",
        challenge:
          "Get the car stopped and rotated without clipping the inside wall; the exit is short.",
        overtaking: true,
      },
      14: {
        name: "turn 14",
        direction: "right",
        speed: "≈ 90 km/h",
        type: "braking right",
        description:
          "A late braking zone before the car is fired towards the final sector. The corner is a favourite for opportunistic moves under the lights.",
        challenge:
          "Brake deep, avoid locking a front, and leave enough car on the exit for the next straight.",
        overtaking: true,
      },
      17: {
        name: "turn 17",
        direction: "left",
        speed: "≈ 90 km/h",
        type: "street left",
        description:
          "A slow left that is all about patience. The car has to be rotated before the throttle opens, and the wall on the outside is always waiting.",
        challenge:
          "Do not ask for power until the car is pointed straight; the rear tyres are already working hard.",
      },
      19: {
        name: "final corner",
        direction: "right",
        speed: "≈ 110 km/h",
        type: "traction corner",
        description:
          "The last corner launches the car onto the start-finish straight. A good exit can set up a pass before Turn 1; a poor one makes the car a target.",
        challenge:
          "Get on the throttle early but keep the car off the outside wall.",
      },
    },
  }),
  makeTrack({
    map: "suzuka",
    slug: "suzuka",
    name: "Suzuka International Racing Course",
    shortName: "suzuka",
    country: "Japan",
    city: "Suzuka",
    tagline: "the figure-eight",
    summary:
      "A figure-eight circuit that flows through the Esses before attacking Degner, the hairpin, Spoon, and 130R. Suzuka is a rhythm test where one missed apex echoes through the entire lap.",
    lengthKm: 5.807,
    direction: "clockwise",
    lapRecord: { time: "1:30.983", driver: "Lewis Hamilton", year: 2019 },
    drsZones: 2,
    laps: 53,
    firstGrandPrix: 1987,
    mapNote: "illustrative layout · not to scale",
    overrides: {
      1: {
        name: "first curve",
        direction: "right",
        speed: "≈ 280 km/h",
        type: "high-speed right",
        description:
          "The lap opens with a fast right that flows into the first part of the Esses. The car needs to be settled immediately; there is no time to warm into the lap.",
        challenge:
          "Carry speed without running wide on the exit, because the Esses arrive before the car has stopped moving.",
      },
      3: {
        name: "the esses",
        direction: "left",
        speed: "≈ 230 km/h",
        type: "fast left",
        description:
          "The Esses are a chain of quick direction changes that reward rhythm more than individual bravery. Each corner sets up the next.",
        challenge:
          "Keep the steering smooth and resist the urge to overdrive the first part of the sequence.",
      },
      4: {
        name: "the esses",
        direction: "right",
        speed: "≈ 225 km/h",
        type: "fast right",
        description:
          "The middle of the Esses is where the car starts to feel light. A clean exit is vital because the next left arrives immediately.",
        challenge:
          "Do not add steering after the apex; let the car flow into the next change of direction.",
      },
      8: {
        name: "Degner 1",
        direction: "right",
        speed: "≈ 220 km/h",
        type: "fast right",
        description:
          "Degner 1 is a quick right with a blind exit. The car has to be placed precisely because Degner 2 is already waiting.",
        challenge:
          "Commit to the entry and keep the car tight enough to open the line for the second part.",
        story:
          "A mistake at Degner tends to follow the car all the way to the hairpin.",
      },
      9: {
        name: "Degner 2",
        direction: "right",
        speed: "≈ 200 km/h",
        type: "fast right",
        description:
          "The second Degner is tighter and more technical than the first. The exit leads to the long run towards the hairpin.",
        challenge:
          "Get the car rotated without using too much curb, then open the throttle for the run to the hairpin.",
      },
      10: {
        name: "the hairpin",
        direction: "left",
        speed: "≈ 80 km/h",
        type: "hairpin",
        description:
          "Suzuka's hairpin is the slowest point of the lap. The braking zone is a genuine overtaking opportunity, but the exit is long and easy to lose.",
        challenge:
          "Brake late, rotate the car at the apex, and get the power down without wheelspin.",
        overtaking: true,
      },
      12: {
        name: "Spoon entry",
        direction: "right",
        speed: "≈ 180 km/h",
        type: "downhill right",
        description:
          "Spoon is a downhill double corner that asks the car to change direction while the track is falling away. The first part is quick; the second is slower.",
        challenge:
          "Use the downhill to help rotation, but do not run wide before the second apex.",
      },
      13: {
        name: "Spoon exit",
        direction: "left",
        speed: "≈ 190 km/h",
        type: "double-left exit",
        description:
          "The exit of Spoon sets up the long run towards 130R. A good launch here is worth more than a brave entry.",
        challenge:
          "Unwind the steering and get on the throttle early; the car needs momentum for 130R.",
      },
      15: {
        name: "130R",
        direction: "left",
        speed: "≈ 300 km/h",
        type: "high-speed left",
        description:
          "One of the fastest corners in Formula 1, taken almost flat in a modern car. The corner is a test of nerve, balance, and trust in the aero platform.",
        challenge:
          "Stay committed and keep the steering stable; a tiny correction at this speed is enormous.",
        story:
          "130R is the corner where Suzuka stops being a rhythm test and becomes a leap of faith.",
      },
      16: {
        name: "Casio triangle",
        direction: "right",
        speed: "≈ 90 km/h",
        type: "chicane",
        description:
          "The final chicane is a tight right-left that ruins any hope of carrying speed onto the main straight. It is also a late overtaking opportunity.",
        challenge:
          "Brake hard, hit the first apex, and leave room for the second part without cutting the curb.",
        overtaking: true,
      },
      17: {
        name: "Casio triangle exit",
        direction: "left",
        speed: "≈ 100 km/h",
        type: "chicane exit",
        description:
          "The last part of the chicane decides the run to the line. A clean exit can be the difference between a good lap and a great one.",
        challenge:
          "Get the car straight and the power down early; the straight is short but the lap is over.",
      },
    },
  }),
  makeTrack({
    map: "baku",
    slug: "baku",
    name: "Baku City Circuit",
    shortName: "baku",
    country: "Azerbaijan",
    city: "Baku",
    tagline: "the castle and the straight",
    summary:
      "A street circuit that mixes one of the longest straights in Formula 1 with a castle-width section of walls. Baku is part precision, part slipstream, and part survival.",
    lengthKm: 6.003,
    direction: "anticlockwise",
    lapRecord: { time: "1:43.009", driver: "Charles Leclerc", year: 2019 },
    drsZones: 2,
    laps: 51,
    firstGrandPrix: 2016,
    mapNote: "illustrative layout · not to scale",
    overrides: {
      1: {
        name: "turn 1",
        direction: "left",
        speed: "≈ 90 km/h",
        type: "heavy braking left",
        description:
          "The main straight ends in a tight left that demands a big stop and a precise turn-in. It is one of the best overtaking chances of the lap.",
        challenge:
          "Brake deep but keep the front tyres alive; the exit leads into a sequence of street corners.",
        overtaking: true,
        story:
          "The run from the final corner to Turn 1 is so long that slipstream battles often start a full straight earlier.",
      },
      2: {
        name: "turn 2",
        direction: "left",
        speed: "≈ 95 km/h",
        type: "street left",
        description:
          "A short pause between the first braking zone and the next wall-lined corner. The car has to be placed precisely on exit.",
        challenge:
          "Use the exit of Turn 1 to set the car up; there is no room for a wide line here.",
      },
      6: {
        name: "castle approach",
        direction: "left",
        speed: "≈ 85 km/h",
        type: "narrow left",
        description:
          "The track narrows as it approaches the old city walls. The corner is slow, but the penalty for a mistake is immediate.",
        challenge:
          "Keep the car away from the walls and prioritise a clean exit over a brave entry.",
      },
      7: {
        name: "castle section",
        direction: "left",
        speed: "≈ 80 km/h",
        type: "wall-lined left",
        description:
          "The castle section is the most claustrophobic part of the lap. There is no run-off, no second chance, and very little space for error.",
        challenge:
          "Be precise with the steering and patient with the throttle; the walls are the limit, not the kerbs.",
      },
      16: {
        name: "turn 16",
        direction: "left",
        speed: "≈ 120 km/h",
        type: "street left",
        description:
          "A quick left that begins the run towards the final corner. The car needs to be stable before the long flat-out section.",
        challenge:
          "Keep the car straight and use the exit to build speed for the final straight.",
      },
      20: {
        name: "final corner",
        direction: "right",
        speed: "≈ 90 km/h",
        type: "traction corner",
        description:
          "The last corner opens onto the enormous main straight. A good exit here is worth more than almost anywhere else on the calendar.",
        challenge:
          "Rotate the car early and get on the power without running wide; the straight rewards every km/h.",
        overtaking: true,
      },
    },
  }),
  makeTrack({
    map: "abu-dhabi",
    slug: "abu-dhabi",
    name: "Yas Marina Circuit",
    shortName: "abu dhabi",
    country: "United Arab Emirates",
    city: "Abu Dhabi",
    tagline: "the season finale",
    summary:
      "A smooth, wide circuit built for a season finale. The modern layout flows through the marina and rewards traction, good exits, and a car that can ride the kerbs without losing balance.",
    lengthKm: 5.281,
    direction: "anticlockwise",
    lapRecord: { time: "1:26.103", driver: "Max Verstappen", year: 2021 },
    drsZones: 2,
    laps: 58,
    firstGrandPrix: 2009,
    mapNote: "illustrative layout · not to scale",
    overrides: {
      1: {
        name: "turn 1",
        direction: "left",
        speed: "≈ 90 km/h",
        type: "opening left",
        description:
          "The first corner is a slow left after the main straight. It looks simple, but the exit sets up the long run towards the marina section.",
        challenge:
          "Brake in a straight line, rotate the car, and get the power down without running wide.",
        overtaking: true,
      },
      7: {
        name: "the hairpin",
        direction: "left",
        speed: "≈ 70 km/h",
        type: "hairpin",
        description:
          "A tight left hairpin in the middle of the lap. The corner is slow enough to create overtaking chances, but the exit is where a pass is completed.",
        challenge:
          "Brake late, use the apex, and leave enough room to open the throttle cleanly.",
        overtaking: true,
      },
      9: {
        name: "turn 9",
        direction: "left",
        speed: "≈ 120 km/h",
        type: "technical left",
        description:
          "A technical left that arrives after a short straight. The car needs to be settled on entry so the driver can use the kerb without losing the rear.",
        challenge:
          "Do not over-slow; the corner is slower than it looks but the exit needs momentum.",
      },
      15: {
        name: "turn 15",
        direction: "right",
        speed: "≈ 100 km/h",
        type: "slow right",
        description:
          "A slow right that sets up the final corner. The car has to be patient on the throttle because a mistake here follows it all the way to the line.",
        challenge:
          "Use the full track on entry and keep the rear stable on exit.",
      },
      16: {
        name: "final corner",
        direction: "right",
        speed: "≈ 120 km/h",
        type: "traction corner",
        description:
          "The final corner opens onto the main straight. In 2021, this was the corner that launched the last-lap pass that decided the championship.",
        challenge:
          "Get the car rotated early and use every bit of the exit without running wide.",
        story:
          "The 2021 season finale turned this exit into one of the most famous pieces of asphalt in F1 history.",
      },
    },
  }),
];
