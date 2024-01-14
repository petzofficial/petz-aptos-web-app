import PGT from "@/assets/home/pgt-removebg-preview 2.png";
import PST from "@/assets/home/pst-removebg-preview 2.png";
import APT from "@/assets/home/image 23.png";
import Image from "next/image";

export const renderCoinImage = (symbol) => {
  switch (symbol) {
    case "PGC":
      return <Image src={PGT} width={30} height={30} alt="PGT" />;
    case "MOON-APTU":
      return <Image src={PST} width={30} height={30} alt="PST" />;
    case "APT":
      return <Image src={APT} width={30} height={30} alt="APT" />;
    default:
      return null;
  }
};
export const calculateCoinAmount = (amount, decimals) => {
  console.log(amount);
  console.log(decimals);
  const calculatedAmount = (amount / 10) ** decimals;
  return calculatedAmount;
};
