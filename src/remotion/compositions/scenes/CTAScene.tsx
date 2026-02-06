import React from "react";
import {
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
  Img,
  Easing,
} from "remotion";
import { TextAnimation } from "../../library/components/text/TextAnimation";
import { Glow } from "../../library/components/effects/Glow";
import { ShapeAnimation } from "../../library/components/effects/ShapeAnimation";
import { Particles } from "../../library/components/effects/Particles";
import { loadFont } from "@remotion/google-fonts/Inter";

const { fontFamily: interFont } = loadFont("normal", {
  weights: ["400", "600", "700", "800", "900"],
  subsets: ["latin"],
});

const PH_CAT_ICON =
  "https://api.iconify.design/simple-icons/producthunt.svg?color=%23DA552F&width=48";
const ROCKET_ICON =
  "https://api.iconify.design/ph/rocket-launch-fill.svg?color=%23FFC367&width=48";

export const CTAScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Product Hunt badge entrance
  const badgeScale = spring({
    frame,
    fps,
    config: { damping: 10, stiffness: 80 },
    delay: 5,
  });
  const badgeOpacity = interpolate(frame, [5, 15], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Main CTA text
  const ctaY = interpolate(frame, [20, 35], [40, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  // Button pulse
  const buttonScale = spring({
    frame,
    fps,
    config: { damping: 8, stiffness: 60 },
    delay: 50,
  });
  const buttonOpacity = interpolate(frame, [50, 60], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Subtle button pulse
  const pulseCycle = Math.sin(frame * 0.06) * 0.02 + 1;

  // URL text
  const urlOpacity = interpolate(frame, [65, 75], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Rocket icon bouncing
  const rocketY = interpolate(frame, [40, 50], [30, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.back(2)),
  });
  const rocketOpacity = interpolate(frame, [40, 50], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const rocketRotate = Math.sin(frame * 0.04) * 5;

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        fontFamily: interFont,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* Celebration particles */}
      {frame > 45 && (
        <Particles
          type="confetti"
          count={40}
          speed={0.6}
          colors={["#FFC367", "#F4900C", "#FF6B35", "#FFE4B5", "#DA552F"]}
          gravity={0.3}
          seed="ph-launch"
          size={[4, 10]}
        />
      )}

      {/* Decorative shapes */}
      <div style={{ position: "absolute", top: 100, left: 120 }}>
        <ShapeAnimation
          shape="ring"
          size={60}
          color="rgba(255,195,103,0.15)"
          animation="rotate"
          speed={0.3}
        />
      </div>
      <div style={{ position: "absolute", bottom: 120, right: 150 }}>
        <ShapeAnimation
          shape="hexagon"
          size={50}
          color="rgba(244,144,12,0.1)"
          animation="breathe"
          speed={0.5}
        />
      </div>
      <div style={{ position: "absolute", top: 200, right: 200 }}>
        <ShapeAnimation
          shape="diamond"
          size={35}
          color="rgba(255,195,103,0.12)"
          animation="pulse"
          speed={0.4}
        />
      </div>

      {/* Product Hunt badge */}
      <div
        style={{
          opacity: badgeOpacity,
          transform: `scale(${badgeScale})`,
          display: "flex",
          alignItems: "center",
          gap: 12,
          padding: "12px 28px",
          borderRadius: 50,
          background: "rgba(218,85,47,0.12)",
          border: "1px solid rgba(218,85,47,0.3)",
          marginBottom: 36,
        }}
      >
        <Img src={PH_CAT_ICON} style={{ width: 28, height: 28 }} />
        <span
          style={{
            fontSize: 16,
            fontWeight: 700,
            color: "#DA552F",
            letterSpacing: 1,
          }}
        >
          LIVE ON PRODUCT HUNT
        </span>
      </div>

      {/* Rocket icon */}
      <div
        style={{
          opacity: rocketOpacity,
          transform: `translateY(${rocketY}px) rotate(${rocketRotate}deg)`,
          marginBottom: 20,
        }}
      >
        <Glow color="#FFC367" intensity={25} pulsate pulseDuration={2}>
          <Img src={ROCKET_ICON} style={{ width: 56, height: 56 }} />
        </Glow>
      </div>

      {/* Main CTA headline */}
      <div style={{ transform: `translateY(${ctaY}px)` }}>
        <TextAnimation
          className="text-[68px] font-black text-white text-center leading-tight"
          style={{ fontFamily: interFont, maxWidth: 800, textWrap: "balance" }}
          startFrom={8}
          createTimeline={({ textRef, tl, SplitText }) => {
            const split = new SplitText(textRef.current, {
              type: "words",
              wordsClass: "word",
            });
            tl.fromTo(
              split.words,
              { opacity: 0, y: 50, scale: 0.9 },
              {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 0.6,
                stagger: 0.08,
                ease: "back.out(1.3)",
              },
            );
            return tl;
          }}
          perspective={600}
        >
          Support us on <span style={{ color: "#DA552F" }}>Product Hunt</span>
        </TextAnimation>
      </div>

      {/* Sub-CTA */}
      <TextAnimation
        className="text-[22px] font-medium text-center"
        style={{
          fontFamily: interFont,
          color: "rgba(255,255,255,0.5)",
          marginTop: 20,
          maxWidth: 500,
        }}
        startFrom={20}
        createTimeline={({ textRef, tl }) => {
          tl.fromTo(
            textRef.current,
            { opacity: 0, y: 15 },
            { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
          );
          return tl;
        }}
      >
        Your upvote means the world to us
      </TextAnimation>

      {/* CTA Button */}
      <div
        style={{
          marginTop: 44,
          opacity: buttonOpacity,
          transform: `scale(${buttonScale * pulseCycle})`,
        }}
      >
        <Glow
          color="#F4900C"
          intensity={30}
          pulsate
          pulseDuration={2.5}
          layers={2}
        >
          <div
            style={{
              padding: "18px 52px",
              borderRadius: 60,
              background: "linear-gradient(135deg, #F4900C, #FFC367)",
              display: "flex",
              alignItems: "center",
              gap: 12,
              cursor: "pointer",
            }}
          >
            <span
              style={{
                fontFamily: interFont,
                fontSize: 20,
                fontWeight: 800,
                color: "#101011",
                letterSpacing: 0.5,
              }}
            >
              Upvote SuperX Today
            </span>
            <span style={{ fontSize: 22 }}>🔥</span>
          </div>
        </Glow>
      </div>

      {/* URL */}
      <div
        style={{
          marginTop: 28,
          opacity: urlOpacity,
          fontFamily: interFont,
          fontSize: 16,
          fontWeight: 500,
          color: "rgba(255,255,255,0.3)",
          letterSpacing: 1,
        }}
      >
        superx.so
      </div>
    </div>
  );
};
