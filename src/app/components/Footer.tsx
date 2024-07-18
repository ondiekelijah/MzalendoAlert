const Footer: React.FC = () => (
  <>
    <div className="text-center py-10">
      <p className="text-slate-900 font-extrabold text-3xl sm:text-4xl lg:text-5xl tracking-tight dark:text-white flex justify-center">
        <span className="text-green-500">Mzalendo</span>{" "}
        <span className="text-red-500">Alert</span>
      </p>
      <p className="small-text my-6 text-gray-500">
        We do not collect user data. All data displayed here are embedded
        tweets.
      </p>
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://www.buymeacoffee.com/Teksad"
        className="text-white rounded-full font-mono bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium text-sm px-5 py-2.5 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
      >
        ❤ Support MzalendoAlert
      </a>
    </div>

    <div className="flex flex-col items-center font-mono text-center sm:flex-row justify-center space-x-4 sm:space-x-8 w-full max-w-5xl mx-auto mt-8 mb-4">
      <a
        href="https://kenyalaw.org/kl/fileadmin/pdfdownloads/TheConstitutionOfKenya.pdf"
        target="_blank"
        rel="noopener noreferrer"
        className="text-gray-500 underline inline-flex items-center"
      >
        The Constitution of Kenya
      </a>
    </div>
  </>
);

export default Footer;
