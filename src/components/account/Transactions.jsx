import Link from 'next/link'
import React from 'react'
import { FaPercentage } from "react-icons/fa";
import { IoIosArrowForward } from "react-icons/io";
import Pagination from '../button/Pagination';


const items = [
  {
    id: 1,
    title: 'Network Fee',
  },
  {
    id: 2,
    title: 'Network Fee',
  },
  {
    id: 3,
    title: 'Network Fee',
  },
  {
    id: 4,
    title: 'Network Fee',
  },
  {
    id: 5,
    title: 'Network Fee',
  },
]

const Transactions = () => {
  return (
    <div className='account-transactions py-12'>
      {items.map((item) => {
        return <Link key={item.id} href={'/account/transaction-details'} className='sm:px-5 md:px-10 max-sm:px-1 py-3 my-5'>
          <div className="icon">
            <FaPercentage />
          </div>
          <div className="net-fee">
            <h4>{item.title}</h4>
            <p>Confirmed. 2d</p>
          </div>
          <p>0.00951 APT</p>
          <p className='!text-[#191D31] font-medium'>$21,3</p>
          <div className="icon-last text-[#FF6900]">
            <IoIosArrowForward />
          </div>
        </Link>
      })}

      <Pagination />
    </div>
  )
}

export default Transactions
