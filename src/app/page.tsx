"use client";

import { useEffect, useState } from "react";
import { Tweet } from "react-tweet";
import Accordion from "./components/Accordion";

type Tweet = {
  tweetId: string;
};

const accordionData = [
  {
    title: "What to do if someone goes missing",
    content:
      "When a person goes missing, report to the police and post on X, then share the post here on MzalendoAlert.",
  },
  {
    title: "Links to support organizations and hotlines",
    content:
      "We invite members of the public to report any incidences of violence or arrests during the peaceful protests to the @LawSocietyofKe toll-free line: 0800720434.",
  },
];

export default function Home() {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [tweetUrl, setTweetUrl] = useState("");
  const [message, setMessage] = useState({ type: "", text: "" });
  const [tweets, setTweets] = useState<Tweet[]>([]);
  const [page, setPage] = useState(1); // Current page
  const [hasMore, setHasMore] = useState(true); // Indicator if there are more tweets to load
  const [loading, setLoading] = useState(false); // Indicator if tweets are loading
  const [isModalVisible, setIsModalVisible] = useState(false); // Indicator if the modal is visible
  const [formPending, setFormPending] = useState(false); // Indicator if form submission is pending
  const limit = 10; // Records per page

  const handleFormToggle = () => {
    setIsFormVisible(!isFormVisible);
    setMessage({ type: "", text: "" }); // Clear previous messages when toggling form
  };

  const handeFormToggleAndScrollToTop = () => {
    setIsFormVisible(!isFormVisible);
    setMessage({ type: "", text: "" }); // Clear previous messages when toggling form
    window.scrollTo(0, 0);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTweetUrl(e.target.value);
  };

  const validateTweetUrl = (url: string) => {
    // This regex allows for any valid Twitter username instead of a specific one
    const regex = /^https:\/\/x\.com\/\w{1,15}\/status\/(\d+)$/;
    return regex.test(url);
  };

  const extractTweetId = (url: string) => {
    const regex = new RegExp(/^https:\/\/x\.com\/\w{1,15}\/status\/(\d+)$/);
    const match = regex.exec(url);
    return match ? match[1] : null;
  };

  const fetchTweets = async (clear = false) => {
    try {
      setLoading(true); // Set loading to true before fetching
      const response = await fetch(
        `/api/get-tweets?page=${page}&limit=${limit}`
      );
      if (!response.ok) throw new Error("Failed to fetch");
      const data = await response.json();
      if (clear) {
        setTweets(data.tweets);
        setHasMore(data.tweets.length === limit);
      } else {
        const newTweets = data.tweets.filter(
          (newTweet: Tweet) =>
            !tweets.some(
              (currentTweet) => currentTweet.tweetId === newTweet.tweetId
            )
        );
        if (newTweets.length > 0) {
          setTweets((prevTweets) => [...prevTweets, ...newTweets]);
          setHasMore(newTweets.length === limit);
        } else {
          setHasMore(false);
        }
      }
    } catch (error) {
      console.error("Error fetching tweets:", error);
      setMessage({ type: "error", text: "Failed to load tweets." });
    } finally {
      setLoading(false); // Set loading to false after fetching
    }
  };

  useEffect(() => {
    fetchTweets(true); // Clear previous tweets when component mounts or page is reset to 1
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (page > 1) {
      fetchTweets(); // Append new tweets when page changes and is greater than 1
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  const handleLoadMore = () => {
    if (hasMore) {
      setPage((prevPage) => prevPage + 1); // Increase page number to load more tweets
    }
  };

  const handleSubmit = async () => {
    if (!validateTweetUrl(tweetUrl)) {
      setMessage({
        type: "error",
        text: "Invalid URL format. Please enter a valid tweet URL.",
      });
      return;
    }

    const tweetId = extractTweetId(tweetUrl);

    try {
      const response = await fetch("/api/save-tweet", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ tweetId }),
      });

      if (response.ok) {
        const result = await response.json();
        setMessage({ type: "success", text: result.message });
        setTweetUrl("");
        setPage(1); // Reset to the first page
        fetchTweets(true); // Clear tweets and fetch the first page again
      } else {
        const errorResult = await response.json();
        setMessage({ type: "error", text: errorResult.message });
      }
    } catch (error) {
      console.error("Error saving report:", error);
      setMessage({
        type: "error",
        text: "An error occurred while saving the report.",
      });
    } finally {
      setFormPending(false);
      setIsModalVisible(false);
    }
  };

  const handleReportClick = () => {
    if (!validateTweetUrl(tweetUrl)) {
      setMessage({
        type: "error",
        text: "Invalid URL format. Please enter a valid tweet URL.",
      });
      return;
    }
    setIsModalVisible(true);
  };

  const handleConfirmReport = () => {
    setFormPending(true);
    setIsModalVisible(false);
    handleSubmit();
  };

  return (
    <main className="flex min-h-screen flex-col items-center px-4 pt-4">
      <div className="z-10 w-full max-w-5xl mx-auto  text-sm flex flex-col items-center justify-between lg:flex-row">
        <p className="flex w-full justify-center pb-6 pt-8 lg:relative lg:w-auto lg:rounded-xl text-3xl font-bold">
          <span className="text-green-500">Mzalendo</span>
          <span className="text-red-500">Alert</span>
        </p>
        <div className="hidden lg:flex w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:relative lg:p-4 lg:w-auto lg:bg-none">
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.buymeacoffee.com/Teksad"
            className="text-white rounded-full bg-green-700 hover:bg-green-800 font-mono focus:ring-4 focus:outline-none focus:ring-green-300 font-medium text-sm px-5 py-2.5 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
          >
            ❤ Support MzalendoAlert
          </a>
        </div>
      </div>

      {isFormVisible ? (
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
                      message.type === "error"
                        ? "text-red-500"
                        : "text-green-500"
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
      ) : (
        <div className="mt-8 text-center w-auto flex flex-col items-center gap-8">
          <h1 className="max-w-4xl text-slate-900 font-extrabold text-3xl sm:text-4xl lg:text-5xl tracking-tight dark:text-white">
            Help Families Reunite: Report a Missing Mzalendo.
          </h1>

          <button
            className="inline-flex items-center font-mono justify-center gap-2 px-6 py-3 text-white bg-green-600 rounded-full shadow-lg transition-all hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-700 focus:ring-offset-2 mt-4 lg:mt-0"
            onClick={handleFormToggle}
          >
            <span>Report Missing Mzalendo</span>
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
      )}

      {loading ? (
        <div className="mt-20 mb-32 text-center text-gray-500">
          <p>Loading tweets...</p>
        </div>
      ) : (
        <div className="mt-20 mb-20 grid gap-4 text-center lg:mb-0 lg:w-full lg:max-w-5xl lg:grid-cols-2 lg:text-left">
          {tweets.map((tweet) => (
            <Tweet key={tweet.tweetId} id={tweet.tweetId} />
          ))}
        </div>
      )}

      {tweets.length > 0 && hasMore ? (
        <button
          onClick={handleLoadMore}
          className="px-4 py-2 text-sm font-semibold text-white bg-green-500 rounded-full hover:bg-green-600 mt-5"
        >
          Load More
        </button>
      ) : (
        !loading && (
          <div className="mt-5 text-center text-gray-500">
            <p className="mt-5 text-sm font-semibold text-gray-500">
              That&apos;s all for now! Have any updates? Report missing{" "}
              {
                <button
                  onClick={handeFormToggleAndScrollToTop}
                  className="text-green-500 hover:underline"
                >
                  here.
                </button>
              }
            </p>
          </div>
        )
      )}

      <Accordion items={accordionData} />

      <div className="text-center py-10">
        <p className="text-slate-900  font-extrabold text-3xl sm:text-4xl lg:text-5xl tracking-tight dark:text-white flex justify-center">
          <span className="text-green-500">Mzalendo</span>{" "}
          <span className="text-red-500">Alert</span>
        </p>
        <p className="small-text my-6 text-gray-400">
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

      <div className="flex flex-col font-mono text-center sm:flex-row justify-between w-full max-w-5xl mx-auto mt-8 mb-4">
        <a
          href="https://chatgpt.com/g/g-JBq7D0E5x-finance-bill-gpt"
          target="_blank"
          className="text-green-500 mb-4 sm:mb-0"
        >
          FinanceBillGPT
        </a>
        <a
          href="https://kenyalaw.org/kl/fileadmin/pdfdownloads/TheConstitutionOfKenya.pdf"
          target="_blank"
          className="text-green-500"
        >
          The Constitution of Kenya
          <svg
            className="w-4 h-4 inline-block me-1.5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M17 8l4 4m0 0l-4 4m4-4H3"
            />
          </svg>
        </a>
      </div>

      {isModalVisible && (
        <div
          id="popup-modal"
          tabIndex={-1}
          className="fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-full bg-gray-800 bg-opacity-50"
        >
          <div className="relative p-4 w-full max-w-md">
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
              <button
                type="button"
                className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                onClick={() => setIsModalVisible(false)}
              >
                <svg
                  className="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M1 1l6 6m0 0l6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
              <div className="p-4 md:p-5 text-center">
                <svg
                  className="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  />
                </svg>
                <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                  Please confirm: Is this missing person report accurate and
                  genuine?
                </h3>{" "}
                <button
                  onClick={() => setIsModalVisible(false)}
                  type="button"
                  className="py-2.5 px-5 mr-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                >
                  No, cancel
                </button>
                <button
                  onClick={handleConfirmReport}
                  type="button"
                  className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center"
                >
                  Yes, I&apos;m sure{" "}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
