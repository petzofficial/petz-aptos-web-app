import LoadingSkeleton from "@/components/common/skeletonLoading";
import PGT from "@/assets/home/pgt-removebg-preview 2.png";
import PST from "@/assets/home/pst-removebg-preview 2.png";
import APT from "@/assets/home/image 23.png";
import Image from "next/image";
const Coins = ({ coins, isLoading, connected }) => {
  const renderCoinImage = (symbol) => {
    switch (symbol) {
      case "PGC":
        return <Image src={PGT} width={30} height={30} alt="PGT" />;
      case "MOON-APTU":
        return <Image src={PST} width={30} height={30} alt="PST" />;
      case "APT":
        return <Image src={APT} width={30} height={30} alt="APT" />;
      default:
        return null; // You can handle other cases or return a default image
    }
  };
  if (!connected) {
    return (
      <div className="first-box flex justify-between items-center mt-8">
        not connected
      </div>
    );
  } else {
    return (
      <div className="first-box flex justify-between items-center mt-8">
        {isLoading ? (
          <LoadingSkeleton />
        ) : (
          coins?.map((x, index) => (
            <div key={index}>
              <div className="flex items-center space-x-1">
                {renderCoinImage(x?.metadata?.symbol)}
                <p>
                  {x?.amount} {x?.metadata?.symbol}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    );
  }
};

export default Coins;
