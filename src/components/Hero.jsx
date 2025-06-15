import React, { useEffect, useRef, useState } from "react";
import { FileUser, MessageSquareShare } from "lucide-react";

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

const navHero = () => {
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

  // Mobile layout
  if (isMobile) {
    return (
      <div className="min-h-screen w-full border-b-2 overflow-hidden relative ">
        <AnimatedGrid rows={6} cols={2} />

        {/* Mobile Header */}
        <div
          className="p-4 border-b animate-fade-in"
          style={{ animationDelay: animationDelays[0] }}
        >
          <span
            className="text-lg font-bold tracking-tight"
            style={{ color: BLACK }}
          >
            apro<span style={{ color: ACCENT }}>*</span>
          </span>
        </div>

        {/* Mobile Main Content */}
        <div className="p-6 space-y-8">
          {/* Hero Text */}
          <div
            className="animate-fade-in"
            style={{ animationDelay: animationDelays[1] }}
          >
            <h1
              className="text-2xl font-bold mb-2 font-sans"
              style={{ color: BLACK }}
            >
              ohayo web espada,
              <br />
              <span
                className="block text-4xl font-extrabold font-sans animate-slide-up"
                style={{ color: BLACK }}
              >
                I'm Apro
                <span style={{ color: ACCENT }}>*</span>
              </span>
            </h1>
          </div>

          {/* Navigation */}
          <div
            className="flex flex-col space-y-4 animate-fade-in"
            style={{ animationDelay: animationDelays[2] }}
          >
            <span
              className="text-lg font-bold tracking-tight"
              style={{ color: BLACK }}
            >
              works
            </span>
            <span
              className="text-lg font-bold tracking-tight"
              style={{ color: BLACK }}
            >
              skills
            </span>
            <span
              className="text-lg font-bold tracking-tight"
              style={{ color: BLACK }}
            >
              about me
            </span>
          </div>

          {/* Description */}
          <div
            className="animate-fade-in"
            style={{ animationDelay: animationDelays[3] }}
          >
            <p
              className="text-sm font-sans leading-relaxed"
              style={{ color: BLACK }}
            >
              Hey! I design immersive user experiences where form meets
              function. Every day, I push creative boundaries to build
              interfaces that don't just look good, but feel intuitive and
              engaging. For me, design is more than a job — it's a true passion.
            </p>
          </div>

          {/* Action Links */}
          <div
            className="space-y-4 animate-fade-in"
            style={{ animationDelay: animationDelays[4] }}
          >
            <div className="flex items-center gap-2">
              <FileUser className="text-lg" color={ACCENT} />
              <a
                href="#resume"
                className="text-base font-poppins transition duration-200 focus:outline-none"
                style={{ color: ACCENT }}
              >
                If you want my resume **
              </a>
            </div>
            <div className="flex items-center gap-2">
              <MessageSquareShare className="text-lg" color={ACCENT} />
              <a
                href="mailto:theaynpro@gmail.com"
                className="text-base font-poppins transition duration-200 focus:outline-none"
                style={{ color: ACCENT }}
              >
                Or have chat
              </a>
            </div>
          </div>

          {/* Footer Text */}
          <div
            className="space-y-2 animate-fade-in"
            style={{ animationDelay: animationDelays[5] }}
          >
            <span className="block text-xs font-sans" style={{ color: BLACK }}>
              A very passionate and competent person open to freelance offers{" "}
              <span style={{ color: ACCENT }}>*</span>
            </span>
            <span className="block text-xs font-sans" style={{ color: BLACK }}>
              If you want my folio, ask me. I don't bite
              <span style={{ color: ACCENT }}>**</span>
            </span>
          </div>

          {/* Social Links */}
          <div
            className="flex justify-center space-x-8 pt-4 animate-fade-in"
            style={{ animationDelay: animationDelays[6] }}
          >
            <span className="text-sm tracking-widest font-bold text-gray-500">
              TWITTER
            </span>
            <span className="text-sm tracking-widest font-bold text-gray-500">
              GITHUB
            </span>
          </div>
        </div>
      </div>
    );
  }

  // Tablet layout
  if (isTablet) {
    return (
      <div className="grid grid-cols-3 grid-rows-5 border-b-2 w-screen h-screen overflow-hidden relative">
        <AnimatedGrid rows={5} cols={3} />

        {/* Tablet layout - simplified grid */}
        {/* Header */}
        <div
          className="flex p-4 items-center text-black overflow-hidden animate-fade-in"
          style={{ animationDelay: animationDelays[0] }}
        >
          <span
            className="text-xl font-bold tracking-tight"
            style={{ color: BLACK }}
          >
            apro<span style={{ color: ACCENT }}>*</span>
          </span>
        </div>

        <div
          className="flex flex-wrap p-4 items-center text-black overflow-hidden justify-around animate-fade-in"
          style={{ animationDelay: animationDelays[1] }}
        >
          <span
            className="text-lg font-bold tracking-tight"
            style={{ color: BLACK }}
          >
            works
          </span>
          <span
            className="text-lg font-bold tracking-tight"
            style={{ color: BLACK }}
          >
            skills
          </span>
          <span
            className="text-lg font-bold tracking-tight"
            style={{ color: BLACK }}
          >
            about me
          </span>
        </div>

        <div
          className="flex p-1 items-center justify-center text-black overflow-hidden animate-fade-in"
          style={{ animationDelay: animationDelays[2] }}
        ></div>

        {/* Main content */}
        <div
          className="flex pl-6 pt-1 text-black col-span-2 animate-fade-in"
          style={{ animationDelay: animationDelays[3] }}
        >
          <h1
            className="text-3xl font-bold mb-2 font-sans"
            style={{ color: BLACK }}
          >
            ohayo web espada,
            <br />
            <span
              className="block text-6xl font-extrabold font-sans animate-slide-up"
              style={{ color: BLACK }}
            >
              I'm Apro
              <span style={{ color: ACCENT }}>*</span>
            </span>
          </h1>
        </div>

        <div
          className="flex p-6 items-center justify-center text-black overflow-hidden animate-fade-in"
          style={{ animationDelay: animationDelays[4] }}
        >
          <p className="text-sm my-4 font-sans" style={{ color: BLACK }}>
            Hey! I design immersive user experiences where form meets function.
            Every day, I push creative boundaries to build interfaces that don't
            just look good, but feel intuitive and engaging. For me, design is
            more than a job — it's a true passion.
          </p>
        </div>

        <div
          className="flex flex-col p-1 pt-8 pl-8 gap-3 overflow-hidden animate-fade-in"
          style={{ animationDelay: animationDelays[5], color: ACCENT }}
        >
          <div className="flex items-center gap-2">
            <FileUser className="text-lg" color={ACCENT} />
            <a
              href="#resume"
              className="text-base font-poppins transition duration-200 focus:outline-none"
              style={{ color: ACCENT }}
            >
              If you want my resume **
            </a>
          </div>
          <div className="flex items-center gap-2">
            <MessageSquareShare className="text-lg" color={ACCENT} />
            <a
              href="mailto:theaynpro@gmail.com"
              className="text-base font-poppins transition duration-200 focus:outline-none"
              style={{ color: ACCENT }}
            >
              Or have chat
            </a>
          </div>
        </div>

        <div
          className="flex items-center justify-center text-gray-500 overflow-hidden animate-fade-in"
          style={{ animationDelay: animationDelays[6] }}
        >
          <span className="text-sm tracking-widest font-bold">TWITTER</span>
        </div>

        <div
          className="flex flex-col p-6 justify-center gap-2 overflow-hidden animate-fade-in"
          style={{ animationDelay: animationDelays[7] }}
        >
          <span className="text-xs font-sans" style={{ color: BLACK }}>
            A very passionate and competent person open to freelance offers{" "}
            <span style={{ color: ACCENT }}>*</span>
          </span>
          <span className="text-xs font-sans" style={{ color: BLACK }}>
            If you want my folio, ask me. I don't bite
            <span style={{ color: ACCENT }}>**</span>
          </span>
        </div>

        <div
          className="flex items-center justify-center text-gray-500 overflow-hidden animate-fade-in"
          style={{ animationDelay: animationDelays[8] }}
        >
          <span className="text-sm tracking-widest font-bold">GITHUB</span>
        </div>
      </div>
    );
  }

  // Desktop layout (original)
  return (
    <div className="grid grid-cols-4 grid-rows-4 border-b-2 w-screen h-screen overflow-hidden relative">
      <AnimatedGrid rows={4} cols={4} />

      {/* 1 */}
      <div
        className="flex p-1 items-center justify-center text-black overflow-hidden animate-fade-in"
        style={{ animationDelay: animationDelays[0] }}
      ></div>

      {/* 2 */}
      <div
        className="flex p-8 items-center text-black overflow-hidden animate-fade-in"
        style={{ animationDelay: animationDelays[1] }}
      >
        <span
          className="text-xl font-bold tracking-tight"
          style={{ color: BLACK }}
        >
          apro<span style={{ color: ACCENT }}>*</span>
        </span>
      </div>

      {/* 3 */}
      <div
        className="flex p-8 items-center text-black overflow-hidden justify-between animate-fade-in"
        style={{ animationDelay: animationDelays[2] }}
      >
        <span
          className="text-xl font-bold tracking-tight"
          style={{ color: BLACK }}
        >
          works
        </span>
        <span
          className="text-xl font-bold tracking-tight"
          style={{ color: BLACK }}
        >
          skills
        </span>
        <span
          className="text-xl font-bold tracking-tight"
          style={{ color: BLACK }}
        >
          about me
        </span>
      </div>

      {/* 4 */}
      <div
        className="flex p-1 items-center justify-center text-black overflow-hidden animate-fade-in"
        style={{ animationDelay: animationDelays[3] }}
      ></div>

      {/* 5 */}
      <div
        className="flex p-1 items-center justify-center text-black overflow-hidden animate-fade-in"
        style={{ animationDelay: animationDelays[4] }}
      ></div>

      {/* 6 */}
      <div
        className="flex pl-8 pt-1 text-black col-span-2 animate-fade-in"
        style={{ animationDelay: animationDelays[5] }}
      >
        <h1
          className="text-4xl font-bold mb-2 font-sans"
          style={{ color: BLACK }}
        >
          ohayo web espada,
          <br />
          <span
            className="block text-9xl font-extrabold font-sans animate-slide-up"
            style={{ color: BLACK }}
          >
            I'm Apro
            <span style={{ color: ACCENT }}>*</span>
          </span>
        </h1>
      </div>

      {/* 7 */}
      <div
        className="flex pl-[200px] text-gray-500 overflow-hidden animate-fade-in"
        style={{ animationDelay: animationDelays[6] }}
      >
        <span className="text-lg tracking-widest font-bold rotate-90 select-none transition">
          TWITTER
        </span>
      </div>

      {/* 8 */}
      <div
        className="flex p-1 items-center justify-center text-black overflow-hidden animate-fade-in"
        style={{ animationDelay: animationDelays[7] }}
      ></div>

      {/* 9 */}
       <div className="flex p-8 items-center justify-center text-black overflow-hidden animate-fade-in" style={{ animationDelay: animationDelays[8] }}>
      <p className="text-sm my-6 font-sans" style={{ color: BLACK }}>
        I'm a passionate designer and developer who loves creating beautiful, 
        functional digital experiences. When I'm not coding, you'll find me 
        exploring new design trends or <span style={{ color: ACCENT }}>drinking coffee</span>.
      </p>
    </div>

      {/* 10 */}
      <div
        className="flex flex-col p-8  gap-4 justify-center overflow-hidden animate-fade-in"
        style={{ animationDelay: animationDelays[9], color: ACCENT }}
      >
        <div className="flex items-center gap-2">
          <FileUser className="text-sm" color={ACCENT} />
          <a
            href="#resume"
            className="text-sm font-poppins transition duration-200 focus:outline-none"
            style={{ color: ACCENT }}
          >
            If you want my resume **
          </a>
        </div>
        <div className="flex items-center gap-2">
          <MessageSquareShare className="text-sm" color={ACCENT} />
          <a
            href="mailto:theaynpro@gmail.com"
            className="text-sm font-poppins transition duration-200 focus:outline-none"
            style={{ color: ACCENT }}
          >
            Or have chat
          </a>
        </div>
      </div>

      {/* 11 */}
      <div
        className="flex pl-[200px] text-gray-500 overflow-hidden animate-fade-in"
        style={{ animationDelay: animationDelays[10] }}
      >
        <span className="text-lg tracking-widest font-bold rotate-90 select-none transition">
          GITHUB
        </span>
      </div>

      {/* 12 */}
      <div
        className="flex p-1 items-center justify-center text-black overflow-hidden animate-fade-in"
        style={{ animationDelay: animationDelays[11] }}
      ></div>

      {/* 13 */}
      <div
        className="flex p-1 items-center justify-center text-black overflow-hidden animate-fade-in"
        style={{ animationDelay: animationDelays[12] }}
      ></div>

      {/* 14 */}
      <div
        className="flex flex-col p-8 justify-center gap-2 overflow-hidden animate-fade-in"
        style={{ animationDelay: animationDelays[13] }}
      >
        <span className="text-xs font-sans" style={{ color: BLACK }}>
          Fun fact: I think in components and dream in code{" "}
          <span style={{ color: ACCENT }}>*</span>
        </span>
        <span className="text-xs font-sans" style={{ color: BLACK }}>
          Always learning, always creating
          <span style={{ color: ACCENT }}>**</span>
        </span>
      </div>

      {/* 15 */}
      <div
        className="flex p-1 items-center justify-center text-black overflow-hidden animate-fade-in"
        style={{ animationDelay: animationDelays[14] }}
      ></div>

      {/* 16 */}
      <div
        className="flex p-1 items-center justify-center text-black overflow-hidden animate-fade-in"
        style={{ animationDelay: animationDelays[15] }}
      ></div>
    </div>
  );
};

export default navHero;
