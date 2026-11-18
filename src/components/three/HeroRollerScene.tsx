"use client";

import React, { useEffect, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { ContactShadows, Environment, Lightformer, Sparkles } from "@react-three/drei";
import * as THREE from "three";
import { IndustrialRollerMesh } from "./IndustrialRollerMesh";

interface HeroRigProps {
  pointerRef: React.MutableRefObject<{ x: number; y: number }>;
  reducedMotion: boolean;
  exploded: boolean;
}

function HeroCameraRig({ pointerRef, reducedMotion, exploded }: HeroRigProps) {
  useFrame((state, delta) => {
    const dt = Math.min(delta, 0.05);
    const t = state.clock.getElapsedTime();
    const px = pointerRef.current.x;
    const py = pointerRef.current.y;
    const w = state.size.width;
    const isDesktop = w >= 1024;
    const isMobile = w < 640;

    const zoomOut = exploded ? (isMobile ? 1.35 : 0.95) : 0;

    let baseX: number;
    let baseY: number;
    let baseZ: number;
    let lookX: number;

    if (isDesktop) {
      baseX = reducedMotion ? 0.5 : 0.5 + Math.sin(t * 0.25) * 0.45 + px * 0.55;
      baseY =
        (reducedMotion ? 0.85 : 0.85 + Math.cos(t * 0.22) * 0.15 + py * 0.3) +
        (exploded ? 0.35 : 0);
      baseZ = (reducedMotion ? 6.1 : 6.1 + Math.sin(t * 0.18) * 0.25) + zoomOut;
      lookX = 0.35;
    } else if (isMobile) {
      baseX = reducedMotion ? 0 : Math.sin(t * 0.28) * 0.35;
      baseY =
        (reducedMotion ? 0.65 : 0.65 + Math.cos(t * 0.24) * 0.12) +
        (exploded ? 0.3 : 0);
      baseZ = 8.4 + zoomOut;
      lookX = 0;
    } else {
      baseX = reducedMotion ? 0 : Math.sin(t * 0.25) * 0.35 + px * 0.3;
      baseY =
        (reducedMotion ? 0.75 : 0.75 + Math.cos(t * 0.22) * 0.12 + py * 0.2) +
        (exploded ? 0.32 : 0);
      baseZ = 7.0 + zoomOut;
      lookX = 0;
    }

    state.camera.position.x = THREE.MathUtils.lerp(state.camera.position.x, baseX, dt * 2.4);
    state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, baseY, dt * 2.4);
    state.camera.position.z = THREE.MathUtils.lerp(state.camera.position.z, baseZ, dt * 2.4);
    state.camera.lookAt(lookX, exploded ? 0.1 : -0.05, 0);
  });

  return null;
}

/** Animated counter-rotating precision laser metrology halo rings */
function MetrologyHaloRings({
  reducedMotion,
  accentColor,
  centerX,
  scale,
}: {
  reducedMotion: boolean;
  accentColor: string;
  centerX: number;
  scale: number;
}) {
  const outerRef = useRef<THREE.Mesh>(null);
  const innerRef = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (reducedMotion) return;
    const dt = Math.min(delta, 0.05);
    if (outerRef.current) {
      outerRef.current.rotation.z += dt * 0.14;
      outerRef.current.rotation.x += dt * 0.05;
    }
    if (innerRef.current) {
      innerRef.current.rotation.z -= dt * 0.22;
      innerRef.current.rotation.y += dt * 0.08;
    }
  });

  return (
    <group position={[centerX, -0.05, -0.35]} scale={scale}>
      <mesh ref={outerRef} rotation={[Math.PI / 2.6, 0.25, 0]}>
        <torusGeometry args={[2.95, 0.009, 12, 96]} />
        <meshBasicMaterial color={accentColor} transparent opacity={0.3} />
      </mesh>
      <mesh ref={innerRef} rotation={[-Math.PI / 3.2, -0.4, 0]}>
        <torusGeometry args={[2.35, 0.007, 12, 84]} />
        <meshBasicMaterial color="#cbd5e1" transparent opacity={0.28} />
      </mesh>
    </group>
  );
}

function ResponsiveHeroStage({
  reducedMotion,
  pointerRef,
  rubberColor,
  accentColor,
  grooveColor,
  sparkColor,
  rubberFinish,
  exploded,
}: {
  reducedMotion: boolean;
  pointerRef: React.MutableRefObject<{ x: number; y: number }>;
  rubberColor: string;
  accentColor: string;
  grooveColor: string;
  sparkColor: string;
  rubberFinish: "matte" | "satin" | "grooved" | "high-contrast";
  exploded: boolean;
}) {
  const width = useThree((s) => s.size.width);
  const isDesktop = width >= 1024;
  const isMobile = width < 640;

  const centerX = isDesktop ? 1.15 : 0;
  const rollerScale = isDesktop ? 0.95 : isMobile ? 0.78 : 0.88;

  return (
    <>
      <group position={[centerX, -0.05, 0]} scale={rollerScale}>
        <IndustrialRollerMesh
          mode="hero"
          reducedMotion={reducedMotion}
          interactivePointer={pointerRef}
          rubberColor={rubberColor}
          accentColor={accentColor}
          grooveColor={grooveColor}
          sparkColor={sparkColor}
          rubberFinish={rubberFinish}
          exploded={exploded}
        />
      </group>

      <MetrologyHaloRings
        reducedMotion={reducedMotion}
        accentColor={accentColor}
        centerX={centerX}
        scale={rollerScale}
      />

      {!reducedMotion && (
        <>
          <Sparkles
            count={isMobile ? 22 : 42}
            scale={[isMobile ? 6 : 9, 4.5, 6]}
            position={[centerX, 0.2, 0]}
            size={2.0}
            speed={0.35}
            opacity={0.42}
            color={sparkColor}
          />
          <Sparkles
            count={isMobile ? 16 : 32}
            scale={[isMobile ? 6.5 : 10, 5, 6]}
            position={[centerX * 0.5, 0.5, -1]}
            size={1.4}
            speed={0.2}
            opacity={0.35}
            color="#e2e8f0"
          />
        </>
      )}

      <ContactShadows
        position={[centerX, -1.53, 0]}
        opacity={0.62}
        scale={11}
        blur={2.2}
        far={3.5}
        color="#000000"
      />
    </>
  );
}

export default function HeroRollerScene({
  reducedMotion = false,
  rubberColor = "#C81E32",
  accentColor = "#DC2626",
  grooveColor = "#6B0F1A",
  sparkColor = "#FCA5A5",
  rubberFinish = "satin",
  exploded = false,
}: {
  reducedMotion?: boolean;
  rubberColor?: string;
  accentColor?: string;
  grooveColor?: string;
  sparkColor?: string;
  rubberFinish?: "matte" | "satin" | "grooved" | "high-contrast";
  exploded?: boolean;
}) {
  const pointerRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (reducedMotion) return;
    const handlePointerMove = (e: PointerEvent) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = -((e.clientY / window.innerHeight) * 2 - 1);
      pointerRef.current = { x, y };
    };
    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    return () => window.removeEventListener("pointermove", handlePointerMove);
  }, [reducedMotion]);

  return (
    <Canvas
      shadows
      dpr={[1, 1.75]}
      camera={{ position: [0.5, 0.85, 6.1], fov: 36, near: 0.1, far: 50 }}
      gl={{
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
        toneMapping: THREE.ACESFilmicToneMapping,
        toneMappingExposure: 1.12,
      }}
      className="h-full w-full"
    >
      <Environment resolution={256}>
        <group rotation={[-Math.PI / 3, 0, 0]}>
          <Lightformer
            form="rect"
            intensity={4.2}
            position={[0, 6, 2]}
            scale={[14, 2.0, 1]}
            color="#ffffff"
          />
          <Lightformer
            form="rect"
            intensity={3.0}
            position={[-6, 3, 4]}
            scale={[7, 2.2, 1]}
            color="#e2e8f0"
          />
          <Lightformer
            form="rect"
            intensity={4.4}
            position={[5, -1, -3]}
            scale={[9, 1.8, 1]}
            color={accentColor}
          />
          <Lightformer
            form="rect"
            intensity={3.2}
            position={[-4, -2.5, 2]}
            scale={[7, 1.6, 1]}
            color={rubberColor}
          />
          <Lightformer
            form="ring"
            intensity={2.2}
            position={[0, 4, -5]}
            scale={6}
            color="#cbd5e1"
          />
        </group>
      </Environment>

      <ambientLight intensity={0.36} color="#cbd5e1" />
      <directionalLight
        position={[4, 6, 5]}
        intensity={2.8}
        color="#f8fafc"
        castShadow
        shadow-mapSize={[1024, 1024]}
      />
      <spotLight
        position={[-5.5, 2.5, -2.5]}
        angle={0.48}
        penumbra={0.85}
        intensity={5.4}
        color={accentColor}
      />
      <pointLight position={[4.5, -1.6, 3]} intensity={2.2} color={sparkColor} />
      <pointLight position={[-3.2, -1.8, 2.4]} intensity={1.8} color={rubberColor} />

      <ResponsiveHeroStage
        reducedMotion={reducedMotion}
        pointerRef={pointerRef}
        rubberColor={rubberColor}
        accentColor={accentColor}
        grooveColor={grooveColor}
        sparkColor={sparkColor}
        rubberFinish={rubberFinish}
        exploded={exploded}
      />

      <gridHelper
        args={[18, 24, "#2b3240", "#161a22"]}
        position={[0, -1.55, 0]}
      />

      <HeroCameraRig
        pointerRef={pointerRef}
        reducedMotion={reducedMotion}
        exploded={exploded}
      />
    </Canvas>
  );
}
