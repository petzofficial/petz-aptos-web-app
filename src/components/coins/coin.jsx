import LoadingSkeleton from "@/components/common/skeletonLoading";
import img1 from "@/assets/home/pgt-removebg-preview 2.png";
import Image from "next/image";
const Coins = ({ coins, isLoading }) => {
  return (
    <div className="first-box flex justify-between items-center mt-8">
      {isLoading ? (
        <LoadingSkeleton />
      ) : (
        coins?.map((x, index) => (
          <div key={index}>
            <div className="flex items-center space-x-1">
              <Image src={img1} width={30} height={30} alt="PGT" />
              <p>
                {x?.amount} {x?.metadata?.symbol}
              </p>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Coins;
