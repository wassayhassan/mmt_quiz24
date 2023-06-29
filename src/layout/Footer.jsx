import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="wrapper mt-8 md:mt-14 py-3">
      <div className="contain sm:flex-row flex-col justify-between items-center gap-5">
        <Link to="/" className="font-inter font-bold text-[30px] text-[#212121]">
          SAT.MMTPrep
        </Link>
        <p className="text-black text-sm">
          © 2023 MMTPrep. All Rights Reserved.{" "}
        </p>
        <div className="hidden flex justify-center items-center gap-3">
          <a href="#" target="blank">
            <img src="/fb.png" alt="" className="w-[32px] object-contain" />
          </a>
          <a href="#" target="blank">
            <img
              src="/linkedin.png"
              alt=""
              className="w-[32px] object-contain"
            />
          </a>
          <a href="#" target="blank">
            <img
              src="/twitter-footer.png"
              alt=""
              className="w-[32px] object-contain"
            />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
