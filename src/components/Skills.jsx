import React, { useEffect, useRef, useState } from "react";
import { 
  Code, 
  Database, 
  Palette, 
  Globe, 
  Smartphone, 
  Settings, 
  Zap,
  Book,
  Award,
  Target,
  TrendingUp,
  Lightbulb,
  Brush,
  Image,
  Layers
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

const Skills = () => {
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

  const technicalSkills = [
    // Frontend Skills
    { icon: Code, text: "JavaScript/TypeScript", level: 50, category: "frontend" },
    { icon: Globe, text: "React & Next.js", level: 90, category: "frontend" },
    { icon: Palette, text: "CSS & Tailwind", level: 88, category: "frontend" },
    // Backend Skills
    { icon: Database, text: "Node.js & Express", level: 60, category: "backend" },
    { icon: Smartphone, text: "React Native", level: 30, category: "backend" },
    { icon: Settings, text: "DevOps & CI/CD", level: 75, category: "backend" },
    // Graphic Design Skills
    { icon: Brush, text: "Adobe Photoshop", level: 85, category: "design" },
    { icon: Image, text: "Adobe Illustrator", level: 30, category: "design" },
    { icon: Layers, text: "UI/UX Design", level: 50, category: "design" }
  ];

  const softSkills = [
    { icon: Lightbulb, text: "Problem Solving" },
    { icon: Target, text: "Attention to Detail" },
    { icon: TrendingUp, text: "Continuous Learning" },
    { icon: Book, text: "Team Collaboration" }
  ];

  // Mobile layout
  if (isMobile) {
    return (
      <div className="min-h-screen w-full border-b-2 border-black overflow-hidden relative">
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
            skills<span style={{ color: ACCENT }}>*</span>
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
              What I bring
              <br />
              <span
                className="block text-3xl font-extrabold font-sans animate-slide-up"
                style={{ color: BLACK }}
              >
                to the table
                <span style={{ color: ACCENT }}>*</span>
              </span>
            </h1>
          </div>

          {/* Technical Skills */}
          <div
            className="animate-fade-in"
            style={{ animationDelay: animationDelays[2] }}
          >
            <h3
              className="text-lg font-bold mb-4"
              style={{ color: BLACK }}
            >
              Technical Skills
            </h3>
            <div className="space-y-4">
              {technicalSkills.map((skill, index) => {
                const Icon = skill.icon;
                return (
                  <div
                    key={index}
                    className="animate-fade-in"
                    style={{ animationDelay: animationDelays[3 + index] }}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <Icon size={20} color={ACCENT} />
                        <span className="font-sans text-sm" style={{ color: BLACK }}>
                          {skill.text}
                        </span>
                      </div>
                      <span className="text-xs font-sans" style={{ color: ACCENT }}>
                        {skill.level}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="h-2 rounded-full transition-all duration-1000 ease-out"
                        style={{
                          backgroundColor: ACCENT,
                          width: `${skill.level}%`,
                          animationDelay: animationDelays[3 + index]
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Soft Skills */}
          <div
            className="animate-fade-in"
            style={{ animationDelay: animationDelays[12] }}
          >
            <h3
              className="text-lg font-bold mb-4"
              style={{ color: BLACK }}
            >
              Soft Skills
            </h3>
            <div className="grid grid-cols-1 gap-3">
              {softSkills.map((skill, index) => {
                const Icon = skill.icon;
                return (
                  <div
                    key={index}
                    className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg animate-fade-in"
                    style={{ 
                      animationDelay: animationDelays[13 + index],
                      borderColor: ACCENT + "20"
                    }}
                  >
                    <Icon size={20} color={ACCENT} />
                    <span className="font-sans" style={{ color: BLACK }}>
                      {skill.text}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Experience Highlight */}
          <div
            className="space-y-3 animate-fade-in"
            style={{ animationDelay: animationDelays[14] }}
          >
            <h3
              className="text-lg font-bold"
              style={{ color: BLACK }}
            >
              Experience Highlights
            </h3>
            <div className="space-y-2">
              <p className="text-sm font-sans flex items-center gap-2" style={{ color: BLACK }}>
                <Award size={16} color={ACCENT} />
                1+ years in development & design
              </p>
              <p className="text-sm font-sans flex items-center gap-2" style={{ color: BLACK }}>
                <Zap size={16} color={ACCENT} />
                20+ projects delivered successfully
              </p>
              <p className="text-sm font-sans flex items-center gap-2" style={{ color: BLACK }}>
                <TrendingUp size={16} color={ACCENT} />
                Always adapting to new technologies
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Tablet layout
  if (isTablet) {
    return (
      <div className="grid grid-cols-3 grid-rows-6 border-b-2 w-screen h-screen overflow-hidden relative">
        <AnimatedGrid rows={6} cols={3} />

        {/* Header */}
        <div
          className="flex p-4 items-center text-black overflow-hidden animate-fade-in"
          style={{ animationDelay: animationDelays[0] }}
        >
          <span
            className="text-xl font-bold tracking-tight"
            style={{ color: BLACK }}
          >
             skills<span style={{ color: ACCENT }}>*</span>
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
            Technical Expertise
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
            What I bring
            <br />
            <span
              className="block text-5xl font-extrabold font-sans animate-slide-up"
              style={{ color: BLACK }}
            >
              to the table
              <span style={{ color: ACCENT }}>*</span>
            </span>
          </h1>
        </div>

        {/* Frontend Skills */}
        <div
          className="flex flex-col p-4 gap-2 overflow-hidden animate-fade-in"
          style={{ animationDelay: animationDelays[4] }}
        >
          <h4 className="text-xs font-bold mb-2" style={{ color: BLACK }}>
            Frontend
          </h4>
          {technicalSkills.filter(skill => skill.category === 'frontend').map((skill, index) => {
            const Icon = skill.icon;
            return (
              <div key={index} className="space-y-1">
                <div className="flex items-center gap-2">
                  <Icon size={14} color={ACCENT} />
                  <span className="text-xs font-sans" style={{ color: BLACK }}>
                    {skill.text}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-1">
                  <div
                    className="h-1 rounded-full"
                    style={{
                      backgroundColor: ACCENT,
                      width: `${skill.level}%`
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* Backend Skills */}
        <div
          className="flex flex-col p-4 gap-2 overflow-hidden animate-fade-in"
          style={{ animationDelay: animationDelays[5] }}
        >
          <h4 className="text-xs font-bold mb-2" style={{ color: BLACK }}>
            Backend
          </h4>
          {technicalSkills.filter(skill => skill.category === 'backend').map((skill, index) => {
            const Icon = skill.icon;
            return (
              <div key={index} className="space-y-1">
                <div className="flex items-center gap-2">
                  <Icon size={14} color={ACCENT} />
                  <span className="text-xs font-sans" style={{ color: BLACK }}>
                    {skill.text}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-1">
                  <div
                    className="h-1 rounded-full"
                    style={{
                      backgroundColor: ACCENT,
                      width: `${skill.level}%`
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* Design Skills */}
        <div
          className="flex flex-col p-4 gap-2 overflow-hidden animate-fade-in"
          style={{ animationDelay: animationDelays[6] }}
        >
          <h4 className="text-xs font-bold mb-2" style={{ color: BLACK }}>
            Design
          </h4>
          {technicalSkills.filter(skill => skill.category === 'design').map((skill, index) => {
            const Icon = skill.icon;
            return (
              <div key={index} className="space-y-1">
                <div className="flex items-center gap-2">
                  <Icon size={14} color={ACCENT} />
                  <span className="text-xs font-sans" style={{ color: BLACK }}>
                    {skill.text}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-1">
                  <div
                    className="h-1 rounded-full"
                    style={{
                      backgroundColor: ACCENT,
                      width: `${skill.level}%`
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        <div
          className="flex flex-col p-6 justify-center gap-2 overflow-hidden animate-fade-in"
          style={{ animationDelay: animationDelays[7] }}
        >
          <span className="text-xs font-sans" style={{ color: BLACK }}>
            + years of experience{" "}
            <span style={{ color: ACCENT }}>*</span>
          </span>
          <span className="text-xs font-sans" style={{ color: BLACK }}>
            Full-stack & design capabilities
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

      {/* Row 1 */}
      <div
        className="flex p-1 items-center justify-center text-black overflow-hidden animate-fade-in"
        style={{ animationDelay: animationDelays[0] }}
      ></div>

      <div
        className="flex p-8 items-center text-black overflow-hidden animate-fade-in"
        style={{ animationDelay: animationDelays[1] }}
      >
        <span
          className="text-xl font-bold tracking-tight"
          style={{ color: BLACK }}
        >
        skills<span style={{ color: ACCENT }}>*</span>
        </span>
      </div>

      <div
        className="flex p-8 items-center justify-center text-black overflow-hidden animate-fade-in"
        style={{ animationDelay: animationDelays[2] }}
      >
        <h2
          className="text-2xl font-bold font-sans"
          style={{ color: BLACK }}
        >
          Technical Expertise
        </h2>
      </div>

      <div
        className="flex p-1 items-center justify-center text-black overflow-hidden animate-fade-in"
        style={{ animationDelay: animationDelays[3] }}
      ></div>

      {/* Row 2 */}
      <div
        className="flex p-1 items-center justify-center text-black overflow-hidden animate-fade-in"
        style={{ animationDelay: animationDelays[4] }}
      ></div>

      <div
        className="flex pl-8 pt-1 text-black col-span-2 animate-fade-in"
        style={{ animationDelay: animationDelays[5] }}
      >
        <h1
          className="text-3xl font-bold mb-2 font-sans"
          style={{ color: BLACK }}
        >
          What I bring
          <br />
          <span
            className="block text-7xl font-extrabold font-sans animate-slide-up"
            style={{ color: BLACK }}
          >
            to the table
            <span style={{ color: ACCENT }}>*</span>
          </span>
        </h1>
      </div>

      <div
        className="flex pl-[200px] text-gray-500 overflow-hidden animate-fade-in"
        style={{ animationDelay: animationDelays[6] }}
      >
        <span className="text-lg tracking-widest font-bold rotate-90 select-none transition">
          SKILLS
        </span>
      </div>

      {/* Row 3 */}
      <div
        className="flex p-1 items-center justify-center text-black overflow-hidden animate-fade-in"
        style={{ animationDelay: animationDelays[7] }}
      ></div>

      {/* Frontend Skills */}
      <div
        className="flex flex-col p-8 gap-3 justify-center overflow-hidden animate-fade-in"
        style={{ animationDelay: animationDelays[8] }}
      >
        <div className="space-y-4">
          <h3 className="text-lg font-bold mb-4" style={{ color: BLACK }}>
            Frontend Technologies
          </h3>
          <div className="space-y-3">
            {technicalSkills.filter(skill => skill.category === 'frontend').map((skill, index) => {
              const Icon = skill.icon;
              return (
                <div key={index} className="space-y-1">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Icon size={16} color={ACCENT} />
                      <span className="text-sm font-sans" style={{ color: BLACK }}>
                        {skill.text}
                      </span>
                    </div>
                    <span className="text-xs" style={{ color: ACCENT }}>
                      {skill.level}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-1.5">
                    <div
                      className="h-1.5 rounded-full transition-all duration-1000 ease-out"
                      style={{
                        backgroundColor: ACCENT,
                        width: `${skill.level}%`,
                        animationDelay: animationDelays[8 + index]
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Backend Skills */}
      <div
        className="flex flex-col p-8 gap-3 justify-center overflow-hidden animate-fade-in"
        style={{ animationDelay: animationDelays[9] }}
      >
        <h3 className="text-lg font-bold mb-2" style={{ color: BLACK }}>
          Backend & Tools
        </h3>
        <div className="space-y-3">
          {technicalSkills.filter(skill => skill.category === 'backend').map((skill, index) => {
            const Icon = skill.icon;
            return (
              <div key={index} className="space-y-1">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Icon size={16} color={ACCENT} />
                    <span className="text-sm font-sans" style={{ color: BLACK }}>
                      {skill.text}
                    </span>
                  </div>
                  <span className="text-xs" style={{ color: ACCENT }}>
                    {skill.level}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-1.5">
                  <div
                    className="h-1.5 rounded-full transition-all duration-1000 ease-out"
                    style={{
                      backgroundColor: ACCENT,
                      width: `${skill.level}%`,
                      animationDelay: animationDelays[9 + index]
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div
        className="flex pl-[200px] text-gray-500 overflow-hidden animate-fade-in"
        style={{ animationDelay: animationDelays[10] }}
      >
        <span className="text-lg tracking-widest font-bold rotate-90 select-none transition">
          EXPERT
        </span>
      </div>

      {/* Row 4 */}
      <div
        className="flex p-1 items-center justify-center text-black overflow-hidden animate-fade-in"
        style={{ animationDelay: animationDelays[11] }}
      ></div>

      {/* Design Skills */}
      <div
        className="flex flex-col p-8 gap-3 justify-center overflow-hidden animate-fade-in"
        style={{ animationDelay: animationDelays[12] }}
      >
        <h3 className="text-lg font-bold mb-2" style={{ color: BLACK }}>
          Design & Creative
        </h3>
        <div className="space-y-3">
          {technicalSkills.filter(skill => skill.category === 'design').map((skill, index) => {
            const Icon = skill.icon;
            return (
              <div key={index} className="space-y-1">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Icon size={16} color={ACCENT} />
                    <span className="text-sm font-sans" style={{ color: BLACK }}>
                      {skill.text}
                    </span>
                  </div>
                  <span className="text-xs" style={{ color: ACCENT }}>
                    {skill.level}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-1.5">
                  <div
                    className="h-1.5 rounded-full transition-all duration-1000 ease-out"
                    style={{
                      backgroundColor: ACCENT,
                      width: `${skill.level}%`,
                      animationDelay: animationDelays[12 + index]
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Soft Skills & Experience */}
      <div
        className="flex flex-col p-8 justify-center gap-3 overflow-hidden animate-fade-in"
        style={{ animationDelay: animationDelays[13] }}
      >
        <h3 className="text-sm font-bold mb-2" style={{ color: BLACK }}>
          Soft Skills & Experience
        </h3>
        {softSkills.map((skill, index) => {
          const Icon = skill.icon;
          return (
            <div key={index} className="flex items-center gap-2">
              <Icon size={14} color={ACCENT} />
              <span className="text-xs font-sans" style={{ color: BLACK }}>
                {skill.text}
              </span>
            </div>
          );
        })}
      </div>

      <div
        className="flex flex-col p-8 justify-center gap-2 overflow-hidden animate-fade-in"
        style={{ animationDelay: animationDelays[14] }}
      >
        <span className="text-xs font-sans" style={{ color: BLACK }}>
          1+ years of hands-on experience{" "}
          <span style={{ color: ACCENT }}>*</span>
        </span>
        <span className="text-xs font-sans" style={{ color: BLACK }}>
          20+ successful projects delivered
          <span style={{ color: ACCENT }}>**</span>
        </span>
        <span className="text-xs font-sans" style={{ color: BLACK }}>
          Full-stack development & design
          <span style={{ color: ACCENT }}>***</span>
        </span>
      </div>

      <div
        className="flex p-1 items-center justify-center text-black overflow-hidden animate-fade-in"
        style={{ animationDelay: animationDelays[15] }}
      ></div>
    </div>
  );
};

export default Skills;