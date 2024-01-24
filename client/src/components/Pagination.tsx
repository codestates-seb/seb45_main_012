import React, { useState } from 'react';
import '../styles/Pagination.css';
import { PaginationProps } from 'types/types.ts';

const Pagination: React.FC<PaginationProps> = ({posts, postsPerPage, pagesPerGroup, currentPage, setCurrentPage }) => {
  const totalPosts = posts.length;
  const totalPages = Math.ceil( totalPosts / postsPerPage);

  const getPageNumbers = () => {
    const pageNumbers: number[] = [];

    for ( let i = 1 ; i <= totalPages ; i++) {
      pageNumbers.push(i);
    }
    return pageNumbers;
  }

  const pageNumbers: number[] = getPageNumbers();

  const pageButtons = (): JSX.Element[] => {
    const groupIndex = Math.ceil(currentPage / pagesPerGroup) - 1;
    const startIndex = groupIndex * pagesPerGroup + 1;
    const endIndex = Math.min(startIndex + pagesPerGroup - 1, pageNumbers.length);

    return (
      pageNumbers.slice(startIndex-1, endIndex).map((number) => (
        <button
          key={number}
          className={currentPage === number ? 'active' : ''}
          onClick={() => setCurrentPage(number)}
        >
          {number}
        </button>
      )))
  };

  const pageGroup = Math.ceil(totalPages / pagesPerGroup);
  const currentGroup = Math.ceil(currentPage / pagesPerGroup);

  const previousGroup = (): void => {
    if (currentGroup > 1) {
      const nextPage = ( currentGroup - 1 ) * pagesPerGroup;
      setCurrentPage(nextPage);
    }
  }

  const nextGroup = (): void => {
    if (currentGroup < pageGroup) {
      const nextPage = currentGroup * pagesPerGroup + 1;
      setCurrentPage(nextPage);
    }
  }

  return (
      <div className='pagination'>
        <button
          onClick={() => previousGroup()}
          disabled={currentGroup === 1}
          className={currentGroup === 1 ? 'disabled' : ''}
        >
          &lt;
        </button>
        {pageButtons()}
        <button
          onClick={() => nextGroup()}
          disabled={currentGroup === pageGroup}
          className={currentGroup === pageGroup ? 'disabled' : ''}
        >
          &gt;
        </button>
      </div>
  )
}

export default Pagination;