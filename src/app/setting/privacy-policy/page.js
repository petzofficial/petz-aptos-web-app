
import '../../../style/setting/setting.scss'
import React from 'react'
import Navbar from '@/components/Navbar'
import Common from '@/components/setting/Common'
import Footer from '@/components/Footer'




const Page = () => {

    return (
        <div>
            <Navbar method={'setting'} />

            <section className='setting'>
                <div className="addcontainer 2xl:px-5 lg:px-14 md:px-10 sm:px-6 max-sm:px-3">
                    <Common method={'privacy-policy'} />
                </div>
            </section>

            <Footer />
        </div>
    )
}

export default Page
