
import '../../style/starter/selection.scss'
import '../globals.css'
import Image from 'next/image'
import image1 from '../../assets/nft/111.png'
import image2 from '../../assets/nft/28-removebg-preview1.png'
import image3 from '../../assets/nft/01.png'
import image4 from '../../assets/nft/29.png'
import Link from 'next/link'
import Pagination from '@/components/button/Pagination'


const items = [
    {
        id: 1,
        image: image1,
        num: 1273,
        pick: 'Pitbull'
    },
    {
        id: 2,
        image: image2,
        num: 1273,
        pick: 'Pitbull'
    },
    {
        id: 3,
        image: image3,
        num: 1273,
        pick: 'Pitbull'
    },
    {
        id: 4,
        image: image4,
        num: 1273,
        pick: 'Pitbull'
    }
]

export default function page() {
    return (
        <div className="selection-nft text-white xl:h-[100vh]">
            <div className="addcontainer 2xl:px-5 lg:px-14 md:px-10 sm:px-6 max-sm:px-3">
                <div className="selection-title pt-10">
                    <h2>NFT</h2>
                    <h3>Select your favorite nft to get started.</h3>
                </div>
                <div className="selection-inner">

                    <div className="pick-cards flex flex-wrap grid-cols-2 justify-around items-center">
                        {items.map((item) => {
                            return <div key={item.id} className="box m-auto my-[10px] shadow-md">
                                <div className="image flex justify-center items-center">
                                    <Image src={item.image} width={86} height={117} alt='petz' />
                                </div>
                                <div className="pitbull-footer">
                                    <p>#{item.num}</p>
                                    <p>{item.pick}</p>
                                </div>
                            </div>
                        })}
                    </div>
                    <Pagination />
                    <div className="selection-button">
                        <Link className='!mt-0' href={'/home'}><button>Continue</button></Link>
                        <Link href={'/without-nft'}><button>Continue without NFT</button></Link>
                    </div>
                    <div className="selection-footer">
                        <p>Dont have petz nft?</p>
                        <div className="nfttrade-link max-lg:pb-3">
                            <span>Buy it from here </span>
                            <Link href={'https://nftrade.com/'} target='_blank'> https://nftrade.com/</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

