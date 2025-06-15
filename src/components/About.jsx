import React, { useEffect, useRef, useState } from "react";
import { Code, Coffee, Heart, Monitor, Palette, User } from "lucide-react";

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

const AboutMe = () => {
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

  const skills = [
    { icon: Code, text: "React & Next.js" },
    { icon: Palette, text: "UI/UX Design" },
    { icon: Monitor, text: "Frontend Development" },
    { icon: Coffee, text: "Coffee Enthusiast" },
  ];

  // Mobile layout
  if (isMobile) {
    return (
      <div className="min-h-screen w-full border-b-2 border-t-2 border-black overflow-hidden relative">
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
            about me<span style={{ color: ACCENT }}>*</span>
          </span>
        </div>

        {/* Mobile Main Content */}
        <div className="p-6 space-y-8">
          {/* Main Title */}
          <div
            className="animate-fade-in"
            style={{ animationDelay: animationDelays[1] }}
          >
            <h1
              className="text-3xl font-bold mb-4 font-sans"
              style={{ color: BLACK }}
            >
              Hey there,
              <br />
              <span
                className="block text-3xl font-extrabold font-sans animate-slide-up"
                style={{ color: BLACK }}
              >
                Let me tell you
                <span style={{ color: ACCENT }}>*</span>
              </span>
            </h1>
          </div>

          {/* About Description */}
          <div
            className="space-y-4 animate-fade-in"
            style={{ animationDelay: animationDelays[2] }}
          >
            <p
              className="text-sm font-sans leading-relaxed"
              style={{ color: BLACK }}
            >
              I'm a passionate digital creator who bridges the gap between design and development. 
              With a keen eye for aesthetics and a love for clean code, I craft experiences that 
              are both beautiful and functional.
            </p>
            <p
              className="text-sm font-sans leading-relaxed"
              style={{ color: BLACK }}
            >
              When I'm not immersed in pixels and code, you'll find me exploring new design trends, 
              experimenting with the latest technologies, or enjoying a perfect <span className="text-[#0fd6a0]">cup of coffee</span> while 
              sketching my next big idea.
            </p>
          </div>

          {/* Skills */}
          <div
            className="animate-fade-in"
            style={{ animationDelay: animationDelays[3] }}
          >
            <h3
              className="text-lg font-bold mb-4"
              style={{ color: BLACK }}
            >
              What I'm good at
            </h3>
            <div className="grid grid-cols-1 gap-3">
              {skills.map((skill, index) => {
                const Icon = skill.icon;
                return (
                  <div
                    key={index}
                    className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg"
                    style={{ 
                      animationDelay: animationDelays[4 + index],
                      borderColor: ACCENT + "20"
                    }}
                  >
                    <Icon size={20} color={ACCENT} />
                    <span
                      className="font-sans"
                      style={{ color: BLACK }}
                    >
                      {skill.text}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Fun Facts */}
          <div
            className="space-y-3 animate-fade-in"
            style={{ animationDelay: animationDelays[8] }}
          >
            <h3
              className="text-lg font-bold"
              style={{ color: BLACK }}
            >
              Fun facts about me
            </h3>
            <div className="space-y-2">
              <p className="text-sm font-sans flex items-center gap-2" style={{ color: BLACK }}>
                <Heart size={16} color={ACCENT} />
                I think in components and dream in code
              </p>
              <p className="text-sm font-sans flex items-center gap-2" style={{ color: BLACK }}>
                <Coffee size={16} color={ACCENT} />
                My code runs on caffeine and creativity
              </p>
              <p className="text-sm font-sans flex items-center gap-2" style={{ color: BLACK }}>
                <User size={16} color={ACCENT} />
                Always learning, always growing
              </p>
            </div>
          </div>

          {/* CTA */}
          <div
            className="space-y-2 animate-fade-in"
            style={{ animationDelay: animationDelays[9] }}
          >
            <span className="block text-xs font-sans" style={{ color: BLACK }}>
              Want to know more? Let's have a conversation{" "}
              <span style={{ color: ACCENT }}>*</span>
            </span>
            <span className="block text-xs font-sans" style={{ color: BLACK }}>
              I promise I'm more interesting than my code comments
              <span style={{ color: ACCENT }}>**</span>
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

        {/* Header */}
        <div
          className="flex p-4 items-center text-black overflow-hidden animate-fade-in"
          style={{ animationDelay: animationDelays[0] }}
        >
          <span
            className="text-xl font-bold tracking-tight"
            style={{ color: BLACK }}
          >
            about me<span style={{ color: ACCENT }}>*</span>
          </span>
        </div>

        <div
          className="flex p-4 items-center justify-center text-black overflow-hidden animate-fade-in"
          style={{ animationDelay: animationDelays[1] }}
        >
          <h2
            className="text-2xl font-bold font-sans"
            style={{ color: BLACK }}
          >
            Get to know me
          </h2>
        </div>

        <div
          className="flex p-1 items-center justify-center text-black overflow-hidden animate-fade-in"
          style={{ animationDelay: animationDelays[2] }}
        ></div>

        {/* Main content */}
        <div
          className="flex flex-col pl-6 pt-1 text-black col-span-2 justify-center animate-fade-in"
          style={{ animationDelay: animationDelays[3] }}
        >
          <h1
            className="text-2xl font-bold mb-4 font-sans"
            style={{ color: BLACK }}
          >
            Hey there,
            <br />
            <span
              className="block text-5xl font-extrabold font-sans animate-slide-up"
              style={{ color: BLACK }}
            >
              Let me tell you
              <span style={{ color: ACCENT }}>*</span>
            </span>
          </h1>
        </div>

        <div
          className="flex p-6 items-center justify-center text-black overflow-hidden animate-fade-in"
          style={{ animationDelay: animationDelays[4] }}
        >
          <div className="space-y-4">
            <p className="text-sm font-sans leading-relaxed" style={{ color: BLACK }}>
              I'm a passionate digital creator who bridges the gap between design and development.
            </p>
            <p className="text-sm font-sans leading-relaxed" style={{ color: BLACK }}>
              With a keen eye for aesthetics and love for clean code, I craft beautiful experiences.
            </p>
          </div>
        </div>

        {/* Skills Grid */}
        <div
          className="flex flex-col p-4 gap-2 overflow-hidden animate-fade-in"
          style={{ animationDelay: animationDelays[5] }}
        >
          {skills.slice(0, 2).map((skill, index) => {
            const Icon = skill.icon;
            return (
              <div key={index} className="flex items-center gap-2">
                <Icon size={16} color={ACCENT} />
                <span className="text-sm font-sans" style={{ color: BLACK }}>
                  {skill.text}
                </span>
              </div>
            );
          })}
        </div>

        <div
          className="flex flex-col p-4 gap-2 overflow-hidden animate-fade-in"
          style={{ animationDelay: animationDelays[6] }}
        >
          {skills.slice(2, 4).map((skill, index) => {
            const Icon = skill.icon;
            return (
              <div key={index} className="flex items-center gap-2">
                <Icon size={16} color={ACCENT} />
                <span className="text-sm font-sans" style={{ color: BLACK }}>
                  {skill.text}
                </span>
              </div>
            );
          })}
        </div>

        <div
          className="flex flex-col p-6 justify-center gap-2 overflow-hidden animate-fade-in"
          style={{ animationDelay: animationDelays[7] }}
        >
          <span className="text-xs font-sans" style={{ color: BLACK }}>
            I think in components and dream in code{" "}
            <span style={{ color: ACCENT }}>*</span>
          </span>
          <span className="text-xs font-sans" style={{ color: BLACK }}>
            Always learning, always creating
            <span style={{ color: ACCENT }}>**</span>
          </span>
        </div>
      </div>
    );
  }

  // Desktop layout
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
          about me<span style={{ color: ACCENT }}>*</span>
        </span>
      </div>

      {/* 3 */}
      <div
        className="flex p-8 items-center justify-center text-black overflow-hidden animate-fade-in"
        style={{ animationDelay: animationDelays[2] }}
      >
        <h2
          className="text-2xl font-bold font-sans"
          style={{ color: BLACK }}
        >
          Get to know me
        </h2>
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
          className="text-3xl font-bold mb-2 font-sans"
          style={{ color: BLACK }}
        >
          Hey there,
          <br />
          <span
            className="block text-7xl font-extrabold font-sans animate-slide-up"
            style={{ color: BLACK }}
          >
            Let me tell you
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
          PASSION
        </span>
      </div>

      {/* 8 */}
      <div
        className="flex p-1 items-center justify-center text-black overflow-hidden animate-fade-in"
        style={{ animationDelay: animationDelays[7] }}
      ></div>

      {/* 9 */}
      <div
        className="flex p-8 items-center justify-center text-black overflow-hidden animate-fade-in"
        style={{ animationDelay: animationDelays[8] }}
      >
        <div className="space-y-4">
          <p className="text-sm font-sans leading-relaxed" style={{ color: BLACK }}>
            I'm a passionate digital creator who bridges the gap between design and development. 
            With a keen eye for aesthetics and a love for clean code, I craft experiences that 
            are both <span style={{ color: ACCENT }}>beautiful and functional</span>.
          </p>
          <p className="text-sm font-sans leading-relaxed" style={{ color: BLACK }}>
            When I'm not immersed in pixels and code, you'll find me exploring new design trends 
            or enjoying the perfect <span className="text-[#0fd6a0]">cup of coffee</span>.
          </p>
        </div>
      </div>

      {/* 10 */}
      <div
        className="flex flex-col p-8 gap-3 justify-center overflow-hidden animate-fade-in"
        style={{ animationDelay: animationDelays[9] }}
      >
        <h3 className="text-sm font-bold mb-2" style={{ color: BLACK }}>
          What I'm good at
        </h3>
        {skills.map((skill, index) => {
          const Icon = skill.icon;
          return (
            <div key={index} className="flex items-center gap-2">
              <Icon size={16} color={ACCENT} />
              <span className="text-sm font-sans" style={{ color: BLACK }}>
                {skill.text}
              </span>
            </div>
          );
        })}
      </div>

      {/* 11 */}
      <div
        className="flex pl-[200px] text-gray-500 overflow-hidden animate-fade-in"
        style={{ animationDelay: animationDelays[10] }}
      >
        <span className="text-lg tracking-widest font-bold rotate-90 select-none transition">
          CREATE
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
          I think in components and dream in code{" "}
          <span style={{ color: ACCENT }}>*</span>
        </span>
        <span className="text-xs font-sans" style={{ color: BLACK }}>
          My code runs on caffeine and creativity
          <span style={{ color: ACCENT }}>**</span>
        </span>
        <span className="text-xs font-sans" style={{ color: BLACK }}>
          Always learning, always growing
          <span style={{ color: ACCENT }}>***</span>
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

export default AboutMe;