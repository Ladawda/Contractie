import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
  Sequence,
} from "remotion";
import { COLORS } from "../../shared/design-tokens";
import { bodyFont } from "../../shared/fonts";
import { EndCard, PhoneFrame, CounterAnimation } from "../../shared/components";

/* ------------------------------------------------------------------ */
/*  Scene 1 — Phone Notification  (frames 0-120)                      */
/* ------------------------------------------------------------------ */
const NotificationScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Notification slides down from top after phone enters
  const notifDelay = 20;
  const notifElapsed = Math.max(0, frame - notifDelay);

  const notifSlide = spring({
    frame: notifElapsed,
    fps,
    config: { damping: 14, stiffness: 120, mass: 0.7 },
  });

  const notifY = interpolate(notifSlide, [0, 1], [-120, 16]);
  const notifOpacity = interpolate(notifSlide, [0, 1], [0, 1]);

  // Subtle pulse glow on the notification
  const glowPulse = interpolate(
    frame,
    [40, 60, 80, 100, 120],
    [0, 0.4, 0, 0.4, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: "#111111",
        position: "relative",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {/* Status bar mock */}
      <div
        style={{
          position: "absolute",
          top: 56,
          left: 20,
          right: 20,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          zIndex: 10,
        }}
      >
        <span
          style={{
            fontFamily: bodyFont,
            fontSize: 14,
            fontWeight: 600,
            color: COLORS.white,
          }}
        >
          9:41
        </span>
        <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
          <div
            style={{
              width: 16,
              height: 10,
              border: `1.5px solid ${COLORS.white}`,
              borderRadius: 2,
              position: "relative",
            }}
          >
            <div
              style={{
                width: "70%",
                height: "100%",
                backgroundColor: COLORS.white,
                borderRadius: 1,
              }}
            />
          </div>
        </div>
      </div>

      {/* Lock screen time */}
      <div
        style={{
          marginTop: 140,
          textAlign: "center",
        }}
      >
        <div
          style={{
            fontFamily: bodyFont,
            fontSize: 72,
            fontWeight: 300,
            color: COLORS.white,
            letterSpacing: -2,
          }}
        >
          9:41
        </div>
        <div
          style={{
            fontFamily: bodyFont,
            fontSize: 20,
            fontWeight: 400,
            color: COLORS.gray400,
            marginTop: 4,
          }}
        >
          Monday, February 16
        </div>
      </div>

      {/* Notification banner */}
      <div
        style={{
          position: "absolute",
          top: notifY,
          left: 12,
          right: 12,
          transform: `translateY(${notifY < 0 ? 0 : 0}px)`,
          opacity: notifOpacity,
          zIndex: 30,
        }}
      >
        <div
          style={{
            background: "rgba(40, 40, 44, 0.85)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            borderRadius: 20,
            padding: "14px 16px",
            display: "flex",
            alignItems: "center",
            gap: 12,
            boxShadow: `
              0 8px 32px rgba(0, 0, 0, 0.4),
              0 0 ${20 + glowPulse * 30}px rgba(37, 99, 235, ${0.1 + glowPulse * 0.3})
            `,
            border: "1px solid rgba(255, 255, 255, 0.08)",
          }}
        >
          {/* App icon */}
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: 10,
              backgroundColor: COLORS.guildBlue,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <span
              style={{
                fontFamily: bodyFont,
                fontSize: 22,
                fontWeight: 800,
                color: COLORS.white,
              }}
            >
              G
            </span>
          </div>

          {/* Notification text */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
              flex: 1,
              minWidth: 0,
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span
                style={{
                  fontFamily: bodyFont,
                  fontSize: 15,
                  fontWeight: 700,
                  color: COLORS.white,
                }}
              >
                Guild
              </span>
              <span
                style={{
                  fontFamily: bodyFont,
                  fontSize: 13,
                  fontWeight: 400,
                  color: COLORS.gray400,
                }}
              >
                now
              </span>
            </div>
            <span
              style={{
                fontFamily: bodyFont,
                fontSize: 15,
                fontWeight: 600,
                color: COLORS.white,
                lineHeight: 1.3,
              }}
            >
              Your competitor just joined Guild
            </span>
            <span
              style={{
                fontFamily: bodyFont,
                fontSize: 14,
                fontWeight: 400,
                color: COLORS.gray400,
                lineHeight: 1.3,
              }}
            >
              Tap to see their profile
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ------------------------------------------------------------------ */
/*  Scene 2 — Competitor Profile  (frames 120-300)                     */
/* ------------------------------------------------------------------ */

interface ProfileStatProps {
  label: string;
  value: string;
  delay: number;
  icon?: string;
  highlight?: boolean;
}

const ProfileStat: React.FC<ProfileStatProps> = ({
  label,
  value,
  delay,
  icon,
  highlight = false,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const elapsed = Math.max(0, frame - delay);
  const prog = spring({
    frame: elapsed,
    fps,
    config: { damping: 14, stiffness: 100, mass: 0.6 },
  });

  const translateX = interpolate(prog, [0, 1], [40, 0]);
  const opacity = interpolate(prog, [0, 1], [0, 1]);

  return (
    <div
      style={{
        transform: `translateX(${translateX}px)`,
        opacity,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "10px 0",
        borderBottom: `1px solid ${COLORS.darkCardBorder}`,
      }}
    >
      <span
        style={{
          fontFamily: bodyFont,
          fontSize: 15,
          fontWeight: 500,
          color: COLORS.gray400,
        }}
      >
        {icon ? `${icon} ` : ""}
        {label}
      </span>
      <span
        style={{
          fontFamily: bodyFont,
          fontSize: 15,
          fontWeight: 700,
          color: highlight ? COLORS.guildTeal : COLORS.white,
        }}
      >
        {value}
      </span>
    </div>
  );
};

const CompetitorProfileScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Profile picture and name entrance
  const headerProg = spring({
    frame,
    fps,
    config: { damping: 12, stiffness: 100, mass: 0.7 },
  });
  const headerScale = interpolate(headerProg, [0, 1], [0.5, 1]);
  const headerOpacity = interpolate(headerProg, [0, 1], [0, 1]);

  // Badge entrance
  const badgeDelay = 90;
  const badgeElapsed = Math.max(0, frame - badgeDelay);
  const badgeProg = spring({
    frame: badgeElapsed,
    fps,
    config: { damping: 10, stiffness: 120, mass: 0.5 },
  });
  const badgeScale = interpolate(badgeProg, [0, 1], [0.3, 1]);
  const badgeOpacity = interpolate(badgeProg, [0, 1], [0, 1]);

  // Badge shimmer
  const shimmerX = interpolate(
    frame,
    [100, 160],
    [-100, 300],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: COLORS.darkBg,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "60px 20px 20px",
      }}
    >
      {/* App header bar */}
      <div
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: 24,
          opacity: headerOpacity,
        }}
      >
        <div
          style={{
            width: 28,
            height: 28,
            borderRadius: 6,
            backgroundColor: COLORS.guildBlue,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginRight: 8,
          }}
        >
          <span
            style={{
              fontFamily: bodyFont,
              fontSize: 14,
              fontWeight: 800,
              color: COLORS.white,
            }}
          >
            G
          </span>
        </div>
        <span
          style={{
            fontFamily: bodyFont,
            fontSize: 18,
            fontWeight: 700,
            color: COLORS.white,
          }}
        >
          Guild
        </span>
      </div>

      {/* Profile avatar */}
      <div
        style={{
          transform: `scale(${headerScale})`,
          opacity: headerOpacity,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div
          style={{
            width: 80,
            height: 80,
            borderRadius: 40,
            backgroundColor: COLORS.guildBlue,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 12,
            boxShadow: `0 4px 20px rgba(37, 99, 235, 0.3)`,
          }}
        >
          <span
            style={{
              fontFamily: bodyFont,
              fontSize: 32,
              fontWeight: 700,
              color: COLORS.white,
            }}
          >
            JM
          </span>
        </div>

        <span
          style={{
            fontFamily: bodyFont,
            fontSize: 20,
            fontWeight: 700,
            color: COLORS.white,
            textAlign: "center",
            lineHeight: 1.2,
          }}
        >
          Johnson & Sons Plumbing
        </span>

        <span
          style={{
            fontFamily: bodyFont,
            fontSize: 16,
            fontWeight: 500,
            color: COLORS.guildGold,
            marginTop: 6,
          }}
        >
          4.9 (127 reviews)
        </span>
      </div>

      {/* Stats list */}
      <div
        style={{
          width: "100%",
          marginTop: 20,
          backgroundColor: COLORS.darkCard,
          borderRadius: 16,
          padding: "4px 16px",
          border: `1px solid ${COLORS.darkCardBorder}`,
        }}
      >
        <ProfileStat label="Active Jobs" value="8" delay={20} icon="" highlight />
        <ProfileStat label="Response Time" value="< 2 hours" delay={35} icon="" />
        <ProfileStat label="Member Since" value="Jan 2025" delay={50} icon="" />
      </div>

      {/* Founding member badge */}
      <div
        style={{
          marginTop: 16,
          transform: `scale(${badgeScale})`,
          opacity: badgeOpacity,
          width: "100%",
          position: "relative",
          overflow: "hidden",
          borderRadius: 14,
        }}
      >
        <div
          style={{
            background: `linear-gradient(135deg, rgba(245, 158, 11, 0.15) 0%, rgba(245, 158, 11, 0.05) 100%)`,
            border: `1.5px solid ${COLORS.guildGold}`,
            borderRadius: 14,
            padding: "14px 16px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Shimmer effect */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: shimmerX,
              width: 60,
              height: "100%",
              background:
                "linear-gradient(90deg, transparent, rgba(245, 158, 11, 0.2), transparent)",
              transform: "skewX(-20deg)",
            }}
          />
          <span
            style={{
              fontFamily: bodyFont,
              fontSize: 15,
              fontWeight: 700,
              color: COLORS.guildGold,
              textAlign: "center",
              zIndex: 1,
            }}
          >
            Founding Member - $25/mo locked in
          </span>
        </div>
      </div>
    </div>
  );
};

/* ------------------------------------------------------------------ */
/*  Scene 3 — Earnings Comparison  (frames 300-450)                    */
/* ------------------------------------------------------------------ */

interface ComparisonRowProps {
  label: string;
  value: React.ReactNode;
  color: string;
  delay: number;
  isGood: boolean;
}

const ComparisonRow: React.FC<ComparisonRowProps> = ({
  label,
  value,
  color,
  delay,
  isGood,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const elapsed = Math.max(0, frame - delay);
  const prog = spring({
    frame: elapsed,
    fps,
    config: { damping: 12, stiffness: 100, mass: 0.6 },
  });

  const translateY = interpolate(prog, [0, 1], [30, 0]);
  const opacity = interpolate(prog, [0, 1], [0, 1]);

  // Glow for good items
  const glowIntensity = isGood
    ? interpolate(
        frame,
        [delay + 20, delay + 40, delay + 60, delay + 80],
        [0, 0.6, 0.3, 0.5],
        { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
      )
    : 0;

  return (
    <div
      style={{
        transform: `translateY(${translateY}px)`,
        opacity,
        padding: "14px 16px",
        borderRadius: 12,
        backgroundColor: isGood
          ? "rgba(13, 148, 136, 0.08)"
          : "rgba(239, 68, 68, 0.06)",
        border: `1px solid ${
          isGood
            ? `rgba(13, 148, 136, ${0.2 + glowIntensity * 0.3})`
            : "rgba(239, 68, 68, 0.15)"
        }`,
        marginBottom: 10,
        boxShadow: isGood
          ? `0 0 ${10 + glowIntensity * 20}px rgba(13, 148, 136, ${glowIntensity * 0.2})`
          : "none",
      }}
    >
      <div
        style={{
          fontFamily: bodyFont,
          fontSize: 13,
          fontWeight: 500,
          color: COLORS.gray400,
          marginBottom: 4,
        }}
      >
        {label}
      </div>
      <div
        style={{
          fontFamily: bodyFont,
          fontSize: 20,
          fontWeight: 700,
          color,
          lineHeight: 1.3,
        }}
      >
        {value}
      </div>
    </div>
  );
};

const EarningsComparisonScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Header entrance
  const headerProg = spring({
    frame,
    fps,
    config: { damping: 14, stiffness: 120, mass: 0.6 },
  });
  const headerOpacity = interpolate(headerProg, [0, 1], [0, 1]);
  const headerY = interpolate(headerProg, [0, 1], [20, 0]);

  // Bottom text
  const bottomDelay = 100;
  const bottomElapsed = Math.max(0, frame - bottomDelay);
  const bottomProg = spring({
    frame: bottomElapsed,
    fps,
    config: { damping: 14, stiffness: 80, mass: 0.8 },
  });
  const bottomOpacity = interpolate(bottomProg, [0, 1], [0, 1]);
  const bottomY = interpolate(bottomProg, [0, 1], [20, 0]);

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: COLORS.darkBg,
        display: "flex",
        flexDirection: "column",
        padding: "60px 16px 30px",
      }}
    >
      {/* VS Header */}
      <div
        style={{
          textAlign: "center",
          marginBottom: 24,
          opacity: headerOpacity,
          transform: `translateY(${headerY}px)`,
        }}
      >
        <span
          style={{
            fontFamily: bodyFont,
            fontSize: 22,
            fontWeight: 800,
            color: COLORS.white,
            letterSpacing: 1,
          }}
        >
          THEM vs. YOU
        </span>
      </div>

      {/* Comparison rows */}
      <ComparisonRow
        label="Their monthly jobs"
        value={
          <CounterAnimation
            from={0}
            to={12}
            startFrame={15}
            endFrame={55}
            fontSize={20}
            color={COLORS.guildTeal}
            fontWeight={700}
          />
        }
        color={COLORS.guildTeal}
        delay={10}
        isGood
      />

      <ComparisonRow
        label="Your monthly jobs"
        value="4"
        color={COLORS.gray400}
        delay={30}
        isGood={false}
      />

      <ComparisonRow
        label="They keep"
        value="100% of revenue"
        color={COLORS.guildTeal}
        delay={50}
        isGood
      />

      <ComparisonRow
        label="You keep"
        value="70% (after platform fees)"
        color={COLORS.destructive}
        delay={70}
        isGood={false}
      />

      {/* Bottom text */}
      <div
        style={{
          flex: 1,
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "center",
          paddingBottom: 20,
          opacity: bottomOpacity,
          transform: `translateY(${bottomY}px)`,
        }}
      >
        <span
          style={{
            fontFamily: bodyFont,
            fontSize: 17,
            fontWeight: 600,
            color: COLORS.gray400,
            textAlign: "center",
            fontStyle: "italic",
          }}
        >
          They found Guild before you did.
        </span>
      </div>
    </div>
  );
};

/* ------------------------------------------------------------------ */
/*  Scene 4 — CTA Urgency  (frames 450-510)                           */
/* ------------------------------------------------------------------ */

const CtaUrgencyScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Line 1 entrance
  const line1Prog = spring({
    frame,
    fps,
    config: { damping: 12, stiffness: 100, mass: 0.7 },
  });
  const line1Y = interpolate(line1Prog, [0, 1], [60, 0]);
  const line1Opacity = interpolate(line1Prog, [0, 1], [0, 1]);

  // Line 2 entrance (delayed)
  const line2Elapsed = Math.max(0, frame - 12);
  const line2Prog = spring({
    frame: line2Elapsed,
    fps,
    config: { damping: 12, stiffness: 100, mass: 0.7 },
  });
  const line2Y = interpolate(line2Prog, [0, 1], [60, 0]);
  const line2Opacity = interpolate(line2Prog, [0, 1], [0, 1]);

  // Pulsing orange glow
  const pulse = interpolate(
    frame,
    [0, 15, 30, 45, 60],
    [0.3, 0.7, 0.3, 0.7, 0.3],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  return (
    <AbsoluteFill
      style={{
        backgroundColor: COLORS.darkBg,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "0 60px",
      }}
    >
      {/* Subtle radial glow behind text */}
      <div
        style={{
          position: "absolute",
          width: 600,
          height: 600,
          borderRadius: "50%",
          background: `radial-gradient(circle, rgba(249, 115, 22, ${pulse * 0.12}) 0%, transparent 70%)`,
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          transform: `translateY(${line1Y}px)`,
          opacity: line1Opacity,
          textAlign: "center",
          marginBottom: 32,
        }}
      >
        <span
          style={{
            fontFamily: bodyFont,
            fontSize: 44,
            fontWeight: 800,
            color: COLORS.guildCoral,
            lineHeight: 1.2,
          }}
        >
          Don't let your competition get ahead
        </span>
      </div>

      <div
        style={{
          transform: `translateY(${line2Y}px)`,
          opacity: line2Opacity,
          textAlign: "center",
        }}
      >
        <span
          style={{
            fontFamily: bodyFont,
            fontSize: 30,
            fontWeight: 500,
            color: COLORS.gray400,
            lineHeight: 1.4,
          }}
        >
          Join Guild before they lock in your market
        </span>
      </div>
    </AbsoluteFill>
  );
};

/* ------------------------------------------------------------------ */
/*  Main Composition                                                    */
/* ------------------------------------------------------------------ */

const CompetitorSignedUp: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Phone frame entrance — used for scenes 1-3
  const phoneVisible = frame < 450;

  // Phone fade out at end of scene 3
  const phoneFadeOut = interpolate(frame, [430, 450], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Phone content transition: notification -> profile
  const scene1to2 = interpolate(frame, [115, 130], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Phone content transition: profile -> comparison
  const scene2to3 = interpolate(frame, [290, 310], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: COLORS.darkBg,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* Scenes 1-3: Inside Phone Frame */}
      {phoneVisible && (
        <div style={{ opacity: phoneFadeOut }}>
          <PhoneFrame startFrame={0} width={380} height={780}>
            {/* Scene 1: Notification (frames 0-120) */}
            {frame < 130 && (
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  opacity: scene1to2,
                }}
              >
                <NotificationScene />
              </div>
            )}

            {/* Scene 2: Competitor Profile (frames 120-300) */}
            {frame >= 115 && frame < 310 && (
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  opacity: frame < 130 ? 1 - scene1to2 : frame >= 290 ? scene2to3 : 1,
                }}
              >
                <Sequence from={120} layout="none">
                  <CompetitorProfileScene />
                </Sequence>
              </div>
            )}

            {/* Scene 3: Earnings Comparison (frames 300-450) */}
            {frame >= 290 && (
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  opacity: frame < 310 ? 1 - scene2to3 : 1,
                }}
              >
                <Sequence from={300} layout="none">
                  <EarningsComparisonScene />
                </Sequence>
              </div>
            )}
          </PhoneFrame>
        </div>
      )}

      {/* Scene 4: CTA Urgency (frames 450-510) */}
      <Sequence from={450} durationInFrames={60} layout="none">
        <CtaUrgencyScene />
      </Sequence>

      {/* Scene 5: End Card (frames 510-600) */}
      <Sequence from={510} layout="none">
        <EndCard ctaText="Your competitors won't wait. Will you?" />
      </Sequence>
    </AbsoluteFill>
  );
};

export default CompetitorSignedUp;
