const LOGO_URL =
  "https://tdhxydzsguacwuwtledk.supabase.co/storage/v1/object/public/Logo/logo.svg";

type GuildLogoProps = {
  /** Height in pixels — width scales proportionally */
  height?: number;
  className?: string;
};

export function GuildLogo({ height = 32, className }: GuildLogoProps) {
  // Approximate aspect ratio of the Guild logo SVG (~3.5:1)
  const width = Math.round(height * 3.5);
  return (
    <img
      src={LOGO_URL}
      alt="Guild"
      width={width}
      height={height}
      style={{ height, width: "auto" }}
      className={className}
      draggable={false}
    />
  );
}

/** Raw URL for use in emails or other non-React contexts */
export const GUILD_LOGO_URL = LOGO_URL;
