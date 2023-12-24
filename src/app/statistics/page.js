import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import Link from 'next/link'
import React from 'react'
import { Urbanist, Outfit } from 'next/font/google';
import { IoMdEye } from "react-icons/io";
import '../../style/statistics/statistics.scss'
import Image from 'next/image';
import static1 from '../../assets/statistics/Group 167.png'
import static2 from '../../assets/statistics/Group 167 (1).png'
import static3 from '../../assets/statistics/Group 167 (2).png'
import static4 from '../../assets/statistics/Group 167 (3).png'
import static5 from '../../assets/statistics/Group 167 (4).png'
import static6 from '../../assets/statistics/Group 167 (5).png'
import static7 from '../../assets/statistics/Group 167 (6).png'
import GoBackBtn from '@/components/button/GoBackBtn';


const outfit = Outfit({ subsets: ['latin'] })
const urban = Urbanist({ subsets: ['latin'] })

const Page = () => {

    return (
        <div>
            <Navbar method={'statistics'} />

            <section className='statistics'>
                <div className="addcontainer 2xl:px-5 lg:px-14 md:px-10 sm:px-6 max-sm:px-3">
                    <div className="statistics-title">
                        <Link href={'/home'}>
                            <GoBackBtn />
                        </Link>
                    </div>
                    <div className="statistics-inner">
                        <h2 className={`${outfit.className}`}>Statistics</h2>
                        <div className={`week-month-year-btn pb-5 ${urban.className}`}>
                            <button>Week</button>
                            <button>Month</button>
                            <button>Year</button>
                        </div>
                        <div className="weekly-summ p-5 shadow-sm">
                            <div className="summ-title flex items-center space-x-3 pb-3">
                                <IoMdEye className='text-[22px]' />
                                <h4 className='font-semibold'>Weekly Summary</h4>
                            </div>
                            <div className="summ-body flex justify-between items-center pt-5">
                                <div className="first">
                                    <p className='font-semibold'>00.00 min</p>
                                    <p className='text-[#969696]'>Total</p>
                                </div>
                                <div className="first">
                                    <p className='font-semibold'>00.00 min</p>
                                    <p className='text-[#969696]'>Average</p>
                                </div>
                            </div>
                        </div>
                        <div className="statistics-bar shadow-sm">
                            <div className="statistics-top flex items-center justify-between">
                                <div className='flex flex-col justify-between items-center space-y-2'>
                                    <p>SAT</p>
                                    <span className='text-[#FF6900]'>02</span>
                                </div>
                                <div className='flex flex-col justify-between items-center space-y-2'>
                                    <p>SUN</p>
                                    <span className='text-[#FF6900]'>03</span>
                                </div>
                                <div className='flex flex-col justify-between items-center space-y-2'>
                                    <p>Mon</p>
                                    <span className='text-[#FF6900]'>03</span>
                                </div>
                                <div className='flex flex-col justify-between items-center space-y-2'>
                                    <p>TUS</p>
                                    <span className='text-[#FF6900]'>03</span>
                                </div>
                                <div className='flex flex-col justify-between items-center space-y-2'>
                                    <p>WED</p>
                                    <span className='text-[#FF6900]'>03</span>
                                </div>
                                <div className='flex flex-col justify-between items-center space-y-2'>
                                    <p>THU</p>
                                    <span className='text-[#FF6900]'>03</span>
                                </div>
                                <div className='flex flex-col justify-between items-center space-y-2'>
                                    <p>FRI</p>
                                    <span className='text-[#FF6900]'>03</span>
                                </div>
                            </div>
                            <div className="statistics-img flex items-center justify-between">
                                <div className="img">
                                    <Image className='ml-[7px]' src={static2} width={14} height={137} alt='static' />
                                </div>
                                <div className="img">
                                    <Image src={static1} width={14} height={137} alt='static' />
                                </div>
                                <div className="img">
                                    <Image src={static3} width={14} height={137} alt='static' />
                                </div>
                                <div className="img">
                                    <Image src={static4} width={14} height={137} alt='static' />
                                </div>
                                <div className="img">
                                    <Image src={static5} width={14} height={137} alt='static' />
                                </div>
                                <div className="img">
                                    <Image src={static6} width={14} height={137} alt='static' />
                                </div>
                                <div className="img">
                                    <Image src={static7} width={14} height={137} alt='static' />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>


            <Footer />
        </div>
    )
}

export default Page
