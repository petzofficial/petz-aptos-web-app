import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import GoBackBtn from "@/components/button/GoBackBtn";
import Link from "next/link";
import React from "react";
import "../../../style/account/transaction.scss";
import { Outfit } from "next/font/google";

const outfit = Outfit({ subsets: ["latin"] });

const Page = () => {
  return (
    <div>
      <Navbar method={"account"} />

      <section className="transaction-details">
        <div className="addcontainer 2xl:px-5 lg:px-14 md:px-10 sm:px-6 max-sm:px-3">
          <Link href={"/home"} className="text-[30px] font-bold">
            <GoBackBtn />
          </Link>

          <div className="transaction-inner">
            <h3 className={outfit.className}>Transaction</h3>
            <div className="trans-body mb-10">
              <div>
                <p>Version</p>
                <span>7230185768</span>
              </div>
              <div>
                <p>Timestamp</p>
                <p>Oct 11, 2023, 12:12am</p>
              </div>
              <div>
                <p>Status</p>
                <span>Confirmed</span>
              </div>
              <div>
                <p>Gas Used</p>
                <span>537020 APT</span>
              </div>
              <div>
                <p>Gast Unit Price</p>
                <span>100</span>
              </div>
              <div>
                <p>Function</p>
                <span>create_resource</span>
              </div>
              <div>
                <p>Balance Charges</p>
                <span>2315</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Page;
