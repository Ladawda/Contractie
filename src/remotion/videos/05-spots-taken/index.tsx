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
import { EndCard, CounterAnimation } from "../../shared/components";

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

interface NotificationData {
  name: string;
  location: string;
}

const NOTIFICATIONS: NotificationData[] = [
  { name: "Mike S.", location: "Austin, TX" },
  { name: "Sarah K.", location: "Denver, CO" },
  { name: "James R.", location: "Miami, FL" },
  { name: "David L.", location: "Seattle, WA" },
  { name: "Chris P.", location: "Phoenix, AZ" },
];

// Approximate US city positions (normalized 0-1, then scaled to map area)
interface CityDot {
  x: number; // 0-1 horizontal
  y: number; // 0-1 vertical
  label: string;
  delay: number; // frames delay for stagger
}

const CITY_DOTS: CityDot[] = [
  { x: 0.18, y: 0.35, label: "Seattle", delay: 0 },
  { x: 0.12, y: 0.55, label: "San Francisco", delay: 2 },
  { x: 0.15, y: 0.65, label: "Los Angeles", delay: 4 },
  { x: 0.22, y: 0.72, label: "Phoenix", delay: 6 },
  { x: 0.35, y: 0.38, label: "Denver", delay: 8 },
  { x: 0.35, y: 0.62, label: "Dallas", delay: 10 },
  { x: 0.38, y: 0.52, label: "Kansas City", delay: 12 },
  { x: 0.42, y: 0.72, label: "Houston", delay: 14 },
  { x: 0.42, y: 0.55, label: "Oklahoma City", delay: 16 },
  { x: 0.50, y: 0.42, label: "Chicago", delay: 18 },
  { x: 0.52, y: 0.48, label: "Indianapolis", delay: 20 },
  { x: 0.50, y: 0.68, label: "Nashville", delay: 22 },
  { x: 0.55, y: 0.72, label: "Atlanta", delay: 24 },
  { x: 0.60, y: 0.82, label: "Miami", delay: 26 },
  { x: 0.55, y: 0.58, label: "Charlotte", delay: 28 },
  { x: 0.62, y: 0.45, label: "Pittsburgh", delay: 30 },
  { x: 0.68, y: 0.38, label: "New York", delay: 32 },
  { x: 0.65, y: 0.42, label: "Philadelphia", delay: 34 },
  { x: 0.72, y: 0.32, label: "Boston", delay: 36 },
  { x: 0.60, y: 0.52, label: "Washington DC", delay: 38 },
  { x: 0.48, y: 0.35, label: "Detroit", delay: 40 },
  { x: 0.45, y: 0.30, label: "Minneapolis", delay: 42 },
  { x: 0.30, y: 0.50, label: "Albuquerque", delay: 44 },
];

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

/** Circular progress ring using SVG */
const ProgressRing: React.FC<{
  progress: number; // 0-1
  size: number;
  strokeWidth: number;
  color: string;
  trackColor: string;
}> = ({ progress, size, strokeWidth, color, trackColor }) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference * (1 - progress);

  return (
    <svg
      width={size}
      height={size}
      style={{ transform: "rotate(-90deg)" }}
    >
      {/* Track */}
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke={trackColor}
        strokeWidth={strokeWidth}
      />
      {/* Progress */}
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeDasharray={circumference}
        strokeDashoffset={strokeDashoffset}
        strokeLinecap="round"
      />
    </svg>
  );
};

/** A single notification card */
const NotificationCard: React.FC<{
  data: NotificationData;
  slideProgress: number; // 0-1 from spring
  stackIndex: number; // 0 = newest (bottom), higher = older (pushed up)
  fadeOut: number; // 0-1, 1 = fully visible
}> = ({ data, slideProgress, stackIndex, fadeOut }) => {
  const translateX = interpolate(slideProgress, [0, 1], [600, 0]);
  const opacity = interpolate(slideProgress, [0, 0.5], [0, 1], {
    extrapolateRight: "clamp",
  }) * fadeOut;

  // Older notifications are slightly smaller and more transparent
  const scale = interpolate(stackIndex, [0, 4], [1, 0.88], {
    extrapolateRight: "clamp",
  });
  const stackOpacity = interpolate(stackIndex, [0, 4], [1, 0.4], {
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        transform: `translateX(${translateX}px) scale(${scale})`,
        opacity: opacity * stackOpacity,
        backgroundColor: COLORS.darkCard,
        border: `1px solid ${COLORS.darkCardBorder}`,
        borderRadius: 16,
        padding: "20px 28px",
        marginBottom: 14,
        display: "flex",
        alignItems: "center",
        gap: 16,
        width: 820,
        boxShadow: "0 4px 24px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.04)",
      }}
    >
      {/* Bell icon */}
      <span style={{ fontSize: 36, flexShrink: 0 }}>🔔</span>

      {/* Text */}
      <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
        <span
          style={{
            fontFamily: bodyFont,
            fontSize: 32,
            fontWeight: 600,
            color: COLORS.white,
            lineHeight: 1.3,
          }}
        >
          {data.name} just joined
        </span>
        <span
          style={{
            fontFamily: bodyFont,
            fontSize: 26,
            fontWeight: 400,
            color: COLORS.gray400,
            lineHeight: 1.3,
          }}
        >
          from {data.location}
        </span>
      </div>

      {/* Timestamp */}
      <span
        style={{
          fontFamily: bodyFont,
          fontSize: 22,
          fontWeight: 400,
          color: COLORS.gray600,
          marginLeft: "auto",
          flexShrink: 0,
        }}
      >
        just now
      </span>
    </div>
  );
};

// ---------------------------------------------------------------------------
// Main Composition
// ---------------------------------------------------------------------------

const SpotsTaken: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // =========================================================================
  // SCENE 1: Counter (frames 0-180)
  // =========================================================================

  // Progress ring animation
  const ringProgress = interpolate(frame, [10, 150], [0, 0.73], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Counter section entrance
  const counterEntrance = spring({
    frame,
    fps,
    config: { damping: 14, stiffness: 80, mass: 0.8 },
  });

  const counterScale = interpolate(counterEntrance, [0, 1], [0.5, 1]);
  const counterOpacity = interpolate(counterEntrance, [0, 1], [0, 1]);

  // Subtitle entrance
  const subtitleEntrance = spring({
    frame: Math.max(0, frame - 20),
    fps,
    config: { damping: 14, stiffness: 100, mass: 0.6 },
  });
  const subtitleY = interpolate(subtitleEntrance, [0, 1], [40, 0]);
  const subtitleOpacity = interpolate(subtitleEntrance, [0, 1], [0, 1]);

  // Scene 1 fade out
  const scene1FadeOut = frame > 160
    ? interpolate(frame, [160, 180], [1, 0], { extrapolateRight: "clamp" })
    : 1;

  // =========================================================================
  // SCENE 2: Notification Avalanche (frames 180-360)
  // =========================================================================

  const notificationStartFrame = 180;
  const notificationInterval = 30; // 1 second apart

  // Each notification slides in with a spring
  const notificationProgress = NOTIFICATIONS.map((_, i) =>
    spring({
      frame: Math.max(0, frame - (notificationStartFrame + i * notificationInterval)),
      fps,
      config: { damping: 14, stiffness: 100, mass: 0.7 },
    })
  );

  // Scene 2 overall fade
  const scene2Opacity = interpolate(
    frame,
    [notificationStartFrame, notificationStartFrame + 10, 345, 360],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // Background counter for scene 2 (73 -> 78)
  const bgCounterValue = interpolate(
    frame,
    [notificationStartFrame, notificationStartFrame + NOTIFICATIONS.length * notificationInterval],
    [73, 78],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // =========================================================================
  // SCENE 3: Map Visualization (frames 360-480)
  // =========================================================================

  const mapStartFrame = 360;
  const mapEntrance = spring({
    frame: Math.max(0, frame - mapStartFrame),
    fps,
    config: { damping: 14, stiffness: 80, mass: 0.8 },
  });
  const mapOpacity = interpolate(mapEntrance, [0, 1], [0, 1]);
  const mapScale = interpolate(mapEntrance, [0, 1], [0.9, 1]);

  // Map text entrance
  const mapTextEntrance = spring({
    frame: Math.max(0, frame - (mapStartFrame + 30)),
    fps,
    config: { damping: 14, stiffness: 100, mass: 0.6 },
  });
  const mapTextOpacity = interpolate(mapTextEntrance, [0, 1], [0, 1]);
  const mapTextY = interpolate(mapTextEntrance, [0, 1], [30, 0]);

  // Scene 3 fade out
  const scene3FadeOut = frame > 460
    ? interpolate(frame, [460, 480], [1, 0], { extrapolateRight: "clamp" })
    : 1;

  // =========================================================================
  // SCENE 4: Urgency Close (frames 480-510)
  // =========================================================================

  const urgencyStartFrame = 480;
  const urgencyEntrance = spring({
    frame: Math.max(0, frame - urgencyStartFrame),
    fps,
    config: { damping: 12, stiffness: 120, mass: 0.6 },
  });
  const urgencyOpacity = interpolate(urgencyEntrance, [0, 1], [0, 1]);
  const urgencyScale = interpolate(urgencyEntrance, [0, 1], [0.8, 1]);

  // Pulsing urgency text
  const urgencyPulse = interpolate(
    Math.sin((frame - urgencyStartFrame) * 0.2),
    [-1, 1],
    [0.85, 1]
  );

  // "Only 22 spots left" entrance
  const spotsLeftEntrance = spring({
    frame: Math.max(0, frame - (urgencyStartFrame + 8)),
    fps,
    config: { damping: 14, stiffness: 100, mass: 0.6 },
  });
  const spotsLeftY = interpolate(spotsLeftEntrance, [0, 1], [40, 0]);
  const spotsLeftOpacity = interpolate(spotsLeftEntrance, [0, 1], [0, 1]);

  // Lock-in price entrance
  const priceEntrance = spring({
    frame: Math.max(0, frame - (urgencyStartFrame + 16)),
    fps,
    config: { damping: 14, stiffness: 100, mass: 0.6 },
  });
  const priceY = interpolate(priceEntrance, [0, 1], [40, 0]);
  const priceOpacity = interpolate(priceEntrance, [0, 1], [0, 1]);

  // Scene 4 fade out
  const scene4FadeOut = frame > 500
    ? interpolate(frame, [500, 510], [1, 0], { extrapolateRight: "clamp" })
    : 1;

  // =========================================================================
  // Background particles (subtle floating dots)
  // =========================================================================
  const bgParticles = Array.from({ length: 30 }).map((_, i) => {
    const speed = 0.2 + (i % 5) * 0.1;
    const baseX = (i * 173) % 1080;
    const baseY = ((i * 311 + frame * speed) % 2200) - 200;
    const drift = Math.sin(frame * 0.015 + i * 1.2) * 15;
    const pOpacity = interpolate(
      Math.sin(frame * 0.03 + i * 0.8),
      [-1, 1],
      [0.03, 0.1]
    );
    return {
      x: baseX + drift,
      y: baseY,
      opacity: pOpacity,
      size: 2 + (i % 3),
    };
  });

  // =========================================================================
  // Scene visibility flags
  // =========================================================================
  const showScene1 = frame < 180;
  const showScene2 = frame >= 180 && frame < 360;
  const showScene3 = frame >= 360 && frame < 480;
  const showScene4 = frame >= 480 && frame < 510;
  const showEndCard = frame >= 510;

  // =========================================================================
  // Render
  // =========================================================================
  return (
    <AbsoluteFill
      style={{
        backgroundColor: COLORS.darkBg,
        overflow: "hidden",
      }}
    >
      {/* Background floating particles */}
      {!showEndCard &&
        bgParticles.map((p, i) => (
          <div
            key={`bg-${i}`}
            style={{
              position: "absolute",
              left: p.x,
              top: p.y,
              width: p.size,
              height: p.size,
              borderRadius: "50%",
              backgroundColor: COLORS.guildBlue,
              opacity: p.opacity,
              pointerEvents: "none",
            }}
          />
        ))}

      {/* Subtle radial gradient overlay */}
      {!showEndCard && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: `radial-gradient(ellipse at 50% 40%, ${COLORS.guildBlueDark}15 0%, transparent 60%)`,
            pointerEvents: "none",
          }}
        />
      )}

      {/* ================================================================= */}
      {/* SCENE 1: Counter with Progress Ring (frames 0-180) */}
      {/* ================================================================= */}
      {showScene1 && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            opacity: scene1FadeOut,
          }}
        >
          {/* Progress Ring + Counter container */}
          <div
            style={{
              position: "relative",
              width: 420,
              height: 420,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transform: `scale(${counterScale})`,
              opacity: counterOpacity,
            }}
          >
            {/* SVG progress ring */}
            <div style={{ position: "absolute", top: 0, left: 0 }}>
              <ProgressRing
                progress={ringProgress}
                size={420}
                strokeWidth={12}
                color={COLORS.guildBlue}
                trackColor={`${COLORS.gray800}`}
              />
            </div>

            {/* Glow behind ring */}
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: 420,
                height: 420,
                borderRadius: "50%",
                boxShadow: `0 0 60px ${COLORS.guildBlue}30, 0 0 120px ${COLORS.guildBlue}15`,
                pointerEvents: "none",
              }}
            />

            {/* Counter number */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                zIndex: 2,
              }}
            >
              <CounterAnimation
                from={0}
                to={73}
                startFrame={5}
                endFrame={150}
                prefix=""
                suffix=""
                fontSize={140}
                color={COLORS.white}
                fontFamily={bodyFont}
                fontWeight={800}
              />
            </div>
          </div>

          {/* "of 100 founding spots taken" */}
          <div
            style={{
              marginTop: 30,
              opacity: subtitleOpacity,
              transform: `translateY(${subtitleY}px)`,
              textAlign: "center",
            }}
          >
            <span
              style={{
                fontFamily: bodyFont,
                fontSize: 42,
                fontWeight: 500,
                color: COLORS.gray400,
                lineHeight: 1.4,
              }}
            >
              of{" "}
              <span style={{ color: COLORS.white, fontWeight: 700 }}>100</span>{" "}
              founding spots taken
            </span>
          </div>

          {/* Percentage label */}
          <div
            style={{
              marginTop: 20,
              opacity: interpolate(frame, [60, 80], [0, 1], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              }),
            }}
          >
            <span
              style={{
                fontFamily: bodyFont,
                fontSize: 36,
                fontWeight: 700,
                color: COLORS.guildBlue,
              }}
            >
              73% full
            </span>
          </div>
        </div>
      )}

      {/* ================================================================= */}
      {/* SCENE 2: Notification Avalanche (frames 180-360) */}
      {/* ================================================================= */}
      {showScene2 && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            opacity: scene2Opacity,
          }}
        >
          {/* Background counter (large, faded) */}
          <div
            style={{
              position: "absolute",
              top: 140,
              left: 0,
              right: 0,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <span
              style={{
                fontFamily: bodyFont,
                fontSize: 100,
                fontWeight: 800,
                color: COLORS.white,
                opacity: 0.12,
                fontVariantNumeric: "tabular-nums",
              }}
            >
              {Math.floor(bgCounterValue)}
              <span style={{ fontSize: 50, fontWeight: 500 }}> / 100</span>
            </span>
          </div>

          {/* Notification stack */}
          <div
            style={{
              position: "absolute",
              top: 360,
              left: 0,
              right: 0,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              padding: "0 40px",
            }}
          >
            {NOTIFICATIONS.map((notif, i) => {
              // Only show if we've reached its start frame
              const isVisible = frame >= notificationStartFrame + i * notificationInterval;
              if (!isVisible) return null;

              // How many notifications are after this one that are visible
              const visibleAfter = NOTIFICATIONS.slice(i + 1).filter(
                (_, j) => frame >= notificationStartFrame + (i + 1 + j) * notificationInterval
              ).length;

              return (
                <NotificationCard
                  key={notif.name}
                  data={notif}
                  slideProgress={notificationProgress[i]}
                  stackIndex={visibleAfter}
                  fadeOut={1}
                />
              );
            })}
          </div>

          {/* Live indicator */}
          <div
            style={{
              position: "absolute",
              top: 280,
              left: 0,
              right: 0,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: 12,
            }}
          >
            {/* Pulsing red dot */}
            <div
              style={{
                width: 14,
                height: 14,
                borderRadius: "50%",
                backgroundColor: "#EF4444",
                boxShadow: `0 0 ${interpolate(
                  Math.sin(frame * 0.15),
                  [-1, 1],
                  [4, 16]
                )}px #EF4444`,
              }}
            />
            <span
              style={{
                fontFamily: bodyFont,
                fontSize: 28,
                fontWeight: 600,
                color: COLORS.gray400,
                letterSpacing: 2,
                textTransform: "uppercase",
              }}
            >
              Live Activity
            </span>
          </div>
        </div>
      )}

      {/* ================================================================= */}
      {/* SCENE 3: Map Visualization (frames 360-480) */}
      {/* ================================================================= */}
      {showScene3 && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            opacity: mapOpacity * scene3FadeOut,
            transform: `scale(${mapScale})`,
          }}
        >
          {/* Map container */}
          <div
            style={{
              position: "relative",
              width: 900,
              height: 600,
              marginTop: -80,
            }}
          >
            {/* Faint US outline border (simplified rectangle with rounded shape) */}
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                border: `1px solid ${COLORS.gray800}`,
                borderRadius: 24,
                opacity: 0.3,
              }}
            />

            {/* City dots */}
            {CITY_DOTS.map((city, i) => {
              const dotFrame = frame - mapStartFrame - city.delay;
              const dotAppear = dotFrame > 0 ? Math.min(dotFrame / 8, 1) : 0;
              const dotPulse = interpolate(
                Math.sin((frame - mapStartFrame) * 0.08 + i * 0.5),
                [-1, 1],
                [0.5, 1]
              );

              return (
                <div
                  key={city.label}
                  style={{
                    position: "absolute",
                    left: city.x * 900 - 8,
                    top: city.y * 600 - 8,
                    width: 16,
                    height: 16,
                    borderRadius: "50%",
                    backgroundColor: COLORS.guildBlue,
                    opacity: dotAppear * dotPulse,
                    transform: `scale(${dotAppear})`,
                    boxShadow: `0 0 ${12 * dotPulse}px ${COLORS.guildBlue}80, 0 0 ${24 * dotPulse}px ${COLORS.guildBlue}40`,
                    transition: "none",
                  }}
                >
                  {/* Inner bright core */}
                  <div
                    style={{
                      position: "absolute",
                      top: 3,
                      left: 3,
                      width: 10,
                      height: 10,
                      borderRadius: "50%",
                      backgroundColor: COLORS.guildBlueLight,
                      opacity: 0.8,
                    }}
                  />
                </div>
              );
            })}

            {/* Connection lines (subtle) */}
            <svg
              width={900}
              height={600}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                pointerEvents: "none",
              }}
            >
              {CITY_DOTS.slice(0, -1).map((city, i) => {
                const nextCity = CITY_DOTS[i + 1];
                const lineFrame = frame - mapStartFrame - Math.max(city.delay, nextCity.delay);
                const lineOpacity = lineFrame > 0 ? Math.min(lineFrame / 15, 0.08) : 0;

                return (
                  <line
                    key={`line-${i}`}
                    x1={city.x * 900}
                    y1={city.y * 600}
                    x2={nextCity.x * 900}
                    y2={nextCity.y * 600}
                    stroke={COLORS.guildBlue}
                    strokeWidth={1}
                    opacity={lineOpacity}
                  />
                );
              })}
            </svg>
          </div>

          {/* Text overlay: "Contractors across 23 states" */}
          <div
            style={{
              marginTop: 60,
              opacity: mapTextOpacity,
              transform: `translateY(${mapTextY}px)`,
              textAlign: "center",
            }}
          >
            <div
              style={{
                fontFamily: bodyFont,
                fontSize: 56,
                fontWeight: 700,
                color: COLORS.white,
                lineHeight: 1.3,
              }}
            >
              Contractors across
            </div>
            <div
              style={{
                fontFamily: bodyFont,
                fontSize: 72,
                fontWeight: 800,
                color: COLORS.guildBlue,
                lineHeight: 1.3,
                marginTop: 8,
              }}
            >
              23 states
            </div>
          </div>

          {/* Member count badge */}
          <div
            style={{
              marginTop: 40,
              opacity: mapTextOpacity,
              display: "flex",
              alignItems: "center",
              gap: 12,
              backgroundColor: `${COLORS.guildBlue}18`,
              border: `1px solid ${COLORS.guildBlue}40`,
              borderRadius: 100,
              padding: "14px 32px",
            }}
          >
            <div
              style={{
                width: 10,
                height: 10,
                borderRadius: "50%",
                backgroundColor: COLORS.guildTeal,
                boxShadow: `0 0 8px ${COLORS.guildTeal}`,
              }}
            />
            <span
              style={{
                fontFamily: bodyFont,
                fontSize: 30,
                fontWeight: 600,
                color: COLORS.white,
              }}
            >
              78 members and growing
            </span>
          </div>
        </div>
      )}

      {/* ================================================================= */}
      {/* SCENE 4: Urgency Close (frames 480-510) */}
      {/* ================================================================= */}
      {showScene4 && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            opacity: urgencyOpacity * scene4FadeOut,
            transform: `scale(${urgencyScale})`,
          }}
        >
          {/* Counter: "78 of 100" */}
          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              gap: 16,
              marginBottom: 40,
            }}
          >
            <span
              style={{
                fontFamily: bodyFont,
                fontSize: 140,
                fontWeight: 800,
                color: COLORS.white,
                fontVariantNumeric: "tabular-nums",
              }}
            >
              78
            </span>
            <span
              style={{
                fontFamily: bodyFont,
                fontSize: 52,
                fontWeight: 500,
                color: COLORS.gray600,
              }}
            >
              of 100
            </span>
          </div>

          {/* "Only 22 spots left" */}
          <div
            style={{
              opacity: spotsLeftOpacity,
              transform: `translateY(${spotsLeftY}px) scale(${urgencyPulse})`,
              marginBottom: 30,
            }}
          >
            <span
              style={{
                fontFamily: bodyFont,
                fontSize: 64,
                fontWeight: 800,
                color: COLORS.guildCoral,
                textShadow: `0 0 30px ${COLORS.guildCoral}50`,
              }}
            >
              Only 22 spots left
            </span>
          </div>

          {/* "Lock in $25/mo forever" */}
          <div
            style={{
              opacity: priceOpacity,
              transform: `translateY(${priceY}px)`,
            }}
          >
            <div
              style={{
                backgroundColor: `${COLORS.guildBlue}18`,
                border: `2px solid ${COLORS.guildBlue}50`,
                borderRadius: 16,
                padding: "20px 48px",
              }}
            >
              <span
                style={{
                  fontFamily: bodyFont,
                  fontSize: 44,
                  fontWeight: 700,
                  color: COLORS.white,
                }}
              >
                Lock in{" "}
                <span style={{ color: COLORS.guildGold }}>$25/mo</span>{" "}
                forever
              </span>
            </div>
          </div>
        </div>
      )}

      {/* ================================================================= */}
      {/* SCENE 5: End Card (frames 510-600) */}
      {/* ================================================================= */}
      {showEndCard && (
        <Sequence from={510} layout="none">
          <EndCard ctaText="Only 22 spots left — $25/mo forever" />
        </Sequence>
      )}

      {/* Vignette overlay */}
      {!showEndCard && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background:
              "radial-gradient(ellipse at center, transparent 55%, rgba(0,0,0,0.5) 100%)",
            pointerEvents: "none",
            zIndex: 50,
          }}
        />
      )}
    </AbsoluteFill>
  );
};

export default SpotsTaken;
