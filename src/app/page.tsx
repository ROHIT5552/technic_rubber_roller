import React from "react";
import { HeroSection } from "@/components/sections/HeroSection";
import { ManufacturingScrollSection } from "@/components/sections/ManufacturingScrollSection";
import { ProductShowcaseSection } from "@/components/sections/ProductShowcaseSection";
import { IndustriesAndServicesSection } from "@/components/sections/IndustriesAndServicesSection";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ManufacturingScrollSection />
      <ProductShowcaseSection />
      <IndustriesAndServicesSection />
    </>
  );
}
