import { Tweet } from "react-tweet";

interface MissingPersonsProps {
    tweets: Array<{ tweetId: string }>;
    tweetCount: number;
  }
  
  const MissingPersonsDisplay: React.FC<MissingPersonsProps> = ({ tweets, tweetCount }) => (
    <>
      {/* Display the number of missing persons */}
      <div className="mt-5 text-center text-gray-500">
        <p className="text-sm font-semibold text-gray-500">
          You are viewing{" "}
          <span className="text-green-500">{tweets.length}</span> out of{" "}
          <span className="text-green-500">{tweetCount}</span> reported
          missing persons. Thank you for helping families reunite!
        </p>
      </div>
  
      <div className="mt-2 grid gap-4 text-center lg:mb-0 lg:w-full lg:max-w-5xl lg:grid-cols-2 lg:text-left overflow-hidden">
        {tweets.map((tweet) => (
          <Tweet key={tweet.tweetId} id={tweet.tweetId} />
        ))}
      </div>
    </>
  );

export default MissingPersonsDisplay;