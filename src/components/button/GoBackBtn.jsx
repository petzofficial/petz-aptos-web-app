"use client"


import { useRouter } from "next/navigation";
import { IoArrowBackCircleOutline } from "react-icons/io5";

const GoBackBtn = () => {
    const router = useRouter();
    return (
        <button onClick={()=> router.back()} className='flex items-center space-x-1 max-md:text-[20px] max-lg:text-[25px] lg:text-[30px]'><span><IoArrowBackCircleOutline /> </span><span>Back</span></button>
    )
}

export default GoBackBtn
