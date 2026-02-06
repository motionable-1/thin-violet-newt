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
import { loadFont } from "@remotion/google-fonts/Inter";

const { fontFamily: interFont } = loadFont("normal", {
  weights: ["400", "600", "700", "800"],
  subsets: ["latin"],
});

export const HookScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Frustrated emoji scale-in
  const emojiScale = spring({
    frame,
    fps,
    config: { damping: 12, stiffness: 100 },
    delay: 5,
  });
  const emojiRotate = interpolate(frame, [5, 25], [-15, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Question marks floating animation
  const q1Opacity = interpolate(frame, [15, 25], [0, 0.6], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const q2Opacity = interpolate(frame, [20, 30], [0, 0.5], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const q3Opacity = interpolate(frame, [25, 35], [0, 0.4], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Icons for the "pain" visualization
  const iconOpacity = interpolate(frame, [45, 55], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const iconY = interpolate(frame, [45, 55], [20, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  // Strike-through line on "What to post?"
  const strikeWidth = interpolate(frame, [85, 100], [0, 100], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  // Exit animation
  const exitOpacity = interpolate(frame, [110, 125], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const exitScale = interpolate(frame, [110, 125], [1, 0.95], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: interFont,
        opacity: exitOpacity,
        transform: `scale(${exitScale})`,
      }}
    >
      {/* Frustrated emoji */}
      <div
        style={{
          position: "absolute",
          top: 160,
          left: 200,
          fontSize: 64,
          transform: `scale(${emojiScale}) rotate(${emojiRotate}deg)`,
          opacity: emojiScale,
        }}
      >
        😩
      </div>

      {/* Floating question marks */}
      <div
        style={{
          position: "absolute",
          top: 140,
          right: 280,
          fontSize: 48,
          fontWeight: 800,
          color: "rgba(255,195,103,0.3)",
          opacity: q1Opacity,
          transform: `translateY(${Math.sin(frame * 0.05) * 8}px)`,
        }}
      >
        ?
      </div>
      <div
        style={{
          position: "absolute",
          top: 200,
          right: 200,
          fontSize: 36,
          fontWeight: 800,
          color: "rgba(244,144,12,0.25)",
          opacity: q2Opacity,
          transform: `translateY(${Math.sin(frame * 0.06 + 1) * 10}px)`,
        }}
      >
        ?
      </div>
      <div
        style={{
          position: "absolute",
          top: 120,
          right: 350,
          fontSize: 56,
          fontWeight: 800,
          color: "rgba(255,204,77,0.2)",
          opacity: q3Opacity,
          transform: `translateY(${Math.sin(frame * 0.04 + 2) * 6}px)`,
        }}
      >
        ?
      </div>

      {/* Main headline */}
      <TextAnimation
        className="text-[72px] font-extrabold text-white text-center leading-tight"
        style={{ fontFamily: interFont, maxWidth: 900, textWrap: "balance" }}
        startFrom={0}
        createTimeline={({ textRef, tl, SplitText }) => {
          const split = new SplitText(textRef.current, {
            type: "words",
            wordsClass: "word",
          });
          tl.fromTo(
            split.words,
            { opacity: 0, y: 60, rotationX: -40 },
            {
              opacity: 1,
              y: 0,
              rotationX: 0,
              duration: 0.7,
              stagger: 0.08,
              ease: "back.out(1.4)",
            },
          );
          return tl;
        }}
        perspective={800}
      >
        Growing on 𝕏 is <span style={{ color: "#FFC367" }}>hard</span>
      </TextAnimation>

      {/* Subline with pain points */}
      <div
        style={{
          marginTop: 32,
          opacity: iconOpacity,
          transform: `translateY(${iconY}px)`,
        }}
      >
        <div style={{ display: "flex", gap: 48, alignItems: "center" }}>
          {[
            {
              icon: "https://api.iconify.design/ph/clock-countdown-bold.svg?color=%23888888&width=28",
              text: "Hours creating content",
            },
            {
              icon: "https://api.iconify.design/ph/chart-line-down-bold.svg?color=%23888888&width=28",
              text: "Low engagement",
            },
            {
              icon: "https://api.iconify.design/ph/brain-bold.svg?color=%23888888&width=28",
              text: "No content ideas",
            },
          ].map((item, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                opacity: interpolate(frame, [50 + i * 8, 60 + i * 8], [0, 1], {
                  extrapolateLeft: "clamp",
                  extrapolateRight: "clamp",
                }),
                transform: `translateY(${interpolate(frame, [50 + i * 8, 60 + i * 8], [15, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}px)`,
              }}
            >
              <Img src={item.icon} style={{ width: 28, height: 28 }} />
              <span
                style={{
                  fontFamily: interFont,
                  fontSize: 20,
                  color: "#888",
                  fontWeight: 500,
                }}
              >
                {item.text}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* "What should I post?" with strikethrough */}
      <div style={{ position: "relative", marginTop: 48 }}>
        <TextAnimation
          className="text-[32px] font-medium text-center"
          style={{ fontFamily: interFont, color: "rgba(255,255,255,0.4)" }}
          startFrom={22}
          createTimeline={({ textRef, tl }) => {
            tl.fromTo(
              textRef.current,
              { opacity: 0, y: 20 },
              { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" },
            );
            return tl;
          }}
        >
          &quot;What should I even post today?&quot;
        </TextAnimation>
        {/* Strikethrough line */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: 0,
            height: 3,
            background: "linear-gradient(90deg, #FFC367, #F4900C)",
            width: `${strikeWidth}%`,
            borderRadius: 2,
          }}
        />
      </div>
    </div>
  );
};
