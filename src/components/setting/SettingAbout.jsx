import Image from "next/image";
import React from "react";
import logo from "../../../public/logo.png";

const SettingAbout = () => {
  return (
    <div className="lg:w-[603px] setting-about h-screen lg:ml-36">
      <h2 className="text-[#FF6900] mb-8 max-md:mb-8 max-lg:text-center relative">
        About
        <Image
          className="mt-[-10px] absolute top-0 left-28 max-lg:hidden"
          src={logo}
          width={70}
          height={70}
          alt="PetZ"
        />
      </h2>
      <div>
        <div>
          <p>
            PetZ Money is a virtual pet platform that uses blockchain
            technology, GameFi elements, and the Pomodoro technique to
            incentivize users to be more productive through Focus-to-Earn model.
            Users start a Pomodoro session and focus on a single task for 25
            minutes. If they are successful, they earn in-game currency that can
            be used to purchase food, toys, and other items for their pet. After
            four Pomodoro sessions, users are rewarded with a longer break and
            more in-game currency. PetZ Money makes the Pomodoro technique more
            fun and engaging, helping users to stay motivated and on track.
          </p>
        </div>

        {/* <div>
          <h4>Mission</h4>
          <p>
            Contrary to popular belief, Lorem Ipsum is not simply random text.
            It has roots in a piece of classical Latin literature from 45 BC,
            making it over 2000 years old. Richard McClintock, a Latin professor
            at Hampden-Sydney College in Virginia, looked up one of the more
            obscure Latin words, consectetur, from a Lorem Ipsum passage, and
            going through the cites of the word in classical.
          </p>
        </div> */}

        {/* <div>
          <h4>Background</h4>
          <p>
            Contrary to popular belief, Lorem Ipsum is not simply random text.
            It has roots in a piece of classical Latin literature from 45 BC,
            making it over 2000 years old. Richard McClintock, a Latin professor
            at Hampden-Sydney College in Virginia, looked up one of the more
            obscure Latin words, consectetur, from a Lorem Ipsum passage, and
            going through the cites.
          </p>
        </div> */}
      </div>
    </div>
  );
};

export default SettingAbout;
