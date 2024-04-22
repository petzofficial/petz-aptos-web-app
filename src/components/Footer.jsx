import Image from "next/image";
import React from "react";
import logo from "../../public/logo.png";
import Link from "next/link";
import { GrDocument } from "react-icons/gr";
import {
  FaTwitterSquare,
  FaDochub,
  FaLinkedin,
  FaGithubSquare,
} from "react-icons/fa";
import "../style/footer.scss";

const Footer = () => {
  return (
    <footer suppressHydrationWarning={true}>
      <div className="addcontainer 2xl:px-5 lg:px-14 md:px-10 sm:px-6 max-sm:px-3">
        <div className="footer-inner">
          <div className="footer-container my-14 max-sm:flex-col">
            <Link href={"/"}>
              <div className="logo flex items-center w-[150px] sm:mx-auto">
                <Image src={logo} width={60} height={60} alt="logo" />
                <span className="text-[26px] font-bold">PetZ</span>
              </div>{" "}
            </Link>
            <div className="more max-md:space-y-2 space-y-3 w-[150px] sm:mx-auto">
              <h4>More</h4>
              <Link href={"/setting/about"}>
                <button>About</button>
              </Link>
              <Link href={"/setting/privacy-policy"}>
                <button>Privacy Policy</button>
              </Link>
              <Link href={"/setting/terms-conditions"}>
                <button>Terms Of Services</button>
              </Link>
            </div>
            <div className="social max-md:space-y-2 space-y-3 w-[150px] sm:mx-auto">
              <h4>Social</h4>
              {/* <Link href={"https://instagram.com/"}>
                <button className="flex items-center">
                  <FaInstagram className="mr-1" /> Instagram
                </button>
              </Link> */}
              <Link target="_blank" href={"https://twitter.com/PetzOfficial"}>
                <button className="flex items-center">
                  <FaTwitterSquare className="mr-1" /> Twitter
                </button>
              </Link>
              <Link
                target="_blank"
                href={"https://www.linkedin.com/company/petz-money"}
              >
                <button className="flex items-center">
                  <FaLinkedin className="mr-1" /> Linkedin
                </button>
              </Link>
              <Link target="_blank" href={"https://github.com/petzofficial"}>
                <button className="flex items-center">
                  <FaGithubSquare className="mr-1" /> Github
                </button>
              </Link>
              <Link target="_blank" href={"https://docs.petz.money/"}>
                <button className="flex items-center">
                  <GrDocument className="mr-1" /> Docs
                </button>
              </Link>
            </div>
          </div>
          <p className="text-center">© 2022 - 2024 PetZ Money</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
