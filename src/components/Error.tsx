interface ErrorProps {
  message: string,
  retry?: Function,
}

const Error: React.FC<ErrorProps> = ({message, retry}) => {
  return (
    <div
      className="text-center text-white"
      data-testid="error"
    >
      <div className="text-center mt-10">Oops! An error occurred:</div>
      <div className="text-center text-2xl mt-2 mb-5">{message}</div>
      {
        retry && (
          <button
            data-testid="retry"
            className="bg-gradient-to-br from-purple-700 to-purple-500 rounded-lg px-4 py-2 text-center mt-2 font-bold"
            onClick={() => {
              retry();
            }}
          >
            Retry
          </button>
        )
      }
    </div>
  );
};

export default Error;