const Study = () => {
  return (
    <div className="wrapper mt-10 md:mt-20 ">
      <div className="contain flex-col justify-start items-center sm:items-start gap-10">
        <h3 className="text-[#212121] text-4xl font-bold">Study With Books</h3>
        <div className="grid grid-cols-1 lg:grid-cols-3 w-full md:gap-5">

          <div className="relative bg-white rounded-lg shadow-lg">
            <img
              src="/book_cover.png"
              alt="Item"
              className="w-full rounded-t-lg"
            />
            <div className="absolute top-0 left-0 bg-black bg-opacity-50 p-2 rounded-t-lg">
              <span className="text-white font-bold">$29.99</span>
            </div>
            <div className="absolute bottom-5 left-3 ">
              <h3 className="text-xl font-bold mb-2">SAT Math Principles: #1</h3>
              <button className="bg-black hover:bg-gray-800 text-white font-bold py-2 px-4 rounded">
                <a href="https://www.amazon.com/SAT-Math-Principles-MMT-Prep/dp/B0C8R5WY1M/ref=zg_bsnr_11682_sccl_3/142-1611064-1615413?psc=1" target="_blank" rel="noopener noreferrer">
                  Buy Now
                </a>
              </button>


            </div>
          </div>

          <div className="relative bg-white rounded-lg shadow-lg">
            <img
              src="/book_cover.png"
              alt="Item"
              className="w-full rounded-t-lg"
            />
            <div className="absolute top-0 left-0 bg-black bg-opacity-50 p-2 rounded-t-lg">
              <span className="text-white font-bold">$29.99</span>
            </div>
            <div className="absolute bottom-5 left-3 ">
              <h3 className="text-xl font-bold mb-2">SAT Math Principles: #1</h3>
              <button className="bg-black hover:bg-gray-800 text-white font-bold py-2 px-4 rounded">
                <a href="https://www.amazon.com/SAT-Math-Principles-MMT-Prep/dp/B0C8R5WY1M/ref=zg_bsnr_11682_sccl_3/142-1611064-1615413?psc=1" target="_blank" rel="noopener noreferrer">
                  Buy Now
                </a>
              </button>


            </div>
          </div>

          <div className="relative bg-white rounded-lg shadow-lg">
            <img
              src="/book_cover.png"
              alt="Item"
              className="w-full rounded-t-lg"
            />
            <div className="absolute top-0 left-0 bg-black bg-opacity-50 p-2 rounded-t-lg">
              <span className="text-white font-bold">$29.99</span>
            </div>
            <div className="absolute bottom-5 left-3 ">
              <h3 className="text-xl font-bold mb-2">SAT Math Principles: #1</h3>
              <button className="bg-black hover:bg-gray-800 text-white font-bold py-2 px-4 rounded">
                <a href="https://www.amazon.com/SAT-Math-Principles-MMT-Prep/dp/B0C8R5WY1M/ref=zg_bsnr_11682_sccl_3/142-1611064-1615413?psc=1" target="_blank" rel="noopener noreferrer">
                  Buy Now
                </a>
              </button>


            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Study;
