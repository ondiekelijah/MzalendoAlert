interface ReportUpdateProps {
    onClick: () => void;
  }
  
  const ReportUpdate: React.FC<ReportUpdateProps> = ({ onClick }) => (
    <div className="mt-5 text-center text-gray-500">
      <p className="mt-5 text-sm font-bold text-gray-500">
        That&apos;s all for now! Have any updates? Report missing{" "}
        <button
          onClick={onClick}
          className="text-green-500 hover:underline"
        >
          here.
        </button>
      </p>
    </div>
  );

export default ReportUpdate;