import React from "react";
import {
  AbsoluteFill,
  Img,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { COLORS, GUILD_LOGO_URL, GUILD_URL } from "../design-tokens";
import { bodyFont, pixelFont } from "../fonts";

interface EndCardProps {
  /** Call-to-action text displayed below the URL */
  ctaText?: string;
  /** Use RPG pixel font for the CTA text */
  rpgStyle?: boolean;
}

export const EndCard: React.FC<EndCardProps> = ({
  ctaText = "First 100 contractors: $25/mo forever",
  rpgStyle = false,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Spring animation for logo entrance
  const logoScale = spring({
    frame,
    fps,
    config: { damping: 12, stiffness: 120, mass: 0.8 },
  });

  const logoOpacity = interpolate(frame, [0, 8], [0, 1], {
    extrapolateRight: "clamp",
  });

  // Spring animation for URL text — slightly delayed
  const urlProgress = spring({
    frame: Math.max(0, frame - 6),
    fps,
    config: { damping: 14, stiffness: 100, mass: 0.6 },
  });

  const urlY = interpolate(urlProgress, [0, 1], [30, 0]);
  const urlOpacity = interpolate(urlProgress, [0, 1], [0, 1]);

  // Spring animation for CTA text — further delayed
  const ctaProgress = spring({
    frame: Math.max(0, frame - 14),
    fps,
    config: { damping: 14, stiffness: 100, mass: 0.6 },
  });

  const ctaY = interpolate(ctaProgress, [0, 1], [40, 0]);
  const ctaOpacity = interpolate(ctaProgress, [0, 1], [0, 1]);

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(180deg, ${COLORS.guildBlueDark} 0%, ${COLORS.rpgDarkBg} 100%)`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* Logo */}
      <div
        style={{
          transform: `scale(${logoScale})`,
          opacity: logoOpacity,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Img
          src={GUILD_LOGO_URL}
          style={{
            width: 320,
            height: 320,
            objectFit: "contain",
          }}
        />
      </div>

      {/* URL */}
      <div
        style={{
          marginTop: 48,
          transform: `translateY(${urlY}px)`,
          opacity: urlOpacity,
        }}
      >
        <span
          style={{
            fontFamily: bodyFont,
            fontSize: 48,
            fontWeight: 600,
            color: COLORS.white,
            letterSpacing: 2,
          }}
        >
          {GUILD_URL}
        </span>
      </div>

      {/* CTA */}
      {ctaText && (
        <div
          style={{
            marginTop: 40,
            transform: `translateY(${ctaY}px)`,
            opacity: ctaOpacity,
            paddingLeft: 60,
            paddingRight: 60,
            textAlign: "center",
          }}
        >
          <span
            style={{
              fontFamily: rpgStyle ? pixelFont : bodyFont,
              fontSize: rpgStyle ? 24 : 32,
              fontWeight: rpgStyle ? 400 : 500,
              color: COLORS.guildGold,
              lineHeight: rpgStyle ? 1.8 : 1.5,
            }}
          >
            {ctaText}
          </span>
        </div>
      )}
    </AbsoluteFill>
  );
};
