import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Hero = () => {
  return (
    <section className="wrapper mt-[120px] relative">
      <div className="contain">
        <img
          src="/hero.png"
          className="w-full object-cover min-h-[500px] rounded-2xl"
          alt=""
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex justify-start items-center flex-col gap-8 text-center w-full">
          <h3 className="text-white font-archivo leading-[1.2] text-[26px] sm:text-[40px] md:text-[50px] lg:text-[60px] font-bold uppercase">
          Designed to help students <br />  for the SAT Math
          </h3>
          <motion.div whileTap={{scale:0.97}} href="/topic" className="text-white bg-btnGr w-[190px] h-[60px] grid place-items-center rounded text-xl font-bold font-archivo">
              <Link
                to="/topic"
              >
                Take a Quiz
              </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
