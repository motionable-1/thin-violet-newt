import React, { useCallback } from "react";
import {
  AbsoluteFill,
  Artifact,
  useCurrentFrame,
  useVideoConfig,
  Audio,
  Sequence,
  interpolate,
} from "remotion";
import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { slide } from "@remotion/transitions/slide";
import { blurDissolve } from "../library/components/layout/transitions/presentations";

import { Background } from "./scenes/Background";
import { HookScene } from "./scenes/HookScene";
import { ProductRevealScene } from "./scenes/ProductRevealScene";
import { FeatureShowcaseScene } from "./scenes/FeatureShowcaseScene";
import { SocialProofScene } from "./scenes/SocialProofScene";
import { CTAScene } from "./scenes/CTAScene";

// Sound effects
const WHOOSH_SFX =
  "https://pub-e3bfc0083b0644b296a7080b21024c5f.r2.dev/sfx/1770418094316_99uedlmwvfm_sfx_subtle_tech_whoosh_transition_.mp3";
const CHIME_SFX =
  "https://pub-e3bfc0083b0644b296a7080b21024c5f.r2.dev/sfx/1770418096521_r3vl8wtfq4q_sfx_soft_uplifting_chime_notificat.mp3";

// Background music
const BG_MUSIC =
  "https://pub-e3bfc0083b0644b296a7080b21024c5f.r2.dev/music/1770420113749_1dz65qsxld7_music_Upbeat_modern_tech_s.mp3";

/*
 * Scene durations (in frames at 30fps):
 * 1. Hook:            130 frames (~4.3s)
 * 2. Product Reveal:  140 frames (~4.7s)
 * 3. Feature Showcase: 195 frames (~6.5s)
 * 4. Social Proof:    160 frames (~5.3s)
 * 5. CTA:             130 frames (~4.3s)
 *
 * Transitions: 4 x 15 frames = 60 frames subtracted
 * Total: 130 + 140 + 195 + 160 + 130 - 60 = 695 frames (~23s)
 */

const TRANSITION_DURATION = 15;

const TOTAL_FRAMES = 695;
const FADE_IN_FRAMES = 30;
const FADE_OUT_FRAMES = 45;

export const Main: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Background music volume: fade in at start, fade out at end
  const musicVolume = useCallback(
    (f: number) => {
      const fadeIn = interpolate(f, [0, FADE_IN_FRAMES], [0, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      });
      const fadeOut = interpolate(
        f,
        [TOTAL_FRAMES - FADE_OUT_FRAMES, TOTAL_FRAMES],
        [1, 0],
        { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
      );
      return fadeIn * fadeOut * 0.35;
    },
    [fps],
  );

  return (
    <>
      {/* Thumbnail artifact */}
      {frame === 0 && (
        <Artifact content={Artifact.Thumbnail} filename="thumbnail.jpeg" />
      )}

      {/* Persistent background */}
      <AbsoluteFill>
        <Background />
      </AbsoluteFill>

      {/* Scene transitions */}
      <AbsoluteFill>
        <TransitionSeries>
          {/* Scene 1: Hook - The pain point */}
          <TransitionSeries.Sequence durationInFrames={130}>
            <AbsoluteFill>
              <HookScene />
            </AbsoluteFill>
          </TransitionSeries.Sequence>

          <TransitionSeries.Transition
            presentation={blurDissolve()}
            timing={linearTiming({ durationInFrames: TRANSITION_DURATION })}
          />

          {/* Scene 2: Product Reveal */}
          <TransitionSeries.Sequence durationInFrames={140}>
            <AbsoluteFill>
              <ProductRevealScene />
            </AbsoluteFill>
          </TransitionSeries.Sequence>

          <TransitionSeries.Transition
            presentation={slide({ direction: "from-right" })}
            timing={linearTiming({ durationInFrames: TRANSITION_DURATION })}
          />

          {/* Scene 3: Feature Showcase */}
          <TransitionSeries.Sequence durationInFrames={195}>
            <AbsoluteFill>
              <FeatureShowcaseScene />
            </AbsoluteFill>
          </TransitionSeries.Sequence>

          <TransitionSeries.Transition
            presentation={blurDissolve()}
            timing={linearTiming({ durationInFrames: TRANSITION_DURATION })}
          />

          {/* Scene 4: Social Proof */}
          <TransitionSeries.Sequence durationInFrames={160}>
            <AbsoluteFill>
              <SocialProofScene />
            </AbsoluteFill>
          </TransitionSeries.Sequence>

          <TransitionSeries.Transition
            presentation={fade()}
            timing={linearTiming({ durationInFrames: TRANSITION_DURATION })}
          />

          {/* Scene 5: CTA */}
          <TransitionSeries.Sequence durationInFrames={130}>
            <AbsoluteFill>
              <CTAScene />
            </AbsoluteFill>
          </TransitionSeries.Sequence>
        </TransitionSeries>
      </AbsoluteFill>

      {/* Background music */}
      <Audio src={BG_MUSIC} volume={musicVolume} />

      {/* Sound effects at transitions */}
      <Sequence from={120}>
        <Audio src={WHOOSH_SFX} volume={0.3} />
      </Sequence>
      <Sequence from={255}>
        <Audio src={WHOOSH_SFX} volume={0.25} />
      </Sequence>
      <Sequence from={435}>
        <Audio src={WHOOSH_SFX} volume={0.25} />
      </Sequence>
      <Sequence from={580}>
        <Audio src={CHIME_SFX} volume={0.3} />
      </Sequence>
    </>
  );
};
