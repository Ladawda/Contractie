// Guild brand colors — extracted from src/app/globals.css
export const COLORS = {
  // Guild Brand
  guildBlue: "#2563EB",
  guildBlueDark: "#1D4ED8",
  guildBlueLight: "#3B82F6",
  guildBlueSoft: "#DBEAFE",
  guildBlueWash: "#EFF6FF",
  guildTeal: "#0D9488",
  guildTealLight: "#14B8A6",
  guildTealSoft: "#CCFBF1",
  guildCoral: "#F97316",
  guildCoralLight: "#FB923C",
  guildCoralSoft: "#FFF7ED",
  guildGold: "#F59E0B",
  guildGoldLight: "#FBBF24",
  guildPurple: "#8B5CF6",

  // RPG Theme
  rpgDarkBg: "#1a1a2e",
  rpgMidBg: "#16213e",
  rpgLightBg: "#0f3460",
  rpgGreen: "#00ff41",
  rpgRed: "#ff0040",
  rpgYellow: "#ffd700",
  rpgWhite: "#e0e0e0",
  rpgBorder: "#c0a040",
  rpgBorderDark: "#806020",

  // Motion Graphics Theme
  darkBg: "#0a0a0a",
  darkCard: "#1a1a1a",
  darkCardBorder: "#2a2a2a",

  // Neutrals
  white: "#FFFFFF",
  snow: "#FAFAFA",
  pearl: "#F5F5F7",
  silver: "#E8E8ED",
  gray400: "#AEAEB2",
  gray500: "#8E8E93",
  gray600: "#636366",
  gray700: "#48484A",
  gray800: "#3A3A3C",
  gray900: "#1C1C1E",
  ink: "#000000",
  destructive: "#EF4444",
} as const;

export const DIMENSIONS = {
  width: 1080,
  height: 1920,
} as const;

export const TIMING = {
  fps: 30,
  endCardDuration: 90, // 3 seconds
} as const;

// Guild branding
export const GUILD_LOGO_URL =
  "https://tdhxydzsguacwuwtledk.supabase.co/storage/v1/object/public/Logo/logo.svg";
export const GUILD_URL = "joinguild.app";
