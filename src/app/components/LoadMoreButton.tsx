interface LoadMoreButtonProps {
  handleLoadMore: () => void;
}

const LoadMoreButton: React.FC<LoadMoreButtonProps> = ({ handleLoadMore }) => (
  <button
    onClick={handleLoadMore}
    className="px-4 py-2 text-sm font-mono text-white bg-green-500 rounded-full hover:bg-green-600 mt-5"
  >
    Load More
  </button>
);

export default LoadMoreButton;
