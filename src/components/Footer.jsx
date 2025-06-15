import React, { useEffect, useRef, useState } from "react";
import {
  Mail,
  Phone,
  MapPin,
  Github,
  Linkedin,
  Twitter,
  Send,
  Heart,
  Coffee,
  Code,
  Globe,
  Star,
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

// Grid Cell 1: Main Title
const MainTitleCell = () => {
  return (
    <div
      className="flex p-4 items-center justify-center text-black overflow-hidden animate-fade-in"
      style={{ animationDelay: "0s" }}
    ></div>
  );
};

// Grid Cell 2: Contact Label
const ContactLabelCell = () => {
  return (
    <div
      className="flex p-4 items-center text-black overflow-hidden animate-fade-in"
      style={{ animationDelay: "0.2s" }}
    ></div>
  );
};

// Grid Cell 3: Get in Touch
const GetInTouchCell = () => {
  return (
    <div
      className="flex p-4 items-center justify-center text-black overflow-hidden animate-fade-in"
      style={{ animationDelay: "0.4s" }}
    ></div>
  );
};

// Grid Cell 4: Contact Vertical Text
const ContactVerticalCell = () => {
  return (
    <div
      className="flex items-center justify-center text-gray-500 overflow-hidden animate-fade-in"
      style={{ animationDelay: "0.6s" }}
    ></div>
  );
};

const ContactInfoCell = () => {
  return (
    <div
      className="flex flex-col p-4 gap-2 justify-center overflow-hidden animate-fade-in"
      style={{ animationDelay: "0.8s" }}
    ></div>
  );
};

// Grid Cell 6: Social Links
const SocialLinksCell = () => {
  return (
    <div
      className="flex p-4 items-center text-black overflow-hidden animate-fade-in"
      style={{ animationDelay: "0.2s" }}
    >
      <span
        className="text-xl font-bold tracking-tight"
        style={{ color: BLACK }}
      >
        contact<span style={{ color: ACCENT }}>*</span>
      </span>
    </div>
  );
};

// Grid Cell 7: Quick Links
const QuickLinksCell = () => {
  return (
    <div
      className="flex p-4 items-center justify-center text-black overflow-hidden animate-fade-in"
      style={{ animationDelay: "0.4s" }}
    >
      <h2 className="text-2xl font-bold font-sans" style={{ color: BLACK }}>
        Project Portfolio
      </h2>
    </div>
  );
};

// Grid Cell 8: Social Vertical Text
const SocialVerticalCell = () => {
  return (
    <div
      className="flex items-center pl-[260px] justify-center text-gray-500 overflow-hidden animate-fade-in"
      style={{ animationDelay: "0.6s" }}
    >
      <span className="text-lg tracking-widest font-bold rotate-90 select-none transition">
      CONTACT
    </span>
    </div>
  );
};

// Grid Cell 9: Call to Action
const CallToActionCell = () => {
  return (
    <div
      className="flex p-4 items-center justify-center text-black overflow-hidden animate-fade-in"
      style={{ animationDelay: "0s" }}
    ></div>
  );
};

// Grid Cell 10: Newsletter Signup
const NewsletterCell = () => {
  return (
    <div
      className="flex p-4 items-center  text-black  animate-fade-in"
      style={{ animationDelay: "0s" }}
    >
      <h1 className="text-xl font-bold font-sans " style={{ color: BLACK }}>
        Let's work
        <br />
        <span
          className="block text-8xl font-extrabold font-sans animate-slide-up"
          style={{ color: BLACK }}
        >
          together
          <span style={{ color: ACCENT }}>*</span>
        </span>
      </h1>
    </div>
  );
};

// Grid Cell 11: Skills Preview
const SkillsPreviewCell = () => {
  return (
    <div
      className="flex flex-col p-4 gap-2 justify-center overflow-hidden animate-fade-in"
      style={{ animationDelay: "1.2s" }}
    ></div>
  );
};

// Grid Cell 12: Stats
const StatsCell = () => {
  return (
    <div
      className="flex items-center justify-center pl-[260px] text-gray-500 overflow-hidden animate-fade-in"
      style={{ animationDelay: "1.4s" }}
    >
     <span className="text-lg tracking-widest font-bold rotate-90 select-none transition">
      SOCIAL
    </span>
    </div>
  );
};

// Grid Cell 13: Footer Info
const FooterInfoCell = () => {
  return (
    <div
      className="flex flex-col p-4 gap-2 justify-center overflow-hidden animate-fade-in"
      style={{ animationDelay: "1.0s" }}
    >
      <h3 className="text-sm font-bold mb-2" style={{ color: BLACK }}>
        Follow Me
      </h3>
      <div className="space-y-2">
        <a
          href="https://github.com/theapro"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-50 transition-all group"
        >
          <Github size={14} color={ACCENT} />
          <span
            className="text-xs font-sans group-hover:text-opacity-70"
            style={{ color: BLACK }}
          >
            GitHub
          </span>
        </a>
        <a
          href="https://linkedin.com/in/theaynpro"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-50 transition-all group"
        >
          <Linkedin size={14} color={ACCENT} />
          <span
            className="text-xs font-sans group-hover:text-opacity-70"
            style={{ color: BLACK }}
          >
            LinkedIn
          </span>
        </a>
        <a
          href="https://twitter.com/theaynpro"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-50 transition-all group"
        >
          <Twitter size={14} color={ACCENT} />
          <span
            className="text-xs font-sans group-hover:text-opacity-70"
            style={{ color: BLACK }}
          >
            Twitter
          </span>
        </a>
      </div>
    </div>
  );
};

// Grid Cell 14: Location & Time
const LocationTimeCell = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div
      className="flex flex-col p-4 gap-2 justify-center overflow-hidden animate-fade-in"
      style={{ animationDelay: "0.8s" }}
    >
      <div className="space-y-2">
        <h3 className="text-sm font-bold mb-2" style={{ color: BLACK }}>
          Contact Information
        </h3>
        <div className="space-y-2">
          <a
            href="mailto:theaynpro@gmail.com"
            className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-50 transition-all group"
          >
            <Mail size={14} color={ACCENT} />
            <span
              className="text-xs font-sans group-hover:text-opacity-70"
              style={{ color: BLACK }}
            >
              theaynpro@gmail.com
            </span>
          </a>
          <a
            href="tel:+998949119118"
            className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-50 transition-all group"
          >
            <Phone size={14} color={ACCENT} />
            <span
              className="text-xs font-sans group-hover:text-opacity-70"
              style={{ color: BLACK }}
            >
              +998 94 911 91 18
            </span>
          </a>
          <a
            href="#"
            className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-50 transition-all group"
          >
            <MapPin size={14} color={ACCENT} />
            <span
              className="text-xs font-sans group-hover:text-opacity-70"
              style={{ color: BLACK }}
            >
              Tashkent, Uzbekistan
            </span>
          </a>
        </div>
      </div>
    </div>
  );
};

// Grid Cell 15: Languages
const LanguagesCell = () => {
  return (
    <div
      className="flex flex-col p-4 gap-2 justify-center overflow-hidden animate-fade-in"
      style={{ animationDelay: "1.2s" }}
    >
      <h3 className="text-sm font-bold mb-2" style={{ color: BLACK }}>
        Quick Links
      </h3>
      <div className="space-y-1">
        <a
          href="#about"
          className="block text-xs font-sans hover:text-opacity-70 transition-all p-1 rounded"
          style={{ color: BLACK }}
        >
          About
        </a>
        <a
          href="#skills"
          className="block text-xs font-sans hover:text-opacity-70 transition-all p-1 rounded"
          style={{ color: BLACK }}
        >
          Skills
        </a>
        <a
          href="#Works"
          className="block text-xs font-sans hover:text-opacity-70 transition-all p-1 rounded"
          style={{ color: BLACK }}
        >
          Works
        </a>
        <a
          href="#contact"
          className="block text-xs font-sans hover:text-opacity-70 transition-all p-1 rounded"
          style={{ color: BLACK }}
        >
          Contact
        </a>
      </div>
    </div>
  );
};

// Grid Cell 16: Theme Toggle
const ThemeToggleCell = () => {
  const [isDark, setIsDark] = useState(false);

  return (
    <div
      className="flex flex-col p-4 justify-center gap-1 overflow-hidden animate-fade-in"
      style={{ animationDelay: "2.4s" }}
    >
      <div className="flex items-center gap-1 mb-1">
        <span className="text-xs font-sans" style={{ color: BLACK }}>
          Made with
        </span>
        <Heart size={10} color={ACCENT} fill={ACCENT} />
        <span className="text-xs font-sans" style={{ color: BLACK }}>
          and
        </span>
        <Coffee size={10} color={ACCENT} />
      </div>
      <p className="text-xs font-sans" style={{ color: BLACK }}>
        © 2025 TheApro
      </p>
      <p className="text-xs font-sans" style={{ color: BLACK }}>
        All rights reserved
      </p>
    </div>
  );
};

// Main Footer Component
const Footer = () => {
  return (
    <footer className="grid grid-cols-4 grid-rows-4 border-t-2 w-screen h-screen overflow-hidden relative">
      <AnimatedGrid rows={4} cols={4} />

      {/* Row 1 */}
      <MainTitleCell />
      <ContactLabelCell />
      <GetInTouchCell />
      <ContactVerticalCell />

      {/* Row 2 */}
      <ContactInfoCell />
      <SocialLinksCell />
      <QuickLinksCell />
      <SocialVerticalCell />

      {/* Row 3 */}
      <CallToActionCell />
      <NewsletterCell />
      <SkillsPreviewCell />
      <StatsCell />

      {/* Row 4 */}
      <FooterInfoCell />
      <LocationTimeCell />
      <LanguagesCell />
      <ThemeToggleCell />
    </footer>
  );
};

export default Footer;
