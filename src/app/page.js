import logo from '@/../public/logo.png'
import { Urbanist } from 'next/font/google'
import Image from 'next/image'
import Link from 'next/link'
import trust from '../assets/wallet/5947 1.png'
import pantem from '../assets/wallet/61681cca9e256-removebg-preview 1.png'
import blocto from '../assets/wallet/icon 1.png'
import petro from '../assets/wallet/image 22.svg'
import martiam from '../assets/wallet/unnamed 1.png'
import '../style/connect-wallet/connect-wallet.scss'


const urban = Urbanist({ subsets: ['latin'] })


const Page = () => {
  return (
    <section className='connect-wallet lg:h-[100vh] 2xl:px-5 lg:px-14 md:px-10 sm:px-6 max-sm:px-3'>
      <div className="addcontainer">
        <div className={`connect-wallet-inner md:flex justify-between items-center ${urban.className}`}>
          <div className="connect-wallet-left">
            <div className="logo py-16">
              <Image src={logo} width={106} height={106} alt='logo' />
              <h3>PetZ</h3>
            </div>
            <div className="text-box md:p-6 max-md:p-3">
              <h2>CONNECT ACCOUNT</h2>
              <p className='font-medium'>Start by connecting with one of the following wallet providers or create a new wallet entirely</p>
              <p className='font-semibold'>By connecting to our platfom, I agree to the
                <Link href={'/setting'}>terms and conditions</Link>
                and
                <Link href={'/setting'}>privacy policy</Link>
              </p>
            </div>

          </div>
          <div className="connect-wallet-right">
            <Link href={'/select-nft'} className='lg:mt-20 max-lg:mt-7'>
              <button>
                <Image src={petro} width={30} height={30} alt='petro' />
                <span>Petro Wallet</span>
              </button>
            </Link>
            <Link href={'/select-nft'}>
              <button>
                <Image src={pantem} width={23} height={23} alt='pantem' />
                <span>Pontem Wallet</span>
              </button>
            </Link>
            <Link href={'/select-nft'}>
              <button>
                <Image src={trust} width={27} height={24} alt='trust' />
                <span>Trust Wallet</span>
              </button>
            </Link>
            <Link href={'/select-nft'}>
              <button>
                <Image src={martiam} width={22} height={24} alt='martiam' />
                <span>Martiam Wallet</span>
              </button>
            </Link>
            <Link href={'/select-nft'}>
              <button>
                <Image src={blocto} width={30} height={27} alt='blocto' />
                <span>Blocto Wallet</span>
              </button>
            </Link>
          </div>
        </div>
          <div className="connect-wallet-footer pb-3">
            We do not own your private keys and cannot access your funds without your confirmation
          </div>
      </div>
    </section>
  )
}

export default Page
