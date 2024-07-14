"use client";

import { useEffect, useState } from "react";
import { Tweet } from "react-tweet";

type Tweet = {
  tweetId: string;
};

export default function Home() {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [tweetUrl, setTweetUrl] = useState("");
  const [message, setMessage] = useState({ type: "", text: "" });
  const [tweets, setTweets] = useState<Tweet[]>([]);
  const [page, setPage] = useState(1); // Current page
  const [hasMore, setHasMore] = useState(true); // Indicator if there are more tweets to load
  const [loading, setLoading] = useState(false); // Indicator if tweets are loading
  const limit = 10; // Records per page

  const handleFormToggle = () => {
    setIsFormVisible(!isFormVisible);
    setMessage({ type: "", text: "" }); // Clear previous messages when toggling form
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
    // Using \w to match any word character (equivalent to [a-zA-Z0-9_])
    // Using RegExp.exec() for matching
    const regex = new RegExp(/^https:\/\/x\.com\/\w{1,15}\/status\/(\d+)$/);
    const match = regex.exec(url);
    return match ? match[1] : null;
  };

  const fetchTweets = async (clear = false) => {
    try {
      setLoading(true); // Set loading to true before fetching
      const response = await fetch(`/get-tweets?page=${page}&limit=${limit}`);
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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateTweetUrl(tweetUrl)) {
      setMessage({
        type: "error",
        text: "Invalid URL format. Please enter a valid tweet URL.",
      });
      return;
    }

    const tweetId = extractTweetId(tweetUrl);

    try {
      const response = await fetch("/save-tweet", {
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
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center px-6 pt-4">
      <div className="z-10 w-full max-w-5xl mx-auto font-mono text-sm flex flex-col items-center justify-between lg:flex-row">
        <p className="flex w-full justify-center pb-6 pt-8 lg:relative lg:w-auto lg:rounded-xl  text-3xl font-bold">
          <span className="text-green-500">Mzalendo</span>
          <span className="text-red-500">Alert</span>
        </p>
        <div className="w-full flex items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:relative lg:p-4 lg:w-auto lg:bg-none">
          <button
            className="inline-flex items-center justify-center gap-2 px-6 py-3 text-white bg-green-600 rounded-full shadow-lg transition-all hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-700 focus:ring-offset-2 mt-4 lg:mt-0"
            onClick={handleFormToggle}
          >
            <span>Report a Missing Mzalendo</span>
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
      </div>

      {isFormVisible ? (
        <form className="w-full max-w-xl mx-auto mt-8" onSubmit={handleSubmit}>
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
              className="w-full max-w-md px-4 py-2 shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-full focus:ring-green-500 focus:border-green-500 block mx-auto dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500 dark:shadow-sm-light"
              placeholder="https://x.com/TanzaniaLeaks/status/1234567890123456789"
              value={tweetUrl}
              onChange={handleInputChange}
              required
            />
            {message.text && (
              <p
                className={`mt-2 text-sm ${
                  message.type === "error" ? "text-red-600" : "text-green-600"
                }`}
              >
                {message.text}
              </p>
            )}
          </div>
          <div className="text-center">
            <button
              type="submit"
              className="text-white rounded-full bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
            >
              Report Missing
            </button>
          </div>
        </form>
      ) : (
        <div className="mt-8 text-center w-auto flex flex-col items-center gap-8">
          <h1 className="max-w-4xl text-slate-900 font-extrabold text-3xl sm:text-4xl lg:text-5xl tracking-tight dark:text-white">
            Every Tweet Counts: Help Us Locate Missing Loved Ones.
          </h1>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.buymeacoffee.com/Teksad"
            className="text-white rounded-full bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium text-sm px-5 py-2.5 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
          >
            Support MzalendoAlert
          </a>
        </div>
      )}

      {loading ? (
        <div className="mt-20 mb-32 text-center text-gray-500">
          <p>Loading tweets...</p>
        </div>
      ) : (
        <div className="mt-20 mb-32 grid gap-6 text-center lg:mb-0 lg:w-full lg:max-w-5xl lg:grid-cols-2 lg:text-left">
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
          <p className="mt-5 text-sm font-semibold text-gray-500">
            That&apos;s all for now! Have any updates? Report missing{" "}
            {
              // open the form when there are no tweets

              <button
                // should alway push the users current position to the top of the page and show form
                onClick={() => {
                  setIsFormVisible(true);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className="text-green-500 hover:underline"
              >
                here.
              </button>
            }
          </p>
        )
      )}

      <div className="text-center py-10">
        <p className="text-slate-900 font-extrabold text-3xl sm:text-4xl lg:text-5xl tracking-tight dark:text-white flex justify-center">
          <span className="text-green-500">Mzalendo</span>
          <span className="text-red-500">Alert</span>
        </p>
        <p className="small-text mt-6">
          We do not collect user data. All data displayed here are embedded
          tweets.
        </p>
      </div>
    </main>
  );
}
