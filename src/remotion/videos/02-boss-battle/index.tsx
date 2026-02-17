import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
  Sequence,
} from "remotion";
import { COLORS, TIMING } from "../../shared/design-tokens";
import { pixelFont, terminalFont } from "../../shared/fonts";
import { BoxShadowSprite } from "../../shared/pixel-art/PixelCanvas";
import { PLUMBER_SPRITE } from "../../shared/pixel-art/sprites";
import {
  BOSS_SPRITE,
  BOSS_HURT_SPRITE,
} from "../../shared/pixel-art/boss-sprites";
import { COIN_SPRITE } from "../../shared/pixel-art/ui-elements";
import {
  EndCard,
  HPBar,
  RPGDialogBox,
  TypewriterText,
  BattleMenu,
  ScreenShake,
  FlashTransition,
} from "../../shared/components";

// ─── Frame constants ───────────────────────────────────────────────────────────
const FPS = TIMING.fps; // 30
const SCENE_1_START = 0;
const SCENE_1_END = 150; // 0-5s
const SCENE_2_START = 150;
const SCENE_2_END = 360; // 5-12s
const SCENE_3_START = 360;
const SCENE_3_END = 600; // 12-20s
const SCENE_4_START = 600;
const SCENE_4_END = 810; // 20-27s
const SCENE_5_START = 810;
const SCENE_5_END = 900; // 27-30s

// ─── RPG Background ────────────────────────────────────────────────────────────
const RPGBackground: React.FC = () => {
  const frame = useCurrentFrame();
  // Subtle breathing pulse on the background
  const pulse = Math.sin(frame * 0.03) * 0.02;
  return (
    <AbsoluteFill
      style={{
        background: `radial-gradient(ellipse at 50% 30%, ${COLORS.rpgMidBg} 0%, ${COLORS.rpgDarkBg} 70%, #0d0d1a 100%)`,
        opacity: 1 + pulse,
      }}
    />
  );
};

// ─── Scanline overlay for CRT feel ─────────────────────────────────────────────
const Scanlines: React.FC = () => (
  <AbsoluteFill
    style={{
      background:
        "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.08) 3px, rgba(0,0,0,0.08) 4px)",
      pointerEvents: "none",
      zIndex: 90,
    }}
  />
);

// ─── Floating coins (Scene 4 victory celebration) ───────────────────────────────
const CoinRain: React.FC<{ startFrame: number }> = ({ startFrame }) => {
  const frame = useCurrentFrame();
  const elapsed = frame - startFrame;
  if (elapsed < 0) return null;

  const coins = Array.from({ length: 18 }, (_, i) => {
    const x = 60 + ((i * 137 + 53) % 960); // pseudo-random x
    const delay = (i * 3) % 20; // staggered
    const speed = 3 + (i % 4) * 1.5;
    const t = Math.max(0, elapsed - delay);
    const y = -80 + t * speed;
    const rotation = t * (4 + (i % 5));
    const opacity = interpolate(t, [0, 10, 80, 120], [0, 1, 1, 0.3], {
      extrapolateRight: "clamp",
      extrapolateLeft: "clamp",
    });
    const scale = 0.8 + (i % 3) * 0.3;

    if (y > 2000) return null;

    return (
      <div
        key={i}
        style={{
          position: "absolute",
          left: x,
          top: y,
          transform: `rotate(${rotation}deg) scale(${scale})`,
          opacity,
        }}
      >
        <BoxShadowSprite sprite={COIN_SPRITE} pixelSize={6} />
      </div>
    );
  });

  return <>{coins}</>;
};

// ─── "BOSS BATTLE" flash text ───────────────────────────────────────────────────
const BossBattleTitle: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const scaleSpring = spring({
    frame: Math.max(0, frame - 30),
    fps,
    config: { damping: 8, stiffness: 200, mass: 0.5 },
  });

  const opacity = interpolate(frame, [30, 45, 120, 150], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Flicker effect
  const flicker =
    frame > 30 && frame < 60 ? (Math.floor(frame / 3) % 2 === 0 ? 1 : 0.7) : 1;

  return (
    <div
      style={{
        position: "absolute",
        top: 300,
        left: 0,
        right: 0,
        display: "flex",
        justifyContent: "center",
        opacity: opacity * flicker,
        transform: `scale(${scaleSpring * 1.2})`,
        zIndex: 20,
      }}
    >
      <span
        style={{
          fontFamily: pixelFont,
          fontSize: 80,
          color: COLORS.rpgRed,
          textShadow: `0 0 20px ${COLORS.rpgRed}, 0 0 40px ${COLORS.rpgRed}80, 0 4px 0 #660020`,
          letterSpacing: 6,
        }}
      >
        BOSS BATTLE
      </span>
    </div>
  );
};

// ─── "VICTORY!" text ────────────────────────────────────────────────────────────
const VictoryText: React.FC<{ startFrame: number }> = ({ startFrame }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const elapsed = Math.max(0, frame - startFrame);

  const scaleSpring = spring({
    frame: elapsed,
    fps,
    config: { damping: 8, stiffness: 160, mass: 0.6 },
  });

  const opacity = interpolate(elapsed, [0, 8], [0, 1], {
    extrapolateRight: "clamp",
  });

  // Gold shimmer
  const shimmer = Math.sin(elapsed * 0.2) * 10;

  if (frame < startFrame) return null;

  return (
    <div
      style={{
        position: "absolute",
        top: 400,
        left: 0,
        right: 0,
        display: "flex",
        justifyContent: "center",
        opacity,
        transform: `scale(${scaleSpring * 1.3})`,
        zIndex: 30,
      }}
    >
      <span
        style={{
          fontFamily: pixelFont,
          fontSize: 96,
          color: COLORS.rpgYellow,
          textShadow: `0 0 ${20 + shimmer}px ${COLORS.rpgYellow}, 0 0 40px ${COLORS.rpgYellow}60, 0 4px 0 #997700`,
          letterSpacing: 8,
        }}
      >
        VICTORY!
      </span>
    </div>
  );
};

// ─── Boss Sprite Wrapper (handles entrance, hurt, death) ────────────────────────
const BossCharacter: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Entrance spring: scale from 0 to 1 (frames 20-60)
  const entranceScale = spring({
    frame: Math.max(0, frame - 20),
    fps,
    config: { damping: 10, stiffness: 100, mass: 0.8 },
  });

  // Idle bob
  const bob = Math.sin(frame * 0.08) * 8;

  // Determine which sprite to show
  const isHurt = frame >= SCENE_4_START;
  const sprite = isHurt ? BOSS_HURT_SPRITE : BOSS_SPRITE;

  // Death: flicker and fade out (frames 600-720)
  let deathOpacity = 1;
  let deathFlicker = 1;
  if (frame >= SCENE_4_START && frame < 720) {
    deathFlicker = Math.floor(frame / 4) % 2 === 0 ? 1 : 0.3;
    deathOpacity = interpolate(frame, [SCENE_4_START, 720], [1, 0], {
      extrapolateRight: "clamp",
    });
  } else if (frame >= 720) {
    deathOpacity = 0;
  }

  // Hit shake during scene 3 (boss getting hit)
  const bossShakeX =
    frame >= 420 && frame < 500
      ? Math.sin(frame * 25) * interpolate(frame, [420, 500], [12, 0], { extrapolateRight: "clamp" })
      : 0;

  if (frame < 20) return null;

  return (
    <div
      style={{
        position: "absolute",
        top: 200 + bob,
        left: "50%",
        transform: `translateX(-50%) scale(${entranceScale}) translateX(${bossShakeX}px)`,
        opacity: deathOpacity * deathFlicker,
        zIndex: 10,
      }}
    >
      <BoxShadowSprite sprite={sprite} pixelSize={10} />
    </div>
  );
};

// ─── Player Character ───────────────────────────────────────────────────────────
const PlayerCharacter: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrance = spring({
    frame: Math.max(0, frame - 60),
    fps,
    config: { damping: 12, stiffness: 120, mass: 0.7 },
  });

  // Player bob
  const bob = Math.sin(frame * 0.1 + 1) * 4;

  // Hit recoil when taking damage (frames 180, 270)
  let recoilX = 0;
  if (frame >= 180 && frame < 195) {
    recoilX = interpolate(frame, [180, 185, 195], [-20, -20, 0], {
      extrapolateRight: "clamp",
      extrapolateLeft: "clamp",
    });
  }
  if (frame >= 270 && frame < 285) {
    recoilX = interpolate(frame, [270, 275, 285], [-20, -20, 0], {
      extrapolateRight: "clamp",
      extrapolateLeft: "clamp",
    });
  }

  // Power-up glow in scene 3
  const glowIntensity =
    frame >= 400 && frame < 560
      ? interpolate(frame, [400, 430, 530, 560], [0, 30, 30, 10], {
          extrapolateRight: "clamp",
          extrapolateLeft: "clamp",
        })
      : 0;

  return (
    <div
      style={{
        position: "absolute",
        bottom: 440 + bob,
        left: "50%",
        transform: `translateX(-50%) scale(${entrance}) translateX(${recoilX}px)`,
        opacity: entrance,
        zIndex: 10,
        filter: glowIntensity > 0 ? `drop-shadow(0 0 ${glowIntensity}px ${COLORS.guildBlue})` : undefined,
      }}
    >
      <BoxShadowSprite sprite={PLUMBER_SPRITE} pixelSize={10} />
    </div>
  );
};

// ─── Damage Number Popup ────────────────────────────────────────────────────────
const DamageNumber: React.FC<{
  text: string;
  startFrame: number;
  x: number;
  y: number;
  color?: string;
}> = ({ text, startFrame, x, y, color = COLORS.rpgRed }) => {
  const frame = useCurrentFrame();
  const elapsed = frame - startFrame;
  if (elapsed < 0 || elapsed > 45) return null;

  const floatY = interpolate(elapsed, [0, 45], [0, -80], {
    extrapolateRight: "clamp",
  });
  const opacity = interpolate(elapsed, [0, 5, 30, 45], [0, 1, 1, 0], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
  });
  const scale = interpolate(elapsed, [0, 8, 15], [0.5, 1.3, 1], {
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y + floatY,
        opacity,
        transform: `scale(${scale})`,
        zIndex: 25,
      }}
    >
      <span
        style={{
          fontFamily: pixelFont,
          fontSize: 42,
          color,
          textShadow: `0 2px 0 #000, 0 0 10px ${color}80`,
        }}
      >
        {text}
      </span>
    </div>
  );
};

// ─── "You discovered GUILD!" announcement ───────────────────────────────────────
const GuildDiscovery: React.FC<{ startFrame: number }> = ({ startFrame }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const elapsed = Math.max(0, frame - startFrame);

  const scaleSpring = spring({
    frame: elapsed,
    fps,
    config: { damping: 10, stiffness: 140, mass: 0.5 },
  });

  const opacity = interpolate(elapsed, [0, 5, 80, 100], [0, 1, 1, 0], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
  });

  if (frame < startFrame || elapsed > 100) return null;

  return (
    <div
      style={{
        position: "absolute",
        top: 750,
        left: 0,
        right: 0,
        display: "flex",
        justifyContent: "center",
        opacity,
        transform: `scale(${scaleSpring})`,
        zIndex: 30,
      }}
    >
      <div
        style={{
          padding: "20px 50px",
          border: `4px solid ${COLORS.guildBlue}`,
          backgroundColor: "rgba(37, 99, 235, 0.2)",
          borderRadius: 4,
        }}
      >
        <span
          style={{
            fontFamily: pixelFont,
            fontSize: 36,
            color: COLORS.white,
            textShadow: `0 0 20px ${COLORS.guildBlue}`,
          }}
        >
          You discovered{" "}
          <span style={{ color: COLORS.guildBlue }}>GUILD</span>!
        </span>
      </div>
    </div>
  );
};

// ─── Main Component ─────────────────────────────────────────────────────────────
const BossBattle: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // ── Boss HP calculation ──
  // Boss starts at 100%, stays there through scenes 1-2, drains in scene 3-4
  const bossMax = 10000;
  let bossHPDisplay = bossMax;

  if (frame >= 450 && frame < 600) {
    // Boss drains during guild counterattack
    bossHPDisplay = interpolate(frame, [450, 600], [bossMax, 0], {
      extrapolateRight: "clamp",
      extrapolateLeft: "clamp",
    });
  } else if (frame >= 600) {
    bossHPDisplay = 0;
  }

  // ── Player HP calculation ──
  // Player starts 100%, drains with attacks, refills with Guild
  const playerMax = 10000;
  let playerHP = playerMax;

  if (frame >= 180 && frame < 220) {
    // First hit: LEAD FEE -$500 per lead -> drops to ~70%
    playerHP = interpolate(frame, [180, 220], [playerMax, playerMax * 0.7], {
      extrapolateRight: "clamp",
      extrapolateLeft: "clamp",
    });
  } else if (frame >= 220 && frame < 270) {
    playerHP = playerMax * 0.7;
  } else if (frame >= 270 && frame < 320) {
    // Second hit: SERVICE FEE -> drops to ~20%
    playerHP = interpolate(frame, [270, 320], [playerMax * 0.7, playerMax * 0.2], {
      extrapolateRight: "clamp",
      extrapolateLeft: "clamp",
    });
  } else if (frame >= 320 && frame < 420) {
    playerHP = playerMax * 0.2;
  } else if (frame >= 420 && frame < 480) {
    // Guild power-up: HP refills rapidly
    playerHP = interpolate(frame, [420, 480], [playerMax * 0.2, playerMax], {
      extrapolateRight: "clamp",
      extrapolateLeft: "clamp",
    });
  } else if (frame >= 480) {
    playerHP = playerMax;
  }

  // ── BattleMenu selected index ──
  // Starts at 0 (FIGHT), cursor moves to 1 (GUILD) at frame 370
  const menuSelectedIndex = frame < 380 ? 0 : 1;

  // ── Which attack shake to apply ──
  const shakeFrame1 = 180; // Lead fee hit
  const shakeFrame2 = 270; // Service fee hit

  return (
    <AbsoluteFill>
      <RPGBackground />

      {/* Screen shake wraps combat content */}
      <ScreenShake startFrame={shakeFrame1} duration={15} intensity={14}>
        <ScreenShake startFrame={shakeFrame2} duration={15} intensity={14}>
          <ScreenShake startFrame={420} duration={20} intensity={16}>
            <AbsoluteFill>
              {/* ── SCENE 1: Boss Introduction (0-150) ── */}
              <Sequence from={SCENE_1_START} durationInFrames={SCENE_1_END}>
                <BossBattleTitle />
              </Sequence>

              {/* Boss character persists through scenes 1-4 */}
              <Sequence from={0} durationInFrames={SCENE_5_START}>
                <BossCharacter />
              </Sequence>

              {/* Player character persists through scenes 1-4 */}
              <Sequence from={0} durationInFrames={SCENE_5_START}>
                <PlayerCharacter />
              </Sequence>

              {/* ── HP Bars ── */}
              {/* Boss HP Bar — visible from frame 80 onward through scene 4 */}
              {frame >= 80 && frame < SCENE_5_START && (
                <div
                  style={{
                    position: "absolute",
                    top: 100,
                    left: "50%",
                    transform: "translateX(-50%)",
                    opacity: interpolate(
                      frame,
                      [80, 100],
                      [0, 1],
                      { extrapolateRight: "clamp", extrapolateLeft: "clamp" }
                    ),
                    zIndex: 15,
                  }}
                >
                  <HPBar
                    current={bossHPDisplay}
                    max={bossMax}
                    label="THE MIDDLEMAN"
                    color={COLORS.rpgRed}
                    width={800}
                    height={36}
                  />
                </div>
              )}

              {/* Player HP Bar — visible from frame 100 onward through scene 4 */}
              {frame >= 100 && frame < SCENE_5_START && (
                <div
                  style={{
                    position: "absolute",
                    top: 190,
                    left: "50%",
                    transform: "translateX(-50%)",
                    opacity: interpolate(
                      frame,
                      [100, 120],
                      [0, 1],
                      { extrapolateRight: "clamp", extrapolateLeft: "clamp" }
                    ),
                    zIndex: 15,
                  }}
                >
                  <HPBar
                    current={playerHP}
                    max={playerMax}
                    label="YOUR PROFIT"
                    width={800}
                    height={36}
                  />
                </div>
              )}

              {/* ── SCENE 2: The Middleman Attacks (150-360) ── */}

              {/* Damage number: Lead Fee */}
              <DamageNumber
                text="-$500"
                startFrame={185}
                x={420}
                y={1200}
              />

              {/* Dialog: Lead Fee attack */}
              <Sequence from={190} durationInFrames={70}>
                <RPGDialogBox
                  startFrame={0}
                  position="bottom"
                  speakerName="BATTLE"
                >
                  <TypewriterText
                    text="The Middleman uses LEAD FEE! -$500 per lead!"
                    startFrame={4}
                    fontSize={28}
                    charsPerFrame={0.8}
                  />
                </RPGDialogBox>
              </Sequence>

              {/* Damage number: Service Fee */}
              <DamageNumber
                text="-30%"
                startFrame={275}
                x={460}
                y={1200}
              />

              {/* Dialog: Service Fee attack */}
              <Sequence from={275} durationInFrames={70}>
                <RPGDialogBox
                  startFrame={0}
                  position="bottom"
                  speakerName="BATTLE"
                >
                  <TypewriterText
                    text="The Middleman uses SERVICE FEE! -30% of revenue!"
                    startFrame={4}
                    fontSize={28}
                    charsPerFrame={0.8}
                  />
                </RPGDialogBox>
              </Sequence>

              {/* Battle Menu appears at frame 330 */}
              {frame >= 330 && frame < 400 && (
                <BattleMenu
                  options={["FIGHT", "GUILD", "ITEM", "RUN"]}
                  selectedIndex={menuSelectedIndex}
                  startFrame={330}
                />
              )}

              {/* ── SCENE 3: Guild Power-Up (360-600) ── */}

              {/* "You discovered GUILD!" text */}
              <GuildDiscovery startFrame={400} />

              {/* Dialog: Guild stats */}
              <Sequence from={480} durationInFrames={110}>
                <RPGDialogBox
                  startFrame={0}
                  position="bottom"
                  speakerName="GUILD"
                >
                  <TypewriterText
                    text="$0 lead fees. $0 commissions. $25/mo flat."
                    startFrame={4}
                    fontSize={30}
                    color={COLORS.rpgGreen}
                    charsPerFrame={0.7}
                  />
                </RPGDialogBox>
              </Sequence>

              {/* Damage numbers on boss */}
              <DamageNumber
                text="-9999"
                startFrame={460}
                x={400}
                y={350}
                color={COLORS.guildBlue}
              />
              <DamageNumber
                text="CRITICAL!"
                startFrame={500}
                x={350}
                y={300}
                color={COLORS.rpgYellow}
              />

              {/* ── SCENE 4: Victory (600-810) ── */}

              {/* Victory text */}
              <VictoryText startFrame={640} />

              {/* Victory dialog */}
              <Sequence from={670} durationInFrames={130}>
                <RPGDialogBox
                  startFrame={0}
                  position="bottom"
                  speakerName="SYSTEM"
                >
                  <TypewriterText
                    text="You defeated The Middleman! Loot: Your Full Profit"
                    startFrame={4}
                    fontSize={28}
                    color={COLORS.rpgYellow}
                    charsPerFrame={0.6}
                  />
                </RPGDialogBox>
              </Sequence>

              {/* Coin rain */}
              <CoinRain startFrame={650} />

              {/* ── Flash Transitions ── */}
              {/* Flash when selecting GUILD */}
              <FlashTransition frame={395} duration={12} />

              {/* Flash on boss defeat */}
              <FlashTransition frame={625} duration={14} />

              {/* Flash before end card */}
              <FlashTransition frame={SCENE_5_START} duration={10} />
            </AbsoluteFill>
          </ScreenShake>
        </ScreenShake>
      </ScreenShake>

      {/* ── SCENE 5: End Card (810-900) ── */}
      <Sequence from={SCENE_5_START} durationInFrames={SCENE_5_END - SCENE_5_START}>
        <EndCard rpgStyle={true} ctaText="First 100 contractors: $25/mo forever" />
      </Sequence>

      {/* Scanline overlay on top of everything */}
      <Scanlines />
    </AbsoluteFill>
  );
};

export default BossBattle;
