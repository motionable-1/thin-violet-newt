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
import { Counter } from "../../library/components/text/Counter";
import { loadFont } from "@remotion/google-fonts/Inter";

const { fontFamily: interFont } = loadFont("normal", {
  weights: ["400", "600", "700", "800"],
  subsets: ["latin"],
});

interface TestimonialProps {
  name: string;
  text: string;
  delay: number;
  x: number;
  y: number;
}

const Testimonial: React.FC<TestimonialProps> = ({ name, text, delay, x, y }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const scale = spring({ frame, fps, config: { damping: 14, stiffness: 100 }, delay });
  const opacity = interpolate(frame, [delay, delay + 12], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const floatY = Math.sin((frame - delay) * 0.03) * 4;

  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        maxWidth: 380,
        padding: "20px 24px",
        borderRadius: 16,
        background: "rgba(255,255,255,0.05)",
        border: "1px solid rgba(255,255,255,0.1)",
        backdropFilter: "blur(12px)",
        opacity,
        transform: `scale(${scale}) translateY(${floatY}px)`,
      }}
    >
      <div style={{ fontFamily: interFont, fontSize: 15, color: "rgba(255,255,255,0.75)", lineHeight: 1.5, fontStyle: "italic" }}>
        &ldquo;{text}&rdquo;
      </div>
      <div style={{ fontFamily: interFont, fontSize: 13, fontWeight: 700, color: "#FFC367", marginTop: 12 }}>
        — {name}
      </div>
    </div>
  );
};

export const SocialProofScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Stats counter
  const statsOpacity = interpolate(frame, [15, 30], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const statsY = interpolate(frame, [15, 30], [20, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) });

  // Star icons
  const starsOpacity = interpolate(frame, [35, 45], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  // Exit
  const exitOpacity = interpolate(frame, [135, 150], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  const testimonials = [
    {
      name: "Marius",
      text: "SuperX is a banger product! I've tried various options, but SuperX has everything I need.",
      x: 80,
      y: 340,
      delay: 45,
    },
    {
      name: "Alexander Isora",
      text: "SuperX is a must-have for any active 𝕏 user. It's my most favorite chrome extension now.",
      x: 520,
      y: 300,
      delay: 60,
    },
    {
      name: "Jazz",
      text: "The Content Studio + Inspiration combo makes this OP. Makes showing up daily so much easier.",
      x: 980,
      y: 360,
      delay: 75,
    },
  ];

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        fontFamily: interFont,
        opacity: exitOpacity,
      }}
    >
      {/* Title */}
      <div style={{ position: "absolute", top: 60, left: 0, right: 0, display: "flex", justifyContent: "center" }}>
        <TextAnimation
          className="text-[20px] font-semibold text-center"
          style={{ fontFamily: interFont, color: "#FFC367", letterSpacing: 3, textTransform: "uppercase" }}
          startFrom={0}
          createTimeline={({ textRef, tl, SplitText }) => {
            const split = new SplitText(textRef.current, { type: "chars" });
            tl.fromTo(
              split.chars,
              { opacity: 0, scale: 0.5 },
              { opacity: 1, scale: 1, duration: 0.4, stagger: 0.03, ease: "back.out(2)" }
            );
            return tl;
          }}
        >
          Loved by creators worldwide
        </TextAnimation>
      </div>

      {/* Stats row */}
      <div
        style={{
          position: "absolute",
          top: 130,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          gap: 80,
          opacity: statsOpacity,
          transform: `translateY(${statsY}px)`,
        }}
      >
        {[
          { value: 1458, label: "Active Creators", suffix: "+" },
          { value: 5000, label: "Posts Generated", suffix: "+" },
          { value: 4.9, label: "Chrome Store Rating", suffix: "★" },
        ].map((stat, i) => {
          const statScale = spring({ frame, fps, config: { damping: 14, stiffness: 100 }, delay: 18 + i * 6 });
          return (
            <div
              key={stat.label}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                transform: `scale(${statScale})`,
              }}
            >
              <div style={{ display: "flex", alignItems: "baseline", gap: 4 }}>
                <Counter
                  from={0}
                  to={stat.value}
                  startFrom={18 + i * 6}
                  duration={40}
                  style={{ fontFamily: interFont, fontSize: 52, fontWeight: 800, color: "#fff" }}
                  decimals={stat.value < 10 ? 1 : 0}
                />
                <span style={{ fontFamily: interFont, fontSize: 28, fontWeight: 700, color: "#FFC367" }}>
                  {stat.suffix}
                </span>
              </div>
              <span style={{ fontFamily: interFont, fontSize: 15, fontWeight: 500, color: "rgba(255,255,255,0.45)", marginTop: 4 }}>
                {stat.label}
              </span>
            </div>
          );
        })}
      </div>

      {/* Five stars */}
      <div
        style={{
          position: "absolute",
          top: 270,
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          gap: 8,
          opacity: starsOpacity,
        }}
      >
        {[0, 1, 2, 3, 4].map((i) => {
          const starScale = spring({ frame, fps, config: { damping: 10, stiffness: 150 }, delay: 36 + i * 3 });
          return (
            <div key={i} style={{ transform: `scale(${starScale})`, fontSize: 28, color: "#FFC367" }}>
              ⭐
            </div>
          );
        })}
      </div>

      {/* Testimonials */}
      {testimonials.map((t) => (
        <Testimonial key={t.name} {...t} />
      ))}
    </div>
  );
};
