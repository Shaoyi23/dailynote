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

export const tracks: Track[] = [
  {
    slug: "monza",
    name: "Autodromo Nazionale Monza",
    shortName: "monza",
    country: "Italy",
    city: "Monza",
    tagline: "the temple of speed",
    summary:
      "Long straights, late braking, and three chicanes that punish hesitation. Monza is less about rhythm than about committing completely.",
    lengthKm: 5.793,
    turnCount: 11,
    direction: "clockwise",
    lapRecord: { time: "1:21.046", driver: "Rubens Barrichello", year: 2004 },
    drsZones: 2,
    laps: 53,
    firstGrandPrix: 1950,
    mapNote: "illustrative layout · not to scale",
    path: "M 624.4 569.2 L 442.3 553.6 L 366.1 546.7 L 363.0 545.9 L 361.2 543.8 L 360.9 541.0 L 361.2 537.7 L 361.5 534.6 L 361.2 531.6 L 359.7 529.6 L 357.4 528.2 L 355.4 527.7 L 353.3 527.7 L 311.7 538.7 L 300.4 540.3 L 290.0 540.8 L 279.0 540.0 L 224.8 535.9 L 215.9 534.4 L 207.6 532.4 L 198.7 529.5 L 189.2 525.5 L 179.8 521.1 L 169.3 514.5 L 160.8 507.6 L 150.9 498.4 L 142.2 488.6 L 134.3 477.4 L 127.4 465.4 L 120.7 451.9 L 116.1 438.5 L 111.8 423.7 L 108.8 406.9 L 107.4 389.7 L 101.6 322.8 L 96.7 240.7 L 96.2 235.9 L 94.9 233.3 L 92.7 231.1 L 83.0 228.5 L 80.4 227.2 L 78.6 225.4 L 77.6 221.9 L 75.5 210.9 L 72.9 198.8 L 67.4 181.5 L 41.5 104.8 L 40.0 98.2 L 40.0 92.0 L 41.2 85.9 L 43.0 81.6 L 45.3 77.5 L 48.0 73.6 L 53.3 68.8 L 57.6 66.0 L 62.7 64.0 L 68.4 63.1 L 104.9 59.8 L 167.2 53.5 L 172.7 53.7 L 176.4 54.7 L 179.5 56.2 L 181.6 58.8 L 184.7 63.4 L 211.8 113.7 L 234.7 154.4 L 248.8 179.9 L 255.9 192.2 L 265.6 206.0 L 273.3 216.0 L 280.8 224.5 L 319.0 269.1 L 347.7 300.6 L 406.4 367.5 L 441.7 407.7 L 447.3 413.2 L 450.9 415.3 L 454.3 415.6 L 458.6 415.6 L 468.0 414.3 L 473.1 414.0 L 480.5 414.0 L 484.4 414.5 L 489.5 416.1 L 495.6 418.4 L 501.5 422.3 L 507.7 427.6 L 512.8 433.7 L 516.6 438.5 L 519.5 441.1 L 523.5 443.0 L 530.9 444.7 L 564.4 448.8 L 600.2 453.1 L 921.2 486.3 L 932.9 487.7 L 938.2 489.0 L 943.7 491.8 L 948.2 495.5 L 952.3 499.9 L 956.2 505.8 L 958.7 512.5 L 960.0 520.1 L 959.5 526.5 L 958.2 532.6 L 955.6 539.7 L 952.4 546.4 L 948.8 551.5 L 944.2 557.6 L 936.8 564.5 L 930.3 569.1 L 923.0 573.2 L 914.7 576.8 L 905.3 580.1 L 895.8 582.5 L 887.5 583.8 L 875.1 585.2 L 862.6 585.3 L 850.8 585.5 L 827.4 586.1 L 807.0 586.5 L 784.7 586.1 L 755.6 583.5 L 663.6 574.0 L 624.4 569.2",
    turns: [
      {
        number: 1,
        name: "Rettifilo · entry",
        direction: "right",
        speed: "≈ 80 km/h",
        type: "heavy braking",
        description:
          "The main straight ends in a wall of brake markers and a chicane that immediately asks whether you have committed too late. The first apex is slow, but the run out of it decides the next few hundred metres.",
        challenge:
          "Brake from over 330 km/h, keep the front tyres alive, and leave the car stable enough to change direction again.",
        overtaking: true,
        story:
          "The 2021 Italian GP restart turned this braking zone into the loudest, most decisive moment of the weekend.",
        x: 279.0,
        y: 540.0,
      },
      {
        number: 2,
        name: "Rettifilo · exit",
        direction: "left",
        speed: "≈ 95 km/h",
        type: "chicane exit",
        description:
          "The second half of the first chicane is less famous than the braking zone before it, but it is where a clean launch towards Curva Grande is made.",
        challenge:
          "Get the car rotated without using too much kerb and open the throttle early enough for the long right that follows.",
        x: 216.0,
        y: 534.4,
      },
      {
        number: 3,
        name: "Curva Grande",
        direction: "right",
        speed: "≈ 280 km/h",
        type: "high-speed right",
        description:
          "A long, committed right-hander that looks almost gentle until you remember how little run-off there is. The car is loaded for a long time, so balance matters more than a spectacular entry.",
        challenge:
          "Carry speed without running wide on exit. A tiny lift here costs a lot of time all the way to Roggia.",
        story:
          "A good Curva Grande makes the next chicane easier; a bad one turns the following braking zone into a defensive move.",
        x: 142.2,
        y: 488.6,
      },
      {
        number: 4,
        name: "Roggia · entry",
        direction: "right-left",
        speed: "≈ 105 km/h",
        type: "braking chicane",
        description:
          "The second chicane is tighter than it appears from the cockpit. The first direction change is the moment where a lap can lose its rhythm or gain a position.",
        challenge:
          "Get the car slowed while staying off the kerbs enough to make the second part cleanly.",
        overtaking: true,
        x: 77.6,
        y: 221.9,
      },
      {
        number: 5,
        name: "Roggia · exit",
        direction: "left",
        speed: "≈ 120 km/h",
        type: "traction zone",
        description:
          "The exit of Roggia is short and narrow, but it opens onto the run towards the Lesmos. The rear tyres are still complaining when the next braking point arrives.",
        challenge:
          "Use the throttle without spinning the rears on the kerb; the traction here carries into the Lesmo approach.",
        x: 41.5,
        y: 104.8,
      },
      {
        number: 6,
        name: "Lesmo 1",
        direction: "right",
        speed: "≈ 225 km/h",
        type: "fast right",
        description:
          "The first Lesmo is a committed right-hander with a short braking zone. It rewards a car that turns in decisively and a driver who trusts the front end.",
        challenge:
          "Do not over-slow. The corner is quick, and the exit feeds directly into the second Lesmo.",
        x: 167.2,
        y: 53.5,
      },
      {
        number: 7,
        name: "Lesmo 2",
        direction: "right",
        speed: "≈ 210 km/h",
        type: "fast right",
        description:
          "The second Lesmo is slower and more technical, with a tighter exit onto the back straight. It is easy to lose the rear when asking for throttle too early.",
        challenge:
          "Balance the car through the change of direction and get on the power without sacrificing the exit.",
        x: 234.7,
        y: 154.4,
      },
      {
        number: 8,
        name: "Ascari 1",
        direction: "left",
        speed: "≈ 245 km/h",
        type: "fast left",
        description:
          "The Ascari complex starts with a quick left that arrives after the long back straight. The first movement is the invitation; the next two corners are the test.",
        challenge:
          "Turn in with precision and carry speed without letting the car run too wide for the second apex.",
        x: 447.3,
        y: 413.2,
      },
      {
        number: 9,
        name: "Ascari 2",
        direction: "right",
        speed: "≈ 230 km/h",
        type: "direction change",
        description:
          "A fast right in the middle of the Ascari sequence, where the car has to change direction while still loaded from the first left.",
        challenge:
          "Use the kerbs intelligently. Too much curb unsettles the car for the final left and the exit.",
        x: 495.6,
        y: 418.4,
      },
      {
        number: 10,
        name: "Ascari 3",
        direction: "left",
        speed: "≈ 235 km/h",
        type: "exit onto the back straight",
        description:
          "The final part of Ascari opens onto the long run to Parabolica. It is one of the most important exits on the lap, even though it rarely gets the attention.",
        challenge:
          "Get the car straight early and let the rear settle before applying full throttle.",
        x: 564.4,
        y: 448.8,
      },
      {
        number: 11,
        name: "Parabolica",
        direction: "right",
        speed: "≈ 245 km/h",
        type: "long right",
        description:
          "A long right-hander that begins as a normal corner and refuses to end. The car washes wide gradually, so the driver has to be patient with the steering and brave with the throttle.",
        challenge:
          "Hold the line without pinching the exit. The smallest mistake here follows the car all the way down the main straight.",
        story:
          "Pierre Gasly's worn tyres had to survive this corner on the final lap of the 2020 Italian GP.",
        x: 755.6,
        y: 583.5,
      },
    ],
  },
  {
    slug: "zandvoort",
    name: "Circuit Zandvoort",
    shortName: "zandvoort",
    country: "Netherlands",
    city: "Zandvoort",
    tagline: "the dune rollercoaster",
    summary:
      "A tight coastal lap built into the dunes, with banked corners, blind crests, and very little room to breathe.",
    lengthKm: 4.259,
    turnCount: 14,
    direction: "clockwise",
    lapRecord: { time: "1:11.097", driver: "Lewis Hamilton", year: 2021 },
    drsZones: 2,
    laps: 72,
    firstGrandPrix: 1952,
    mapNote: "illustrative layout · not to scale",
    path: "M 251.7 295.9 L 325.4 117.8 L 353.4 52.5 L 359.7 45.3 L 368.3 41.2 L 377.6 40.0 L 386.3 41.8 L 394.5 47.4 L 400.2 54.4 L 403.2 63.1 L 403.4 72.8 L 395.3 91.7 L 371.9 148.5 L 364.4 175.0 L 361.4 202.6 L 363.0 228.4 L 360.6 238.9 L 354.8 246.0 L 343.4 255.3 L 331.0 260.2 L 296.9 273.5 L 288.2 280.2 L 285.8 289.9 L 285.4 298.7 L 289.0 307.7 L 295.6 314.1 L 303.9 317.4 L 316.5 317.1 L 379.0 297.2 L 408.0 291.8 L 433.0 291.0 L 455.1 292.6 L 476.0 296.2 L 490.9 300.8 L 515.3 305.9 L 537.9 307.9 L 553.9 304.6 L 573.1 299.5 L 596.2 287.9 L 623.4 270.2 L 641.8 261.4 L 658.2 256.7 L 679.8 254.3 L 696.8 254.7 L 767.8 259.0 L 784.2 262.8 L 799.4 270.4 L 810.1 279.6 L 817.1 289.5 L 823.8 300.8 L 827.4 313.8 L 828.5 327.5 L 827.3 341.0 L 823.3 354.7 L 814.8 369.5 L 782.1 414.1 L 770.1 433.8 L 742.9 492.7 L 729.8 497.3 L 713.6 499.2 L 698.2 498.4 L 680.0 495.3 L 661.0 488.9 L 640.8 479.2 L 620.8 464.9 L 608.4 451.1 L 606.1 442.7 L 608.1 433.8 L 615.8 422.7 L 626.8 415.6 L 643.0 409.7 L 670.7 405.3 L 697.3 398.6 L 721.7 389.3 L 735.1 379.8 L 740.2 368.5 L 740.9 356.1 L 736.5 343.8 L 725.3 332.6 L 715.2 329.0 L 662.7 322.6 L 609.9 322.8 L 553.8 329.5 L 506.4 341.5 L 477.0 350.8 L 444.6 362.8 L 413.6 375.9 L 388.4 390.9 L 379.1 394.9 L 372.5 393.6 L 366.3 385.0 L 359.7 372.6 L 350.6 366.9 L 339.0 366.5 L 327.6 371.8 L 321.5 380.0 L 318.7 388.8 L 321.5 406.7 L 346.9 555.1 L 347.5 565.0 L 344.7 575.2 L 340.2 583.8 L 335.8 589.2 L 325.1 596.5 L 313.5 599.2 L 264.7 600.0 L 254.7 599.5 L 240.2 597.2 L 225.2 592.3 L 212.9 586.7 L 196.5 573.8 L 185.8 559.5 L 178.5 547.2 L 173.2 530.7 L 171.5 516.2 L 173.0 492.5 L 177.5 475.6 L 247.9 304.7 L 251.7 295.9",
    turns: [
      {
        number: 1,
        name: "Tarzan",
        direction: "right",
        speed: "≈ 95 km/h",
        type: "180° hairpin",
        description:
          "The famous banked hairpin at the end of the main straight is wide, slow, and impossible to take quietly. It is the best overtaking opportunity on the lap and the place where a race can change in a single brake release.",
        challenge:
          "Brake late without locking a front, rotate the car through the long arc, and get on the throttle early enough to survive the run to Gerlach.",
        overtaking: true,
        story:
          "When the Dutch GP returned in 2021, the orange grandstands greeted this corner like a home crowd greeting its champion.",
        x: 368.3,
        y: 41.2,
      },
      {
        number: 2,
        name: "Gerlach",
        direction: "right",
        speed: "≈ 180 km/h",
        type: "blind right",
        description:
          "Gerlach is taken quickly and climbs into a blind exit. The driver cannot see the corner open until the car is already committed.",
        challenge:
          "Trust the grip and use the full width on exit; a nervous lift here costs the run up Hunserug.",
        x: 360.6,
        y: 238.9,
      },
      {
        number: 3,
        name: "Hugenholtz",
        direction: "left",
        speed: "≈ 210 km/h",
        type: "banked left",
        description:
          "The first left of the lap is a progressive banked bowl. The outside is higher than the inside, creating several possible lines and a very quick exit towards the dunes.",
        challenge:
          "Commit to the banking and let the car use the extra grip without running too wide on the exit.",
        x: 285.8,
        y: 289.9,
      },
      {
        number: 4,
        name: "Hunserug",
        direction: "right",
        speed: "≈ 250 km/h",
        type: "uphill kink",
        description:
          "A fast, rising right that feels more like a crest than a corner. The car goes light as the track climbs, and the exit sets up the quick run to Scheivlak.",
        challenge:
          "Keep the car settled over the crest while carrying enough speed for the next sequence.",
        x: 553.9,
        y: 304.6,
      },
      {
        number: 5,
        name: "Slotemaker",
        direction: "right",
        speed: "≈ 235 km/h",
        type: "fast right",
        description:
          "A high-speed right that leads almost immediately into the Scheivlak approach. The corner is fast enough that the driver is already thinking about the next one on entry.",
        challenge:
          "Use the exit without brushing the outside, because the track is already narrowing towards Scheivlak.",
        x: 799.4,
        y: 270.4,
      },
      {
        number: 6,
        name: "Scheivlak",
        direction: "right",
        speed: "≈ 260 km/h",
        type: "high-speed right",
        description:
          "Scheivlak is one of the fastest and most feared corners on the calendar. The car needs total commitment, and the dune on the outside leaves no room for a second attempt.",
        challenge:
          "Turn in once, trust the aero, and do not add steering after the apex.",
        story:
          "Drivers have described this as the corner where the brave separate themselves from the merely quick.",
        x: 827.3,
        y: 341.0,
      },
      {
        number: 7,
        name: "Scheivlak · exit",
        direction: "right",
        speed: "≈ 250 km/h",
        type: "fast direction change",
        description:
          "The second marker in the Scheivlak sequence is where the car begins to settle for the run to Masters. The line is still fast, but the priority shifts from rotation to stability.",
        challenge:
          "Open the steering smoothly while keeping enough momentum for the short straight.",
        x: 729.8,
        y: 497.3,
      },
      {
        number: 8,
        name: "Masters",
        direction: "right",
        speed: "≈ 185 km/h",
        type: "technical right",
        description:
          "After the high-speed dunes, Masters asks for a harder, more technical change of direction. The car has to slow while still turning, and the exit leads into the tightest part of the lap.",
        challenge:
          "Brake and rotate together without losing the rear on entry.",
        overtaking: true,
        x: 606.1,
        y: 442.7,
      },
      {
        number: 9,
        name: "Turn 9",
        direction: "left",
        speed: "≈ 120 km/h",
        type: "slow technical left",
        description:
          "A proper braking corner after the fast opening sequence. It is slow enough to create overtaking opportunities and technical enough that a mistake follows you into Turn 10.",
        challenge:
          "Brake deep, get the car rotated, and leave room for a clean exit. The next corner arrives immediately.",
        overtaking: true,
        x: 740.2,
        y: 368.5,
      },
      {
        number: 10,
        name: "Turn 10",
        direction: "right",
        speed: "≈ 155 km/h",
        type: "technical right",
        description:
          "Turn 10 is a short, technical right that follows the slow left. There is no time to relax: the exits are connected, and the next straight is short.",
        challenge:
          "Get the car straight early and use the throttle without pushing wide on the exit curb.",
        x: 379.1,
        y: 394.9,
      },
      {
        number: 11,
        name: "Hans Ernst · entry",
        direction: "left",
        speed: "≈ 90 km/h",
        type: "chicane",
        description:
          "The Hans Ernst chicane is a late, tight braking zone after a short run. The first part rewards a brave brake release and a car that changes direction immediately.",
        challenge:
          "Hit the first apex without cutting the sausage kerb and keep the car balanced for the next flick.",
        overtaking: true,
        x: 339.0,
        y: 366.5,
      },
      {
        number: 12,
        name: "Hans Ernst · exit",
        direction: "right",
        speed: "≈ 110 km/h",
        type: "chicane exit",
        description:
          "The second half of the chicane is where a defensive line can turn into a lost position. A clean exit is worth more than a spectacular first apex.",
        challenge:
          "Unwind the steering early and get the power down without lighting up the rear tyres.",
        x: 335.8,
        y: 589.2,
      },
      {
        number: 13,
        name: "Turn 13",
        direction: "right",
        speed: "≈ 180 km/h",
        type: "exit-focused right",
        description:
          "The penultimate corner is all about the exit. A higher exit speed means a better run through the banked final corner and a better chance of a slipstream on the main straight.",
        challenge:
          "Prioritise the exit over the entry and keep the car off the outside curb.",
        x: 196.5,
        y: 573.8,
      },
      {
        number: 14,
        name: "Arie Luyendyk",
        direction: "right",
        speed: "≈ 225 km/h",
        type: "banked final corner",
        description:
          "The final banked right launches the car onto the main straight. The banking carries speed, but it also makes the exit feel narrower than it looks from the outside.",
        challenge:
          "Use the banking without drifting too wide; the difference between a good and great lap is often made here.",
        story:
          "The banked exit is designed to create slipstream battles down the straight and into Tarzan.",
        x: 171.5,
        y: 516.2,
      },
    ],
  },
  {
    slug: "red-bull-ring",
    name: "Red Bull Ring",
    shortName: "red bull ring",
    country: "Austria",
    city: "Spielberg",
    tagline: "the alpine rollercoaster",
    summary:
      "A short lap in the Styrian hills where elevation does most of the talking. Ten corners, a steep climb, and a downhill run reward a car that can rotate without losing exit speed.",
    lengthKm: 4.326,
    turnCount: 10,
    direction: "clockwise",
    lapRecord: { time: "1:05.619", driver: "Carlos Sainz", year: 2020 },
    drsZones: 2,
    laps: 71,
    firstGrandPrix: 1970,
    mapNote: "illustrative layout · not to scale",
    path: "M 647.8 541.7 L 586.6 558.0 L 435.2 599.2 L 424.8 600.0 L 417.8 593.7 L 406.1 571.0 L 369.0 520.9 L 328.7 463.6 L 297.1 413.1 L 268.2 363.3 L 221.0 260.3 L 208.0 232.9 L 188.0 200.6 L 157.3 163.0 L 106.3 111.7 L 59.1 64.5 L 56.2 58.2 L 56.5 51.5 L 61.9 48.2 L 74.3 46.0 L 113.0 41.5 L 151.6 40.0 L 191.6 40.4 L 229.6 44.1 L 273.6 51.2 L 408.3 77.2 L 469.7 85.3 L 602.5 90.9 L 613.3 94.6 L 619.9 102.0 L 622.5 110.2 L 621.8 118.8 L 618.3 126.9 L 605.1 145.9 L 594.6 158.6 L 575.2 175.7 L 554.0 187.2 L 528.3 195.7 L 500.5 200.2 L 471.3 198.3 L 358.2 180.1 L 343.0 182.0 L 330.6 186.4 L 319.9 193.9 L 310.3 203.9 L 304.4 215.8 L 301.1 228.8 L 300.6 240.7 L 302.4 253.7 L 305.9 263.3 L 360.7 359.2 L 369.9 369.3 L 384.5 378.5 L 401.3 382.3 L 417.5 380.8 L 434.6 373.7 L 445.0 365.2 L 455.8 351.8 L 465.9 338.8 L 476.7 327.6 L 489.7 318.7 L 504.9 309.8 L 526.2 301.9 L 548.3 297.1 L 723.9 293.4 L 858.9 290.1 L 873.1 290.4 L 887.0 295.3 L 898.5 303.8 L 907.6 315.3 L 914.6 330.6 L 942.2 423.5 L 943.8 432.0 L 942.2 438.3 L 939.0 443.2 L 928.3 451.7 L 914.0 460.2 L 895.6 469.5 L 874.7 478.4 L 850.0 486.6 L 647.8 541.7",
    turns: [
      {
        number: 1,
        name: "Niki Lauda",
        direction: "right",
        speed: "≈ 120 km/h",
        type: "uphill heavy braking",
        description:
          "The first corner is a short, steep braking zone at the end of the main straight. The track climbs immediately, so the car is still settling when the driver asks for throttle.",
        challenge:
          "Brake late enough to defend, but leave the car balanced for the uphill exit. A wide entry is instantly punished.",
        overtaking: true,
        x: 424.8,
        y: 600.0,
      },
      {
        number: 2,
        name: "Münzer",
        direction: "left",
        speed: "≈ 250 km/h",
        type: "fast left",
        description:
          "Münzer is an extremely fast left that flows into the steepest climb of the lap. The corner is less about braking than about committing before the track falls away.",
        challenge:
          "Trust the grip on the uphill and avoid a mid-corner lift; the car goes light as the gradient steepens.",
        x: 188.0,
        y: 200.6,
      },
      {
        number: 3,
        name: "Interwetten",
        direction: "right",
        speed: "≈ 80 km/h",
        type: "slow right",
        description:
          "The slowest corner on the lap is also the best overtaking spot. Cars arrive from a long uphill run and have to scrub speed while the track twists towards the highest point of the circuit.",
        challenge:
          "Brake deep, rotate the car without locking, and get a clean exit towards Rauch.",
        overtaking: true,
        x: 56.5,
        y: 51.5,
      },
      {
        number: 4,
        name: "Rauch",
        direction: "right",
        speed: "≈ 145 km/h",
        type: "downhill right",
        description:
          "Rauch drops away from the highest part of the circuit. The outside of the corner falls away too, so the car wants to run wide as the driver tries to carry speed.",
        challenge:
          "Keep the car tight enough to use the exit without touching the outside curb.",
        x: 619.9,
        y: 102.0,
      },
      {
        number: 5,
        name: "Turn 5",
        direction: "right",
        speed: "≈ 210 km/h",
        type: "quick right",
        description:
          "This quick right is not the hardest corner on its own, but it sets up the double-left sequence that follows. A clean line here makes the next two corners feel simple.",
        challenge:
          "Place the car precisely on entry so the next change of direction happens naturally.",
        x: 554.0,
        y: 187.2,
      },
      {
        number: 6,
        name: "Turn 6",
        direction: "left",
        speed: "≈ 225 km/h",
        type: "blind downhill left",
        description:
          "The track falls away through Turn 6, and the apex is difficult to see from the cockpit. The driver has to turn in on trust and let the car settle over the crest.",
        challenge:
          "Be patient with the steering; adding more lock mid-corner will only slow the exit.",
        x: 330.6,
        y: 186.4,
      },
      {
        number: 7,
        name: "Graz",
        direction: "left",
        speed: "≈ 155 km/h",
        type: "compression left",
        description:
          "Graz dips into a compression before climbing again. The suspension loads up heavily, and the car feels planted for a moment before the next rise.",
        challenge:
          "Use the compression to help the car rotate, then get back on the throttle without upsetting the rear.",
        x: 384.5,
        y: 378.5,
      },
      {
        number: 8,
        name: "Turn 8",
        direction: "right",
        speed: "≈ 240 km/h",
        type: "fast right",
        description:
          "A fast right where the curb ends quickly on the outside. The car has to be positioned carefully on entry because running wide leaves nowhere to recover.",
        challenge:
          "Carry speed while keeping the car inside the available track; a small error here becomes a big one.",
        x: 504.9,
        y: 309.8,
      },
      {
        number: 9,
        name: "Jochen Rindt",
        direction: "right",
        speed: "≈ 250 km/h",
        type: "blind fast right",
        description:
          "The final fast right is taken almost blind into the exit. It is one of the most committing corners on the lap and leads directly into the last braking zone.",
        challenge:
          "Turn in early enough, but do not wash out on exit; the final corner is waiting.",
        x: 887.0,
        y: 295.3,
      },
      {
        number: 10,
        name: "Turn 10",
        direction: "right",
        speed: "≈ 190 km/h",
        type: "final corner",
        description:
          "The last corner determines the run down the start/finish straight. A good exit can set up a pass before the first braking zone; a poor one can lose the race in the final metres.",
        challenge:
          "Get the car rotated early and use every bit of the exit without running wide.",
        x: 942.2,
        y: 438.3,
      },
    ],
  },
];

export function getTrack(slug: string) {
  return tracks.find((track) => track.slug === slug);
}

export function getMoreTracks(slug: string) {
  return tracks.filter((track) => track.slug !== slug);
}
