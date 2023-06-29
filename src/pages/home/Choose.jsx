const Choose = () => {
  return (
    <div className="wrapper mb-10 mt-10 sm:mt-20 lg:mb-[100px] lg:mt-[150px]">
      <div className="contain lg:flex-row flex-col justify-between items-center gap-10">
        <div className="flex justify-start items-start flex-col gap-4">
          <h2 className="text-[#212121] text-4xl font-bold">Choose Your Study Plan</h2>
          <p className="text-[#212121]">
            At SAT Prep, we have a team of highly experienced educators specializing in SAT Math preparation. We are dedicated to equipping students with the knowledge and skills necessary to excel in the SAT Math section. Our curriculum is designed to leverage the latest teaching methods and technologies, ensuring a comprehensive and effective learning experience. Our instructors are seasoned experts in the field, bringing years of experience and expertise to help students succeed. Join us and unlock your full potential in SAT Math.
          </p>
        </div>
        <div className="bg-white py-12 flex-col sm:min-w-[400px]  w-full max-w-[400px] rounded-2xl flex justify-center items-center">
          <button className="text-[#333] w-full py-5  bg-transparent hover:bg-lightGray transition-all duration-300 text-center font-archivo text-2xl font-semibold">
            SAT-English
          </button>
          <button className="text-[#333] w-full py-5  bg-transparent hover:bg-lightGray transition-all duration-300 text-center font-archivo text-2xl font-semibold">
            SAT-Math
          </button>
          <button className="text-[#333] w-full py-5  bg-transparent hover:bg-lightGray transition-all duration-300 text-center font-archivo text-2xl font-semibold">
            SAT-ALL
          </button>
        </div>
      </div>
    </div>
  );
};

export default Choose;
