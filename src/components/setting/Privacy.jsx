"use client"
import React from 'react'
import { LuSettings2 } from "react-icons/lu";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import { IoIosArrowDown } from "react-icons/io";
import { FiSearch } from "react-icons/fi";

const Privacy = () => {

    const [open, setOpen] = React.useState(1);

    const handleOpen = (value) => setOpen(open === value ? 0 : value);
    return (
        <div className='lg:w-[603px] setting-privacy lg:ml-36'>
      <h2 className='text-[#FF6900] mb-10 max-md:mb-8 max-lg:text-center'>Privacy Policy</h2>
            <div>
                <div className="search-bar max-lg:m-auto relative pb-4">
                    <input type="text" className='outline-none px-8 py-2 w-full' placeholder='Search...' />
                    <LuSettings2 className='absolute top-3 right-2 text-[#898989]' />
                    <FiSearch className='absolute top-3 left-2 text-[#898989]' />
                </div>

                <div className="privacy-accordion">
                    <Accordion>
                        <AccordionSummary
                            expandIcon={<IoIosArrowDown />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                        >
                            <Typography className='!font-bold !py-1'>Lorem ipsum dolor sit amet</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography className='!text-[#898989]'>
                                Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.
                            </Typography>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion>
                        <AccordionSummary
                            expandIcon={<IoIosArrowDown />}
                            aria-controls="panel2a-content"
                            id="panel2a-header"
                        >
                            <Typography className='!font-bold !py-1'>Lorem ipsum dolor sit amet</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography className='!text-[#898989]'>
                                Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.
                            </Typography>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion>
                        <AccordionSummary
                            expandIcon={<IoIosArrowDown />}
                            aria-controls="panel2a-content"
                            id="panel2a-header"
                        >
                            <Typography className='!font-bold !py-1'>Lorem ipsum dolor sit amet</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography className='!text-[#898989]'>
                                Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.
                            </Typography>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion>
                        <AccordionSummary
                            expandIcon={<IoIosArrowDown />}
                            aria-controls="panel2a-content"
                            id="panel2a-header"
                        >
                            <Typography className='!font-bold !py-1'>Lorem ipsum dolor sit amet</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography className='!text-[#898989]'>
                                Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.
                            </Typography>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion>
                        <AccordionSummary
                            expandIcon={<IoIosArrowDown />}
                            aria-controls="panel2a-content"
                            id="panel2a-header"
                        >
                            <Typography className='!font-bold !py-1'>Lorem ipsum dolor sit amet</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography className='!text-[#898989]'>
                                Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.
                            </Typography>
                        </AccordionDetails>
                    </Accordion>
                </div>
            </div>
        </div>
    )
}

export default Privacy
