import Image from "next/image";
import "../../style/without/without.scss";
import header from "../../assets/without/empty.png";
import Link from "next/link";

const Page = () => {
  return (
    <div className="without-selection m-auto">
      <div className="addcontainer">
        <div className="without-inner">
          <div className="title-image m-auto">
            <Image
              src={header}
              width={326}
              height={218}
              alt="PetZ"
              className="m-auto"
            />
          </div>
          <h3>OOPS</h3>
          <p className="font-semibold">No data found...</p>

          <div className="selection-button">
            <Link href={"https://nftrade.com"}>
              <button>Buy PetZ NFT</button>
            </Link>
            <Link href={"/home"}>
              <button>Continue without NFT</button>
            </Link>
          </div>
          <div className="selection-footer pb-5">
            <p>Dont have petz nft?</p>
            <div className="nfttrade-link">
              <span>Buy it from here </span>
              <Link href={"https://nftrade.com/"} target="_blank">
                {" "}
                https://nftrade.com/
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
