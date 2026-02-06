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
import { BrowserMockup } from "../../library/components/mockups/BrowserMockup";
import { loadFont } from "@remotion/google-fonts/Inter";

const { fontFamily: interFont } = loadFont("normal", {
  weights: ["400", "600", "700", "800"],
  subsets: ["latin"],
});

const DASHBOARD_IMG =
  "https://pub-e3bfc0083b0644b296a7080b21024c5f.r2.dev/superx/1770417495356_k0rh02be3zd_superx_dashboard.webp";

interface FeatureCardProps {
  icon: string;
  title: string;
  description: string;
  delay: number;
}

const FeatureCard: React.FC<FeatureCardProps> = ({
  icon,
  title,
  description,
  delay,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const cardScale = spring({
    frame,
    fps,
    config: { damping: 14, stiffness: 100 },
    delay,
  });
  const cardOpacity = interpolate(frame, [delay, delay + 10], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        display: "flex",
        alignItems: "flex-start",
        gap: 14,
        padding: "14px 18px",
        borderRadius: 14,
        background: "rgba(255,255,255,0.04)",
        border: "1px solid rgba(255,255,255,0.08)",
        backdropFilter: "blur(10px)",
        opacity: cardOpacity,
        transform: `scale(${cardScale})`,
        width: 260,
      }}
    >
      <Img
        src={icon}
        style={{ width: 28, height: 28, flexShrink: 0, marginTop: 2 }}
      />
      <div>
        <div
          style={{
            fontFamily: interFont,
            fontSize: 15,
            fontWeight: 700,
            color: "#fff",
            marginBottom: 3,
          }}
        >
          {title}
        </div>
        <div
          style={{
            fontFamily: interFont,
            fontSize: 12,
            fontWeight: 400,
            color: "rgba(255,255,255,0.5)",
            lineHeight: 1.4,
          }}
        >
          {description}
        </div>
      </div>
    </div>
  );
};

export const FeatureShowcaseScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Browser mockup entrance
  const mockupScale = spring({
    frame,
    fps,
    config: { damping: 14, stiffness: 60 },
    delay: 5,
  });
  const mockupOpacity = interpolate(frame, [5, 20], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const mockupY = interpolate(frame, [5, 30], [60, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  // Section title
  const titleOpacity = interpolate(frame, [0, 10], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Feature cards
  const features = [
    {
      icon: "https://api.iconify.design/ph/magic-wand-fill.svg?color=%23FFC367&width=28",
      title: "AI Content Studio",
      description: "Write tweets that sound like you, not a robot",
    },
    {
      icon: "https://api.iconify.design/ph/chart-bar-fill.svg?color=%23FFC367&width=28",
      title: "Smart Analytics",
      description: "See what works and double down on winners",
    },
    {
      icon: "https://api.iconify.design/ph/compass-fill.svg?color=%23FFC367&width=28",
      title: "Inspiration Engine",
      description: "Never run out of content ideas again",
    },
    {
      icon: "https://api.iconify.design/ph/calendar-check-fill.svg?color=%23FFC367&width=28",
      title: "Smart Scheduler",
      description: "Post at the perfect time, every time",
    },
  ];

  // Exit
  const exitOpacity = interpolate(frame, [170, 185], [1, 0], {
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
      {/* Vertically centered content wrapper */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 24,
        }}
      >
        {/* Section title */}
        <div
          style={{
            opacity: titleOpacity,
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
                { opacity: 0, y: 10 },
                {
                  opacity: 1,
                  y: 0,
                  duration: 0.4,
                  stagger: 0.03,
                  ease: "power2.out",
                },
              );
              return tl;
            }}
          >
            Everything you need to grow on X
          </TextAnimation>
        </div>

        {/* Browser mockup */}
        <div
          style={{
            transform: `translateY(${mockupY}px) scale(${mockupScale})`,
            opacity: mockupOpacity,
          }}
        >
          <BrowserMockup
            url="superx.so"
            browser="chrome"
            theme="dark"
            tabTitle="SuperX Dashboard"
            shadow
            width={880}
            height={460}
            borderRadius={12}
          >
            <Img
              src={DASHBOARD_IMG}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </BrowserMockup>
        </div>

        {/* Feature cards */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: 16,
          }}
        >
          {features.map((feat, i) => (
            <FeatureCard
              key={feat.title}
              icon={feat.icon}
              title={feat.title}
              description={feat.description}
              delay={60 + i * 12}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
