import React from "react";
import Image from "next/image";
import image1 from "../../assets/nft/111.png";
import image2 from "../../assets/nft/28-removebg-preview1.png";
import image3 from "../../assets/nft/01.png";
import image4 from "../../assets/nft/29.png";
import Link from "next/link";
import Pagination from "../button/Pagination";

const items = [
  {
    id: 1,
    image: image1,
    num: 1273,
    pick: "Pitbull",
  },
  {
    id: 2,
    image: image2,
    num: 1273,
    pick: "Pitbull",
  },
  {
    id: 3,
    image: image3,
    num: 1273,
    pick: "Pitbull",
  },
  {
    id: 4,
    image: image4,
    num: 1273,
    pick: "Pitbull",
  },
  {
    id: 5,
    image: image1,
    num: 1273,
    pick: "Pitbull",
  },
  {
    id: 6,
    image: image2,
    num: 1273,
    pick: "Pitbull",
  },
  {
    id: 7,
    image: image3,
    num: 1273,
    pick: "Pitbull",
  },
  {
    id: 8,
    image: image4,
    num: 1273,
    pick: "Pitbull",
  },
];

const Token = ({ tokens }) => {
  return (
    <div className="account-token max-md:pt-5 md:pt-10">
      <div className="pick-cards grid max-lg:grid-cols-2 lg:grid-cols-4 justify-between items-center">
        {tokens.map((item) => {
          return (
            <Link key={item.id} href={`/nft/${item.last_transaction_version}`}>
              <div className="box shadow-md m-auto my-[10px]">
                <div className="image flex justify-center items-center">
                  <Image src={item.image} width={86} height={117} alt="petz" />
                </div>
                <div className="pitbull-footer">
                  <p>#{item?.current_token_data?.token_name}</p>
                  <p>{item.pick}</p>
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      <Pagination />
    </div>
  );
};

export default Token;
