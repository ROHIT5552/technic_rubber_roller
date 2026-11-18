export const COMPANY = {
  name: "Tecknik Rubber Roller Products",
  shortName: "TECKNIK",
  tagline: "Where Precision Meets Performance.",
  metaTagline: "Precision That Drives Industry",
  heroHeadline: "ENGINEERING PRECISION. DEFINING PERFORMANCE.",
  scopeSummary:
    "Manufacturer of All Types of Industrial Rubber Rollers, Recoating, Precision Grinding, and Custom Roller Solutions.",
  establishedYear: 2004,
  yearsExperience: "22+",
  address:
    "Plot No: E-24/79 Chikalthana MIDC, Chhatrapati Sambhajinagar, Maharashtra 431006, India",
  addressShort: "Chikalthana MIDC, Chhatrapati Sambhajinagar, Maharashtra",
  phones: ["+91 93263 09595", "+91 98346 25634"],
  whatsappNumber: "919326309595",
  email: "contact@tecknikrubberroller.com",
  website: "https://tecknikrubberroller.com",
  mapEmbedUrl:
    "https://maps.google.com/maps?q=Chikalthana%20MIDC%20Chhatrapati%20Sambhajinagar%20Maharashtra%20431006&t=&z=14&ie=UTF8&iwloc=&output=embed",
  socials: {
    facebook: "https://www.facebook.com/share/1EV1d7Ys1i/",
    instagram:
      "https://www.instagram.com/tecknik_rubber_rollers01?igsh=MTUwcWcyMXJpbmJlZQ==",
    linkedin: "https://www.linkedin.com/company/tecknik-rubber-roller",
  },
  aboutIntro:
    "Tecknik Rubber Roller Products is a trusted manufacturer of industrial rubber rollers, serving diverse industries with precision-engineered solutions. Backed by industry experience since 2004 and advanced manufacturing capabilities, we deliver durable, high-performance rollers designed to maximize efficiency, reliability, and productivity.",
  infrastructureIntro:
    "Tecknik Rubber Roller Products operates a modern manufacturing facility equipped with advanced rubber mixing mills, precision grinding machines, coating and bonding systems, and quality inspection equipment. Our integrated infrastructure enables us to manufacture, refurbish, and customize industrial rubber rollers with exceptional precision and consistency. Backed by skilled technical expertise and advanced technology, we maintain the highest standards of quality, durability, and performance. This commitment allows us to deliver reliable roller solutions that enhance productivity and reduce downtime across diverse industries.",
  vision:
    "To be the most trusted and innovative industrial rubber roller manufacturer, delivering precision, performance, and reliability to industries worldwide.",
  mission:
    "To provide high-quality rubber roller solutions through advanced manufacturing, skilled craftsmanship, and customer-focused service that enhances operational efficiency and productivity.",
} as const;

export const MEDIA = {
  logo: "/images/tecknik/logo.png",
  logoRemote:
    "https://tecknikrubberroller.com/wp-content/uploads/2026/06/ChatGPT_Image_Jun_17__2026__08_21_44_PM-removebg-preview.png",
  heroMachine: "/images/tecknik/hero-machine.png",
  featuredRoller: "/images/tecknik/photo-trr.png",
  facility1: "/images/tecknik/facility-1.jpg",
  facility2: "/images/tecknik/facility-2.jpg",
  facility3: "/images/tecknik/facility-3.jpg",
  facility4: "/images/tecknik/facility-4.jpg",
  plant1: "/images/tecknik/plant-1.jpg",
  plant2: "/images/tecknik/plant-2.jpg",
  plant3: "/images/tecknik/plant-3.jpg",
  rollerDetail1: "/images/tecknik/roller-detail-1.jpg",
  rollerDetail2: "/images/tecknik/roller-detail-2.jpg",
  rollerDetail3: "/images/tecknik/roller-detail-3.jpg",
  aboutFeature: "/images/tecknik/about-feature.png",
} as const;

export const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about-us" },
  { label: "Products", href: "/products" },
  { label: "Services", href: "/services" },
  { label: "Testimonials", href: "/testimonials" },
  { label: "Contact Us", href: "/contact-us" },
] as const;

export interface ManufacturingStage {
  id: string;
  index: string;
  title: string;
  shortTitle: string;
  subtitle: string;
  description: string;
  capabilityNote: string;
  telemetryLabel: string;
  telemetryStatus: string;
  image: string;
}

export const MANUFACTURING_STAGES: ManufacturingStage[] = [
  {
    id: "raw-material",
    index: "01",
    title: "Raw Material Selection",
    shortTitle: "Raw Material",
    subtitle: "Foundation of Roller Longevity",
    description:
      "Every industrial roller begins with disciplined material selection—matching base elastomers and metal core preparation to the specific operational, thermal, and mechanical demands of the target industrial line.",
    capabilityNote:
      "Application-matched elastomer selection & metal core preparation",
    telemetryLabel: "STAGE 01 // MATERIAL INTAKE",
    telemetryStatus: "ELASTOMER & CORE VERIFICATION",
    image: MEDIA.facility1,
  },
  {
    id: "compounding",
    index: "02",
    title: "Rubber Compounding",
    shortTitle: "Compounding",
    subtitle: "Advanced In-House Rubber Mixing Mills",
    description:
      "In-house rubber mixing mills homogenize raw elastomer compounds with strict batch consistency—ensuring uniform density, resilience, and long service life under continuous industrial loads.",
    capabilityNote: "Processed on Tecknik's in-house advanced rubber mixing mills",
    telemetryLabel: "STAGE 02 // MIXING MILL",
    telemetryStatus: "COMPOUND HOMOGENIZATION",
    image: MEDIA.plant1,
  },
  {
    id: "roller-manufacturing",
    index: "03",
    title: "Roller Coating & Bonding",
    shortTitle: "Coating & Bonding",
    subtitle: "Integrated Metal-to-Rubber Bonding Systems",
    description:
      "Precision coating and bonding systems fuse formulated rubber layers onto engineered metal cores, delivering seamless adhesion designed to resist delamination and reduce operational downtime.",
    capabilityNote: "Dedicated coating & bonding infrastructure for new & recoated cores",
    telemetryLabel: "STAGE 03 // BONDING SYSTEM",
    telemetryStatus: "CORE-TO-ELASTOMER FUSION",
    image: MEDIA.facility2,
  },
  {
    id: "grinding-finishing",
    index: "04",
    title: "Precision Grinding & Finishing",
    shortTitle: "Grinding",
    subtitle: "High-Accuracy Cylindrical Surface Finishing",
    description:
      "Precision grinding machines finish each roller surface to smooth concentric geometry—delivering uniform contact pressure, clean web tracking, and dependable industrial repeatability.",
    capabilityNote: "Dedicated precision grinding machinery for cylindrical finishing",
    telemetryLabel: "STAGE 04 // PRECISION GRIND",
    telemetryStatus: "SURFACE CONCENTRICITY PASS",
    image: MEDIA.facility3,
  },
  {
    id: "quality-inspection",
    index: "05",
    title: "Quality Inspection",
    shortTitle: "Inspection",
    subtitle: "Stage-Wise Quality Assured Production",
    description:
      "Every finished roller undergoes thorough evaluation with dedicated quality inspection equipment—checking surface uniformity, dimensional consistency, and finish integrity before dispatch.",
    capabilityNote: "Strict quality standards maintained at every stage of manufacturing",
    telemetryLabel: "STAGE 05 // QUALITY ASSURANCE",
    telemetryStatus: "DIMENSIONAL & SURFACE CHECK",
    image: MEDIA.facility4,
  },
  {
    id: "final-product",
    index: "06",
    title: "Final Engineered Roller",
    shortTitle: "Final Roller",
    subtitle: "Built for Continuous Industrial Performance",
    description:
      "The finished Tecknik rubber roller leaves our Chikalthana MIDC facility ready for reliable deployment—combining over 22 years of technical craftsmanship with timely delivery.",
    capabilityNote: "Long service life products backed by timely delivery",
    telemetryLabel: "STAGE 06 // DISPATCH READY",
    telemetryStatus: "TECKNIK QUALITY CERTIFIED",
    image: MEDIA.featuredRoller,
  },
];

export interface ProductItem {
  id: string;
  code: string;
  name: string;
  category: string;
  shortDescription: string;
  fullDescription: string;
  image: string;
  accentColor: string;
  rubberFinish: "matte" | "satin" | "grooved" | "high-contrast";
  specifications: { label: string; value: string }[];
  applications: string[];
  highlights: string[];
}

export const PRODUCTS: ProductItem[] = [
  {
    id: "industrial-rubber-rollers",
    code: "TRR-01",
    name: "Industrial Rubber Rollers",
    category: "Core Manufacturing",
    shortDescription:
      "Complete precision-engineered rubber rollers manufactured for heavy-duty industrial lines requiring durability and consistent operational performance.",
    fullDescription:
      "Manufactured at our Chikalthana MIDC facility, Tecknik's Industrial Rubber Rollers are engineered from compound mixing through final precision grinding to maximize efficiency, reliability, and service life across demanding industrial workflows.",
    image: MEDIA.featuredRoller,
    accentColor: "#DC2626",
    rubberFinish: "satin",
    specifications: [
      { label: "Manufacturing Scope", value: "Complete New Roller Fabrication" },
      { label: "Compounding", value: "In-House Rubber Mixing Mills" },
      { label: "Surface Finish", value: "Precision Cylindrical Grinding" },
      { label: "Dimensions & Compound", value: "Custom-Built to Client Specification" },
    ],
    applications: [
      "Continuous Process Lines",
      "Web Handling & Feeding Systems",
      "Industrial Pressing & Conveyance",
      "General Manufacturing Machinery",
    ],
    highlights: [
      "Built on 22+ years of industrial manufacturing experience",
      "Strong metal-to-rubber bonding for long service life",
      "Stage-wise quality inspection before dispatch",
    ],
  },
  {
    id: "custom-engineered-rollers",
    code: "TRR-02",
    name: "Custom-Engineered Roller Solutions",
    category: "Bespoke Engineering",
    shortDescription:
      "Application-specific rubber rollers engineered to your exact machine drawings, operating conditions, and industrial performance targets.",
    fullDescription:
      "When off-the-shelf rollers fall short, our technical team collaborates directly with plant engineers to manufacture custom roller solutions—combining bespoke elastomer compounding, bonding systems, and precision finishing tailored to exact industrial requirements.",
    image: MEDIA.rollerDetail1,
    accentColor: "#E4E8EE",
    rubberFinish: "grooved",
    specifications: [
      { label: "Design Approach", value: "Built to Customer Drawings & Samples" },
      { label: "Bonding System", value: "Integrated Coating & Bonding" },
      { label: "Finishing", value: "Custom Surface & Profile Grinding" },
      { label: "Quality Standard", value: "Stage-Wise Inspection Assured" },
    ],
    applications: [
      "Specialized OEM Equipment",
      "Custom Processing Lines",
      "High-Wear Industrial Stations",
      "Non-Standard Roller Assemblies",
    ],
    highlights: [
      "Direct technical consultation with experienced specialists",
      "Tailored to enhance operational efficiency and reduce downtime",
      "Consistent batch-to-batch repeatability",
    ],
  },
  {
    id: "recoated-refurbished-rollers",
    code: "TRR-03",
    name: "Recoated & Refurbished Rollers",
    category: "Lifecycle Extension",
    shortDescription:
      "Expert stripping, surface preparation, rubber recoating, and re-grinding to restore worn industrial cores to peak factory performance.",
    fullDescription:
      "Tecknik's rubber recoating expertise extends the productive lifespan of your existing metal roller cores. We refurbish worn rollers using advanced bonding systems, freshly compounded rubber, and precision grinding—minimizing replacement cost and downtime.",
    image: MEDIA.rollerDetail2,
    accentColor: "#EF4444",
    rubberFinish: "matte",
    specifications: [
      { label: "Service Scope", value: "Core Refurbishment & Full Recoating" },
      { label: "Bonding", value: "Industrial Metal-to-Rubber Re-Bonding" },
      { label: "Finishing", value: "Full Precision Re-Grinding" },
      { label: "Turnaround", value: "Planned for Timely Industrial Delivery" },
    ],
    applications: [
      "Maintenance & Overhaul Programs",
      "Worn Drive & Nip Roller Recovery",
      "Cost-Effective Core Reuse",
      "Scheduled Plant Turnarounds",
    ],
    highlights: [
      "Preserves high-value steel shafts and cores",
      "Restores original surface geometry and performance",
      "Backed by Tecknik's dedicated recoating expertise",
    ],
  },
  {
    id: "precision-ground-rollers",
    code: "TRR-04",
    name: "Precision-Ground Rubber Rollers",
    category: "Surface Finishing",
    shortDescription:
      "High-uniformity rubber rollers finished on dedicated precision grinding machines for smooth rotational balance and consistent surface contact.",
    fullDescription:
      "Surface accuracy defines roller performance on modern high-speed machinery. Utilizing dedicated precision grinding machines and inspection tools, we produce finely finished rubber rollers built for uniform contact and dependable operational stability.",
    image: MEDIA.rollerDetail3,
    accentColor: "#949DAA",
    rubberFinish: "high-contrast",
    specifications: [
      { label: "Machinery", value: "Dedicated Precision Grinding Machines" },
      { label: "Surface Quality", value: "Uniform Concentric Finish" },
      { label: "Inspection", value: "In-House Quality Inspection Equipment" },
      { label: "Availability", value: "New Rollers & Re-Grinding Service" },
    ],
    applications: [
      "High-Speed Laminating & Coating",
      "Precision Printing & Converting",
      "Film, Foil & Paper Processing",
      "Uniform Pressure Nip Stations",
    ],
    highlights: [
      "Smooth rotational stability across the full face width",
      "Minimizes vibration and uneven material wear",
      "Verified through stage-wise quality inspection",
    ],
  },
];

export interface IndustryItem {
  id: string;
  index: string;
  name: string;
  tagline: string;
  description: string;
  rollerRole: string;
  image: string;
}

export const INDUSTRIES: IndustryItem[] = [
  {
    id: "printing",
    index: "01",
    name: "Printing",
    tagline: "Consistent Surface Contact for Clean Impressions",
    description:
      "Precision-ground rubber rollers engineered for reliable ink transfer, uniform nip pressure, and smooth web feeding across commercial and industrial printing equipment.",
    rollerRole: "Inking, Dampening, Feed & Impression Rollers",
    image: MEDIA.facility1,
  },
  {
    id: "textile",
    index: "02",
    name: "Textile",
    tagline: "Dependable Performance Across Continuous Processing",
    description:
      "Durable industrial rubber rollers built to handle continuous fabric guiding, squeezing, padding, and finishing lines while maintaining consistent surface performance.",
    rollerRole: "Squeezing, Padding, Guide & Finishing Rollers",
    image: MEDIA.facility2,
  },
  {
    id: "steel",
    index: "03",
    name: "Steel",
    tagline: "Heavy-Duty Reliability Under Demanding Industrial Loads",
    description:
      "Rugged, strongly bonded industrial rollers designed for metal strip handling, tensioning, and processing environments where core integrity and durability are paramount.",
    rollerRole: "Bridle, Pinch, Guide & Strip-Handling Rollers",
    image: MEDIA.plant2,
  },
  {
    id: "packaging",
    index: "04",
    name: "Packaging",
    tagline: "High-Speed Stability for Modern Converting Lines",
    description:
      "Precision-finished rollers supporting laminating, film transport, sealing, and converting operations where smooth surface geometry reduces web defects and downtime.",
    rollerRole: "Laminating, Nip, Pull & Converting Rollers",
    image: MEDIA.facility3,
  },
  {
    id: "paper",
    index: "05",
    name: "Paper",
    tagline: "Uniform Pressure Across Wide-Format Production",
    description:
      "Engineered rubber rollers manufactured and recoated to support pressing, guiding, and finishing stations with long service life and consistent surface contact.",
    rollerRole: "Press, Guide, Coating & Reeling Rollers",
    image: MEDIA.plant3,
  },
  {
    id: "diverse-industrial",
    index: "06",
    name: "Diverse & Custom Industries",
    tagline: "Tailored Solutions Beyond Standard Categories",
    description:
      "Tecknik serves diverse industrial sectors across India with custom-manufactured and refurbished rubber rollers engineered directly to unique plant and OEM requirements.",
    rollerRole: "Custom OEM & Specialized Process Rollers",
    image: MEDIA.facility4,
  },
];

export interface ServiceItem {
  id: string;
  index: string;
  title: string;
  subtitle: string;
  description: string;
  keyPoints: string[];
  image: string;
}

export const SERVICES: ServiceItem[] = [
  {
    id: "roller-manufacturing",
    index: "01",
    title: "Industrial Rubber Roller Manufacturing",
    subtitle: "End-to-End New Roller Production",
    description:
      "Complete manufacturing of industrial rubber rollers tailored to operational demands—combining in-house rubber compounding, bonding, and precision grinding under one roof.",
    keyPoints: [
      "All types of industrial rubber rollers",
      "Integrated in-house production control",
      "Quality assured from raw compound to dispatch",
    ],
    image: MEDIA.featuredRoller,
  },
  {
    id: "rubber-recoating",
    index: "02",
    title: "Rubber Recoating & Refurbishing",
    subtitle: "Restore Core Performance & Extend Lifespan",
    description:
      "Specialized refurbishing and rubber recoating for worn industrial rollers—stripping aged elastomer, re-bonding fresh compounds, and restoring precise surface geometry.",
    keyPoints: [
      "Dedicated rubber recoating expertise",
      "Cost-effective extension of existing metal cores",
      "Minimizes plant downtime with timely delivery",
    ],
    image: MEDIA.facility2,
  },
  {
    id: "precision-grinding",
    index: "03",
    title: "Precision Cylindrical Grinding",
    subtitle: "Accurate Surface Geometry & Finish",
    description:
      "Dedicated precision grinding services for both newly manufactured rollers and maintenance re-grinding—restoring surface uniformity and rotational reliability.",
    keyPoints: [
      "Operated on dedicated precision grinding machines",
      "Restores smooth surface finish on worn rollers",
      "Verified with quality inspection equipment",
    ],
    image: MEDIA.facility3,
  },
  {
    id: "custom-solutions",
    index: "04",
    title: "Custom Roller Engineering",
    subtitle: "Built to Exact Industrial Specifications",
    description:
      "Collaborative engineering and custom manufacturing for unique industrial applications—adapting compound mixing, coating, and finishing to match your machine specifications.",
    keyPoints: [
      "Manufactured to customer drawings or sample rollers",
      "In-house rubber mixing mills & bonding systems",
      "Skilled technical workforce with experience since 2004",
    ],
    image: MEDIA.plant1,
  },
];

export const INFRASTRUCTURE_PILLARS = [
  {
    index: "01",
    title: "Advanced Rubber Mixing Mills",
    description:
      "In-house elastomer compounding mills ensuring homogeneous rubber batches with consistent quality and durability for every roller build.",
    image: MEDIA.plant1,
  },
  {
    index: "02",
    title: "Coating & Bonding Systems",
    description:
      "Dedicated surface preparation, coating, and bonding infrastructure engineered for strong metal-to-rubber adhesion and long service life.",
    image: MEDIA.facility2,
  },
  {
    index: "03",
    title: "Precision Grinding Machines",
    description:
      "Specialized industrial grinding machinery achieving smooth, concentric finishes across both fresh builds and refurbished roller cores.",
    image: MEDIA.facility3,
  },
  {
    index: "04",
    title: "Quality Inspection Equipment",
    description:
      "In-house inspection systems enforcing strict quality verification at every production stage before customer dispatch.",
    image: MEDIA.facility4,
  },
] as const;

export const CORE_VALUES = [
  {
    index: "01",
    title: "Quality Excellence",
    description:
      "We maintain strict quality standards at every stage of manufacturing to ensure reliable, durable, and high-performance rubber roller solutions.",
  },
  {
    index: "02",
    title: "Precision Engineering",
    description:
      "We combine advanced technology, technical expertise, and attention to detail to deliver products that meet exact industrial requirements.",
  },
  {
    index: "03",
    title: "Teamwork & Expertise",
    description:
      "Our skilled workforce and collaborative approach enable us to achieve excellence and provide value-driven solutions to our customers.",
  },
  {
    index: "04",
    title: "Continuous Improvement",
    description:
      "We continuously invest in technology, processes, and innovation to enhance product performance and manufacturing efficiency.",
  },
  {
    index: "05",
    title: "Integrity & Reliability",
    description:
      "We conduct our business with honesty, transparency, and professionalism while consistently delivering on our commitments.",
  },
  {
    index: "06",
    title: "Customer Commitment",
    description:
      "We believe in building long-term partnerships by understanding customer needs and providing dependable support and customized solutions.",
  },
] as const;

export const WHY_CHOOSE_POINTS = [
  "22+ Years Industry Experience",
  "Advanced Infrastructure",
  "Rubber Recoating Expertise",
  "Skilled Technical Workforce",
  "Long Service Life Products",
  "Timely Delivery",
  "Custom Manufacturing",
  "Precision Engineering",
  "Quality Assured Production",
] as const;

export const VERIFIED_METRICS = [
  {
    value: 2004,
    suffix: "",
    label: "Industry Heritage Since",
    detail: "Over two decades of continuous roller engineering",
    isYear: true,
  },
  {
    value: 22,
    suffix: "+",
    label: "Years Industry Experience",
    detail: "Proven technical craftsmanship & domain mastery",
    isYear: false,
  },
  {
    value: 4,
    suffix: "",
    label: "Integrated Facility Systems",
    detail: "Mixing, Coating & Bonding, Precision Grinding & Inspection",
    isYear: false,
  },
  {
    value: 6,
    suffix: "",
    label: "Core Quality Values",
    detail: "Guiding every roller from raw compound to final delivery",
    isYear: false,
  },
] as const;
