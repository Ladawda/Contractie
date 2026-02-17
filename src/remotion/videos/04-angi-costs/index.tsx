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
import {
  EndCard,
  CounterAnimation,
  SplitScreen,
} from "../../shared/components";

/* ------------------------------------------------------------------ */
/*  Scene 1 — Hook (frames 0-90)                                      */
/* ------------------------------------------------------------------ */

const SceneHook: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Title fade + slide up
  const titleSpring = spring({
    frame,
    fps,
    config: { damping: 14, stiffness: 100, mass: 0.8 },
  });
  const titleY = interpolate(titleSpring, [0, 1], [60, 0]);
  const titleOpacity = interpolate(titleSpring, [0, 1], [0, 1]);

  // Subtitle fade in (delayed)
  const subSpring = spring({
    frame: Math.max(0, frame - 12),
    fps,
    config: { damping: 14, stiffness: 100, mass: 0.6 },
  });
  const subY = interpolate(subSpring, [0, 1], [40, 0]);
  const subOpacity = interpolate(subSpring, [0, 1], [0, 1]);

  return (
    <AbsoluteFill
      style={{
        backgroundColor: COLORS.darkBg,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: 60,
      }}
    >
      <div
        style={{
          transform: `translateY(${titleY}px)`,
          opacity: titleOpacity,
          textAlign: "center",
        }}
      >
        <span
          style={{
            fontFamily: bodyFont,
            fontSize: 72,
            fontWeight: 800,
            color: COLORS.white,
            lineHeight: 1.15,
          }}
        >
          What Angi{"\n"}Actually{"\n"}Costs You
        </span>
      </div>

      <div
        style={{
          marginTop: 48,
          transform: `translateY(${subY}px)`,
          opacity: subOpacity,
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
          Let's do the math
        </span>
      </div>
    </AbsoluteFill>
  );
};

/* ------------------------------------------------------------------ */
/*  Scene 2 — Calculator Breakdown (frames 90-360)                     */
/* ------------------------------------------------------------------ */

interface LineItemProps {
  label: string;
  amount: string;
  index: number;
}

const LINE_ITEMS: { label: string; amount: string; value: number }[] = [
  { label: "Lead Fees", amount: "$300/mo", value: 300 },
  { label: "Service Fees (15-20%)", amount: "$450/mo", value: 450 },
  { label: "Advertising Boost", amount: "$200/mo", value: 200 },
  { label: "Premium Listing", amount: "$100/mo", value: 100 },
];

const CalcLineItem: React.FC<LineItemProps> = ({ label, amount, index }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Stagger each item by 30 frames
  const delay = index * 30;
  const elapsed = Math.max(0, frame - delay);

  const slideSpring = spring({
    frame: elapsed,
    fps,
    config: { damping: 14, stiffness: 120, mass: 0.7 },
  });
  const x = interpolate(slideSpring, [0, 1], [400, 0]);
  const opacity = interpolate(slideSpring, [0, 1], [0, 1]);

  return (
    <div
      style={{
        transform: `translateX(${x}px)`,
        opacity,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
        paddingTop: 24,
        paddingBottom: 24,
        borderBottom: `1px solid ${COLORS.darkCardBorder}`,
      }}
    >
      <span
        style={{
          fontFamily: bodyFont,
          fontSize: 40,
          fontWeight: 500,
          color: COLORS.white,
        }}
      >
        {label}
      </span>
      <span
        style={{
          fontFamily: bodyFont,
          fontSize: 40,
          fontWeight: 700,
          color: COLORS.destructive,
          fontVariantNumeric: "tabular-nums",
        }}
      >
        {amount}
      </span>
    </div>
  );
};

const SceneCalculator: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Calculator card entrance
  const cardSpring = spring({
    frame,
    fps,
    config: { damping: 14, stiffness: 100, mass: 0.8 },
  });
  const cardScale = interpolate(cardSpring, [0, 1], [0.9, 1]);
  const cardOpacity = interpolate(cardSpring, [0, 1], [0, 1]);

  // Total line appears after all items (4 items * 30 frames = 120 frames delay + buffer)
  const totalDelay = 130;
  const totalSpring = spring({
    frame: Math.max(0, frame - totalDelay),
    fps,
    config: { damping: 12, stiffness: 100, mass: 0.8 },
  });
  const totalOpacity = interpolate(totalSpring, [0, 1], [0, 1]);
  const totalScale = interpolate(totalSpring, [0, 1], [0.8, 1]);

  // Glow pulse on the total
  const glowPulse = interpolate(
    frame,
    [totalDelay, totalDelay + 60, totalDelay + 120, totalDelay + 180],
    [0, 1, 0.5, 1],
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
        padding: 48,
      }}
    >
      {/* Calculator card */}
      <div
        style={{
          transform: `scale(${cardScale})`,
          opacity: cardOpacity,
          width: "100%",
          maxWidth: 920,
          backgroundColor: COLORS.darkCard,
          borderRadius: 24,
          border: `2px solid ${COLORS.darkCardBorder}`,
          padding: 48,
          paddingTop: 36,
          paddingBottom: 36,
        }}
      >
        {/* Header */}
        <div
          style={{
            textAlign: "center",
            marginBottom: 32,
            paddingBottom: 24,
            borderBottom: `2px solid ${COLORS.darkCardBorder}`,
          }}
        >
          <span
            style={{
              fontFamily: bodyFont,
              fontSize: 36,
              fontWeight: 600,
              color: COLORS.gray400,
              textTransform: "uppercase",
              letterSpacing: 3,
            }}
          >
            Monthly Cost Breakdown
          </span>
        </div>

        {/* Line items */}
        {LINE_ITEMS.map((item, i) => (
          <CalcLineItem key={item.label} label={item.label} amount={item.amount} index={i} />
        ))}

        {/* Total */}
        <div
          style={{
            opacity: totalOpacity,
            transform: `scale(${totalScale})`,
            marginTop: 40,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            paddingTop: 32,
            borderTop: `3px solid ${COLORS.destructive}40`,
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
            TOTAL
          </span>
          <div
            style={{
              textShadow: `0 0 ${20 + glowPulse * 30}px ${COLORS.destructive}80, 0 0 ${40 + glowPulse * 40}px ${COLORS.destructive}40`,
            }}
          >
            <CounterAnimation
              from={0}
              to={1050}
              startFrame={totalDelay}
              endFrame={totalDelay + 45}
              prefix="$"
              suffix="/mo"
              fontSize={64}
              color={COLORS.destructive}
              fontFamily={bodyFont}
              fontWeight={800}
            />
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

/* ------------------------------------------------------------------ */
/*  Scene 3 — Annual Impact (frames 360-480)                           */
/* ------------------------------------------------------------------ */

const SceneAnnualImpact: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // "That's..." text
  const thatsSpring = spring({
    frame,
    fps,
    config: { damping: 14, stiffness: 100, mass: 0.6 },
  });
  const thatsOpacity = interpolate(thatsSpring, [0, 1], [0, 1]);
  const thatsY = interpolate(thatsSpring, [0, 1], [30, 0]);

  // Big number entrance (delayed)
  const numberDelay = 15;
  const numberSpring = spring({
    frame: Math.max(0, frame - numberDelay),
    fps,
    config: { damping: 12, stiffness: 80, mass: 1 },
  });
  const numberScale = interpolate(numberSpring, [0, 1], [0.5, 1]);
  const numberOpacity = interpolate(numberSpring, [0, 1], [0, 1]);

  // Glow pulse
  const glowPulse = interpolate(
    frame,
    [numberDelay + 30, numberDelay + 60, numberDelay + 90],
    [0.5, 1, 0.7],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // Subtitle text (delayed further)
  const subDelay = 50;
  const subSpring = spring({
    frame: Math.max(0, frame - subDelay),
    fps,
    config: { damping: 14, stiffness: 100, mass: 0.6 },
  });
  const subOpacity = interpolate(subSpring, [0, 1], [0, 1]);
  const subY = interpolate(subSpring, [0, 1], [30, 0]);

  return (
    <AbsoluteFill
      style={{
        backgroundColor: COLORS.darkBg,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: 60,
      }}
    >
      {/* "That's..." */}
      <div
        style={{
          opacity: thatsOpacity,
          transform: `translateY(${thatsY}px)`,
          marginBottom: 24,
        }}
      >
        <span
          style={{
            fontFamily: bodyFont,
            fontSize: 48,
            fontWeight: 500,
            color: COLORS.gray400,
          }}
        >
          That's...
        </span>
      </div>

      {/* Big counter */}
      <div
        style={{
          opacity: numberOpacity,
          transform: `scale(${numberScale})`,
          textShadow: `0 0 ${30 + glowPulse * 40}px ${COLORS.destructive}80, 0 0 ${60 + glowPulse * 60}px ${COLORS.destructive}40`,
        }}
      >
        <CounterAnimation
          from={0}
          to={12600}
          startFrame={numberDelay}
          endFrame={numberDelay + 50}
          prefix="$"
          suffix="/year"
          fontSize={110}
          color={COLORS.destructive}
          fontFamily={bodyFont}
          fontWeight={900}
        />
      </div>

      {/* Subtitle */}
      <div
        style={{
          opacity: subOpacity,
          transform: `translateY(${subY}px)`,
          marginTop: 40,
          textAlign: "center",
          maxWidth: 800,
        }}
      >
        <span
          style={{
            fontFamily: bodyFont,
            fontSize: 40,
            fontWeight: 500,
            color: COLORS.gray400,
            lineHeight: 1.5,
          }}
        >
          ...gone. Before you even{"\n"}pick up a tool.
        </span>
      </div>
    </AbsoluteFill>
  );
};

/* ------------------------------------------------------------------ */
/*  Scene 4 — Split Screen Comparison (frames 480-660)                 */
/* ------------------------------------------------------------------ */

const AngiPanel: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const items = ["Lead fees", "Service fees", "Ad costs", "Premium listing"];

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 28,
        width: "100%",
      }}
    >
      {/* Price */}
      <span
        style={{
          fontFamily: bodyFont,
          fontSize: 56,
          fontWeight: 800,
          color: COLORS.destructive,
          fontVariantNumeric: "tabular-nums",
        }}
      >
        $1,050/mo
      </span>

      {/* Item list */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 14,
          width: "100%",
          marginTop: 8,
        }}
      >
        {items.map((item, i) => {
          const itemSpring = spring({
            frame: Math.max(0, frame - 15 - i * 6),
            fps,
            config: { damping: 14, stiffness: 120, mass: 0.5 },
          });
          const itemOpacity = interpolate(itemSpring, [0, 1], [0, 1]);
          const itemX = interpolate(itemSpring, [0, 1], [-20, 0]);

          return (
            <div
              key={item}
              style={{
                opacity: itemOpacity,
                transform: `translateX(${itemX}px)`,
                display: "flex",
                alignItems: "center",
                gap: 10,
              }}
            >
              <span
                style={{
                  fontFamily: bodyFont,
                  fontSize: 28,
                  color: COLORS.destructive,
                  fontWeight: 600,
                }}
              >
                x
              </span>
              <span
                style={{
                  fontFamily: bodyFont,
                  fontSize: 28,
                  fontWeight: 500,
                  color: COLORS.gray400,
                }}
              >
                {item}
              </span>
            </div>
          );
        })}
      </div>

      {/* You keep */}
      <div
        style={{
          marginTop: 20,
          paddingTop: 20,
          borderTop: `1px solid ${COLORS.destructive}30`,
          width: "100%",
          textAlign: "center",
        }}
      >
        <span
          style={{
            fontFamily: bodyFont,
            fontSize: 30,
            fontWeight: 600,
            color: COLORS.destructive,
          }}
        >
          You keep: ~70%
        </span>
      </div>
    </div>
  );
};

const GuildPanel: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const items = ["No lead fees", "No commissions", "No hidden costs"];

  // Subtle glow pulse
  const glowPulse = Math.sin(frame * 0.08) * 0.5 + 0.5;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 28,
        width: "100%",
      }}
    >
      {/* Price with glow */}
      <div
        style={{
          textShadow: `0 0 ${15 + glowPulse * 20}px ${COLORS.guildTeal}60, 0 0 ${30 + glowPulse * 30}px ${COLORS.guildTeal}30`,
        }}
      >
        <span
          style={{
            fontFamily: bodyFont,
            fontSize: 56,
            fontWeight: 800,
            color: COLORS.guildTeal,
            fontVariantNumeric: "tabular-nums",
          }}
        >
          $25/mo
        </span>
      </div>

      {/* Item list */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 14,
          width: "100%",
          marginTop: 8,
        }}
      >
        {items.map((item, i) => {
          const itemSpring = spring({
            frame: Math.max(0, frame - 15 - i * 6),
            fps,
            config: { damping: 14, stiffness: 120, mass: 0.5 },
          });
          const itemOpacity = interpolate(itemSpring, [0, 1], [0, 1]);
          const itemX = interpolate(itemSpring, [0, 1], [20, 0]);

          return (
            <div
              key={item}
              style={{
                opacity: itemOpacity,
                transform: `translateX(${itemX}px)`,
                display: "flex",
                alignItems: "center",
                gap: 10,
              }}
            >
              <span
                style={{
                  fontFamily: bodyFont,
                  fontSize: 28,
                  color: COLORS.guildTeal,
                  fontWeight: 700,
                }}
              >
                {"\u2713"}
              </span>
              <span
                style={{
                  fontFamily: bodyFont,
                  fontSize: 28,
                  fontWeight: 500,
                  color: COLORS.white,
                }}
              >
                {item}
              </span>
            </div>
          );
        })}
      </div>

      {/* You keep */}
      <div
        style={{
          marginTop: 20,
          paddingTop: 20,
          borderTop: `1px solid ${COLORS.guildTeal}40`,
          width: "100%",
          textAlign: "center",
        }}
      >
        <span
          style={{
            fontFamily: bodyFont,
            fontSize: 30,
            fontWeight: 700,
            color: COLORS.guildTeal,
          }}
        >
          You keep: 100%
        </span>
      </div>
    </div>
  );
};

const SceneSplitComparison: React.FC = () => {
  return (
    <SplitScreen
      leftContent={<AngiPanel />}
      rightContent={<GuildPanel />}
      leftColor="#1a0a0a"
      rightColor="#0a1a1a"
      leftLabel="ANGI"
      rightLabel="GUILD"
      startFrame={0}
      showDivider={true}
    />
  );
};

/* ------------------------------------------------------------------ */
/*  Scene 5 — Savings Reveal + End Card (frames 660-750)               */
/* ------------------------------------------------------------------ */

const SceneSavings: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Savings text appears first
  const savingsSpring = spring({
    frame,
    fps,
    config: { damping: 12, stiffness: 100, mass: 0.8 },
  });
  const savingsScale = interpolate(savingsSpring, [0, 1], [0.6, 1]);
  const savingsOpacity = interpolate(savingsSpring, [0, 1], [0, 1]);

  // Gold glow pulse
  const glowPulse = Math.sin(frame * 0.1) * 0.5 + 0.5;

  // Fade to EndCard after ~30 frames (1 second)
  const endCardOpacity = interpolate(frame, [25, 35], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const savingsFadeOut = interpolate(frame, [25, 35], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.darkBg }}>
      {/* Savings text */}
      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          opacity: savingsFadeOut,
          padding: 60,
        }}
      >
        <div
          style={{
            opacity: savingsOpacity,
            transform: `scale(${savingsScale})`,
            textAlign: "center",
            textShadow: `0 0 ${20 + glowPulse * 30}px ${COLORS.guildGold}60, 0 0 ${40 + glowPulse * 40}px ${COLORS.guildGold}30`,
          }}
        >
          <span
            style={{
              fontFamily: bodyFont,
              fontSize: 88,
              fontWeight: 900,
              color: COLORS.guildGold,
              lineHeight: 1.2,
            }}
          >
            Save $12,300/year
          </span>
        </div>
      </AbsoluteFill>

      {/* EndCard fades in */}
      <AbsoluteFill style={{ opacity: endCardOpacity }}>
        <EndCard ctaText="Save $12,300/year -- First 100 get $25/mo forever" />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

/* ------------------------------------------------------------------ */
/*  Main Composition                                                    */
/* ------------------------------------------------------------------ */

const AngiCosts: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.darkBg }}>
      {/* Scene 1: Hook (0-3s) */}
      <Sequence from={0} durationInFrames={90}>
        <SceneHook />
      </Sequence>

      {/* Scene 2: Calculator Breakdown (3-12s) */}
      <Sequence from={90} durationInFrames={270}>
        <SceneCalculator />
      </Sequence>

      {/* Scene 3: Annual Impact (12-16s) */}
      <Sequence from={360} durationInFrames={120}>
        <SceneAnnualImpact />
      </Sequence>

      {/* Scene 4: Split Screen Comparison (16-22s) */}
      <Sequence from={480} durationInFrames={180}>
        <SceneSplitComparison />
      </Sequence>

      {/* Scene 5: Savings + End Card (22-25s) */}
      <Sequence from={660} durationInFrames={90}>
        <SceneSavings />
      </Sequence>
    </AbsoluteFill>
  );
};

export default AngiCosts;
