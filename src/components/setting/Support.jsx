"use client";
import Image from "next/image";
import React from "react";
import { BsChatSquareDots } from "react-icons/bs";
import img from "../../assets/support/Active Support-rafiki 1.png";
import { IoMailOutline } from "react-icons/io5";

const Support = () => {
  const handleRedirect = (e) => {
    e.preventDefault();
    const emailAddress = "petz.money@gmail.com";
    window.location.href = `mailto:${emailAddress}`;
  };
  return (
    <div className="lg:w-[603px] setting-support lg:ml-36">
      <h2 className="text-[#FF6900] mb-10 max-md:mb-8 max-lg:text-center">
        Help & Support
      </h2>
      <div>
        <div className="support-hero lg:flex items-center">
          <div className="support-img">
            <Image
              src={img}
              width={300}
              height={300}
              alt="Support"
              className="max-md:m-auto"
            />
          </div>
          <div className="details lg:w-[270px]">
            <h3>How can we help you?</h3>
            <p>
              If you have any questions or concerns regarding these Terms and
              Conditions, please contact us at petz.money@gmail.com.
            </p>
          </div>
        </div>

        <div className="support-btn lg:flex lg:space-x-4">
          <button>
            <BsChatSquareDots />
            <span>Contact Via Message</span>
          </button>
          <button onClick={(e) => handleRedirect(e)}>
            <IoMailOutline />
            <span>Contact Via E-mail</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Support;
