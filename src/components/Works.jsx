import React, { useEffect, useRef, useState } from "react";
import {
  ExternalLink,
  Github,
  Calendar,
  Code2,
  Palette,
  Globe,
  Smartphone,
  Database,
  Monitor,
  Layers,
  Image,
  ShoppingCart,
  Users,
  Zap,
  Award,
} from "lucide-react";

// Chiziq uzunligini hisoblash uchun funksiya
function getLineLength(x1, y1, x2, y2, w, h) {
  const x1p = (x1 / 100) * w;
  const y1p = (y1 / 100) * h;
  const x2p = (x2 / 100) * w;
  const y2p = (y2 / 100) * h;
  return Math.sqrt((x2p - x1p) ** 2 + (y2p - y1p) ** 2);
}

const ACCENT = "#0fd6a0";
const BLACK = "#000";
const WHITE = "#fff";

const AnimatedGrid = ({ rows = 4, cols = 4 }) => {
  const svgRef = useRef(null);
  const [dimensions, setDimensions] = useState({ w: 0, h: 0 });

  useEffect(() => {
    function updateDims() {
      const svg = svgRef.current;
      if (svg) {
        setDimensions({
          w: svg.clientWidth,
          h: svg.clientHeight,
        });
      }
    }
    updateDims();
    window.addEventListener("resize", updateDims);
    return () => window.removeEventListener("resize", updateDims);
  }, []);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;
    const lines = Array.from(svg.querySelectorAll("line"));
    lines.forEach((line, i) => {
      line.style.strokeDasharray = line.getAttribute("data-length");
      line.style.strokeDashoffset = line.getAttribute("data-length");
      line.style.transition = "stroke-dashoffset 0.7s cubic-bezier(.7,0,.3,1)";
      setTimeout(() => {
        line.style.strokeDashoffset = 0;
      }, 150 + i * 80);
    });
  }, [dimensions]);

  const { w, h } = dimensions;
  const colWidth = 100 / cols;
  const rowHeight = 100 / rows;
  const lines = [];

  // Vertical grid lines
  for (let c = 1; c < cols; c++) {
    const x = colWidth * c;
    const length = getLineLength(x, 0, x, 100, w || 1, h || 1);
    lines.push(
      <line
        key={`v-${c}`}
        x1={`${x}%`}
        y1="0%"
        x2={`${x}%`}
        y2="100%"
        stroke={BLACK}
        strokeWidth="0.2"
        data-length={length}
      />
    );
  }

  // Horizontal grid lines
  for (let r = 1; r < rows; r++) {
    const y = rowHeight * r;
    const length = getLineLength(0, y, 100, y, w || 1, h || 1);
    lines.push(
      <line
        key={`h-${r}`}
        x1="0%"
        y1={`${y}%`}
        x2="100%"
        y2={`${y}%`}
        stroke={BLACK}
        strokeWidth="0.2"
        data-length={length}
      />
    );
  }

  return (
    <svg
      ref={svgRef}
      aria-hidden="true"
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: -1,
        display: "block",
      }}
    >
      {lines}
    </svg>
  );
};

const animationDelays = [
  "0s",
  "0.2s",
  "0.4s",
  "0.6s",
  "0.8s",
  "1.0s",
  "1.2s",
  "1.4s",
  "1.6s",
  "1.8s",
  "2.0s",
  "2.2s",
  "2.4s",
  "2.6s",
  "2.8s",
  "3.0s",
];

// Grid cell komponenlari
const Grid1_1 = () => (
  <div
    className="flex p-1 items-center justify-center text-black overflow-hidden animate-fade-in"
    style={{ animationDelay: animationDelays[0] }}
  >
    {/* Bo'sh grid cell */}
  </div>
);

const Grid1_2 = () => (
  <div
    className="flex p-8 items-center text-black overflow-hidden animate-fade-in"
    style={{ animationDelay: animationDelays[1] }}
  >
    <span className="text-xl font-bold tracking-tight" style={{ color: BLACK }}>
      works<span style={{ color: ACCENT }}>*</span>
    </span>
  </div>
);

const Grid1_3 = () => (
  <div
    className="flex p-8 items-center justify-center text-black overflow-hidden animate-fade-in"
    style={{ animationDelay: animationDelays[2] }}
  >
    <h2 className="text-2xl font-bold font-sans" style={{ color: BLACK }}>
      Project Portfolio
    </h2>
  </div>
);

const Grid1_4 = () => (
  <div
    className="flex p-1 items-center justify-center text-black overflow-hidden animate-fade-in"
    style={{ animationDelay: animationDelays[3] }}
  >
    {/* Bo'sh grid cell */}
  </div>
);

const Grid2_1 = () => (
  <div
    className="flex p-1 items-center justify-center text-black overflow-hidden animate-fade-in"
    style={{ animationDelay: animationDelays[4] }}
  >
    {/* Bo'sh grid cell */}
  </div>
);

const Grid2_2_2_3 = () => (
  <div
    className="flex pl-8 pt-1 text-black col-span-2 animate-fade-in"
    style={{ animationDelay: animationDelays[5] }}
  >
    <h1 className="text-3xl font-bold mb-2 font-sans" style={{ color: BLACK }}>
      Projects I've
      <br />
      <span
        className="block text-7xl font-extrabold font-sans animate-slide-up"
        style={{ color: BLACK }}
      >
        brought to life
        <span style={{ color: ACCENT }}>*</span>
      </span>
    </h1>
  </div>
);

const Grid2_4 = () => (
  <div
    className="flex pl-[200px] text-gray-500 overflow-hidden animate-fade-in"
    style={{ animationDelay: animationDelays[6] }}
  >
    <span className="text-lg tracking-widest font-bold rotate-90 select-none transition">
      WORKS
    </span>
  </div>
);

const Grid3_1_Project1 = () => (
  <div
    className="flex flex-col p-6 gap-3 justify-center overflow-hidden animate-fade-in transition-all"
    style={{ animationDelay: animationDelays[7] }}
  ></div>
);

const Grid3_2_Project2 = () => (
  <div
    className="flex flex-col p-6 gap-3 justify-center overflow-hidden animate-fade-in transition-all"
    style={{ animationDelay: animationDelays[8] }}
  >
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Globe size={20} color={ACCENT} />
          <span
            className="text-lg font-bold font-sans"
            style={{ color: BLACK }}
          >
            Portfolio Website
          </span>
        </div>
        <div className="flex gap-2">
          <ExternalLink
            size={16}
            color={ACCENT}
            className="cursor-pointer hover:opacity-70 transition-opacity"
          />
          <Github
            size={16}
            color={ACCENT}
            className="cursor-pointer hover:opacity-70 transition-opacity"
          />
        </div>
      </div>

      <p className="text-sm text-gray-600 leading-relaxed">
        Responsive portfolio with modern animations and interactive design
      </p>

      <div className="flex flex-wrap gap-1">
        <span
          className="text-xs px-2 py-1 rounded font-medium"
          style={{
            backgroundColor: ACCENT + "20",
            color: BLACK,
          }}
        >
          Next.js
        </span>
        <span
          className="text-xs px-2 py-1 rounded font-medium"
          style={{
            backgroundColor: ACCENT + "20",
            color: BLACK,
          }}
        >
          Tailwind
        </span>
        <span
          className="text-xs px-2 py-1 rounded font-medium"
          style={{
            backgroundColor: ACCENT + "20",
            color: BLACK,
          }}
        >
          Framer Motion
        </span>
      </div>

      <div className="flex justify-between items-center pt-2">
        <span className="text-sm font-bold" style={{ color: ACCENT }}>
          Completed
        </span>
        <span className="text-sm text-gray-500 font-medium">2024</span>
      </div>
    </div>
  </div>
);

const Grid3_3_Project3 = () => (
  <div
    className="flex flex-col p-6 gap-3 justify-center overflow-hidden animate-fade-in transition-all"
    style={{ animationDelay: animationDelays[9] }}
  >
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Monitor size={20} color={ACCENT} />
          <span
            className="text-lg font-bold font-sans"
            style={{ color: BLACK }}
          >
            Dashboard Analytics
          </span>
        </div>
        <div className="flex gap-2">
          <ExternalLink
            size={16}
            color={ACCENT}
            className="cursor-pointer hover:opacity-70 transition-opacity"
          />
          <Github
            size={16}
            color={ACCENT}
            className="cursor-pointer hover:opacity-70 transition-opacity"
          />
        </div>
      </div>

      <p className="text-sm text-gray-600 leading-relaxed">
        Real-time data visualization dashboard with interactive charts
      </p>

      <div className="flex flex-wrap gap-1">
        <span
          className="text-xs px-2 py-1 rounded font-medium"
          style={{
            backgroundColor: ACCENT + "20",
            color: BLACK,
          }}
        >
          React
        </span>
        <span
          className="text-xs px-2 py-1 rounded font-medium"
          style={{
            backgroundColor: ACCENT + "20",
            color: BLACK,
          }}
        >
          D3.js
        </span>
        <span
          className="text-xs px-2 py-1 rounded font-medium"
          style={{
            backgroundColor: ACCENT + "20",
            color: BLACK,
          }}
        >
          Express
        </span>
        <span
          className="text-xs px-2 py-1 rounded font-medium"
          style={{
            backgroundColor: ACCENT + "20",
            color: BLACK,
          }}
        >
          PostgreSQL
        </span>
      </div>

      <div className="flex justify-between items-center pt-2">
        <span className="text-sm font-bold" style={{ color: ACCENT }}>
          Completed
        </span>
        <span className="text-sm text-gray-500 font-medium">2023</span>
      </div>
    </div>
  </div>
);

const Grid3_4 = () => (
  <div
    className="flex pl-[200px] text-gray-500 overflow-hidden animate-fade-in"
    style={{ animationDelay: animationDelays[14] }}
  >
    <span className="text-lg tracking-widest font-bold rotate-90 select-none transition">
      FOLIOO
    </span>
  </div>
);

const Grid4_1 = () => (
  <div
    className="flex p-1 items-center justify-center text-black overflow-hidden animate-fade-in"
    style={{ animationDelay: animationDelays[11] }}
  >
    {/* Bo'sh grid cell */}
  </div>
);

const Grid4_2_Technologies = () => (
  <div
    className="flex flex-col p-6 gap-3 justify-center overflow-hidden animate-fade-in transition-all"
    style={{ animationDelay: animationDelays[7] }}
  >
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <ShoppingCart size={20} color={ACCENT} />
          <span
            className="text-lg font-bold font-sans"
            style={{ color: BLACK }}
          >
            E-Commerce Platform
          </span>
        </div>
        <div className="flex gap-2">
          <ExternalLink
            size={16}
            color={ACCENT}
            className="cursor-pointer hover:opacity-70 transition-opacity"
          />
          <Github
            size={16}
            color={ACCENT}
            className="cursor-pointer hover:opacity-70 transition-opacity"
          />
        </div>
      </div>

      <p className="text-sm text-gray-600 leading-relaxed">
        Full-stack online store with payment integration and admin dashboard
      </p>

      <div className="flex flex-wrap gap-1">
        <span
          className="text-xs px-2 py-1 rounded font-medium"
          style={{
            backgroundColor: ACCENT + "20",
            color: BLACK,
          }}
        >
          React
        </span>
        <span
          className="text-xs px-2 py-1 rounded font-medium"
          style={{
            backgroundColor: ACCENT + "20",
            color: BLACK,
          }}
        >
          Node.js
        </span>
        <span
          className="text-xs px-2 py-1 rounded font-medium"
          style={{
            backgroundColor: ACCENT + "20",
            color: BLACK,
          }}
        >
          MongoDB
        </span>
        <span
          className="text-xs px-2 py-1 rounded font-medium"
          style={{
            backgroundColor: ACCENT + "20",
            color: BLACK,
          }}
        >
          Stripe
        </span>
      </div>

      <div className="flex justify-between items-center pt-2">
        <span className="text-sm font-bold" style={{ color: ACCENT }}>
          Completed
        </span>
        <span className="text-sm text-gray-500 font-medium">2024</span>
      </div>
    </div>
  </div>
);

const Grid4_3_Statistics = () => (
  <div
    className="flex flex-col p-6 justify-center gap-3 overflow-hidden animate-fade-in"
    style={{ animationDelay: animationDelays[12] }}
  >
    <h3 className="text-lg font-bold mb-2" style={{ color: BLACK }}>
      Technologies Used
    </h3>
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <Code2 size={14} color={ACCENT} />
        <span className="text-sm font-sans" style={{ color: BLACK }}>
          React & Next.js
        </span>
      </div>
      <div className="flex items-center gap-2">
        <Database size={14} color={ACCENT} />
        <span className="text-sm font-sans" style={{ color: BLACK }}>
          Node.js & MySQL
        </span>
      </div>
      <div className="flex items-center gap-2">
        <Smartphone size={14} color={ACCENT} />
        <span className="text-sm font-sans" style={{ color: BLACK }}>
          React Native
        </span>
      </div>
    </div>
  </div>
);

const Grid4_4 = () => (
  <div
    className="flex flex-col p-6 justify-center gap-2 overflow-hidden animate-fade-in"
    style={{ animationDelay: animationDelays[13] }}
  >
    <span className="text-xs font-sans" style={{ color: BLACK }}>
      4+ completed projects <span style={{ color: ACCENT }}>*</span>
    </span>
    <span className="text-xs font-sans" style={{ color: BLACK }}>
      Full-stack development
      <span style={{ color: ACCENT }}>**</span>
    </span>
    <span className="text-xs font-sans" style={{ color: BLACK }}>
      Modern tech stack
      <span style={{ color: ACCENT }}>***</span>
    </span>
  </div>
);

const Works = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
      setIsTablet(window.innerWidth >= 768 && window.innerWidth < 1024);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  return (
    <div className="grid grid-cols-4 grid-rows-4 border-b-2 w-screen h-screen overflow-hidden relative">
      <AnimatedGrid rows={4} cols={4} />

      {/* Row 1 */}
      <Grid1_1 />
      <Grid1_2 />
      <Grid1_3 />
      <Grid1_4 />

      {/* Row 2 */}
      <Grid2_1 />
      <Grid2_2_2_3 />
      <Grid2_4 />

      {/* Row 3 */}
      <Grid3_1_Project1 />
      <Grid3_2_Project2 />
      <Grid3_3_Project3 />
      <Grid3_4 />

      {/* Row 4 */}
      <Grid4_1 />
      <Grid4_2_Technologies />
      <Grid4_3_Statistics />
      <Grid4_4 />
    </div>
  );
};

export default Works;
