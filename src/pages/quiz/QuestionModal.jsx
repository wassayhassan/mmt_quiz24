import { Link } from "react-router-dom";

const QuestionModal = ({ setModal, activenum, setQuestion }) => {
  return (
    <div className="flex fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-40 justify-start items-center flex-col px-8 rounded-xl py-6 w-[90%] max-w-[713px] bg-[#e6e6e6] shadow-md min-h-[400px]">
      <div className="flex justify-between items-center w-full">
        <h3 className="text-black text-center w-full font-normal text-base sm:text-xl">
          Math Topic Test Overview
        </h3>
        <button onClick={() => setModal(false)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="black"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
      <div className="flex mt-8 justify-center items-center gap-6 flex-wrap">
        {Array(10)
          .fill(false)
          .map((elem, idx) => {
            return (
              <button
                onClick={() => {
                  setQuestion(idx + 1);
                  setModal(false);
                }}
                className={`${
                  idx + 1 <= activenum
                    ? "bg-black text-white border-solid"
                    : "border-dashed bg-transparent text-black"
                }  w-[30px] h-[30px] grid place-items-center text-xl font-bold border border-black`}
              >
                {idx + 1}
              </button>
            );
          })}
      </div>
      <Link
        to="/result"
        className="text-black mt-auto bg-transparent hover:bg-black hover:text-white transition-all duration-300 w-[170px] h-[40px] md:h-[30px] grid place-items-center text-base border border-solid border-black rounded-full"
      >
        Submit
      </Link>
    </div>
  );
};

export default QuestionModal;
