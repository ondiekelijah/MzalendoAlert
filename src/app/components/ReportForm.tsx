import React from 'react';

type ReportFormProps = {
  tweetUrl: string;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleReportClick: () => void;
  formPending: boolean;
  message: { type: string; text: string };
  setMessage: (message: { type: string; text: string }) => void;
};

const ReportForm: React.FC<ReportFormProps> = ({
  tweetUrl,
  handleInputChange,
  handleReportClick,
  formPending,
  message,
  setMessage,
}) => (
  <form
    className="w-full max-w-xl mx-auto mt-8"
    onSubmit={(e) => {
      e.preventDefault();
      handleReportClick();
    }}
  >
    <div className="mb-5 text-center">
      <label
        htmlFor="tweetUrl"
        className="block mb-2 text-m font-medium text-gray-900 dark:text-white"
      >
        Enter Missing Person&apos;s Tweet URL{" "}
      </label>
      <input
        type="url"
        id="tweetUrl"
        className="w-full max-w-md px-4 py-4 shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-full focus:ring-green-500 focus:border-green-500 block mx-auto dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500 dark:shadow-sm-light"
        placeholder="https://x.com/TanzaniaLeaks/status/1234567890123456789"
        value={tweetUrl}
        onChange={handleInputChange}
        required
      />
      {message.text && (
        <div
          className={`flex items-center p-4 mt-6 mb-4 text-sm ${
            message.type === "error"
              ? "text-red-800 border border-red-300 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 dark:border-red-800"
              : "text-green-800 border border-green-300 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400 dark:border-green-800"
          }`}
          role="alert"
        >
          <svg
            className={`flex-shrink-0 inline w-4 h-4 me-3 ${
              message.type === "error" ? "text-red-500" : "text-green-500"
            }`}
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
          </svg>
          <span className="sr-only">Info</span>
          <div> {message.text}</div>
          <button
            type="button"
            className="ml-auto -mx-1.5 -my-1.5 bg-transparent text-current rounded-lg p-1.5 hover:bg-opacity-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-current"
            aria-label="Close"
            onClick={() => setMessage({ type: "", text: "" })}
          >
            <span className="sr-only">Close</span>
            <svg
              className={`w-4 h-4 ${
                message.type === "error" ? "text-red-500" : "text-green-500"
              }`}
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              />
            </svg>
          </button>
        </div>
      )}
    </div>
    <div className="text-center">
      <button
        onClick={handleReportClick}
        className={`text-white rounded-full bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 ${
          formPending ? "opacity-50 cursor-not-allowed" : ""
        }`}
        disabled={formPending}
      >
        {formPending ? "Submitting..." : "Report Missing"}
      </button>
    </div>
  </form>
);

export default ReportForm;