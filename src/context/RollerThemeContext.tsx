"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

export interface RollerCompoundTheme {
  id: string;
  label: string;
  rubberColor: string;
  grooveColor: string;
  finish: "matte" | "satin" | "grooved" | "high-contrast";
  swatch: string;
  accentHex: string;
  accentBrightHex: string;
  accentRgb: string;
  accentBrightRgb: string;
  accentDimRgb: string;
  meshDeepRgb: string;
  meshMidRgb: string;
  meshHotRgb: string;
  sparkColor: string;
}

export const ROLLER_THEMES: RollerCompoundTheme[] = [
  {
    id: "industrial-red",
    label: "Industrial Red",
    rubberColor: "#C81E32",
    grooveColor: "#6B0F1A",
    finish: "satin",
    swatch: "#DC2626",
    accentHex: "#DC2626",
    accentBrightHex: "#EF4444",
    accentRgb: "220 38 38",
    accentBrightRgb: "239 68 68",
    accentDimRgb: "153 27 27",
    meshDeepRgb: "115 12 22",
    meshMidRgb: "198 22 36",
    meshHotRgb: "255 48 64",
    sparkColor: "#FCA5A5",
  },
  {
    id: "carbon-black",
    label: "Carbon Black",
    rubberColor: "#1D2026",
    grooveColor: "#0B0D11",
    finish: "matte",
    swatch: "#2A2F3A",
    accentHex: "#E2E8F0",
    accentBrightHex: "#FFFFFF",
    accentRgb: "203 213 225",
    accentBrightRgb: "241 245 249",
    accentDimRgb: "148 163 184",
    meshDeepRgb: "30 41 59",
    meshMidRgb: "71 85 105",
    meshHotRgb: "203 213 225",
    sparkColor: "#E2E8F0",
  },
  {
    id: "emerald-green",
    label: "Emerald Green",
    rubberColor: "#12B76A",
    grooveColor: "#065F46",
    finish: "satin",
    swatch: "#16C768",
    accentHex: "#10B981",
    accentBrightHex: "#34D399",
    accentRgb: "16 185 129",
    accentBrightRgb: "52 211 153",
    accentDimRgb: "5 150 105",
    meshDeepRgb: "6 78 59",
    meshMidRgb: "5 150 105",
    meshHotRgb: "52 211 153",
    sparkColor: "#6EE7B7",
  },
  {
    id: "slate-blue",
    label: "Steel Blue",
    rubberColor: "#3B6285",
    grooveColor: "#1E3A5F",
    finish: "grooved",
    swatch: "#4A78A0",
    accentHex: "#3B82F6",
    accentBrightHex: "#60A5FA",
    accentRgb: "59 130 246",
    accentBrightRgb: "96 165 250",
    accentDimRgb: "37 99 235",
    meshDeepRgb: "23 37 84",
    meshMidRgb: "29 78 216",
    meshHotRgb: "96 165 250",
    sparkColor: "#93C5FD",
  },
  {
    id: "violet-silicone",
    label: "Violet Silicone",
    rubberColor: "#7E79A8",
    grooveColor: "#4C4770",
    finish: "high-contrast",
    swatch: "#8B85B8",
    accentHex: "#8B5CF6",
    accentBrightHex: "#A78BFA",
    accentRgb: "139 92 246",
    accentBrightRgb: "167 139 250",
    accentDimRgb: "109 40 217",
    meshDeepRgb: "59 7 100",
    meshMidRgb: "109 40 217",
    meshHotRgb: "192 132 252",
    sparkColor: "#DDD6FE",
  },
];

interface RollerThemeContextValue {
  activeTheme: RollerCompoundTheme;
  setActiveThemeById: (id: string) => void;
}

const RollerThemeContext = createContext<RollerThemeContextValue>({
  activeTheme: ROLLER_THEMES[0],
  setActiveThemeById: () => {},
});

export function RollerThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [activeTheme, setActiveTheme] = useState<RollerCompoundTheme>(
    ROLLER_THEMES[0]
  );

  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty("--accent-rgb", activeTheme.accentRgb);
    root.style.setProperty("--accent-bright-rgb", activeTheme.accentBrightRgb);
    root.style.setProperty("--accent-dim-rgb", activeTheme.accentDimRgb);
    root.style.setProperty("--accent-hex", activeTheme.accentHex);
    root.style.setProperty("--mesh-deep-rgb", activeTheme.meshDeepRgb);
    root.style.setProperty("--mesh-mid-rgb", activeTheme.meshMidRgb);
    root.style.setProperty("--mesh-hot-rgb", activeTheme.meshHotRgb);
  }, [activeTheme]);

  const setActiveThemeById = useCallback((id: string) => {
    const found = ROLLER_THEMES.find((t) => t.id === id);
    if (found) setActiveTheme(found);
  }, []);

  const value = useMemo(
    () => ({ activeTheme, setActiveThemeById }),
    [activeTheme, setActiveThemeById]
  );

  return (
    <RollerThemeContext.Provider value={value}>
      {children}
    </RollerThemeContext.Provider>
  );
}

export function useRollerTheme() {
  return useContext(RollerThemeContext);
}
