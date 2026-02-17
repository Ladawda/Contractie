/**
 * Contractor character sprites — 16x16 pixel art grids.
 * Each sprite is a 2D array of hex color strings (or null for transparent).
 * Designed in SNES-era 16-bit RPG style.
 *
 * Abbreviations used in inline comments:
 *   _ = null (transparent)
 *   B = blue, R = red, S = skin, G = gray, W = white, K = black, etc.
 */

const _ = null;

// ---------------------------------------------------------------------------
// Color palettes
// ---------------------------------------------------------------------------

// Plumber
const PB = "#4444ff"; // overalls blue
const PBd = "#3333cc"; // overalls dark
const PR = "#cc0000"; // red hat
const PRd = "#990000"; // hat shadow
const PS = "#ffcc88"; // skin
const PSd = "#ddaa66"; // skin shadow
const PG = "#888888"; // wrench gray
const PGd = "#666666"; // wrench dark
const PW = "#ffffff"; // eye whites / highlights
const PK = "#222222"; // outline / eyes

// Electrician
const EB = "#ffdd00"; // yellow hat
const EBd = "#ccaa00"; // hat shadow
const EU = "#444444"; // uniform dark gray
const EUl = "#555555"; // uniform lighter
const ES = "#ffcc88"; // skin
const ESd = "#ddaa66"; // skin shadow
const EL = "#00ccff"; // lightning bolt
const EW = "#ffffff";
const EK = "#222222";
const EBt = "#666666"; // tool belt

// Roofer
const RB = "#8B4513"; // brown hat
const RBd = "#6B3310"; // hat shadow
const RF = "#cc4444"; // flannel red
const RFd = "#993333"; // flannel dark
const RFl = "#dd6655"; // flannel light stripe
const RS = "#ffcc88";
const RSd = "#ddaa66";
const RH = "#666666"; // hammer
const RHd = "#444444"; // hammer dark
const RW = "#ffffff";
const RK = "#222222";

// Handyman
const HC = "#22aa44"; // green cap
const HCd = "#118833"; // cap shadow
const HU = "#cc9966"; // khaki
const HUd = "#aa7744"; // khaki dark
const HS = "#ffcc88";
const HSd = "#ddaa66";
const HT = "#ff6600"; // tool orange
const HTd = "#cc4400"; // tool dark
const HW = "#ffffff";
const HK = "#222222";
const HG = "#555555"; // gray shirt

// Shared
const BOOT = "#333333";
const BOOTl = "#444444";
const BELT = "#664400";
const BELTl = "#885522";

// ---------------------------------------------------------------------------
// PLUMBER — blue overalls, red hard hat, wrench in right hand
// ---------------------------------------------------------------------------
export const PLUMBER_SPRITE: (string | null)[][] = [
  //0    1    2    3    4    5    6    7    8    9   10   11   12   13   14   15
  [ _,   _,   _,   _,   _,  PR,  PR,  PR,  PR,  PR,  PR,   _,   _,   _,   _,   _], // 0  hat top
  [ _,   _,   _,   _,  PR,  PR,  PR,  PR,  PR,  PR,  PR,  PR,   _,   _,   _,   _], // 1  hat
  [ _,   _,   _,  PRd, PR,  PR,  PR,  PR,  PR,  PR,  PR,  PR, PRd,   _,   _,   _], // 2  hat brim
  [ _,   _,   _,  PRd, PRd, PRd, PRd, PRd, PRd, PRd, PRd, PRd, PRd,   _,   _,   _], // 3  hat brim underside
  [ _,   _,   _,   _,  PS,  PS,  PS,  PS,  PS,  PS,  PS,  PS,   _,   _,   _,   _], // 4  forehead
  [ _,   _,   _,  PSd, PW,  PK,  PS,  PS,  PS,  PS,  PK,  PW,  PSd,  _,   _,   _], // 5  eyes
  [ _,   _,   _,   _,  PS,  PS,  PS, PSd,  PS,  PS,  PS,  PS,   _,   _,   _,   _], // 6  nose/mouth
  [ _,   _,   _,   _,   _,  PS, PSd, PSd, PSd,  PS,  PS,   _,   _,   _,   _,   _], // 7  chin
  [ _,   _,   _,   _,  PB,  PB,  PB,  PB,  PB,  PB,  PB,  PB,   _,   _,   _,   _], // 8  overall top / shoulders
  [ _,   _,   _,  PS,  PB,  PB, PBd,  PB,  PB, PBd,  PB,  PB,  PS,   _,   _,   _], // 9  arms + torso
  [ _,   _,  PS,  PS,  PB, PBd,  PB,  PB,  PB,  PB, PBd,  PB,  PS,  PG,   _,   _], // 10 arms + wrench
  [ _,   _,   _,  PSd, PB,  PB, BELT,BELT,BELT,BELT, PB,  PB,  PSd, PG,   _,   _], // 11 belt
  [ _,   _,   _,   _,  PB,  PB,  PB,  PB,  PB,  PB,  PB,  PB,   _,  PGd,  _,   _], // 12 legs top
  [ _,   _,   _,   _,  PB,  PB,  PB,  PK,  PK,  PB,  PB,  PB,   _,   _,   _,   _], // 13 legs
  [ _,   _,   _,   _,  PB,  PB,  PB,   _,   _,  PB,  PB,  PB,   _,   _,   _,   _], // 14 legs bottom
  [ _,   _,   _,  BOOT,BOOT,BOOT, _,   _,   _, BOOT,BOOT,BOOT,  _,   _,   _,   _], // 15 boots
];

// Plumber frame 2: wrench raised slightly
const PLUMBER_FRAME2: (string | null)[][] = [
  //0    1    2    3    4    5    6    7    8    9   10   11   12   13   14   15
  [ _,   _,   _,   _,   _,  PR,  PR,  PR,  PR,  PR,  PR,   _,   _,   _,   _,   _],
  [ _,   _,   _,   _,  PR,  PR,  PR,  PR,  PR,  PR,  PR,  PR,   _,   _,   _,   _],
  [ _,   _,   _,  PRd, PR,  PR,  PR,  PR,  PR,  PR,  PR,  PR, PRd,   _,   _,   _],
  [ _,   _,   _,  PRd, PRd, PRd, PRd, PRd, PRd, PRd, PRd, PRd, PRd,   _,   _,   _],
  [ _,   _,   _,   _,  PS,  PS,  PS,  PS,  PS,  PS,  PS,  PS,   _,   _,   _,   _],
  [ _,   _,   _,  PSd, PW,  PK,  PS,  PS,  PS,  PS,  PK,  PW,  PSd,  _,   _,   _],
  [ _,   _,   _,   _,  PS,  PS,  PS, PSd,  PS,  PS,  PS,  PS,   _,   _,   _,   _],
  [ _,   _,   _,   _,   _,  PS, PSd, PSd, PSd,  PS,  PS,   _,   _,   _,   _,   _],
  [ _,   _,   _,   _,  PB,  PB,  PB,  PB,  PB,  PB,  PB,  PB,   _,  PG,   _,   _], // wrench up
  [ _,   _,   _,  PS,  PB,  PB, PBd,  PB,  PB, PBd,  PB,  PB,  PS,  PG,   _,   _],
  [ _,   _,  PS,  PS,  PB, PBd,  PB,  PB,  PB,  PB, PBd,  PB,  PS,   _,   _,   _], // arm extended
  [ _,   _,   _,  PSd, PB,  PB, BELT,BELT,BELT,BELT, PB,  PB,  PSd,  _,   _,   _],
  [ _,   _,   _,   _,  PB,  PB,  PB,  PB,  PB,  PB,  PB,  PB,   _,   _,   _,   _],
  [ _,   _,   _,   _,  PB,  PB,  PB,  PK,  PK,  PB,  PB,  PB,   _,   _,   _,   _],
  [ _,   _,   _,   _,  PB,  PB,  PB,   _,   _,  PB,  PB,  PB,   _,   _,   _,   _],
  [ _,   _,   _,  BOOT,BOOT,BOOT, _,   _,   _, BOOT,BOOT,BOOT,  _,   _,   _,   _],
];

export const PLUMBER_FRAMES: (string | null)[][][] = [
  PLUMBER_SPRITE,
  PLUMBER_FRAME2,
];

// ---------------------------------------------------------------------------
// ELECTRICIAN — yellow hard hat, gray uniform, lightning bolt on chest
// ---------------------------------------------------------------------------
export const ELECTRICIAN_SPRITE: (string | null)[][] = [
  //0    1    2    3    4    5    6    7    8    9   10   11   12   13   14   15
  [ _,   _,   _,   _,   _,  EB,  EB,  EB,  EB,  EB,  EB,   _,   _,   _,   _,   _], // 0  hat top
  [ _,   _,   _,   _,  EB,  EB,  EB,  EB,  EB,  EB,  EB,  EB,   _,   _,   _,   _], // 1  hat
  [ _,   _,   _,  EBd, EB,  EB,  EB,  EB,  EB,  EB,  EB,  EB,  EBd,  _,   _,   _], // 2  hat body
  [ _,   _,  EBd, EBd, EBd, EBd, EBd, EBd, EBd, EBd, EBd, EBd, EBd, EBd,  _,   _], // 3  hat brim (wider)
  [ _,   _,   _,   _,  ES,  ES,  ES,  ES,  ES,  ES,  ES,  ES,   _,   _,   _,   _], // 4  forehead
  [ _,   _,   _,  ESd, EW,  EK,  ES,  ES,  ES,  ES,  EK,  EW,  ESd,  _,   _,   _], // 5  eyes
  [ _,   _,   _,   _,  ES,  ES,  ES, ESd,  ES,  ES,  ES,  ES,   _,   _,   _,   _], // 6  nose
  [ _,   _,   _,   _,   _,  ES, ESd, ESd, ESd,  ES,  ES,   _,   _,   _,   _,   _], // 7  chin
  [ _,   _,   _,   _,  EU,  EU,  EU,  EL,  EU,  EU,  EU,  EU,   _,   _,   _,   _], // 8  shoulders + bolt
  [ _,   _,   _,  ES,  EU,  EU,  EL,  EL,  EU,  EU,  EU,  EU,  ES,   _,   _,   _], // 9  torso + bolt
  [ _,   _,  ES,  ES,  EU,  EU,  EU,  EL,  EL,  EU,  EU,  EU,  ES,  ES,   _,   _], // 10 arms
  [ _,   _,   _,  ESd, EU, EBt, EBt, EBt, EBt, EBt, EBt,  EU,  ESd,  _,   _,   _], // 11 tool belt
  [ _,   _,   _,   _,  EU,  EU,  EU,  EU,  EU,  EU,  EU,  EU,   _,   _,   _,   _], // 12 legs top
  [ _,   _,   _,   _,  EU,  EU,  EU,  EK,  EK,  EU,  EU,  EU,   _,   _,   _,   _], // 13 legs
  [ _,   _,   _,   _,  EU,  EU, EUl,  _,   _,  EUl, EU,   EU,   _,   _,   _,   _], // 14 legs bottom
  [ _,   _,   _,  BOOT,BOOT,BOOT, _,   _,   _, BOOT,BOOT,BOOT,  _,   _,   _,   _], // 15 boots
];

// Electrician frame 2: arms slightly shifted, bolt "pulses"
const ELECTRICIAN_FRAME2: (string | null)[][] = [
  //0    1    2    3    4    5    6    7    8    9   10   11   12   13   14   15
  [ _,   _,   _,   _,   _,  EB,  EB,  EB,  EB,  EB,  EB,   _,   _,   _,   _,   _],
  [ _,   _,   _,   _,  EB,  EB,  EB,  EB,  EB,  EB,  EB,  EB,   _,   _,   _,   _],
  [ _,   _,   _,  EBd, EB,  EB,  EB,  EB,  EB,  EB,  EB,  EB,  EBd,  _,   _,   _],
  [ _,   _,  EBd, EBd, EBd, EBd, EBd, EBd, EBd, EBd, EBd, EBd, EBd, EBd,  _,   _],
  [ _,   _,   _,   _,  ES,  ES,  ES,  ES,  ES,  ES,  ES,  ES,   _,   _,   _,   _],
  [ _,   _,   _,  ESd, EW,  EK,  ES,  ES,  ES,  ES,  EK,  EW,  ESd,  _,   _,   _],
  [ _,   _,   _,   _,  ES,  ES,  ES, ESd,  ES,  ES,  ES,  ES,   _,   _,   _,   _],
  [ _,   _,   _,   _,   _,  ES, ESd, ESd, ESd,  ES,  ES,   _,   _,   _,   _,   _],
  [ _,   _,   _,   _,  EU,  EU,  EL,  EL,  EL,  EU,  EU,  EU,   _,   _,   _,   _], // bolt bigger
  [ _,   _,  ES,  ES,  EU,  EL,  EL, "#88eeff",EU,  EU,  EU,  EU,  ES,   _,   _,   _], // bolt glow
  [ _,   _,   _,  ES,  EU,  EU,  EU,  EL,  EL,  EU,  EU,  EU,  ES,  ES,   _,   _],
  [ _,   _,   _,  ESd, EU, EBt, EBt, EBt, EBt, EBt, EBt,  EU,  ESd,  _,   _,   _],
  [ _,   _,   _,   _,  EU,  EU,  EU,  EU,  EU,  EU,  EU,  EU,   _,   _,   _,   _],
  [ _,   _,   _,   _,  EU,  EU,  EU,  EK,  EK,  EU,  EU,  EU,   _,   _,   _,   _],
  [ _,   _,   _,   _,  EU,  EU, EUl,  _,   _,  EUl, EU,   EU,   _,   _,   _,   _],
  [ _,   _,   _,  BOOT,BOOT,BOOT, _,   _,   _, BOOT,BOOT,BOOT,  _,   _,   _,   _],
];

export const ELECTRICIAN_FRAMES: (string | null)[][][] = [
  ELECTRICIAN_SPRITE,
  ELECTRICIAN_FRAME2,
];

// ---------------------------------------------------------------------------
// ROOFER — brown hard hat, flannel shirt, hammer in right hand
// ---------------------------------------------------------------------------
export const ROOFER_SPRITE: (string | null)[][] = [
  //0    1    2    3    4    5    6    7    8    9   10   11   12   13   14   15
  [ _,   _,   _,   _,   _,  RB,  RB,  RB,  RB,  RB,  RB,   _,   _,   _,   _,   _], // 0  hat top
  [ _,   _,   _,   _,  RB,  RB,  RB,  RB,  RB,  RB,  RB,  RB,   _,   _,   _,   _], // 1  hat
  [ _,   _,   _,  RBd, RB,  RB,  RB,  RB,  RB,  RB,  RB,  RB,  RBd,  _,   _,   _], // 2  hat body
  [ _,   _,   _,  RBd, RBd, RBd, RBd, RBd, RBd, RBd, RBd, RBd, RBd,  _,   _,   _], // 3  hat brim
  [ _,   _,   _,   _,  RS,  RS,  RS,  RS,  RS,  RS,  RS,  RS,   _,   _,   _,   _], // 4  forehead
  [ _,   _,   _,  RSd, RW,  RK,  RS,  RS,  RS,  RS,  RK,  RW,  RSd,  _,   _,   _], // 5  eyes
  [ _,   _,   _,   _,  RS,  RS,  RS, RSd,  RS,  RS,  RS,  RS,   _,   _,   _,   _], // 6  nose
  [ _,   _,   _,   _,   _,  RS, RSd, RSd, RSd,  RS,  RS,   _,   _,   _,   _,   _], // 7  chin
  [ _,   _,   _,   _,  RF, RFl,  RF,  RF,  RF,  RF, RFl,  RF,   _,   _,   _,   _], // 8  flannel shoulders
  [ _,   _,   _,  RS,  RF,  RF, RFl,  RF,  RF, RFl,  RF,  RF,  RS,   _,   _,   _], // 9  flannel torso
  [ _,   _,  RS,  RS, RFl,  RF,  RF,  RF,  RF,  RF,  RF, RFl,  RS,  RH,   _,   _], // 10 arms + hammer head
  [ _,   _,   _,  RSd, RF, BELT,BELT,BELT,BELT,BELT, RF,  RF,  RSd, RH,   _,   _], // 11 belt + hammer
  [ _,   _,   _,   _,  RF,  RF, RFd,  RF,  RF, RFd,  RF,  RF,   _,  RHd,  _,   _], // 12 legs top + handle
  [ _,   _,   _,   _, RFd,  RF,  RF,  RK,  RK,  RF,  RF, RFd,   _,   _,   _,   _], // 13 legs
  [ _,   _,   _,   _, RFd,  RF,  RF,   _,   _,  RF,  RF, RFd,   _,   _,   _,   _], // 14 legs bottom
  [ _,   _,   _,  BOOT,BOOT,BOOT, _,   _,   _, BOOT,BOOT,BOOT,  _,   _,   _,   _], // 15 boots
];

// Roofer frame 2: hammer swung up
const ROOFER_FRAME2: (string | null)[][] = [
  //0    1    2    3    4    5    6    7    8    9   10   11   12   13   14   15
  [ _,   _,   _,   _,   _,  RB,  RB,  RB,  RB,  RB,  RB,   _,   _,  RH,   _,   _], // hammer head up
  [ _,   _,   _,   _,  RB,  RB,  RB,  RB,  RB,  RB,  RB,  RB,   _,  RHd,  _,   _], // hammer handle
  [ _,   _,   _,  RBd, RB,  RB,  RB,  RB,  RB,  RB,  RB,  RB,  RBd,  _,   _,   _],
  [ _,   _,   _,  RBd, RBd, RBd, RBd, RBd, RBd, RBd, RBd, RBd, RBd,  _,   _,   _],
  [ _,   _,   _,   _,  RS,  RS,  RS,  RS,  RS,  RS,  RS,  RS,   _,   _,   _,   _],
  [ _,   _,   _,  RSd, RW,  RK,  RS,  RS,  RS,  RS,  RK,  RW,  RSd,  _,   _,   _],
  [ _,   _,   _,   _,  RS,  RS,  RS, RSd,  RS,  RS,  RS,  RS,   _,   _,   _,   _],
  [ _,   _,   _,   _,   _,  RS, RSd, RSd, RSd,  RS,  RS,   _,   _,   _,   _,   _],
  [ _,   _,   _,   _,  RF, RFl,  RF,  RF,  RF,  RF, RFl,  RF,   _,   _,   _,   _],
  [ _,   _,   _,  RS,  RF,  RF, RFl,  RF,  RF, RFl,  RF,  RF,  RS,   _,   _,   _],
  [ _,   _,  RS,  RS, RFl,  RF,  RF,  RF,  RF,  RF,  RF, RFl,  RS,  RS,   _,   _], // arm raised
  [ _,   _,   _,  RSd, RF, BELT,BELT,BELT,BELT,BELT, RF,  RF,  RSd,  _,   _,   _],
  [ _,   _,   _,   _,  RF,  RF, RFd,  RF,  RF, RFd,  RF,  RF,   _,   _,   _,   _],
  [ _,   _,   _,   _, RFd,  RF,  RF,  RK,  RK,  RF,  RF, RFd,   _,   _,   _,   _],
  [ _,   _,   _,   _, RFd,  RF,  RF,   _,   _,  RF,  RF, RFd,   _,   _,   _,   _],
  [ _,   _,   _,  BOOT,BOOT,BOOT, _,   _,   _, BOOT,BOOT,BOOT,  _,   _,   _,   _],
];

export const ROOFER_FRAMES: (string | null)[][][] = [
  ROOFER_SPRITE,
  ROOFER_FRAME2,
];

// ---------------------------------------------------------------------------
// HANDYMAN — green cap, gray shirt, khaki pants, multi-tool in hand
// ---------------------------------------------------------------------------
export const HANDYMAN_SPRITE: (string | null)[][] = [
  //0    1    2    3    4    5    6    7    8    9   10   11   12   13   14   15
  [ _,   _,   _,   _,   _,   _,  HC,  HC,  HC,  HC,  HC,   _,   _,   _,   _,   _], // 0  cap top
  [ _,   _,   _,   _,   _,  HC,  HC,  HC,  HC,  HC,  HC,  HC,   _,   _,   _,   _], // 1  cap
  [ _,   _,   _,   _,  HCd, HC,  HC,  HC,  HC,  HC,  HC, HCd,   _,   _,   _,   _], // 2  cap body
  [ _,   _,   _,  HCd, HCd, HCd, HCd, HCd, HCd, HCd, HCd, HCd, HCd,  _,   _,   _], // 3  cap brim
  [ _,   _,   _,   _,  HS,  HS,  HS,  HS,  HS,  HS,  HS,  HS,   _,   _,   _,   _], // 4  forehead
  [ _,   _,   _,  HSd, HW,  HK,  HS,  HS,  HS,  HS,  HK,  HW,  HSd,  _,   _,   _], // 5  eyes
  [ _,   _,   _,   _,  HS,  HS,  HS, HSd,  HS,  HS,  HS,  HS,   _,   _,   _,   _], // 6  nose
  [ _,   _,   _,   _,   _,  HS, HSd, HSd, HSd,  HS,  HS,   _,   _,   _,   _,   _], // 7  chin
  [ _,   _,   _,   _,  HG,  HG,  HG,  HG,  HG,  HG,  HG,  HG,   _,   _,   _,   _], // 8  shirt shoulders
  [ _,   _,   _,  HS,  HG,  HG,  HG,  HG,  HG,  HG,  HG,  HG,  HS,   _,   _,   _], // 9  shirt torso
  [ _,   _,  HS,  HS,  HG,  HG,  HG,  HG,  HG,  HG,  HG,  HG,  HS,  HT,   _,   _], // 10 arms + tool top
  [ _,   _,   _,  HSd, HG, BELTl,BELT,BELT,BELT,BELTl, HG, HG, HSd,  HT,   _,   _], // 11 belt + tool
  [ _,   _,   _,   _,  HU,  HU,  HU,  HU,  HU,  HU,  HU,  HU,   _,  HTd,  _,   _], // 12 khaki legs top
  [ _,   _,   _,   _,  HU,  HU, HUd,  HK,  HK, HUd,  HU,  HU,   _,   _,   _,   _], // 13 legs
  [ _,   _,   _,   _,  HU,  HU, HUd,  _,   _, HUd,  HU,  HU,   _,   _,   _,   _], // 14 legs bottom
  [ _,   _,   _,  BOOT,BOOT,BOOT, _,   _,   _, BOOT,BOOT,BOOT,  _,   _,   _,   _], // 15 boots
];

// Handyman frame 2: tool raised, slight lean
const HANDYMAN_FRAME2: (string | null)[][] = [
  //0    1    2    3    4    5    6    7    8    9   10   11   12   13   14   15
  [ _,   _,   _,   _,   _,   _,  HC,  HC,  HC,  HC,  HC,   _,   _,  HT,   _,   _], // tool up
  [ _,   _,   _,   _,   _,  HC,  HC,  HC,  HC,  HC,  HC,  HC,   _,  HTd,  _,   _], // tool handle
  [ _,   _,   _,   _,  HCd, HC,  HC,  HC,  HC,  HC,  HC, HCd,   _,   _,   _,   _],
  [ _,   _,   _,  HCd, HCd, HCd, HCd, HCd, HCd, HCd, HCd, HCd, HCd,  _,   _,   _],
  [ _,   _,   _,   _,  HS,  HS,  HS,  HS,  HS,  HS,  HS,  HS,   _,   _,   _,   _],
  [ _,   _,   _,  HSd, HW,  HK,  HS,  HS,  HS,  HS,  HK,  HW,  HSd,  _,   _,   _],
  [ _,   _,   _,   _,  HS,  HS,  HS, HSd,  HS,  HS,  HS,  HS,   _,   _,   _,   _],
  [ _,   _,   _,   _,   _,  HS, HSd, HSd, HSd,  HS,  HS,   _,   _,   _,   _,   _],
  [ _,   _,   _,   _,  HG,  HG,  HG,  HG,  HG,  HG,  HG,  HG,   _,   _,   _,   _],
  [ _,   _,  HS,  HS,  HG,  HG,  HG,  HG,  HG,  HG,  HG,  HG,  HS,   _,   _,   _], // arm raised
  [ _,   _,   _,  HS,  HG,  HG,  HG,  HG,  HG,  HG,  HG,  HG,  HS,  HS,   _,   _],
  [ _,   _,   _,  HSd, HG, BELTl,BELT,BELT,BELT,BELTl, HG, HG, HSd,  _,   _,   _],
  [ _,   _,   _,   _,  HU,  HU,  HU,  HU,  HU,  HU,  HU,  HU,   _,   _,   _,   _],
  [ _,   _,   _,   _,  HU,  HU, HUd,  HK,  HK, HUd,  HU,  HU,   _,   _,   _,   _],
  [ _,   _,   _,   _,  HU,  HU, HUd,  _,   _, HUd,  HU,  HU,   _,   _,   _,   _],
  [ _,   _,   _,  BOOT,BOOT,BOOT, _,   _,   _, BOOT,BOOT,BOOT,  _,   _,   _,   _],
];

export const HANDYMAN_FRAMES: (string | null)[][][] = [
  HANDYMAN_SPRITE,
  HANDYMAN_FRAME2,
];
