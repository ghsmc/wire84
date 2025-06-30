import React from 'react';

const EyeLogo = ({ className = "w-6 h-6" }: { className?: string }) => {
  return (
    <div className={`relative flex items-center ${className}`}>
      <svg viewBox="0 0 110 60" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" className="w-full h-full">
        <g id="outer" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
          <path 
            d="M5.73 36.91C9.55 41.07 14.91 45.87 20.85 49.65 32.78 57.24 46.87 59.43 55.26 59.43 63.57 59.43 77.39 57.17 89.12 49.65 95.1 45.81 100.37 41.2 104.19 37.04 107.68 33.25 110 29.72 110 29.72 110 29.72 108.01 26.49 104.19 22.42 100.52 18.49 95.14 13.8 89.12 10.01 77.81 2.9 63.13 0 55.26 0 46.88 0 32.78 2.42 20.85 10.01 14.93 13.78 9.55 18.42 5.73 22.52 2.19 26.32 0 29.72 0 29.72 0 29.72 2.22 33.08 5.73 36.91Z" 
            id="outer-eye" 
            fill="#FFFFFF" 
            transform="translate(55.000000, 29.715640) scale(-1, 1) translate(-55.000000, -29.715640)"
          />
          <path 
            d="M55.26 59.43C71.67 59.43 84.98 46.13 84.98 29.72 84.98 13.3 71.67 0 55.26 0 38.85 0 25.55 13.3 25.55 29.72 25.55 46.13 38.85 59.43 55.26 59.43Z" 
            id="inner-circle-1" 
            fill="#FFEE00"
          />
          <circle 
            id="inner-circle-2" 
            fill="#ffa500" 
            cx="55.26" 
            cy="29.72" 
            r="22.42"
          />
          <path 
            d="M55.26 44.31C63.32 44.31 69.86 37.78 69.86 29.72 69.86 21.65 63.32 15.12 55.26 15.12 47.2 15.12 40.66 21.65 40.66 29.72 40.66 37.78 47.2 44.31 55.26 44.31Z" 
            id="pupil" 
            fill="#FF0000"
            className="animate-[blink_2.3s_infinite]"
          />
          <circle 
            id="glow" 
            fill="#FFFFFF" 
            opacity="0.2" 
            cx="55.26" 
            cy="29.72" 
            r="12"
          />
          <circle 
            id="highlight" 
            fill="#ffffff" 
            opacity="0.3" 
            cx="50" 
            cy="25" 
            r="3"
          />
        </g>
      </svg>
    </div>
  );
};

export default EyeLogo;