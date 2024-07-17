import React from 'react';

type HeaderProps = {
  supportLink: string;
};

const Header: React.FC<HeaderProps> = ({ supportLink }) => {
  return (
    <div className="z-10 w-full max-w-5xl mx-auto text-sm flex flex-col items-center justify-between lg:flex-row">
      <p className="flex w-full justify-center pb-6 pt-8 lg:relative lg:w-auto lg:rounded-xl text-3xl font-bold">
        <span className="text-green-500">Mzalendo</span>
        <span className="text-red-500">Alert</span>
      </p>
      <div className="hidden lg:flex w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:relative lg:p-4 lg:w-auto lg:bg-none">
        <a
          target="_blank"
          rel="noopener noreferrer"
          href={supportLink}
          className="text-white rounded-full bg-green-700 hover:bg-green-800 font-mono focus:ring-4 focus:outline-none focus:ring-green-300 font-medium text-sm px-5 py-2.5 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
        >
          ❤ Support MzalendoAlert
        </a>
      </div>
    </div>
  );
};

export default Header;