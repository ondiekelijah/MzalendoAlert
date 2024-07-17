"use client";

import { useEffect, useState } from "react";
import Accordion from "./components/Accordion";
import Header from "./components/Header";
import ReportForm from "./components/ReportForm";
import HeroSection from "./components/HeroSection";
import LoadingSpinner from "./components/LoadingSpinner";
import LoadMoreButton from "./components/LoadMoreButton";
import ReportUpdate from "./components/ReportUpdate";
import Footer from "./components/Footer";
import Modal from "./components/Modal";
import accordionData from "./data";
import { extractTweetId, validateTweetUrl } from "./utils/index";
import MissingPersonsDisplay from "./components/MissingPersonsDisplay";

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
  const [isModalVisible, setIsModalVisible] = useState(false); // Indicator if the modal is visible
  const [formPending, setFormPending] = useState(false); // Indicator if form submission is pending
  const [tweetCount, setTweetCount] = useState(0); // Number of tweets
  const limit = 4; // Records per page

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
        setTweetCount(data.total);
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
      <Header supportLink="https://www.buymeacoffee.com/Teksad" />

      {isFormVisible ? (
        <ReportForm
          tweetUrl={tweetUrl}
          handleInputChange={handleInputChange}
          handleReportClick={handleReportClick}
          formPending={formPending}
          message={message}
          setMessage={setMessage}
        />
      ) : (
        <HeroSection
          title="Help Families Reunite: Report a Missing Mzalendo."
          buttonText="Report Missing Mzalendo"
          onButtonClick={handleFormToggle}
        />
      )}

      {loading ? (
        <LoadingSpinner />
      ) : (
        <MissingPersonsDisplay tweets={tweets} tweetCount={tweetCount} />
      )}

      {tweets.length > 0 && hasMore ? (
        <LoadMoreButton handleLoadMore={handleLoadMore} />
      ) : (
        !loading && <ReportUpdate onClick={handeFormToggleAndScrollToTop} />
      )}

      <Accordion items={accordionData} />

      <Footer />

      {isModalVisible && (
        <Modal
          setIsModalVisible={setIsModalVisible}
          handleConfirmReport={handleConfirmReport}
        />
      )}
    </main>
  );
}
