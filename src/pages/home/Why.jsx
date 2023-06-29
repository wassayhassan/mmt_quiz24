const Why = () => {
  return (
    <section className="wrapper mt-10 md:mt-20">
      <div className="contain flex-col justify-start items-center text-center gap-7 md:gap-16">
        <div>
        <h2 className="text-[#212121] text-4xl font-bold">Why QUIZ24?</h2>
          <p className="text-subGray max-w-[750px] text-base md:text-xl font-normal">
            It is a reliable company. We provide our customers with the best,
            perfect and accurate service at a reasonable price.
          </p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 w-full gap-5">
          <WhyBox
            img="/why1.png"
            text="Our staff consists of seasoned veterans with extensive experience in the painting industry, and we take pride in utilizing cutting-edge technology and skills."
          />
          <WhyBox
            img="/why2.png"
            text="We provide reasonable pricing without any hidden costs, ensuring transparency throughout the project."
          />
          <WhyBox
            img="/why3.png"
            text="At MMTPrep, we take punctuality seriously and work diligently to adhere to the schedule, always striving to keep our promises."
          />
        </div>
      </div>
    </section>
  );
};

export default Why;

const WhyBox = ({ img, text }) => {
  return (
    <div className="flex justify-start items-center flex-col gap-6 bg-white rounded-lg shadow-lg border-b-[3px] border-solid border-black  px-5 2xl:px-10 py-8">
      <img src={img} className="object-contain w-[88px]" alt="" />
      <p className="text-base font-light text-textGray">{text}</p>
    </div>
  );
};
