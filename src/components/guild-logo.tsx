const LOGO_URL =
  "https://tdhxydzsguacwuwtledk.supabase.co/storage/v1/object/public/Logo/logo.svg";

type GuildLogoProps = {
  /** Height in pixels — width scales proportionally */
  height?: number;
  className?: string;
};

export function GuildLogo({ height = 32, className }: GuildLogoProps) {
  return (
    <img
      src={LOGO_URL}
      alt="Guild"
      height={height}
      style={{ height, width: "auto" }}
      className={className}
      draggable={false}
    />
  );
}

/** Raw URL for use in emails or other non-React contexts */
export const GUILD_LOGO_URL = LOGO_URL;
