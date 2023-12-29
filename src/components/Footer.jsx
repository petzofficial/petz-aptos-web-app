import Image from 'next/image'
import React from 'react'
import logo from '../../public/logo.png'
import Link from 'next/link'
import { FaFacebookSquare, FaInstagram, FaLinkedin } from "react-icons/fa";
import '../style/footer.scss'

const Footer = () => {
  return (
    <footer>
      <div className="addcontainer 2xl:px-5 lg:px-14 md:px-10 sm:px-6 max-sm:px-3">
        <div className="footer-inner">
          <div className="footer-container my-14 max-sm:flex-col">
            <div className="logo flex items-center w-[150px] sm:mx-auto">
              <Image src={logo} width={60} height={60} alt='logo' />
              <span className='text-[26px] font-bold'>PetZ</span>
            </div>
            <div className="more max-md:space-y-2 space-y-3 w-[150px] sm:mx-auto">
              <h4>More</h4>
              <Link href={'/setting/about'}><button>About</button></Link>
              <Link href={'/setting/privacy-policy'}><button>Privacy Policy</button></Link>
              <Link href={'/setting/terms-conditions'}><button>Terms Of Services</button></Link>
            </div>
            <div className="social max-md:space-y-2 space-y-3 w-[150px] sm:mx-auto">
              <h4>Social</h4>
              <Link href={'https://instagram.com/'}><button className='flex items-center'><FaInstagram className='mr-1' /> Instagram</button></Link>
              <Link href={'https://facebook.com'}><button className='flex items-center'><FaFacebookSquare className='mr-1' /> Facebook</button></Link>
              <Link href={'https://linkedin.com'}><button className='flex items-center'><FaLinkedin className='mr-1' /> Linkedin</button></Link>
            </div>
          </div>
          <p className='text-center'>© 2022 - 2024 PetZ Money</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
