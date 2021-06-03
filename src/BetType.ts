export enum BetType {
  ThreeNumUp = 1,
  ThreeNumDownFront = 2,
  ThreeNumDownBack = 3,
  ThreeNumShuffle = 4,
  TwoNumUp = 5,
  TwoNumDown = 6,
}

export const betTypes = [
  { id: BetType.ThreeNumUp, name: "3 ตัวบน" },
  { id: BetType.ThreeNumDownFront, name: "3 ตัวหน้า" },
  { id: BetType.ThreeNumDownBack, name: "3 ตัวหลัง" },
  { id: BetType.ThreeNumShuffle, name: "3 ตัวโต๊ด" },
  { id: BetType.TwoNumUp, name: "2 ตัวบน" },
  { id: BetType.TwoNumDown, name: "2 ตัวล่าง" },
];

const threeNumTypes = [
  BetType.ThreeNumUp,
  BetType.ThreeNumDownFront,
  BetType.ThreeNumDownBack,
  BetType.ThreeNumShuffle,
];

export const isThreeNum = (betType: BetType) => threeNumTypes.includes(betType);
