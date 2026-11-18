"use client";

import React, { useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { createRollerTextures } from "@/lib/rollerTextures";

// Custom GLSL shader for the Rubber Compounding / Thermal Fusion band & Laser Scan
const compoundingVertexShader = /* glsl */ `
  varying vec2 vUv;
  varying vec3 vNormal;
  void main() {
    vUv = uv;
    vNormal = normalize(normalMatrix * normal);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const compoundingFragmentShader = /* glsl */ `
  uniform float uTime;
  uniform float uIntensity;
  uniform float uScanPos;
  uniform float uScanActive;
  uniform vec3 uAccentColor;
  varying vec2 vUv;
  varying vec3 vNormal;

  void main() {
    // Flowing helical compounding veins
    float helix = sin((vUv.y * 28.0) + (vUv.x * 14.0) - uTime * 3.5);
    float ribbon = smoothstep(0.62, 0.98, helix);
    float microPulse = 0.5 + 0.5 * sin(uTime * 2.2 + vUv.y * 12.0);
    float compoundGlow = ribbon * uIntensity * (0.55 + 0.45 * microPulse);

    // Quality inspection laser scan band along roller axis (vUv.y maps cylinder height)
    float distToScan = abs(vUv.y - uScanPos);
    float scanCore = smoothstep(0.022, 0.0, distToScan);
    float scanHalo = smoothstep(0.11, 0.0, distToScan) * 0.35;
    float gridLine = smoothstep(0.92, 1.0, abs(sin(vUv.y * 90.0))) * scanHalo;
    float scanGlow = (scanCore + scanHalo + gridLine) * uScanActive;

    // Fresnel edge accent
    float fresnel = pow(1.0 - abs(vNormal.z), 2.5);
    float alpha = clamp(compoundGlow * 0.72 + scanGlow * 0.95 + (compoundGlow + scanGlow) * fresnel * 0.35, 0.0, 0.92);

    vec3 col = mix(uAccentColor, vec3(1.0, 0.85, 0.65), scanCore * 0.65);
    gl_FragColor = vec4(col, alpha);
  }
`;

interface IndustrialRollerMeshProps {
  mode: "hero" | "scroll" | "product";
  progressRef?: React.MutableRefObject<number>;
  reducedMotion?: boolean;
  rubberColor?: string;
  accentColor?: string;
  grooveColor?: string;
  sparkColor?: string;
  rubberFinish?: "matte" | "satin" | "grooved" | "high-contrast";
  exploded?: boolean;
  interactivePointer?: React.MutableRefObject<{ x: number; y: number }>;
}

const BOLT_COUNT = 10;
const SPARK_COUNT = 48;

export function IndustrialRollerMesh({
  mode,
  progressRef,
  reducedMotion = false,
  rubberColor = "#B91C1C",
  accentColor = "#DC2626",
  grooveColor = "#6B0F14",
  sparkColor = "#F87171",
  rubberFinish = "satin",
  exploded = false,
  interactivePointer,
}: IndustrialRollerMeshProps) {
  const rootGroupRef = useRef<THREE.Group>(null);
  const spinningAssemblyRef = useRef<THREE.Group>(null);
  const rubberSleeveRef = useRef<THREE.Mesh>(null);
  const rubberMaterialRef = useRef<THREE.MeshPhysicalMaterial>(null);
  const leftFlangeRef = useRef<THREE.Group>(null);
  const rightFlangeRef = useRef<THREE.Group>(null);
  const leftShoulderRef = useRef<THREE.Group>(null);
  const rightShoulderRef = useRef<THREE.Group>(null);
  const explodeGuidesRef = useRef<THREE.Group>(null);
  const explodeProgressRef = useRef(0);
  const bondingRingRef = useRef<THREE.Mesh>(null);
  const grinderGroupRef = useRef<THREE.Group>(null);
  const grinderWheelRef = useRef<THREE.Mesh>(null);
  const sparkLightRef = useRef<THREE.PointLight>(null);
  const sparkMeshRef = useRef<THREE.Mesh>(null);
  const sparkParticlesRef = useRef<THREE.Points>(null);
  const scanRingRef = useRef<THREE.Mesh>(null);
  const rawRingsGroupRef = useRef<THREE.Group>(null);

  const smoothProgressRef = useRef(0);

  // Precomputed ballistic trajectories for CNC grinding sparks
  const sparkData = useMemo(() => {
    const positions = new Float32Array(SPARK_COUNT * 3);
    const seeds = Array.from({ length: SPARK_COUNT }, (_, i) => {
      const a = ((i * 73.137) % 100) / 100;
      const b = ((i * 19.713) % 100) / 100;
      const c = ((i * 41.319) % 100) / 100;
      return {
        phase: a,
        vx: (b - 0.35) * 1.4,
        vy: 0.35 + c * 0.85,
        vz: 0.75 + a * 1.35,
        speed: 1.6 + b * 1.4,
      };
    });
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    return { geometry, seeds };
  }, []);

  const textures = useMemo(() => createRollerTextures(), []);

  useEffect(() => {
    return () => {
      textures.dispose();
      sparkData.geometry.dispose();
    };
  }, [textures, sparkData]);

  const shaderUniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uIntensity: { value: 0 },
      uScanPos: { value: 0.5 },
      uScanActive: { value: 0 },
      uAccentColor: { value: new THREE.Color(accentColor) },
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  useEffect(() => {
    shaderUniforms.uAccentColor.value.set(accentColor);
  }, [accentColor, shaderUniforms]);

  // Precomputed flange bolt positions around circumference
  const boltAngles = useMemo(
    () =>
      Array.from({ length: BOLT_COUNT }, (_, i) => (i / BOLT_COUNT) * Math.PI * 2),
    []
  );

  // Subtle decorative circumferential grooves for 'grooved' variant
  const grooveOffsets = useMemo(
    () => Array.from({ length: 19 }, (_, i) => -1.8 + i * 0.2),
    []
  );

  const baseRoughness =
    rubberFinish === "matte"
      ? 0.72
      : rubberFinish === "high-contrast"
        ? 0.32
        : 0.44;

  useFrame((state, delta) => {
    const dt = Math.min(delta, 0.05);
    const elapsed = state.clock.getElapsedTime();
    shaderUniforms.uTime.value = elapsed;

    if (mode === "hero" || mode === "product") {
      // Smooth Exploded-View Assembly Animation
      const targetExplode = exploded ? 1 : 0;
      explodeProgressRef.current = THREE.MathUtils.lerp(
        explodeProgressRef.current,
        targetExplode,
        reducedMotion ? 1 : Math.min(1, dt * 5.2)
      );
      const ex = explodeProgressRef.current;

      if (leftFlangeRef.current && rightFlangeRef.current) {
        leftFlangeRef.current.position.x = THREE.MathUtils.lerp(-2.07, -2.72, ex);
        rightFlangeRef.current.position.x = THREE.MathUtils.lerp(2.07, 2.72, ex);
      }
      if (leftShoulderRef.current && rightShoulderRef.current) {
        leftShoulderRef.current.position.x = THREE.MathUtils.lerp(-2.42, -3.12, ex);
        rightShoulderRef.current.position.x = THREE.MathUtils.lerp(2.42, 3.12, ex);
      }
      if (rubberSleeveRef.current) {
        rubberSleeveRef.current.position.y = THREE.MathUtils.lerp(0, 0.92, ex);
        rubberSleeveRef.current.position.z = THREE.MathUtils.lerp(0, 0.25, ex);
      }
      if (explodeGuidesRef.current) {
        explodeGuidesRef.current.visible = ex > 0.04;
        explodeGuidesRef.current.scale.set(1, Math.max(0.01, ex), 1);
      }

      if (spinningAssemblyRef.current && !reducedMotion) {
        const spinRate = mode === "hero" ? 0.42 : 0.55;
        // Slow down spin slightly in exploded view for clearer internal inspection
        spinningAssemblyRef.current.rotation.x += dt * spinRate * (1 - ex * 0.65);
      }
      if (rootGroupRef.current) {
        const px = interactivePointer?.current.x ?? 0;
        const py = interactivePointer?.current.y ?? 0;
        if (mode === "hero") {
          const targetY =
            -0.32 +
            px * 0.18 +
            ex * 0.14 +
            (reducedMotion ? 0 : Math.sin(elapsed * 0.35) * 0.06);
          const targetZ = 0.09 + py * 0.09 - ex * 0.04;
          rootGroupRef.current.rotation.y = THREE.MathUtils.lerp(
            rootGroupRef.current.rotation.y,
            targetY,
            dt * 3
          );
          rootGroupRef.current.rotation.z = THREE.MathUtils.lerp(
            rootGroupRef.current.rotation.z,
            targetZ,
            dt * 3
          );
          rootGroupRef.current.position.y = THREE.MathUtils.lerp(
            rootGroupRef.current.position.y,
            (reducedMotion ? 0 : Math.sin(elapsed * 0.9) * 0.06) - ex * 0.28,
            dt * 3
          );
        } else {
          rootGroupRef.current.rotation.y = THREE.MathUtils.lerp(
            rootGroupRef.current.rotation.y,
            -0.38 + px * 0.45,
            dt * 4
          );
          rootGroupRef.current.rotation.z = THREE.MathUtils.lerp(
            rootGroupRef.current.rotation.z,
            0.1 + py * 0.22,
            dt * 4
          );
          rootGroupRef.current.position.y = THREE.MathUtils.lerp(
            rootGroupRef.current.position.y,
            -ex * 0.25,
            dt * 4
          );
        }
      }
      return;
    }

    // === MODE: SCROLL-CONTROLLED MANUFACTURING FILM ===
    const targetP = progressRef?.current ?? 0;
    smoothProgressRef.current = THREE.MathUtils.lerp(
      smoothProgressRef.current,
      targetP,
      reducedMotion ? 1 : Math.min(1, dt * 8)
    );
    const p = smoothProgressRef.current;

    // 1. Scroll-synchronized longitudinal rotation (5 full revolutions across full scroll + gentle idle)
    if (spinningAssemblyRef.current) {
      const idleSpin = reducedMotion ? 0 : elapsed * 0.18;
      spinningAssemblyRef.current.rotation.x = p * Math.PI * 10 + idleSpin;
    }

    // 2. Subtle choreographed roller orientation across the 6 manufacturing stages
    if (rootGroupRef.current) {
      const yaw =
        -0.42 +
        Math.sin(p * Math.PI * 2.2) * 0.35 +
        (p > 0.82 ? ((p - 0.82) / 0.18) * 0.12 : 0);
      const tilt = 0.08 + Math.cos(p * Math.PI * 2.0) * 0.07;
      rootGroupRef.current.rotation.y = yaw;
      rootGroupRef.current.rotation.z = tilt;
    }

    // 3. Stage 1 (0.00 - 0.18): Raw material floating compound rings around bare steel core
    if (rawRingsGroupRef.current) {
      const rawVis = 1 - THREE.MathUtils.smoothstep(p, 0.14, 0.28);
      rawRingsGroupRef.current.visible = rawVis > 0.01;
      rawRingsGroupRef.current.scale.setScalar(0.85 + rawVis * 0.22);
      rawRingsGroupRef.current.rotation.x = elapsed * 0.6 + p * 8;
    }

    // 4. Stage 2 (0.14 - 0.38): Rubber Compounding thermal flow shader intensity
    const compIn = THREE.MathUtils.smoothstep(p, 0.13, 0.22);
    const compOut = 1 - THREE.MathUtils.smoothstep(p, 0.33, 0.44);
    shaderUniforms.uIntensity.value = compIn * compOut;

    // 5. Stage 3 (0.28 - 0.50): Rubber sleeve progressively coats & bonds from left (-2.0) to right (+2.0)
    const coatProgress = THREE.MathUtils.clamp((p - 0.26) / 0.24, 0.001, 1);
    if (rubberSleeveRef.current) {
      rubberSleeveRef.current.visible = p > 0.24;
      // Scale Y because cylinder height is along local Y (rotated Z=-PI/2 to align with world X)
      rubberSleeveRef.current.scale.set(1, coatProgress, 1);
      // Anchor sleeve growth at left end (-2.0) so it sweeps cleanly left -> right
      const fullLen = 4.0;
      const currentLen = fullLen * coatProgress;
      rubberSleeveRef.current.position.x = -fullLen / 2 + currentLen / 2;
    }

    // Bonding fusion glow ring rides the exact leading edge of the rubber coating
    if (bondingRingRef.current) {
      const bondingActive = p > 0.26 && p < 0.51;
      bondingRingRef.current.visible = bondingActive;
      bondingRingRef.current.position.x = -2.0 + coatProgress * 4.0;
    }

    // 6. Stage 4 (0.50 - 0.69): Precision CNC Grinding Wheel descends and traverses left -> right
    const grindIn = THREE.MathUtils.smoothstep(p, 0.49, 0.53);
    const grindOut = 1 - THREE.MathUtils.smoothstep(p, 0.66, 0.71);
    const grindActive = grindIn * grindOut;
    const grindSweep = THREE.MathUtils.clamp((p - 0.51) / 0.16, 0, 1);

    if (grinderGroupRef.current) {
      grinderGroupRef.current.visible = grindActive > 0.01;
      grinderGroupRef.current.position.x = THREE.MathUtils.lerp(
        -1.85,
        1.85,
        grindSweep
      );
      grinderGroupRef.current.position.y = THREE.MathUtils.lerp(
        2.6,
        1.48,
        grindActive
      );
    }
    if (grinderWheelRef.current && grindActive > 0.01) {
      grinderWheelRef.current.rotation.z -= dt * 16;
    }
    if (sparkLightRef.current) {
      sparkLightRef.current.intensity =
        grindActive > 0.5 ? 2.4 + Math.sin(elapsed * 42) * 0.7 : 0;
    }
    if (sparkMeshRef.current) {
      sparkMeshRef.current.visible = grindActive > 0.55;
      const s = 0.7 + Math.abs(Math.sin(elapsed * 35)) * 0.55;
      sparkMeshRef.current.scale.set(s * 1.4, s * 0.7, s);
    }
    if (sparkParticlesRef.current) {
      const sparksOn = grindActive > 0.45 && !reducedMotion;
      sparkParticlesRef.current.visible = sparksOn;
      if (sparksOn) {
        const posAttr = sparkData.geometry.getAttribute("position") as THREE.BufferAttribute;
        for (let i = 0; i < SPARK_COUNT; i++) {
          const s = sparkData.seeds[i];
          const life = (elapsed * s.speed + s.phase) % 1;
          const x = s.vx * life * 0.9;
          const y = -0.52 + s.vy * life * 0.75 - 1.45 * life * life;
          const z = 0.14 + s.vz * life * 1.05;
          posAttr.setXYZ(i, x, y, z);
        }
        posAttr.needsUpdate = true;
      }
    }

    // Smoothly refine rubber roughness from raw unground (0.9) to precision-ground satin (0.36)
    if (rubberMaterialRef.current) {
      const groundFactor = THREE.MathUtils.smoothstep(p, 0.52, 0.68);
      rubberMaterialRef.current.roughness = THREE.MathUtils.lerp(
        0.9,
        0.36,
        groundFactor
      );
      rubberMaterialRef.current.clearcoat = THREE.MathUtils.lerp(
        0.04,
        0.28,
        groundFactor
      );
    }

    // 7. Stage 5 (0.68 - 0.85): Quality Inspection laser metrology sweep
    const scanIn = THREE.MathUtils.smoothstep(p, 0.68, 0.72);
    const scanOut = 1 - THREE.MathUtils.smoothstep(p, 0.82, 0.87);
    const scanActive = scanIn * scanOut;
    const scanProgress = THREE.MathUtils.clamp((p - 0.70) / 0.14, 0, 1);
    const scanPos = 0.5 + Math.sin(scanProgress * Math.PI * 2 - Math.PI / 2) * 0.45;
    shaderUniforms.uScanActive.value = scanActive;
    shaderUniforms.uScanPos.value = scanPos;

    if (scanRingRef.current) {
      scanRingRef.current.visible = scanActive > 0.02;
      scanRingRef.current.position.x = (scanPos - 0.5) * 4.0;
    }
  });

  const showFullFinishedRoller = mode !== "scroll";

  return (
    <group ref={rootGroupRef}>
      {/* Rotating Roller Core + Shaft + Flanges + Rubber Sleeve */}
      <group ref={spinningAssemblyRef}>
        {/* === 1. FORGED STEEL MAIN SHAFT (Left & Right Stepped Journals) === */}
        {/* Central through-shaft — bright machined chrome-silver */}
        <mesh rotation={[0, 0, Math.PI / 2]} castShadow receiveShadow>
          <cylinderGeometry args={[0.24, 0.24, 6.4, 32]} />
          <meshStandardMaterial
            map={textures.steelAnisotropic}
            roughnessMap={textures.steelRoughness}
            metalness={0.96}
            roughness={0.14}
            color="#f1f5f9"
          />
        </mesh>

        {/* Left & Right Bearing Shoulders — polished silver journals */}
        {[-2.42, 2.42].map((xPos, idx) => (
          <group
            key={`shoulder-${idx}`}
            ref={idx === 0 ? leftShoulderRef : rightShoulderRef}
            position={[xPos, 0, 0]}
          >
            <mesh rotation={[0, 0, Math.PI / 2]} castShadow>
              <cylinderGeometry args={[0.35, 0.35, 0.44, 32]} />
              <meshStandardMaterial
                map={textures.steelAnisotropic}
                metalness={0.97}
                roughness={0.12}
                color="#f8fafc"
              />
            </mesh>
            {/* Outer bearing step */}
            <mesh
              position={[xPos > 0 ? 0.44 : -0.44, 0, 0]}
              rotation={[0, 0, Math.PI / 2]}
              castShadow
            >
              <cylinderGeometry args={[0.28, 0.28, 0.42, 32]} />
              <meshStandardMaterial
                map={textures.steelAnisotropic}
                metalness={0.96}
                roughness={0.15}
                color="#e8eef5"
              />
            </mesh>
          </group>
        ))}

        {/* Machined Drive Keyway Slot on Right Shaft */}
        <mesh position={[2.86, 0.21, 0]}>
          <boxGeometry args={[0.42, 0.08, 0.1]} />
          <meshStandardMaterial
            color="#1e2430"
            metalness={0.85}
            roughness={0.4}
          />
        </mesh>

        {/* === 2. HEAVY MACHINED SILVER END FLANGES & BOLTS === */}
        {[-2.07, 2.07].map((xPos, idx) => (
          <group
            key={`flange-${idx}`}
            ref={idx === 0 ? leftFlangeRef : rightFlangeRef}
            position={[xPos, 0, 0]}
          >
            {/* Outer beveled silver flange ring */}
            <mesh rotation={[0, 0, Math.PI / 2]} castShadow receiveShadow>
              <cylinderGeometry args={[0.91, 0.91, 0.14, 48]} />
              <meshStandardMaterial
                map={textures.steelAnisotropic}
                roughnessMap={textures.steelRoughness}
                metalness={0.96}
                roughness={0.15}
                color="#eef2f7"
              />
            </mesh>
            {/* Inner recessed brushed silver hub */}
            <mesh
              position={[xPos > 0 ? 0.08 : -0.08, 0, 0]}
              rotation={[0, 0, Math.PI / 2]}
            >
              <cylinderGeometry args={[0.64, 0.64, 0.08, 36]} />
              <meshStandardMaterial
                color="#8c98a8"
                metalness={0.92}
                roughness={0.24}
              />
            </mesh>
            {/* Machined polished silver chamfer bevel collar (no artificial neon ring) */}
            <mesh rotation={[0, Math.PI / 2, 0]}>
              <torusGeometry args={[0.915, 0.011, 12, 64]} />
              <meshStandardMaterial
                color="#f8fafc"
                roughness={0.14}
                metalness={0.98}
              />
            </mesh>
            {/* Circumferential Polished Silver Hex Bolts */}
            {boltAngles.map((angle, bIdx) => (
              <mesh
                key={bIdx}
                position={[
                  xPos > 0 ? 0.09 : -0.09,
                  Math.cos(angle) * 0.76,
                  Math.sin(angle) * 0.76,
                ]}
                rotation={[0, 0, Math.PI / 2]}
              >
                <cylinderGeometry args={[0.036, 0.036, 0.05, 6]} />
                <meshStandardMaterial
                  color="#dde4ee"
                  metalness={0.95}
                  roughness={0.18}
                />
              </mesh>
            ))}
          </group>
        ))}

        {/* === 3. SANDBLASTED SILVER-STEEL INNER CORE (Visible in Scroll Stages 1-3 & Exploded View) === */}
        <mesh rotation={[0, 0, Math.PI / 2]} castShadow receiveShadow>
          <cylinderGeometry args={[0.76, 0.76, 4.02, 48]} />
          <meshStandardMaterial
            color="#8894a6"
            bumpMap={textures.coreBlastedBump}
            bumpScale={0.018}
            metalness={0.88}
            roughness={0.42}
          />
        </mesh>

        {/* === 4. ENGINEERED VULCANIZED RED RUBBER SLEEVE === */}
        <mesh
          ref={rubberSleeveRef}
          rotation={[0, 0, Math.PI / 2]}
          castShadow
          receiveShadow
          visible={showFullFinishedRoller}
        >
          <cylinderGeometry args={[0.96, 0.96, 4.0, 64, 1, false]} />
          <meshPhysicalMaterial
            ref={rubberMaterialRef}
            color={rubberColor}
            bumpMap={textures.rubberBump}
            bumpScale={0.012}
            roughnessMap={textures.rubberRoughness}
            roughness={baseRoughness}
            metalness={0.06}
            clearcoat={0.28}
            clearcoatRoughness={0.38}
          />
        </mesh>

        {/* Optional micro-grooves for Custom/Grooved roller preview */}
        {mode !== "scroll" &&
          rubberFinish === "grooved" &&
          grooveOffsets.map((gx, i) => (
            <mesh key={i} position={[gx, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
              <torusGeometry args={[0.962, 0.008, 8, 48]} />
              <meshStandardMaterial
                color={grooveColor}
                roughness={0.8}
                metalness={0.08}
              />
            </mesh>
          ))}

        {/* === 5. CUSTOM GLSL SHADER OVERLAY (Compounding Thermal Veins + Laser Scan) === */}
        {mode === "scroll" && (
          <mesh rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.972, 0.972, 4.02, 64, 1, true]} />
            <shaderMaterial
              vertexShader={compoundingVertexShader}
              fragmentShader={compoundingFragmentShader}
              uniforms={shaderUniforms}
              transparent
              depthWrite={false}
              blending={THREE.AdditiveBlending}
            />
          </mesh>
        )}

        {/* === 6. STAGE 1 RAW ELASTOMER BANDS (Visible only in Scroll Stage 1) === */}
        {mode === "scroll" && (
          <group ref={rawRingsGroupRef}>
            {[-1.1, 0, 1.1].map((rx, idx) => (
              <mesh key={idx} position={[rx, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
                <torusGeometry args={[1.18, 0.032, 16, 64]} />
                <meshStandardMaterial
                  color={accentColor}
                  emissive={accentColor}
                  emissiveIntensity={0.5}
                  roughness={0.38}
                  metalness={0.25}
                  transparent
                  opacity={0.78}
                />
              </mesh>
            ))}
          </group>
        )}
        {/* === 6B. EXPLODED VIEW ALIGNMENT GUIDE STRUTS (Hero/Product Modes) === */}
        {mode !== "scroll" && (
          <group ref={explodeGuidesRef} visible={false}>
            {[-1.5, 0, 1.5].map((gx, idx) => (
              <mesh key={`guide-${idx}`} position={[gx, 0.48, 0.12]}>
                <cylinderGeometry args={[0.008, 0.008, 0.96, 8]} />
                <meshBasicMaterial color={accentColor} transparent opacity={0.65} />
              </mesh>
            ))}
          </group>
        )}
      </group>

      {/* === 7. NON-ROTATING MANUFACTURING TOOLING (Scroll Mode Only) === */}
      {mode === "scroll" && (
        <>
          {/* Bonding leading-edge glow ring */}
          <mesh ref={bondingRingRef} rotation={[0, Math.PI / 2, 0]} visible={false}>
            <torusGeometry args={[0.99, 0.028, 16, 64]} />
            <meshBasicMaterial color={accentColor} transparent opacity={0.94} />
          </mesh>

          {/* Precision CNC Cylindrical Grinding Wheel Assembly */}
          <group ref={grinderGroupRef} position={[-1.85, 2.6, 0]} visible={false}>
            {/* Abrasive Grinding Stone Wheel */}
            <mesh ref={grinderWheelRef} castShadow>
              <cylinderGeometry args={[0.52, 0.52, 0.28, 40]} />
              <meshStandardMaterial
                color="#8c96a6"
                roughness={0.74}
                metalness={0.28}
              />
            </mesh>
            {/* Wheel metallic center hub */}
            <mesh>
              <cylinderGeometry args={[0.2, 0.2, 0.32, 24]} />
              <meshStandardMaterial
                color="#eef2f7"
                metalness={0.95}
                roughness={0.16}
              />
            </mesh>
            {/* Industrial protective guard hood */}
            <mesh position={[0, 0.28, 0]}>
              <boxGeometry args={[1.18, 0.36, 0.42]} />
              <meshStandardMaterial
                color="#1c212b"
                metalness={0.78}
                roughness={0.32}
              />
            </mesh>
            {/* Dynamic accent bar on grinder head */}
            <mesh position={[0, 0.47, 0.21]}>
              <boxGeometry args={[1.12, 0.06, 0.04]} />
              <meshStandardMaterial
                color={accentColor}
                emissive={accentColor}
                emissiveIntensity={0.75}
              />
            </mesh>
            {/* Vertical spindle carriage arm */}
            <mesh position={[0, 0.95, 0]}>
              <boxGeometry args={[0.32, 1.1, 0.32]} />
              <meshStandardMaterial
                color="#333c4a"
                metalness={0.88}
                roughness={0.26}
              />
            </mesh>
            {/* Precision grinding contact glow, ballistic spark spray & point light */}
            <mesh ref={sparkMeshRef} position={[0, -0.52, 0.14]} visible={false}>
              <sphereGeometry args={[0.075, 16, 16]} />
              <meshBasicMaterial color={sparkColor} transparent opacity={0.95} />
            </mesh>
            <points
              ref={sparkParticlesRef}
              geometry={sparkData.geometry}
              visible={false}
            >
              <pointsMaterial
                color={sparkColor}
                size={0.055}
                transparent
                opacity={0.95}
                blending={THREE.AdditiveBlending}
                depthWrite={false}
                sizeAttenuation
              />
            </points>
            <pointLight
              ref={sparkLightRef}
              position={[0, -0.52, 0.25]}
              color={accentColor}
              intensity={0}
              distance={3.2}
            />
          </group>

          {/* Quality Inspection Laser Metrology Ring */}
          <mesh ref={scanRingRef} rotation={[0, Math.PI / 2, 0]} visible={false}>
            <torusGeometry args={[1.12, 0.016, 12, 72]} />
            <meshBasicMaterial color={accentColor} transparent opacity={0.92} />
          </mesh>
        </>
      )}
    </group>
  );
}
