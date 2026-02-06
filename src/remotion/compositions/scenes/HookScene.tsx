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

const X_LOGO_ICON =
  "https://api.iconify.design/ri/twitter-x-fill.svg?color=%23ffffff&width=60";

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

  // Pain point icons
  const iconOpacity = interpolate(frame, [45, 55], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const iconY = interpolate(frame, [45, 55], [20, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  // Strike-through line
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

  // Headline word entrance
  const headlineWords = ["Growing", "on"];

  const hardWord = "hard";

  const wordEntrance = (index: number) => {
    const delay = index * 4;
    const s = spring({
      frame,
      fps,
      config: { damping: 12, stiffness: 100 },
      delay,
    });
    const opacity = interpolate(frame, [delay, delay + 8], [0, 1], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    });
    const y = interpolate(frame, [delay, delay + 10], [60, 0], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.out(Easing.back(1.4)),
    });
    return { opacity, transform: `translateY(${y}px) scale(${s})` };
  };

  // X logo entrance
  const xDelay = 8;
  const xScale = spring({
    frame,
    fps,
    config: { damping: 10, stiffness: 120 },
    delay: xDelay,
  });
  const xOpacity = interpolate(frame, [xDelay, xDelay + 8], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // "is" word
  const isStyle = wordEntrance(3);

  // "hard" word
  const hardDelay = 16;
  const hardScale = spring({
    frame,
    fps,
    config: { damping: 8, stiffness: 80 },
    delay: hardDelay,
  });
  const hardOpacity = interpolate(frame, [hardDelay, hardDelay + 8], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        fontFamily: interFont,
        opacity: exitOpacity,
        transform: `scale(${exitScale})`,
      }}
    >
      {/* Frustrated emoji */}
      <div
        style={{
          position: "absolute",
          top: 220,
          left: 240,
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
          top: 200,
          right: 320,
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
          top: 280,
          right: 240,
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
          top: 180,
          right: 400,
          fontSize: 56,
          fontWeight: 800,
          color: "rgba(255,204,77,0.2)",
          opacity: q3Opacity,
          transform: `translateY(${Math.sin(frame * 0.04 + 2) * 6}px)`,
        }}
      >
        ?
      </div>

      {/* Main headline - manually built for inline X logo */}
      <div
        style={{
          position: "absolute",
          top: "42%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {/* Headline row */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 18,
            fontSize: 72,
            fontWeight: 800,
            color: "#fff",
            lineHeight: 1.1,
          }}
        >
          {headlineWords.map((word, i) => (
            <span key={word} style={wordEntrance(i)}>
              {word}
            </span>
          ))}

          {/* X logo inline */}
          <div
            style={{
              opacity: xOpacity,
              transform: `scale(${xScale})`,
              display: "flex",
              alignItems: "center",
            }}
          >
            <Img src={X_LOGO_ICON} style={{ width: 60, height: 60 }} />
          </div>

          <span style={isStyle}>is</span>

          <span
            style={{
              color: "#FFC367",
              opacity: hardOpacity,
              transform: `scale(${hardScale})`,
              display: "inline-block",
            }}
          >
            {hardWord}
          </span>
        </div>

        {/* Subline with pain points */}
        <div
          style={{
            marginTop: 48,
            opacity: iconOpacity,
            transform: `translateY(${iconY}px)`,
          }}
        >
          <div
            style={{
              display: "flex",
              gap: 48,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {[
              {
                icon: "https://api.iconify.design/ph/clock-countdown-bold.svg?color=%23999999&width=28",
                text: "Hours creating content",
              },
              {
                icon: "https://api.iconify.design/ph/chart-line-down-bold.svg?color=%23999999&width=28",
                text: "Low engagement",
              },
              {
                icon: "https://api.iconify.design/ph/brain-bold.svg?color=%23999999&width=28",
                text: "No content ideas",
              },
            ].map((item, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  opacity: interpolate(
                    frame,
                    [50 + i * 8, 60 + i * 8],
                    [0, 1],
                    {
                      extrapolateLeft: "clamp",
                      extrapolateRight: "clamp",
                    },
                  ),
                  transform: `translateY(${interpolate(frame, [50 + i * 8, 60 + i * 8], [15, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}px)`,
                }}
              >
                <Img src={item.icon} style={{ width: 28, height: 28 }} />
                <span
                  style={{
                    fontFamily: interFont,
                    fontSize: 22,
                    color: "#aaa",
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
        <div style={{ position: "relative", marginTop: 52 }}>
          <TextAnimation
            className="text-[34px] font-medium text-center"
            style={{ fontFamily: interFont, color: "rgba(255,255,255,0.45)" }}
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
    </div>
  );
};
