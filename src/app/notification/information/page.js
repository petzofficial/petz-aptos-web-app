import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import GoBackBtn from '@/components/button/GoBackBtn'
import React from 'react'
import { Outfit } from 'next/font/google'
import Link from 'next/link'
import '../../../style/notification/notification.scss'


const outfit = Outfit({ subsets: ['latin'] })

const Page = () => {

    return (
        <div>
            <Navbar method={'notification'} />

            <section className='notification'>
                <div className="addcontainer 2xl:px-5 lg:px-14 md:px-10 sm:px-6 max-sm:px-3">
                    <div className="notification-title-bar">
                        <Link href={'/home'} className='text-[30px] font-bold flex-1'>
                            <GoBackBtn />
                        </Link>
                    </div>

                    <div className="info-inner">
                        <div className="not-box flex-1">
                            <h3>Notification</h3>
                        </div>
                        <div className="info mt-12">
                            <div className="title">
                                <h4>Lorem Ipsum</h4>
                            </div>
                            <div className="flex justify-between my-2">
                                <p>Lorem Ipsum</p>
                                <p className='font-semibold'>2.54 ETH</p>
                            </div>
                            <div className="flex justify-between my-2">
                                <p>Paid On</p>
                                <p className='font-semibold'>November 15, 2023</p>
                            </div>

                            <div className="description">
                                <h4>Description</h4>
                                <p>Lorem ipsum dolor sit amet consectetur. Aliquet feugiat et id sollicitudin vitae congue risus ac. Viverra arcu blandit diam at. Nec convallis morbi semper turpis nisl enim consectetur a rhoncus. Sit placerat ultricies ac egestas risus tincidunt. Blandit est elit mattis arcu amet morbi gravida cras.</p>
                                <p className='my-10 max-md:mt-4'>Nullam suspendisse erat pellentesque tellus ut lectus at. Nulla a purus erat tortor platea orci cras. Mauris nec quis quam eget auctor sed duis feugiat. Pellentesque rhoncus turpis risus eget tristique consequat mi malesuada mauris. Risus pulvinar a leo massa. Sit.</p>
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
