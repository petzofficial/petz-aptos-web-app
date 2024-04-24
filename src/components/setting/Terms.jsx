"use client";
import React from "react";

import Typography from "@mui/material/Typography";

const Terms = () => {
  const [open, setOpen] = React.useState(1);

  const handleOpen = (value) => setOpen(open === value ? 0 : value);

  return (
    <div className="lg:w-[603px] setting-about lg:ml-36">
      <h2 className="text-[#FF6900] mb-10 max-md:mb-8 max-lg:text-center">
        Terms & Conditions
      </h2>

      <div>

      <p>
        Welcome to Petz Money! By using our decentralized application (dApp) on
        the Aptos blockchain, you agree to be bound by the following Terms and
        Conditions ("Terms"). Please read them carefully.
      </p>
        <div>
          <h4>1. ACCEPTANCE OF TERMS</h4>
          <p>
          These Terms constitute a legally binding agreement between you and Petz Money. By accessing or using our dApp, you acknowledge that you have read, understood, and agreed to be bound by these Terms.
          </p>

          {/* <p className="md:mt-8 max-md:mt-5">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Eget ornare
            quam vel facilisis feugiat amet sagittis arcu, tortor. Sapien,
            consequat ultrices morbi orci semper sit nulla. Leo auctor ut etiam
            est, amet aliquet ut vivamus. Odio vulputate est id tincidunt fames.
          </p> */}
        </div>

        <div className="md:mt-8 max-md:mt-5">
          <h4>2. ELIGIBILITY</h4>
          <p>
            Our dApp is intended solely for users who are legally permitted to
            engage in decentralized finance (DeFi) activities and use
            blockchain-based applications. You represent and warrant that you
            are of legal age and have the capacity to enter into these Terms.
          </p>

          {/* <p className="md:mt-8 max-md:mt-5">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Eget ornare
            quam vel facilisis feugiat amet sagittis arcu, tortor. Sapien,
            consequat ultrices morbi orci semper sit nulla. Leo auctor ut etiam
            est, amet aliquet ut vivamus. Odio vulputate est id tincidunt fames.
          </p> */}
        </div>
        <div className="md:mt-8 max-md:mt-5">
          <h4>3. PLATFORM USAGE</h4>
          <p>
            You agree to use our dApp solely for lawful purposes and in
            compliance with all applicable laws and regulations. You are solely
            responsible for your actions and interactions while using our dApp,
            including but not limited to any transactions, smart contract
            interactions, and transfers of digital assets.
          </p>
        </div>
        <div className="md:mt-8 max-md:mt-5">
          <h4>4. RISK ACKNOWLEDGMENT</h4>
          <p>
            You acknowledge and understand that the use of decentralized
            applications, smart contracts, and blockchain technology carries
            inherent risks, including but not limited to technical risks,
            regulatory risks, and financial risks. You are solely responsible
            for evaluating and understanding the risks associated with your use
            of our dApp.
          </p>
        </div>
       
        <div className="md:mt-8 max-md:mt-5">
          <h4>5. NO FINANCIAL ADVICE</h4>
          <p>
            Our dApp and any associated materials are provided for informational
            purposes only and do not constitute financial advice. We do not
            recommend or endorse any specific digital assets, investment
            strategies, or financial products.
          </p>
        </div>
        <div className="md:mt-8 max-md:mt-5">
          <h4>6. INTELLECTUAL PROPERTY</h4>
          <p>
            All intellectual property rights, including but not limited to
            copyrights, trademarks, and trade secrets, related to our dApp and
            its associated materials are owned by Petz Money or its licensors.
            You may not reproduce, modify, distribute, or create derivative
            works based on our dApp or its associated materials without our
            prior written consent.
          </p>
        </div>
        <div className="md:mt-8 max-md:mt-5">
          <h4>7. DISCLAIMER OF WARRANTIES</h4>
          <p>
            Our dApp is provided on an 'as is' and 'as available' basis, without
            any warranties of any kind, whether express or implied, including
            but not limited to warranties of merchantability, fitness for a
            particular purpose, and non-infringement.
          </p>
        </div>
        <div className="md:mt-8 max-md:mt-5">
          <h4>8. LIMITATION OF LIABILITY</h4>
          <p>
            In no event shall Petz Money, its affiliates, or its partners be
            liable for any direct, indirect, incidental, special, consequential,
            or exemplary damages, including but not limited to damages for loss
            of profits, goodwill, use, data, or other intangible losses,
            resulting from your use or inability to use our dApp, or any
            associated products or services.
          </p>
        </div>
        <div className="md:mt-8 max-md:mt-5">
          <h4>9. INDEMNIFICATION</h4>
          <p>
            You agree to indemnify, defend, and hold harmless Petz Money, its
            affiliates, and its partners from and against any and all claims,
            liabilities, damages, losses, and expenses, including reasonable
            attorneys' fees, arising from your use of our dApp or your violation
            of these Terms.
          </p>
        </div>
        <div className="md:mt-8 max-md:mt-5">
          <h4>10. MODIFICATION OF TERMS</h4>
          <p>
            We reserve the right to modify or update these Terms at any time
            without prior notice. Your continued use of our dApp after any
            modifications or updates constitutes your acceptance of the revised
            Terms.
          </p>
        </div>

        <p>
            If you have any questions or concerns regarding these Terms and
            Conditions, please contact us at petz.money@gmail.com.
          </p>
        
      </div>
    </div>
  );
};

export default Terms;
