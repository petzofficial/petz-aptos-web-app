import CircularIndeterminate from "../common/loading";
import { renderCoinImage, calculateCoinAmount } from "@/components/common/coin";

const Coins = ({ coins, isLoading, connected }) => {
  if (!connected) {
    return (
      <div className="first-box flex justify-between items-center mt-8">
        not connected
      </div>
    );
  } else {
    const displaySymbols = ["APT", "PGC", "PSC"];
    const missingSymbols = displaySymbols.filter(
      (symbol) => !coins?.find((coin) => coin?.metadata?.symbol === symbol)
    );
    console.log(missingSymbols);

    return (
      <div className="first-box flex gap-4 justify-between flex-wrap items-center mt-8">
        {isLoading ? (
          <div className="flex items-center justify-center w-full">
            <CircularIndeterminate />
          </div>
        ) : (
          displaySymbols.map((symbol, index) => {
            const coin = coins?.find((x) => x?.metadata?.symbol === symbol);

            return (
              <div
                key={index}
                className="flex justify-between items-center space-x-1"
              >
                {coin ? (
                  <div style={{ display: "flex", alignItems: "center" }}>
                    {renderCoinImage(coin?.metadata?.symbol)}
                    {calculateCoinAmount(
                      coin?.amount,
                      coin?.metadata?.decimals
                    )}
                    {coin?.metadata?.symbol}
                  </div>
                ) : (
                  <div
                    key={index}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "4px",
                    }}
                  >
                    {renderCoinImage(symbol)}
                    <span>0{symbol}</span>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    );
  }
};

export default Coins;
