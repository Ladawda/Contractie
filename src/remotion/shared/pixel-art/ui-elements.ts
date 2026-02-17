/**
 * Small pixel art UI elements for RPG-themed video overlays.
 * Each sprite is a 2D array of hex colors (or null for transparent).
 */

const _ = null;

// ---------------------------------------------------------------------------
// SWORD_CURSOR — 8x8, a small sword pointing right (menu selection cursor)
// ---------------------------------------------------------------------------
export const SWORD_CURSOR: (string | null)[][] = [
  //0       1       2       3       4       5       6       7
  [ _,      _,      _,      _,      _,      _,    "#cccccc", _      ], // 0 tip
  [ _,      _,      _,      _,      _,    "#cccccc","#ffffff","#cccccc"], // 1 blade tip
  [ _,      _,      _,      _,    "#cccccc","#ffffff","#cccccc", _      ], // 2 blade
  [ _,      _,      _,    "#cccccc","#ffffff","#cccccc", _,      _      ], // 3 blade
  [ _,      _,    "#cccccc","#ffffff","#cccccc", _,      _,      _      ], // 4 blade
  ["#8B4513","#ffcc00","#ffcc00","#cccccc", _,      _,      _,      _      ], // 5 guard + handle
  [ _,    "#8B4513","#ffcc00", _,      _,      _,      _,      _      ], // 6 handle
  [ _,      _,    "#8B4513", _,      _,      _,      _,      _      ], // 7 pommel
];

// ---------------------------------------------------------------------------
// COIN_SPRITE — 8x8, a gold coin with a "$" relief
// ---------------------------------------------------------------------------
export const COIN_SPRITE: (string | null)[][] = [
  //0       1       2       3       4       5       6       7
  [ _,      _,    "#ccaa00","#ffcc00","#ffcc00","#ccaa00", _,      _      ], // 0 top edge
  [ _,    "#ccaa00","#ffdd33","#ffee66","#ffdd33","#ffcc00","#ccaa00", _      ], // 1
  ["#ccaa00","#ffdd33","#ffcc00","#ccaa00","#ffcc00","#ffcc00","#ffdd33","#ccaa00"], // 2 $ top curve
  ["#ffcc00","#ffee66","#ccaa00","#ffcc00","#ccaa00","#ffcc00","#ffcc00","#ffcc00"], // 3 $ mid
  ["#ffcc00","#ffcc00","#ffcc00","#ccaa00","#ffcc00","#ccaa00","#ffee66","#ffcc00"], // 4 $ mid
  ["#ccaa00","#ffdd33","#ffcc00","#ffcc00","#ccaa00","#ffcc00","#ffdd33","#ccaa00"], // 5 $ bottom curve
  [ _,    "#ccaa00","#ffdd33","#ffcc00","#ffdd33","#ffcc00","#ccaa00", _      ], // 6
  [ _,      _,    "#ccaa00","#ccaa00","#ccaa00","#ccaa00", _,      _      ], // 7 bottom edge
];

// ---------------------------------------------------------------------------
// HEART_SPRITE — 8x8, a red heart (HP indicator)
// ---------------------------------------------------------------------------
export const HEART_SPRITE: (string | null)[][] = [
  //0       1       2       3       4       5       6       7
  [ _,    "#cc0000","#cc0000", _,      _,    "#cc0000","#cc0000", _      ], // 0 top bumps
  ["#cc0000","#ff4444","#ff2222","#cc0000","#cc0000","#ff2222","#ff4444","#cc0000"], // 1
  ["#cc0000","#ff2222","#ff4444","#ff2222","#ff2222","#ff4444","#ff2222","#cc0000"], // 2
  ["#cc0000","#ff2222","#ff2222","#ff2222","#ff2222","#ff2222","#ff2222","#cc0000"], // 3
  [ _,    "#cc0000","#ff2222","#ff2222","#ff2222","#ff2222","#cc0000", _      ], // 4
  [ _,      _,    "#cc0000","#ff2222","#ff2222","#cc0000", _,      _      ], // 5
  [ _,      _,      _,    "#cc0000","#cc0000", _,      _,      _      ], // 6
  [ _,      _,      _,      _,    "#990000", _,      _,      _      ], // 7 bottom point
];

// ---------------------------------------------------------------------------
// STAR_SPRITE — 8x8, a yellow star (ratings)
// ---------------------------------------------------------------------------
export const STAR_SPRITE: (string | null)[][] = [
  //0       1       2       3       4       5       6       7
  [ _,      _,      _,    "#ffdd00", _,      _,      _,      _      ], // 0 top point
  [ _,      _,      _,    "#ffee44","#ffdd00", _,      _,      _      ], // 1
  [ _,      _,    "#ffee44","#ffee44","#ffee44","#ffdd00", _,      _      ], // 2
  ["#ffdd00","#ffee44","#ffee44","#ffee44","#ffee44","#ffee44","#ffdd00","#ccaa00"], // 3 wide bar
  [ _,    "#ffdd00","#ffee44","#ffee44","#ffee44","#ffdd00","#ccaa00", _      ], // 4
  [ _,      _,    "#ffdd00","#ffee44","#ffdd00","#ccaa00", _,      _      ], // 5
  [ _,    "#ffdd00","#ffee44","#ccaa00","#ffee44","#ffdd00","#ccaa00", _      ], // 6 bottom points
  ["#ffdd00","#ccaa00", _,      _,      _,      _,    "#ccaa00","#ccaa00"], // 7 bottom tips
];

// ---------------------------------------------------------------------------
// SHIELD_SPRITE — 8x8, a blue shield (defense/protection)
// ---------------------------------------------------------------------------
export const SHIELD_SPRITE: (string | null)[][] = [
  //0       1       2       3       4       5       6       7
  [ _,    "#2244aa","#2244aa","#2244aa","#2244aa","#2244aa","#2244aa", _      ], // 0 top edge
  ["#2244aa","#4466cc","#3355bb","#ccaa00","#ccaa00","#3355bb","#4466cc","#2244aa"], // 1 top + gold cross
  ["#2244aa","#3355bb","#ccaa00","#ffdd00","#ffdd00","#ccaa00","#3355bb","#2244aa"], // 2 gold cross
  ["#2244aa","#3355bb","#ccaa00","#ffdd00","#ffdd00","#ccaa00","#3355bb","#2244aa"], // 3 gold cross center
  ["#2244aa","#3355bb","#3355bb","#ccaa00","#ccaa00","#3355bb","#3355bb","#2244aa"], // 4
  [ _,    "#2244aa","#3355bb","#3355bb","#3355bb","#3355bb","#2244aa", _      ], // 5 narrowing
  [ _,      _,    "#2244aa","#3355bb","#3355bb","#2244aa", _,      _      ], // 6
  [ _,      _,      _,    "#2244aa","#2244aa", _,      _,      _      ], // 7 bottom point
];

// ---------------------------------------------------------------------------
// CHEST_SPRITE — 12x12, a treasure chest (loot/rewards)
// ---------------------------------------------------------------------------
const CW = "#8B4513"; // chest wood
const CWl = "#a0622d"; // chest wood light
const CWd = "#6B3310"; // chest wood dark
const CM = "#ccaa00"; // chest metal gold
const CMl = "#ffdd00"; // metal highlight
const CMs = "#ffee66"; // metal shine
const CLk = "#222222"; // lock dark

export const CHEST_SPRITE: (string | null)[][] = [
  //0    1    2    3    4    5    6    7    8    9   10   11
  [ _,   _,   CWd, CW,  CW,  CW,  CW,  CW,  CW,  CWd,  _,   _  ], // 0 lid top
  [ _,   CWd, CW,  CWl, CW,  CW,  CW,  CW,  CWl, CW,  CWd,  _  ], // 1 lid
  [ CWd, CW,  CWl, CW,  CW,  CM,  CM,  CW,  CW,  CWl, CW,  CWd], // 2 lid + metal band
  [ CWd, CW,  CW,  CW,  CM,  CMl, CMl, CM,  CW,  CW,  CW,  CWd], // 3 lid bottom
  [ CM,  CM,  CM,  CM,  CM,  CM,  CM,  CM,  CM,  CM,  CM,  CM ], // 4 metal rim
  [ CWd, CW,  CW,  CW,  CW,  CM,  CM,  CW,  CW,  CW,  CW,  CWd], // 5 body top
  [ CWd, CWl, CW,  CW,  CW,  CMl, CMs, CW,  CW,  CW,  CWl, CWd], // 6 body + keyhole
  [ CWd, CW,  CW,  CW,  CW,  CLk, CLk, CW,  CW,  CW,  CW,  CWd], // 7 body + lock
  [ CWd, CWl, CW,  CW,  CW,  CW,  CW,  CW,  CW,  CW,  CWl, CWd], // 8 body
  [ CWd, CW,  CW,  CWl, CW,  CW,  CW,  CW,  CWl, CW,  CW,  CWd], // 9 body
  [ CWd, CWd, CW,  CW,  CW,  CW,  CW,  CW,  CW,  CW,  CWd, CWd], // 10 body bottom
  [ _,   CWd, CWd, CWd, CWd, CWd, CWd, CWd, CWd, CWd, CWd,  _  ], // 11 base
];

// ---------------------------------------------------------------------------
// EXCLAMATION_SPRITE — 8x12, a yellow "!" quest marker (floats over NPCs)
// ---------------------------------------------------------------------------
const QY = "#ffdd00"; // quest yellow
const QYl = "#ffee66"; // yellow highlight
const QYd = "#ccaa00"; // yellow dark/outline

export const EXCLAMATION_SPRITE: (string | null)[][] = [
  //0    1    2    3    4    5    6    7
  [ _,   _,   QYd, QY,  QY,  QYd,  _,   _  ], // 0 top
  [ _,   QYd, QY,  QYl, QYl, QY,  QYd,  _  ], // 1
  [ _,   QYd, QY,  QYl, QYl, QY,  QYd,  _  ], // 2
  [ _,   QYd, QY,  QYl, QYl, QY,  QYd,  _  ], // 3
  [ _,   _,   QYd, QY,  QY,  QYd,  _,   _  ], // 4 narrowing
  [ _,   _,   QYd, QY,  QY,  QYd,  _,   _  ], // 5
  [ _,   _,   QYd, QY,  QY,  QYd,  _,   _  ], // 6
  [ _,   _,   _,   QYd, QYd,  _,   _,   _  ], // 7 taper
  [ _,   _,   _,   _,   _,   _,   _,   _  ], // 8 gap
  [ _,   _,   _,   QYd, QYd,  _,   _,   _  ], // 9 dot top
  [ _,   _,   QYd, QY,  QY,  QYd,  _,   _  ], // 10 dot
  [ _,   _,   _,   QYd, QYd,  _,   _,   _  ], // 11 dot bottom
];
