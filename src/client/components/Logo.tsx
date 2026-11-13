import React from 'react';

const Logo = ({ theme, className = "" }: { theme: 'dark' | 'light', className?: string }) => {
  const isDark = theme === 'dark';
  
  // Colors for dark theme: aggressive Red and Black/White
  // Colors for light theme: Original Purple
  
  const textColor1 = isDark ? "#ffffff" : "#3b1a78"; // "Rank"
  const textColor2 = isDark ? "#ff0000" : "#7c3aed"; // "Rush"
  const boltColor1 = isDark ? "#000000" : "#3b1a78"; // bolt dark part (black in dark theme)
  const boltColor2 = isDark ? "#ff0000" : "#8b5cf6"; // bolt main part (red in dark theme)
  const boltColor3 = isDark ? "#ff4444" : "#a855f7"; // bolt highlight (light red in dark theme)
  const taglineColor = isDark ? "#666666" : "#6b7280";

  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 240 80" 
      fill="none" 
      className={className}
      style={{ height: 32, width: 'auto' }}
    >
      <g transform="translate(4, -5)">
        {/* Bolt background shape */}
        <path d="M28 8 L28 62 L38 62 L38 42 L52 42 L62 62 L74 62 L62 40 C68 37 72 31 72 24 C72 14 64 8 54 8 Z M38 18 L54 18 C59 18 62 21 62 25 C62 29 59 32 54 32 L38 32 Z" fill={boltColor1} stroke={isDark ? "#ff0000" : "none"} strokeWidth={isDark ? "1" : "0"}/>
        {/* Lightning bolt overlay */}
        <path d="M44 6 L30 32 L42 32 L28 58 L56 26 L44 26 Z" fill={boltColor2}/>
        {/* Lightning bolt highlight */}
        <path d="M46 6 L34 28 L44 28 L32 52 L56 24 L46 24 Z" fill={boltColor3}/>
      </g>
      <text x="82" y="48" fontFamily="Inter, system-ui, sans-serif" fontWeight="800" fontSize="26" fill={textColor1} letterSpacing="-0.5">
        Rank<tspan fill={textColor2}>Rush</tspan>
      </text>
      <text x="82" y="68" fontFamily="Inter, system-ui, sans-serif" fontWeight="400" fontSize="12" fill={taglineColor} letterSpacing="0.5">
        {isDark ? "ELITE INTEL" : "web sight"}
      </text>
    </svg>
  );
};

export default Logo;
