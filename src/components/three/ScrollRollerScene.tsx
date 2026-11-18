"use client";

import React from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { ContactShadows, Environment, Lightformer, Sparkles } from "@react-three/drei";
import * as THREE from "three";
import { IndustrialRollerMesh } from "./IndustrialRollerMesh";

interface ScrollCameraProps {
  progressRef: React.MutableRefObject<number>;
  reducedMotion: boolean;
}

/**
 * Choreographs a cinematic continuous camera flight around the industrial roller
 * synchronized directly with scroll progress (0 -> 1) and smoothly reversible.
 */
function ScrollCameraChoreographer({
  progressRef,
  reducedMotion,
}: ScrollCameraProps) {
  const camPos = new THREE.Vector3();
  const lookTarget = new THREE.Vector3();

  useFrame((state, delta) => {
    const p = progressRef.current;
    const dt = Math.min(delta, 0.05);
    const lerpSpeed = reducedMotion ? 1 : Math.min(1, dt * 7);

    // 6-stage cinematic camera spline keyframes
    if (p < 0.2) {
      // Stage 1: Wide establishing push-in toward bare steel core
      const t = p / 0.2;
      camPos.set(
        THREE.MathUtils.lerp(-2.2, -0.8, t),
        THREE.MathUtils.lerp(1.3, 0.75, t),
        THREE.MathUtils.lerp(6.8, 5.2, t)
      );
      lookTarget.set(0, 0, 0);
    } else if (p < 0.38) {
      // Stage 2: Low dramatic orbit during Rubber Compounding
      const t = (p - 0.2) / 0.18;
      camPos.set(
        THREE.MathUtils.lerp(-0.8, 2.1, t),
        THREE.MathUtils.lerp(0.75, 0.35, t),
        THREE.MathUtils.lerp(5.2, 4.6, t)
      );
      lookTarget.set(THREE.MathUtils.lerp(0, 0.2, t), 0, 0);
    } else if (p < 0.52) {
      // Stage 3: Tracking right along the advancing rubber bonding seam
      const t = (p - 0.38) / 0.14;
      camPos.set(
        THREE.MathUtils.lerp(2.1, -0.4, t),
        THREE.MathUtils.lerp(0.35, 1.15, t),
        THREE.MathUtils.lerp(4.6, 5.0, t)
      );
      lookTarget.set(THREE.MathUtils.lerp(-0.4, 0.3, t), 0.1, 0);
    } else if (p < 0.7) {
      // Stage 4: Close-up CNC Precision Grinding wheel pass
      const t = (p - 0.52) / 0.18;
      camPos.set(
        THREE.MathUtils.lerp(-1.4, 1.7, t),
        THREE.MathUtils.lerp(1.15, 1.05, t),
        THREE.MathUtils.lerp(4.8, 4.35, t)
      );
      lookTarget.set(THREE.MathUtils.lerp(-0.6, 0.7, t), 0.45, 0);
    } else if (p < 0.85) {
      // Stage 5: Laser Quality Inspection axial fly-along
      const t = (p - 0.7) / 0.15;
      camPos.set(
        THREE.MathUtils.lerp(1.7, -1.6, t),
        THREE.MathUtils.lerp(1.05, 0.5, t),
        THREE.MathUtils.lerp(4.35, 4.7, t)
      );
      lookTarget.set(0, 0.05, 0);
    } else {
      // Stage 6: Final Heroic Reveal pullback
      const t = (p - 0.85) / 0.15;
      camPos.set(
        THREE.MathUtils.lerp(-1.6, 0.85, t),
        THREE.MathUtils.lerp(0.5, 0.95, t),
        THREE.MathUtils.lerp(4.7, 6.2, t)
      );
      lookTarget.set(0, -0.05, 0);
    }

    // Adapt camera distance smoothly for portrait mobile & tablet viewports
    const w = state.size.width;
    const zScale = w < 640 ? 1.58 : w < 1024 ? 1.24 : 1.0;
    const xScale = w < 640 ? 0.48 : w < 1024 ? 0.72 : 1.0;
    camPos.x *= xScale;
    camPos.z *= zScale;
    if (w < 640) {
      camPos.y += 0.22;
    }

    state.camera.position.lerp(camPos, lerpSpeed);
    state.camera.lookAt(lookTarget);
  });

  return null;
}

/**
 * Industrial factory rail gantry & light arch framing the roller in 3D space
 * so it feels embedded inside a real precision manufacturing bay.
 */
function ManufacturingBayEnvironment() {
  return (
    <group>
      {/* Overhead precision gantry rail */}
      <mesh position={[0, 2.75, -0.4]}>
        <boxGeometry args={[9.5, 0.16, 0.24]} />
        <meshStandardMaterial color="#1f2530" metalness={0.85} roughness={0.35} />
      </mesh>
      {/* Left & Right industrial support pedestals under shaft ends */}
      {[-3.05, 3.05].map((xPos, i) => (
        <group key={i} position={[xPos, -0.9, 0]}>
          <mesh>
            <boxGeometry args={[0.45, 1.4, 0.65]} />
            <meshStandardMaterial
              color="#141820"
              metalness={0.78}
              roughness={0.42}
            />
          </mesh>
          <mesh position={[0, 0.72, 0]}>
            <cylinderGeometry args={[0.26, 0.26, 0.22, 24]} />
            <meshStandardMaterial
              color="#39414f"
              metalness={0.9}
              roughness={0.25}
            />
          </mesh>
        </group>
      ))}
      {/* Floor precision grid */}
      <gridHelper
        args={[22, 32, "#2f3644", "#151820"]}
        position={[0, -1.62, 0]}
      />
    </group>
  );
}

export default function ScrollRollerScene({
  progressRef,
  reducedMotion = false,
  rubberColor = "#C81E32",
  accentColor = "#DC2626",
  sparkColor = "#FCA5A5",
}: {
  progressRef: React.MutableRefObject<number>;
  reducedMotion?: boolean;
  rubberColor?: string;
  accentColor?: string;
  sparkColor?: string;
}) {
  return (
    <Canvas
      shadows
      dpr={[1, 1.75]}
      camera={{ position: [-2.2, 1.3, 6.8], fov: 37, near: 0.1, far: 60 }}
      gl={{
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
        toneMapping: THREE.ACESFilmicToneMapping,
        toneMappingExposure: 1.15,
      }}
      className="h-full w-full"
    >
      <Environment resolution={256}>
        <group rotation={[-Math.PI / 3, 0, 0]}>
          <Lightformer
            form="rect"
            intensity={4.2}
            position={[0, 7, 2]}
            scale={[14, 2.2, 1]}
            color="#ffffff"
          />
          <Lightformer
            form="rect"
            intensity={3.0}
            position={[-6, 2, 3]}
            scale={[7, 2.2, 1]}
            color="#e2e8f0"
          />
          <Lightformer
            form="rect"
            intensity={4.0}
            position={[5, -1.5, -3]}
            scale={[9, 1.4, 1]}
            color={accentColor}
          />
        </group>
      </Environment>

      <ambientLight intensity={0.36} color="#cbd5e1" />
      <directionalLight
        position={[3, 7, 5]}
        intensity={2.8}
        color="#f8fafc"
        castShadow
        shadow-mapSize={[1024, 1024]}
      />
      <spotLight
        position={[-5, 3, -3]}
        angle={0.5}
        penumbra={0.85}
        intensity={4.8}
        color={accentColor}
      />
      <pointLight position={[4, -1, 3]} intensity={1.6} color={sparkColor} />

      <ManufacturingBayEnvironment />

      {!reducedMotion && (
        <Sparkles
          count={36}
          scale={[10, 4.5, 6]}
          position={[0, 0.3, 0]}
          size={1.6}
          speed={0.25}
          opacity={0.38}
          color={sparkColor}
        />
      )}

      <IndustrialRollerMesh
        mode="scroll"
        progressRef={progressRef}
        reducedMotion={reducedMotion}
        rubberColor={rubberColor}
        accentColor={accentColor}
        sparkColor={sparkColor}
      />

      <ContactShadows
        position={[0, -1.6, 0]}
        opacity={0.68}
        scale={12}
        blur={2.1}
        far={4}
        color="#000000"
      />

      <ScrollCameraChoreographer
        progressRef={progressRef}
        reducedMotion={reducedMotion}
      />
    </Canvas>
  );
}
