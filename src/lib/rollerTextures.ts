import * as THREE from "three";

export interface RollerTextureSet {
  rubberBump: THREE.CanvasTexture;
  rubberRoughness: THREE.CanvasTexture;
  steelAnisotropic: THREE.CanvasTexture;
  steelRoughness: THREE.CanvasTexture;
  coreBlastedBump: THREE.CanvasTexture;
  dispose: () => void;
}

/**
 * Generates lightweight procedural PBR textures in memory so the 3D roller
 * loads instantaneously with realistic micro-ground elastomer grain and
 * lathe-turned steel shaft finishes—without heavy external texture files.
 */
export function createRollerTextures(): RollerTextureSet {
  // 1. Precision-ground rubber bump map (fine circumferential lathe/grinding micro-lines + elastomer grain)
  const rubberBumpCanvas = document.createElement("canvas");
  rubberBumpCanvas.width = 512;
  rubberBumpCanvas.height = 512;
  const rbCtx = rubberBumpCanvas.getContext("2d")!;
  rbCtx.fillStyle = "#808080";
  rbCtx.fillRect(0, 0, 512, 512);

  // Subtle circumferential grinding tracks (along V axis of cylinder)
  for (let y = 0; y < 512; y++) {
    const wave = Math.sin(y * 1.4) * 9 + Math.sin(y * 0.37) * 5;
    const v = Math.max(0, Math.min(255, Math.round(128 + wave)));
    rbCtx.fillStyle = `rgb(${v},${v},${v})`;
    rbCtx.fillRect(0, y, 512, 1);
  }

  // Fine vulcanized rubber micro-stipple
  const imgData = rbCtx.getImageData(0, 0, 512, 512);
  let seed = 1337;
  const rand = () => {
    seed = (seed * 16807) % 2147483647;
    return (seed - 1) / 2147483646;
  };
  for (let i = 0; i < imgData.data.length; i += 4) {
    const noise = (rand() - 0.5) * 26;
    imgData.data[i] = Math.max(0, Math.min(255, imgData.data[i] + noise));
    imgData.data[i + 1] = imgData.data[i];
    imgData.data[i + 2] = imgData.data[i];
  }
  rbCtx.putImageData(imgData, 0, 0);

  const rubberBump = new THREE.CanvasTexture(rubberBumpCanvas);
  rubberBump.wrapS = THREE.RepeatWrapping;
  rubberBump.wrapT = THREE.RepeatWrapping;
  rubberBump.repeat.set(4, 3);
  rubberBump.needsUpdate = true;

  // 2. Rubber roughness map (micro-satin variation)
  const rubberRoughCanvas = document.createElement("canvas");
  rubberRoughCanvas.width = 256;
  rubberRoughCanvas.height = 256;
  const rrCtx = rubberRoughCanvas.getContext("2d")!;
  rrCtx.fillStyle = "#a8a8a8";
  rrCtx.fillRect(0, 0, 256, 256);
  for (let y = 0; y < 256; y += 2) {
    const shade = 152 + Math.round(Math.sin(y * 0.45) * 14 + (rand() - 0.5) * 18);
    rrCtx.fillStyle = `rgb(${shade},${shade},${shade})`;
    rrCtx.fillRect(0, y, 256, 2);
  }
  const rubberRoughness = new THREE.CanvasTexture(rubberRoughCanvas);
  rubberRoughness.wrapS = THREE.RepeatWrapping;
  rubberRoughness.wrapT = THREE.RepeatWrapping;
  rubberRoughness.repeat.set(2, 4);
  rubberRoughness.needsUpdate = true;

  // 3. Turned / Brushed Chrome-Silver Steel Shaft Texture
  const steelCanvas = document.createElement("canvas");
  steelCanvas.width = 512;
  steelCanvas.height = 256;
  const sCtx = steelCanvas.getContext("2d")!;
  const grad = sCtx.createLinearGradient(0, 0, 0, 256);
  grad.addColorStop(0, "#d4dce6");
  grad.addColorStop(0.28, "#f8fafc");
  grad.addColorStop(0.52, "#c2ccd9");
  grad.addColorStop(0.78, "#eef2f7");
  grad.addColorStop(1, "#cfd8e3");
  sCtx.fillStyle = grad;
  sCtx.fillRect(0, 0, 512, 256);

  for (let y = 0; y < 256; y++) {
    const alpha = 0.03 + rand() * 0.06;
    sCtx.fillStyle = rand() > 0.45 ? `rgba(255,255,255,${alpha})` : `rgba(30,41,59,${alpha})`;
    sCtx.fillRect(0, y, 512, 1);
  }

  const steelAnisotropic = new THREE.CanvasTexture(steelCanvas);
  steelAnisotropic.wrapS = THREE.RepeatWrapping;
  steelAnisotropic.wrapT = THREE.RepeatWrapping;
  steelAnisotropic.repeat.set(1, 3);
  steelAnisotropic.colorSpace = THREE.SRGBColorSpace;
  steelAnisotropic.needsUpdate = true;

  // 4. Steel Roughness Map
  const steelRoughCanvas = document.createElement("canvas");
  steelRoughCanvas.width = 256;
  steelRoughCanvas.height = 256;
  const srCtx = steelRoughCanvas.getContext("2d")!;
  srCtx.fillStyle = "#4c4c4c";
  srCtx.fillRect(0, 0, 256, 256);
  for (let y = 0; y < 256; y++) {
    const v = 55 + Math.round(rand() * 40);
    srCtx.fillStyle = `rgb(${v},${v},${v})`;
    srCtx.fillRect(0, y, 256, 1);
  }
  const steelRoughness = new THREE.CanvasTexture(steelRoughCanvas);
  steelRoughness.wrapS = THREE.RepeatWrapping;
  steelRoughness.wrapT = THREE.RepeatWrapping;
  steelRoughness.repeat.set(1, 4);
  steelRoughness.needsUpdate = true;

  // 5. Sandblasted Inner Metal Core Texture (exposed before rubber coating stage)
  const coreCanvas = document.createElement("canvas");
  coreCanvas.width = 256;
  coreCanvas.height = 256;
  const cCtx = coreCanvas.getContext("2d")!;
  const coreImg = cCtx.createImageData(256, 256);
  for (let i = 0; i < coreImg.data.length; i += 4) {
    const v = Math.round(85 + rand() * 90);
    coreImg.data[i] = v;
    coreImg.data[i + 1] = v;
    coreImg.data[i + 2] = v;
    coreImg.data[i + 3] = 255;
  }
  cCtx.putImageData(coreImg, 0, 0);
  const coreBlastedBump = new THREE.CanvasTexture(coreCanvas);
  coreBlastedBump.wrapS = THREE.RepeatWrapping;
  coreBlastedBump.wrapT = THREE.RepeatWrapping;
  coreBlastedBump.repeat.set(4, 4);
  coreBlastedBump.needsUpdate = true;

  return {
    rubberBump,
    rubberRoughness,
    steelAnisotropic,
    steelRoughness,
    coreBlastedBump,
    dispose: () => {
      rubberBump.dispose();
      rubberRoughness.dispose();
      steelAnisotropic.dispose();
      steelRoughness.dispose();
      coreBlastedBump.dispose();
    },
  };
}
