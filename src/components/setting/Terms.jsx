"use client";
import React from "react";
import { LuSettings2 } from "react-icons/lu";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import { IoIosArrowDown } from "react-icons/io";
import { FiSearch } from "react-icons/fi";
import { termsAndConditions } from "@/utils/privacy/terms";
const Terms = () => {
  const [open, setOpen] = React.useState(1);

  const handleOpen = (value) => setOpen(open === value ? 0 : value);

  return (
    <div className="lg:w-[603px] setting-privacy lg:ml-36">
      <h2 className="text-[#FF6900] mb-10 max-md:mb-8 max-lg:text-center">
        Terms And Conditions
      </h2>
      <div>
        {/* <div className="search-bar max-lg:m-auto relative pb-4">
          <input
            type="text"
            className="outline-none px-8 py-2 w-full"
            placeholder="Search..."
          />
          <LuSettings2 className="absolute top-3 right-2 text-[#898989]" />
          <FiSearch className="absolute top-3 left-2 text-[#898989]" />
        </div> */}

        <div className="privacy-accordion">
          {termsAndConditions.map((section, index) => (
            <div>
              {section.section && (
                <Typography className="!font-bold !py-1">
                  {section.section}
                </Typography>
              )}
              {section.note && (
                <Typography className="!font-bold !py-1">Note</Typography>
              )}
              {section.effective_date && (
                <Typography className="!font-bold !py-1">
                  Effective Date
                </Typography>
              )}

              <ul>
                {section.content && section.content}
                {section.note && <li>{section.note}</li>}
                {section.effective_date && <li>{section.effective_date}</li>}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Terms;
