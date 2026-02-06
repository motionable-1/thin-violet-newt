import React from "react";
import { useCurrentFrame, useVideoConfig, interpolate, Easing } from "remotion";
import { Noise } from "../../library/components/effects/Noise";

export const Background: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Slow-moving gradient angle
  const gradientAngle = interpolate(frame, [0, 30 * fps], [135, 195], {
    extrapolateRight: "clamp",
  });

  // Subtle color shift over time
  const hueShift = interpolate(frame, [0, 30 * fps], [0, 20], {
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        background: `linear-gradient(${gradientAngle}deg, 
          hsl(${220 + hueShift}, 15%, 6%) 0%, 
          hsl(${230 + hueShift}, 20%, 10%) 40%, 
          hsl(${240 + hueShift}, 18%, 8%) 100%)`,
      }}
    >
      {/* Ambient floating orbs */}
      <div
        style={{
          position: "absolute",
          width: 600,
          height: 600,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(244,144,12,0.08) 0%, transparent 70%)",
          top: "10%",
          left: "5%",
          transform: `translate(${Math.sin(frame * 0.008) * 40}px, ${Math.cos(frame * 0.006) * 30}px)`,
          filter: "blur(80px)",
        }}
      />
      <div
        style={{
          position: "absolute",
          width: 500,
          height: 500,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(255,195,103,0.06) 0%, transparent 70%)",
          bottom: "5%",
          right: "10%",
          transform: `translate(${Math.sin(frame * 0.01) * 50}px, ${Math.cos(frame * 0.007) * 35}px)`,
          filter: "blur(100px)",
        }}
      />
      <div
        style={{
          position: "absolute",
          width: 400,
          height: 400,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(244,144,12,0.05) 0%, transparent 70%)",
          top: "50%",
          left: "50%",
          transform: `translate(-50%, -50%) translate(${Math.sin(frame * 0.012) * 60}px, ${Math.cos(frame * 0.009) * 45}px)`,
          filter: "blur(90px)",
        }}
      />
      {/* Film grain */}
      <Noise type="subtle" intensity={0.3} speed={0.5} opacity={0.15} />
    </div>
  );
};
