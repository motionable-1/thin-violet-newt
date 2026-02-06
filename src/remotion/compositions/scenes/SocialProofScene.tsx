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
  weights: ["400", "500", "600", "700", "800"],
  subsets: ["latin"],
});

const TESTIMONIALS = [
  {
    text: "SuperX is a must-have for any active X user. It's my most favorite chrome extension now.",
    author: "Alexander Isora",
    handle: "@isora",
    avatar:
      "https://pub-e3bfc0083b0644b296a7080b21024c5f.r2.dev/superx/1770418090735_e69mtwcjrc6_avatar_alexander.png",
  },
  {
    text: "SuperX is a banger product! I've tried various options, even built my own, but SuperX has everything I need.",
    author: "Marius",
    handle: "@marius",
    avatar:
      "https://pub-e3bfc0083b0644b296a7080b21024c5f.r2.dev/superx/1770418086813_hd1k4p1tmwf_avatar_marius.png",
  },
  {
    text: "The Content Studio + Inspiration combo makes this OP. Showing up daily is so much easier now.",
    author: "Jazz",
    handle: "@jazz",
    avatar:
      "https://pub-e3bfc0083b0644b296a7080b21024c5f.r2.dev/superx/1770418088575_u1ti38wzcrf_avatar_jazz.png",
  },
];

interface TestimonialCardProps {
  testimonial: (typeof TESTIMONIALS)[0];
  delay: number;
  index: number;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({
  testimonial,
  delay,
  index,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const cardScale = spring({
    frame,
    fps,
    config: { damping: 12, stiffness: 80 },
    delay,
  });
  const cardOpacity = interpolate(frame, [delay, delay + 10], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Subtle float
  const floatY = Math.sin((frame + index * 20) * 0.03) * 3;

  return (
    <div
      style={{
        width: 340,
        padding: "24px 22px",
        borderRadius: 18,
        background: "rgba(255,255,255,0.04)",
        border: "1px solid rgba(255,255,255,0.08)",
        backdropFilter: "blur(12px)",
        opacity: cardOpacity,
        transform: `scale(${cardScale}) translateY(${floatY}px)`,
        display: "flex",
        flexDirection: "column",
        gap: 12,
      }}
    >
      {/* Quote mark */}
      <div
        style={{
          fontSize: 36,
          lineHeight: 1,
          color: "rgba(255,195,103,0.3)",
          fontFamily: "Georgia, serif",
        }}
      >
        &ldquo;
      </div>

      {/* Quote text */}
      <div
        style={{
          fontFamily: interFont,
          fontSize: 15,
          fontWeight: 400,
          color: "rgba(255,255,255,0.75)",
          lineHeight: 1.55,
          marginTop: -8,
        }}
      >
        {testimonial.text}
      </div>

      {/* Author */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          marginTop: 4,
        }}
      >
        <Img
          src={testimonial.avatar}
          style={{
            width: 34,
            height: 34,
            borderRadius: "50%",
            objectFit: "cover",
            border: "2px solid rgba(255,195,103,0.3)",
          }}
        />
        <div>
          <div
            style={{
              fontFamily: interFont,
              fontSize: 14,
              fontWeight: 600,
              color: "#fff",
            }}
          >
            {testimonial.author}
          </div>
          <div
            style={{
              fontFamily: interFont,
              fontSize: 12,
              fontWeight: 400,
              color: "rgba(255,255,255,0.4)",
            }}
          >
            {testimonial.handle}
          </div>
        </div>
      </div>
    </div>
  );
};

export const SocialProofScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Stats counter animation
  const creatorsCount = Math.floor(
    interpolate(frame, [20, 60], [0, 1458], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.out(Easing.cubic),
    }),
  );

  const statsOpacity = interpolate(frame, [10, 22], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const statsScale = spring({
    frame,
    fps,
    config: { damping: 14, stiffness: 100 },
    delay: 10,
  });

  // Exit
  const exitOpacity = interpolate(frame, [140, 155], [1, 0], {
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
      }}
    >
      {/* Everything in one centered column */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 40,
        }}
      >
        <TextAnimation
          className="text-[18px] font-semibold text-center"
          style={{
            fontFamily: interFont,
            color: "#FFC367",
            letterSpacing: 3,
            textTransform: "uppercase",
          }}
          startFrom={0}
          createTimeline={({ textRef, tl, SplitText }) => {
            const split = new SplitText(textRef.current, { type: "chars" });
            tl.fromTo(
              split.chars,
              { opacity: 0, scale: 0.8 },
              {
                opacity: 1,
                scale: 1,
                duration: 0.3,
                stagger: 0.02,
                ease: "back.out(1.5)",
              },
            );
            return tl;
          }}
        >
          Trusted by creators
        </TextAnimation>

        {/* Big stats number */}
        <div
          style={{
            opacity: statsOpacity,
            transform: `scale(${statsScale})`,
            display: "flex",
            alignItems: "baseline",
            gap: 12,
          }}
        >
          <span
            style={{
              fontFamily: interFont,
              fontSize: 64,
              fontWeight: 800,
              color: "#fff",
            }}
          >
            {creatorsCount.toLocaleString()}+
          </span>
          <span
            style={{
              fontFamily: interFont,
              fontSize: 20,
              fontWeight: 500,
              color: "rgba(255,255,255,0.4)",
            }}
          >
            creators growing with SuperX
          </span>
        </div>
        {/* Testimonial cards */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: 24,
            marginTop: 8,
          }}
        >
          {TESTIMONIALS.map((testimonial, i) => (
            <TestimonialCard
              key={testimonial.author}
              testimonial={testimonial}
              delay={45 + i * 15}
              index={i}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
