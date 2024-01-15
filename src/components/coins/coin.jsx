import LoadingSkeleton from "@/components/common/skeletonLoading";
import CircularIndeterminate from "@/components/common/loading";
import { renderCoinImage, calculateCoinAmount } from "@/components/common/coin";
const Coins = ({ coins, isLoading, connected }) => {
  if (!connected) {
    return (
      <div className="first-box flex justify-between items-center mt-8">
        not connected
      </div>
    );
  } else {
    return (
      <div className="first-box flex justify-between flex-wrap items-center mt-8">
        {isLoading ? (
          <CircularIndeterminate />
        ) : (
          coins?.map((x, index) => (
            <div key={index}>
              <div className="flex items-center flex-wrap  pr-8  space-x-1">
                {" "}
                {renderCoinImage(x?.metadata?.symbol)}
                {calculateCoinAmount(x?.amount, x?.metadata?.decimals)}{" "}
                {x?.metadata?.symbol}
              </div>
            </div>
          ))
        )}
      </div>
    );
  }
};

export default Coins;
