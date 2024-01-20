'use client'

import React, { useState } from 'react'
import '../../style/pagination/pagination.scss'

const pages = [1, 2, 3, 4]

const Pagination = () => {
    const [pageNum, setPageNum] = useState(1)

    return (
        <div className="pagination max-md:my-4 md:my-8">
            {pages.map((page, ind)=>{
                return <button key={page} onClick={()=>setPageNum(page)} className={pageNum===page? 'active-page':''}>{page}</button>
            })}
        </div>
    )
}

export default Pagination
