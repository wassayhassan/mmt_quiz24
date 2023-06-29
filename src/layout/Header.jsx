import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isTop = window.scrollY < 100; // Adjust the value as needed
      setIsScrolled(!isTop);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={"wrapper py-4 fixed top-0 shadow-lg z-50 bg-[#212121]"}
    >
      <div className="contain justify-between items-center gap-4">
        <Link to="/" className="text-white font-inter font-bold text-[30px]">
          SAT.MMTPrep
        </Link>
        <div className="flex justify-start items-center gap-7">
          <Link to="https://twitter.com/MmtprepMath" target="_blank" rel="noopener noreferrer">
            <img src="/twitter.png" className="w-6 object-contain" alt="" />
          </Link>

          <Link to="/login" >
            <img src="/key.png" className="w-6 object-contain" alt="" />
          </Link>
          <a href="#" target="blank">
            <img src="/dash.png" className="w-6 object-contain" alt="" />
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;
