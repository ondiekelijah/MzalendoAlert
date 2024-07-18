import { Tweet } from "react-tweet";

interface MissingPersonsProps {
  tweets: Array<{ tweetId: string }>;
  tweetCount: number;
}

const MissingPersonsDisplay: React.FC<MissingPersonsProps> = ({
  tweets,
  tweetCount,
}) => (
  <>
    {/* Display the number of missing persons */}
    <div className="mt-5 text-center text-gray-500">
      <p className="text-sm font-semibold text-gray-500">
        You are viewing <span className="text-green-700">{tweets.length}</span>{" "}
        out of <span className="text-green-700">{tweetCount}</span> reported
        missing persons. Thank you for helping families reunite!
      </p>
    </div>

    <div className="mt-2 grid gap-3 text-center lg:mb-0 lg:w-full lg:max-w-5xl lg:grid-cols-2 lg:text-left">
      {tweets.map((tweet) => (
        <div
          key={tweet.tweetId}
          className="relative h-96 w-4/5 m-auto overflow-hidden rounded-b-xl shadow-lg"
        >
          {" "}
          <Tweet id={tweet.tweetId} />
          <div className="absolute  bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black to-transparent pointer-events-none"></div>
        </div>
      ))}
    </div>
  </>
);

export default MissingPersonsDisplay;
