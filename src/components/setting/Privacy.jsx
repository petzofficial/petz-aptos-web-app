"use client";
import React from "react";

import Typography from "@mui/material/Typography";

const Terms = () => {
  const [open, setOpen] = React.useState(1);

  const handleOpen = (value) => setOpen(open === value ? 0 : value);

  return (
    <div className="lg:w-[603px] setting-about lg:ml-36">
      <h2 className="text-[#FF6900] mb-10 max-md:mb-8 max-lg:text-center">
        Privacy Policy
      </h2>
      <div>
        <div>
          <h4>INFORMATION WE COLLECT</h4>
          <p className="md:mt-8 max-md:mt-5">
            1. Personal Information: When you interact with our dApp, we may
            collect personal information such as your Aptos wallet address and
            any other information you voluntarily provide.,
          </p>

          <p className="md:mt-8 max-md:mt-5">
            2. Usage Data: We may collect non-identifying information about your
            usage of our dApp, including but not limited to your interaction
            with the smart contracts, transaction data, and metadata related to
            your activities.
          </p>
          <p className="md:mt-8 max-md:mt-5">
            3. Blockchain Data: Our dApp interacts with the Aptos blockchain,
            which is a public and decentralized ledger. Any information recorded
            on the blockchain is immutable and accessible to anyone with access
            to the blockchain.,
          </p>
        </div>

        <div>
          <h4>USE OF INFORMATION</h4>
          <p className="md:mt-8 max-md:mt-5">
            1. Personal Information: When you interact with our dApp, we may
            collect personal information such as your Aptos wallet address and
            any other information you voluntarily provide.,
          </p>
          <p className="md:mt-8 max-md:mt-5">
            2. Usage Data: We may collect non-identifying information about your
            1. Personal Information: We may use your personal information to
            facilitate transactions within our dApp, communicate with you, and
            provide you with customer support.
          </p>

          <p className="md:mt-8 max-md:mt-5">
            3. Blockchain Data: Information recorded on the Aptos blockchain is
            transparent and cannot be modified or deleted. We do not control or
            have any influence over the data stored on the blockchain.
          </p>
        </div>
        <div className="md:mt-8 max-md:mt-5">
          <h4>DATA SHARING AND DISCLOSURE</h4>
          <p className="md:mt-8 max-md:mt-5">
            1. Third-Party Service Providers: We may share your personal
            information with trusted third-party service providers who assist us
            in operating our dApp, conducting our business, or servicing you.
            These third parties are obligated to keep your personal information
            confidential and secure.
          </p>
          <p className="md:mt-8 max-md:mt-5">
            2. Legal Requirements: We may disclose your personal information if
            required by law or in response to valid requests from public
            authorities (e.g., court orders, subpoenas).
          </p>
          <p className="md:mt-8 max-md:mt-5">
            3. Blockchain Data: Any information recorded on the Aptos blockchain
            is publicly accessible and cannot be considered private or
            confidential.
          </p>
        </div>
        <div className="md:mt-8 max-md:mt-5">
          <h4>DATA SECURITY</h4>
          <p>
            "1. We implement appropriate technical and organizational measures
            to safeguard the personal information we collect from unauthorized
            access, disclosure, alteration, or destruction. However, no method
            of transmission over the internet or electronic storage is entirely
            secure, and we cannot guarantee absolute security.",
          </p>
        </div>
        <div className="md:mt-8 max-md:mt-5">
          <h4>THIRD-PARTY LINKS</h4>
          <p>
            1. Our dApp may contain links to third-party websites or services.
            We are not responsible for the privacy practices or content of those
            third parties. We encourage you to review the privacy policies of
            any third-party services you use.
          </p>
        </div>
        <div className="md:mt-8 max-md:mt-5">
          <h4>CHANGES TO THIS PRIVACY POLICY</h4>
          <p>
            1. We may update this Privacy Policy from time to time to reflect
            changes in our practices or for other operational, legal, or
            regulatory reasons. We will post the updated Privacy Policy on our
            website and encourage you to review it periodically.
          </p>
        </div>
        <div className="md:mt-8 max-md:mt-5">
          <h4>CONTACT US"</h4>
          <p>
            1. If you have any questions or concerns about this Privacy Policy
            or our data practices, please contact us at petz.money@gmail.com.
          </p>
        </div>
        <div className="md:mt-8 max-md:mt-5">
          <h4>Note</h4>
          <p>
            By using our Petz Money dApp on the Aptos blockchain, you
            acknowledge that you have read and understood this Privacy Policy
            and agree to its terms. Effective Date: 30/3/2024
          </p>
        </div>
      </div>
    </div>
  );
};

export default Terms;
