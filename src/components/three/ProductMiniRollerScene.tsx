"use client";

import React, { useEffect, useRef } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { ContactShadows, Environment, Lightformer, OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import { IndustrialRollerMesh } from "./IndustrialRollerMesh";

function ResponsiveProductCamera({ exploded }: { exploded: boolean }) {
  const { camera, size } = useThree();

  useEffect(() => {
    const baseZ = size.width < 480 ? 7.6 : size.width < 768 ? 6.4 : 5.4;
    const targetZ = baseZ + (exploded ? 1.1 : 0);
    camera.position.set(size.width < 480 ? 0.25 : 0.6, exploded ? 1.15 : 1.0, targetZ);
    camera.updateProjectionMatrix();
  }, [camera, size.width, exploded]);

  return null;
}

interface ProductMiniRollerSceneProps {
  rubberFinish?: "matte" | "satin" | "grooved" | "high-contrast";
  accentColor?: string;
  rubberColorOverride?: string;
  exploded?: boolean;
  reducedMotion?: boolean;
}

export default function ProductMiniRollerScene({
  rubberFinish = "satin",
  accentColor = "#DC2626",
  rubberColorOverride,
  exploded = false,
  reducedMotion = false,
}: ProductMiniRollerSceneProps) {
  const pointerRef = useRef({ x: 0, y: 0 });

  const rubberColor =
    rubberColorOverride ||
    (rubberFinish === "matte"
      ? "#991B1B"
      : rubberFinish === "high-contrast"
        ? "#DC2626"
        : rubberFinish === "grooved"
          ? "#A61B22"
          : "#B91C1C");

  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0.6, 1.0, 5.4], fov: 36 }}
      gl={{
        antialias: true,
        alpha: true,
        toneMapping: THREE.ACESFilmicToneMapping,
        toneMappingExposure: 1.18,
      }}
      className="h-full w-full cursor-grab active:cursor-grabbing"
    >
      <Environment resolution={128}>
        <Lightformer
          form="rect"
          intensity={4.2}
          position={[0, 6, 3]}
          scale={[12, 2.2, 1]}
          color="#ffffff"
        />
        <Lightformer
          form="rect"
          intensity={2.8}
          position={[-5, 2, 3]}
          scale={[6, 2, 1]}
          color="#e2e8f0"
        />
        <Lightformer
          form="rect"
          intensity={3.8}
          position={[5, -1, -3]}
          scale={[7, 1.4, 1]}
          color={accentColor}
        />
      </Environment>

      <ambientLight intensity={0.36} color="#cbd5e1" />
      <directionalLight position={[4, 6, 5]} intensity={2.6} color="#f8fafc" />
      <spotLight
        position={[-4.5, 2, -2]}
        intensity={4.2}
        angle={0.5}
        penumbra={0.8}
        color={accentColor}
      />

      <group scale={0.84}>
        <IndustrialRollerMesh
          mode="product"
          reducedMotion={reducedMotion}
          rubberColor={rubberColor}
          accentColor={accentColor}
          rubberFinish={rubberFinish}
          exploded={exploded}
          interactivePointer={pointerRef}
        />
      </group>

      {/* Precision calibration floor turntable ring */}
      <mesh position={[0, -1.24, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[2.15, 2.22, 64]} />
        <meshBasicMaterial color={accentColor} transparent opacity={0.35} />
      </mesh>

      <ContactShadows
        position={[0, -1.25, 0]}
        opacity={0.55}
        scale={9}
        blur={2.2}
        far={3}
        color="#000000"
      />

      <ResponsiveProductCamera exploded={exploded} />

      <OrbitControls
        enablePan={false}
        enableZoom={false}
        minPolarAngle={Math.PI / 3.5}
        maxPolarAngle={Math.PI / 1.75}
        autoRotate={!reducedMotion}
        autoRotateSpeed={0.9}
      />
    </Canvas>
  );
}
