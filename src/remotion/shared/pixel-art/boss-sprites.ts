/**
 * "Lead Fee Dragon" — 32x32 pixel art boss sprite.
 * A menacing dragon-like creature made of dollar signs and corporate greed.
 * RPG boss aesthetic: cartoonish but imposing.
 */

const _ = null;

// Color palette
const DR = "#880000"; // dark red body
const DRl = "#aa2222"; // body highlight
const DRd = "#660000"; // body deep shadow
const DP = "#440066"; // dark purple wings
const DPl = "#662299"; // wing highlight
const DPd = "#330044"; // wing shadow
const EY = "#ffdd00"; // glowing yellow eyes
const EYl = "#ffee66"; // eye glow
const FI = "#ff6600"; // orange fire
const FIl = "#ff9933"; // fire light
const FId = "#cc4400"; // fire dark
const GO = "#ffcc00"; // gold $ / crown
const GOd = "#cc9900"; // gold dark
const GOs = "#ffee88"; // gold shine
const HN = "#aa0000"; // horn red
const HNd = "#770000"; // horn dark
const CL = "#cc2222"; // claw red
const TH = "#ffaa00"; // teeth
const BK = "#111111"; // outline / black
const WH = "#ffffff"; // highlights
const SK = "#441111"; // dark underbelly scales

// ---------------------------------------------------------------------------
// BOSS_SPRITE — 32x32
// A dragon facing forward, wings spread, horns with $ crowns, breathing fire.
// ---------------------------------------------------------------------------
export const BOSS_SPRITE: (string | null)[][] = [
  // Row 0 — horn tips and crown
  //0    1    2    3    4    5    6    7    8    9   10   11   12   13   14   15   16   17   18   19   20   21   22   23   24   25   26   27   28   29   30   31
  [ _,   _,   _,   _,  HN,  _,   _,   _,   _,   _,   _,  GO,  GO,   _,   _,   _,   _,   _,   _,  GO,  GO,   _,   _,   _,   _,   _,   _,  HN,   _,   _,   _,   _],
  // Row 1 — horns + crown $
  [ _,   _,   _,  HN,  HN,   _,   _,   _,   _,   _,  GO,  GO,  GOs, GO,   _,   _,   _,   _,  GO,  GOs, GO,  GO,   _,   _,   _,   _,   _,  HN,  HN,   _,   _,   _],
  // Row 2 — horns growing, crown detail
  [ _,   _,  HN,  HN,  HNd,  _,   _,   _,   _,  GO,  GOd, GO,  GO,  GOd,  _,   _,   _,   _,  GOd, GO,  GO,  GOd, GO,   _,   _,   _,  HNd, HN,  HN,   _,   _,   _],
  // Row 3 — horns join head, crown base
  [ _,   _,  HNd, HN,  DR,   _,   _,   _,  GO,  GO,  GO,  GOd, GO,  GO,  GO,   _,   _,  GO,  GO,  GO,  GOd, GO,  GO,  GO,   _,   _,   DR,  HN,  HNd,  _,   _,   _],
  // Row 4 — top of head
  [ _,   _,   _,  DR,  DR,  DR,   _,   _,  GOd, GOd, DR,  DR,  DR,  DR,  DR,  DR,  DR,  DR,  DR,  DR,  DR,  DR,  GOd, GOd,  _,   _,  DR,  DR,  DR,   _,   _,   _],
  // Row 5 — head upper
  [ _,   _,   _,   _,  DR,  DR,  DR,  DR,  DR,  DR, DRl,  DR,  DR,  DR,  DR,  DR,  DR,  DR,  DR,  DR,  DR, DRl,  DR,  DR,  DR,  DR,  DR,  DR,   _,   _,   _,   _],
  // Row 6 — head with eyes
  [ _,   _,   _,   _,  DR,  DR,  DR, DRl,  DR,  EY,  EYl, EY,  DR,  DR,  DR,  DR,  DR,  DR,  DR,  DR,  EY,  EYl, EY,  DR, DRl,  DR,  DR,  DR,   _,   _,   _,   _],
  // Row 7 — head with eyes glow, brow ridge
  [ _,   _,   _,   _,   _,  DR,  DR,  DR,  BK,  EY,  WH,  EY,  BK,  DR,  DR,  DR,  DR,  DR,  DR,  BK,  EY,  WH,  EY,  BK,  DR,  DR,  DR,   _,   _,   _,   _,   _],
  // Row 8 — snout, nostrils
  [ _,   _,   _,   _,   _,  DR,  DR,  DR,  DR,  DR,  DR,  DR,  DR, DRd,  DR,  DR,  DR,  DR, DRd,  DR,  DR,  DR,  DR,  DR,  DR,  DR,  DR,   _,   _,   _,   _,   _],
  // Row 9 — mouth open (top jaw), teeth, wings start
  [ _,  DP,  DP,   _,   _,   _,  DR,  DR,  DR,  DRd, DR,  DR,  TH,  TH,  BK,  BK,  BK,  BK,  TH,  TH,  DR,  DR,  DRd, DR,  DR,  DR,   _,   _,   _,  DP,  DP,   _],
  // Row 10 — wings extending, mouth fire
  [ DP,  DP, DPl,  DP,   _,   _,  DR,  DR,  DRd, DR,  DR,  TH,  FI,  FI,  FIl, FI,  FI,  FIl, FI,  FI,  TH,  DR,  DR,  DRd, DR,  DR,   _,   _,  DP, DPl,  DP,  DP],
  // Row 11 — wing spread, jaw
  [DPd,  DP,  DP, DPl,  DP,   _,   _,  DR,  DR,  DR,  DR,  DR,  FId, FI,  FI,  FIl, FIl, FI,  FI,  FId, DR,  DR,  DR,  DR,  DR,   _,   _,  DP, DPl,  DP,  DP, DPd],
  // Row 12 — wings wide, neck
  [DPd, DPd, DP,  DP, DPl,  DP,   _,   _,  DR,  DR, DRl,  DR,  DR,  FId, FI,  FI,  FI,  FI,  FId, DR,  DR, DRl,  DR,  DR,   _,   _,  DP, DPl,  DP,  DP, DPd, DPd],
  // Row 13 — wings mid, shoulders
  [ _,  DPd, DPd, DP,  DP,  DP,   _,   _,   _,  DR,  DR,  DR, DRl,  DR,  DR,  DR,  DR,  DR,  DR, DRl,  DR,  DR,  DR,   _,   _,   _,  DP,  DP,  DP, DPd, DPd,  _],
  // Row 14 — wings lower, arms/claws
  [ _,   _,  DPd, DPd, DP,  DP,   _,   _,  CL,  DR,  DR,  DR,  DR, DRl,  DR,  DR,  DR,  DR, DRl,  DR,  DR,  DR,  DR,  CL,   _,   _,  DP,  DP, DPd, DPd,  _,   _],
  // Row 15 — wing tips, chest
  [ _,   _,   _,  DPd, DPd, DP,   _,  CL,  CL,  DR,  DR,  DR, DRl, DRl,  SK,  SK,  SK,  SK, DRl, DRl,  DR,  DR,  DR,  CL,  CL,   _,  DP, DPd, DPd,  _,   _,   _],
  // Row 16 — wings fold, torso
  [ _,   _,   _,   _,  DPd, DP,   _,   _,  CL,  DR,  DR, DRl,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK, DRl,  DR,  DR,  CL,   _,   _,  DP, DPd,  _,   _,   _,   _],
  // Row 17 — belly scales, $ symbol on chest
  [ _,   _,   _,   _,   _,  DP,  DP,   _,   _,  DR,  DR,  SK,  SK,  GO,  GO,  SK,  SK,  GO,  GO,  SK,  SK,  DR,  DR,   _,   _,  DP,  DP,   _,   _,   _,   _,   _],
  // Row 18 — belly with $ detail
  [ _,   _,   _,   _,   _,   _,  DP,  DP,   _,  DR,  SK,  SK,  GO,  GOd, GO,  GO,  GO,  GO,  GOd, GO,  SK,  SK,  DR,   _,  DP,  DP,   _,   _,   _,   _,   _,   _],
  // Row 19 — lower belly, $ detail
  [ _,   _,   _,   _,   _,   _,   _,  DP,   _,  DR,  SK,  SK,  SK,  GO,  GOd, GO,  GO,  GOd, GO,  SK,  SK,  SK,  DR,   _,  DP,   _,   _,   _,   _,   _,   _,   _],
  // Row 20 — hips
  [ _,   _,   _,   _,   _,   _,   _,   _,   _,  DR,  DR,  SK,  SK,  SK,  GO,  GO,  GO,  GO,  SK,  SK,  SK,  DR,  DR,   _,   _,   _,   _,   _,   _,   _,   _,   _],
  // Row 21 — upper legs
  [ _,   _,   _,   _,   _,   _,   _,   _,   _,  DR,  DR,  DR,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  DR,  DR,  DR,   _,   _,   _,   _,   _,   _,   _,   _,   _],
  // Row 22 — thighs
  [ _,   _,   _,   _,   _,   _,   _,   _,  DR,  DR,  DR, DRl,  DR,  DR,  DR,  DR,  DR,  DR,  DR,  DR, DRl,  DR,  DR,  DR,   _,   _,   _,   _,   _,   _,   _,   _],
  // Row 23 — legs separating
  [ _,   _,   _,   _,   _,   _,   _,   _,  DR,  DR, DRl,  DR,  DR,   _,   _,   _,   _,   _,   _,  DR,  DR, DRl,  DR,  DR,   _,   _,   _,   _,   _,   _,   _,   _],
  // Row 24 — lower legs
  [ _,   _,   _,   _,   _,   _,   _,  DR,  DR,  DR,  DR, DRd,   _,   _,   _,   _,   _,   _,   _,   _,  DRd, DR,  DR,  DR,  DR,   _,   _,   _,   _,   _,   _,   _],
  // Row 25 — shins
  [ _,   _,   _,   _,   _,   _,   _,  DR,  DR, DRd, DRd,  _,   _,   _,   _,   _,   _,   _,   _,   _,   _,  DRd, DRd, DR,  DR,   _,   _,   _,   _,   _,   _,   _],
  // Row 26 — ankles
  [ _,   _,   _,   _,   _,   _,  DR,  DR,  DRd, DR,   _,   _,   _,   _,   _,   _,   _,   _,   _,   _,   _,   _,  DR,  DRd, DR,  DR,   _,   _,   _,   _,   _,   _],
  // Row 27 — feet top
  [ _,   _,   _,   _,   _,  DR,  DR,  DRd, DR,  DR,   _,   _,   _,   _,   _,   _,   _,   _,   _,   _,   _,   _,  DR,  DR,  DRd, DR,  DR,   _,   _,   _,   _,   _],
  // Row 28 — feet with claws
  [ _,   _,   _,   _,  CL,  DR,  DR,  DR,  DR, DRd,  _,   _,   _,   _,   _,   _,   _,   _,   _,   _,   _,   _,  DRd, DR,  DR,  DR,  DR,  CL,   _,   _,   _,   _],
  // Row 29 — claw toes
  [ _,   _,   _,  CL,  CL,  DR,  DR,  DRd,  _,   _,   _,   _,   _,   _,   _,   _,   _,   _,   _,   _,   _,   _,   _,   _,  DRd, DR,  DR,  CL,  CL,   _,   _,   _],
  // Row 30 — claw tips
  [ _,   _,  CL,  CL,   _,  DRd, DRd,  _,   _,   _,   _,   _,   _,   _,   _,   _,   _,   _,   _,   _,   _,   _,   _,   _,   _,  DRd, DRd,  _,  CL,  CL,   _,   _],
  // Row 31 — tail hint / ground
  [ _,   _,   _,   _,   _,   _,   _,   _,   _,   _,   _,   _,   _,   _,   _,   _,   _,   _,   _,   _,   _,   _,   _,   _,   _,   _,   _,   _,   _,   _,   _,   _],
];

// ---------------------------------------------------------------------------
// BOSS_HURT_SPRITE — same dragon but with "flash" effect (hit feedback)
// White/bright pixels mixed in, some body pixels shifted to brighter tones.
// ---------------------------------------------------------------------------
const HW = "#ffffff"; // flash white
const HF = "#ff4444"; // hurt flash red
const HFl = "#ff8888"; // hurt flash light

export const BOSS_HURT_SPRITE: (string | null)[][] = [
  // Row 0
  [ _,   _,   _,   _,  HN,  _,   _,   _,   _,   _,   _,  GO,  GO,   _,   _,   _,   _,   _,   _,  GO,  GO,   _,   _,   _,   _,   _,   _,  HN,   _,   _,   _,   _],
  // Row 1
  [ _,   _,   _,  HN,  HN,   _,   _,   _,   _,   _,  GO,  GO,  GOs, GO,   _,   _,   _,   _,  GO,  GOs, GO,  GO,   _,   _,   _,   _,   _,  HN,  HN,   _,   _,   _],
  // Row 2
  [ _,   _,  HN,  HN,  HNd,  _,   _,   _,   _,  GO,  GOd, GO,  GO,  GOd,  _,   _,   _,   _,  GOd, GO,  GO,  GOd, GO,   _,   _,   _,  HNd, HN,  HN,   _,   _,   _],
  // Row 3
  [ _,   _,  HNd, HN,  HF,   _,   _,   _,  GO,  GO,  GO,  GOd, GO,  GO,  GO,   _,   _,  GO,  GO,  GO,  GOd, GO,  GO,  GO,   _,   _,  HF,  HN,  HNd,  _,   _,   _],
  // Row 4 — flashing body
  [ _,   _,   _,  HF, HFl,  HF,   _,   _,  GOd, GOd, HF,  HW,  HF,  DR,  HF,  DR,  DR,  HF,  DR,  HF,  HW,  HF,  GOd, GOd,  _,   _,  HF, HFl,  HF,   _,   _,   _],
  // Row 5
  [ _,   _,   _,   _,  HF, HFl,  HF,  DR,  HF,  DR, HW,  HF,  DR,  HF,  DR,  DR,  DR,  HF,  DR,  HF,  DR,  HW,  DR,  HF,  DR,  HF, HFl,  HF,   _,   _,   _,   _],
  // Row 6 — eyes still visible
  [ _,   _,   _,   _,  HF,  DR, HFl,  HW,  HF,  EY,  EYl, EY,  HF,  DR,  HF,  DR,  DR,  HF,  DR,  HF,  EY,  EYl, EY,  HF,  HW, HFl,  DR,  HF,   _,   _,   _,   _],
  // Row 7
  [ _,   _,   _,   _,   _,  HF,  DR, HFl,  BK,  EY,  WH,  EY,  BK,  HF,  DR,  HF,  HF,  DR,  HF,  BK,  EY,  WH,  EY,  BK, HFl,  DR,  HF,   _,   _,   _,   _,   _],
  // Row 8
  [ _,   _,   _,   _,   _,  HF,  DR, HFl,  HF,  DR,  HW,  HF,  DR, DRd,  HF,  DR,  DR,  HF, DRd,  HF,  HW,  DR,  HF, HFl,  DR,  HF,  DR,   _,   _,   _,   _,   _],
  // Row 9
  [ _,  DP,  DP,   _,   _,   _,  HF,  DR,  HF,  DRd, HF,  DR,  TH,  TH,  BK,  BK,  BK,  BK,  TH,  TH,  DR,  HF,  DRd, HF,  DR,  HF,   _,   _,   _,  DP,  DP,   _],
  // Row 10
  [ DP,  DP, DPl,  DP,   _,   _,  HF,  DR,  DRd, HF,  DR,  TH,  FI,  FI,  FIl, FI,  FI,  FIl, FI,  FI,  TH,  DR,  HF,  DRd, DR,  HF,   _,   _,  DP, DPl,  DP,  DP],
  // Row 11
  [DPd,  DP,  DP, DPl,  DP,   _,   _,  HF,  DR,  HF,  DR,  DR,  FId, FI,  FI,  FIl, FIl, FI,  FI,  FId, DR,  DR,  HF,  DR,  HF,   _,   _,  DP, DPl,  DP,  DP, DPd],
  // Row 12
  [DPd, DPd, DP,  DP, DPl,  DP,   _,   _,  HF,  DR, HW,  HF,  DR,  FId, FI,  FI,  FI,  FI,  FId, DR,  HF,  HW,  DR,  HF,   _,   _,  DP, DPl,  DP,  DP, DPd, DPd],
  // Row 13
  [ _,  DPd, DPd, DP,  DP,  DP,   _,   _,   _,  HF,  DR, HFl,  HW,  HF,  DR,  DR,  DR,  DR,  HF,  HW, HFl,  DR,  HF,   _,   _,   _,  DP,  DP,  DP, DPd, DPd,  _],
  // Row 14
  [ _,   _,  DPd, DPd, DP,  DP,   _,   _,  CL,  HF,  DR, HFl,  HF,  HW,  HF,  DR,  DR,  HF,  HW,  HF, HFl,  DR,  HF,  CL,   _,   _,  DP,  DP, DPd, DPd,  _,   _],
  // Row 15
  [ _,   _,   _,  DPd, DPd, DP,   _,  CL,  CL,  HF,  DR,  HF,  HW, HFl,  SK,  SK,  SK,  SK, HFl,  HW,  HF,  DR,  HF,  CL,  CL,   _,  DP, DPd, DPd,  _,   _,   _],
  // Row 16
  [ _,   _,   _,   _,  DPd, DP,   _,   _,  CL,  HF,  DR,  HW,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  HW,  DR,  HF,  CL,   _,   _,  DP, DPd,  _,   _,   _,   _],
  // Row 17
  [ _,   _,   _,   _,   _,  DP,  DP,   _,   _,  HF,  DR,  SK,  SK,  GO,  GO,  SK,  SK,  GO,  GO,  SK,  SK,  DR,  HF,   _,   _,  DP,  DP,   _,   _,   _,   _,   _],
  // Row 18
  [ _,   _,   _,   _,   _,   _,  DP,  DP,   _,  HF,  SK,  SK,  GO,  GOd, GO,  GO,  GO,  GO,  GOd, GO,  SK,  SK,  HF,   _,  DP,  DP,   _,   _,   _,   _,   _,   _],
  // Row 19
  [ _,   _,   _,   _,   _,   _,   _,  DP,   _,  HF,  SK,  SK,  SK,  GO,  GOd, GO,  GO,  GOd, GO,  SK,  SK,  SK,  HF,   _,  DP,   _,   _,   _,   _,   _,   _,   _],
  // Row 20
  [ _,   _,   _,   _,   _,   _,   _,   _,   _,  HF,  DR,  SK,  SK,  SK,  GO,  GO,  GO,  GO,  SK,  SK,  SK,  DR,  HF,   _,   _,   _,   _,   _,   _,   _,   _,   _],
  // Row 21
  [ _,   _,   _,   _,   _,   _,   _,   _,   _,  HF,  DR,  HF,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  HF,  DR,  HF,   _,   _,   _,   _,   _,   _,   _,   _,   _],
  // Row 22
  [ _,   _,   _,   _,   _,   _,   _,   _,  HF,  DR,  HF, HFl,  HF,  DR,  DR,  DR,  DR,  DR,  DR,  HF, HFl,  HF,  DR,  HF,   _,   _,   _,   _,   _,   _,   _,   _],
  // Row 23
  [ _,   _,   _,   _,   _,   _,   _,   _,  HF,  DR,  HW,  HF,  DR,   _,   _,   _,   _,   _,   _,  DR,  HF,  HW,  DR,  HF,   _,   _,   _,   _,   _,   _,   _,   _],
  // Row 24
  [ _,   _,   _,   _,   _,   _,   _,  HF,  DR,  HF,  DR, DRd,   _,   _,   _,   _,   _,   _,   _,   _,  DRd, DR,  HF,  DR,  HF,   _,   _,   _,   _,   _,   _,   _],
  // Row 25
  [ _,   _,   _,   _,   _,   _,   _,  HF,  DR, DRd, DRd,  _,   _,   _,   _,   _,   _,   _,   _,   _,   _,  DRd, DRd, DR,  HF,   _,   _,   _,   _,   _,   _,   _],
  // Row 26
  [ _,   _,   _,   _,   _,   _,  HF,  DR,  DRd, DR,   _,   _,   _,   _,   _,   _,   _,   _,   _,   _,   _,   _,  DR,  DRd, DR,  HF,   _,   _,   _,   _,   _,   _],
  // Row 27
  [ _,   _,   _,   _,   _,  HF,  DR,  DRd, DR,  DR,   _,   _,   _,   _,   _,   _,   _,   _,   _,   _,   _,   _,  DR,  DR,  DRd, DR,  HF,   _,   _,   _,   _,   _],
  // Row 28
  [ _,   _,   _,   _,  CL,  HF,  DR,  DR,  DR, DRd,  _,   _,   _,   _,   _,   _,   _,   _,   _,   _,   _,   _,  DRd, DR,  DR,  DR,  HF,  CL,   _,   _,   _,   _],
  // Row 29
  [ _,   _,   _,  CL,  CL,  HF,  DR, DRd,   _,   _,   _,   _,   _,   _,   _,   _,   _,   _,   _,   _,   _,   _,   _,   _,  DRd, DR,  HF,  CL,  CL,   _,   _,   _],
  // Row 30
  [ _,   _,  CL,  CL,   _,  DRd, DRd,  _,   _,   _,   _,   _,   _,   _,   _,   _,   _,   _,   _,   _,   _,   _,   _,   _,   _,  DRd, DRd,  _,  CL,  CL,   _,   _],
  // Row 31
  [ _,   _,   _,   _,   _,   _,   _,   _,   _,   _,   _,   _,   _,   _,   _,   _,   _,   _,   _,   _,   _,   _,   _,   _,   _,   _,   _,   _,   _,   _,   _,   _],
];
