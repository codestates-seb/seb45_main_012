import React, { useState, useEffect } from 'react';
import '../styles/EnvPostList.css';
import { getEnvPosts } from 'api/api.js';
import { AuthPost } from '../types/types.ts';

const EnvPostList = () => {
  const [allEnvPosts, setAllEnvPosts] = useState<AuthPost[]>([]);
  const [visibleEnvPosts, setVisibleEnvPosts] = useState<AuthPost[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage: number = 6;
  const maxPagesToShow: number = 5;

  useEffect(() => {
    getEnvPosts()
      .then(res => {
        const sortedData = res.data.sort((a: { createdAt: string }, b: { createdAt: string }) => {
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        });
        setAllEnvPosts(sortedData);
        setVisibleEnvPosts(sortedData.slice(0, 6));
      })
      .catch(error => console.error('Error:', error));
  }, []);

  useEffect(() => {
    updateVisiblePosts(currentPage, allEnvPosts);
  }, [currentPage, allEnvPosts]);

  const updateVisiblePosts = (page: number, data: AuthPost[]) => {
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const pageData: AuthPost[] = data.slice(startIndex, endIndex);
    setVisibleEnvPosts(pageData);
  };

  const handlePageClick = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const getPageNumbers = () => {
    const totalPages: number = Math.ceil(allEnvPosts.length / itemsPerPage);
    const halfMaxPages: number = Math.floor(maxPagesToShow / 2);
    let startPage: number, endPage: number;

    if (totalPages <= maxPagesToShow) {
      startPage = 1;
      endPage = totalPages;
    } else {
      if (currentPage <= halfMaxPages) {
        startPage = 1;
        endPage = maxPagesToShow;
      } else if (currentPage + halfMaxPages >= totalPages) {
        startPage = totalPages - maxPagesToShow + 1;
        endPage = totalPages;
      } else {
        startPage = currentPage - halfMaxPages;
        endPage = currentPage + halfMaxPages;
      }
    }

    return Array.from({ length: endPage - startPage + 1 }, (_, index) => startPage + index);
  };

  const isPrevButtonDisabled: boolean = currentPage === 1;

  const isNextButtonDisabled: boolean = currentPage === Math.ceil(allEnvPosts.length / itemsPerPage);

  return (
    <>
      <div className="env_post_grid">
        {visibleEnvPosts.map((post, index) => (
          <div className="env_post_item_container" key={post.postId}>
            <img src={post.imageUrl} alt={`${post.postId}`} />
          </div>
        ))}
      </div>
      <div className="pagination">
        {!isPrevButtonDisabled && visibleEnvPosts.length > 0 && (
          <button onClick={() => handlePageClick(1)}>&lt;&lt;</button>
        )}
        {!isPrevButtonDisabled && visibleEnvPosts.length > 0 && (
          <button onClick={() => handlePageClick(currentPage - 1)}>&lt;</button>
        )}
        {getPageNumbers().map(pageNumber => (
          <button
            key={pageNumber}
            onClick={() => handlePageClick(pageNumber)}
            className={currentPage === pageNumber ? 'active' : ''}>
            {pageNumber}
          </button>
        ))}
        {!isNextButtonDisabled && visibleEnvPosts.length > 0 && (
          <button onClick={() => handlePageClick(currentPage + 1)}>&gt;</button>
        )}
        {!isNextButtonDisabled && visibleEnvPosts.length > 0 && (
          <button onClick={() => handlePageClick(Math.ceil(allEnvPosts.length / itemsPerPage))}>&gt;&gt;</button>
        )}
      </div>
    </>
  );
};

export default EnvPostList;
