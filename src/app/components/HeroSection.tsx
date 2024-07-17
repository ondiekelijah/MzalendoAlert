import React from 'react';

type HeroSectionProps = {
  title: string;
  buttonText: string;
  onButtonClick: () => void;
};

const HeroSection: React.FC<HeroSectionProps> = ({ title, buttonText, onButtonClick }) => (
  <div className="mt-8 text-center w-auto flex flex-col items-center gap-8">
    <h1 className="max-w-4xl text-slate-900 font-extrabold text-3xl sm:text-4xl lg:text-5xl tracking-tight dark:text-white">
      {title}
    </h1>

    <button
      className="inline-flex items-center font-mono justify-center gap-2 px-6 py-3 text-white bg-green-600 rounded-full shadow-lg transition-all hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-700 focus:ring-offset-2 mt-4 lg:mt-0"
      onClick={onButtonClick}
    >
      <span>{buttonText}</span>
      <svg
        className="w-3 h-4 transition-transform group-hover:translate-x-1 motion-reduce:transform-none"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 14 10"
      >
        <path
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M1 5h12m0 0L9 1m4 4L9 9"
        />
      </svg>
      <span className="sr-only">arrow-icon</span>
    </button>
  </div>
);

export default HeroSection;