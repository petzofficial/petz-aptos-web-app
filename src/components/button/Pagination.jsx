'use client';

import React, { useState } from 'react';
import '../../style/pagination/pagination.scss';

const Pagination = ({ pageNum, totalPages, setPageNum }) => {
  // Generate an array of page numbers based on the total number of pages
  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

  return (
    <div className='pagination max-md:my-4 md:my-8'>
      {pages.map((page, ind) => {
        return (
          <button
            key={page}
            onClick={() => setPageNum(page)}
            className={pageNum === page ? 'active-page' : ''}>
            {page}
          </button>
        );
      })}
    </div>
  );
};

export default Pagination;
