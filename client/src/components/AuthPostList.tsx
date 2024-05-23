import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/AuthPostList.css';
import { getAuthPosts } from 'api/api.js';
import { AuthPost } from '../types/types.ts';

const AuthPostList: React.FC = () => {
  const [allAuthPosts, setAllAuthPosts] = useState<AuthPost[]>([]);
  const [visibleAuthPosts, setVisibleAuthPosts] = useState<AuthPost[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage: number = 6;
  const maxPagesToShow: number = 5; // 한 번에 보여줄 최대 페이지 수

  useEffect(() => {
    getAuthPosts()
      .then((res: any) => {
        const sortedData = res.data.sort((a: { createdAt: string }, b: { createdAt: string }) => {
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        });
        setAllAuthPosts(sortedData);
        setVisibleAuthPosts(sortedData.slice(0, 6));
      })
      .catch((error: any) => console.error('Error:', error));
  }, []);

  // 페이지를 변경할 때 visibleAuthPosts 업데이트
  useEffect(() => {
    updateVisiblePosts(currentPage, allAuthPosts);
  }, [currentPage, allAuthPosts]);

  // 페이지를 변경하고 visibleAuthPosts 업데이트하는 함수
  const updateVisiblePosts = (page: number, data: AuthPost[]) => {
    const startIndex: number = (page - 1) * itemsPerPage;
    const endIndex: number = startIndex + itemsPerPage;
    const pageData: AuthPost[] = data.slice(startIndex, endIndex);
    setVisibleAuthPosts(pageData);
  };

  // 페이지 번호를 클릭했을 때 호출되는 함수
  const handlePageClick = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  // 페이지 번호 배열 생성
  const getPageNumbers = () => {
    const totalPages: number = Math.ceil(allAuthPosts.length / itemsPerPage);
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

  // 이전 페이지 버튼이 비활성화 상태인지 여부
  const isPrevButtonDisabled: boolean = currentPage === 1;

  // 다음 페이지 버튼이 비활성화 상태인지 여부
  const isNextButtonDisabled: boolean = currentPage === Math.ceil(allAuthPosts.length / itemsPerPage);

  return (
    <>
      <div className="auth_post_grid">
        {visibleAuthPosts.map((post: AuthPost, index: number) => (
          <Link
            to={`/auth/${post.postId}/${post.userId}`} // 경로 설정
            key={post.postId}
            className="auth_post_item_container">
            <img src={post.imageUrl} alt={`${post.postId}`} />
          </Link>
        ))}
      </div>
      <div className="pagination">
        {!isPrevButtonDisabled && visibleAuthPosts.length > 0 && (
          <button onClick={() => handlePageClick(1)}>&lt;&lt;</button>
        )}
        {!isPrevButtonDisabled && visibleAuthPosts.length > 0 && (
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
        {!isNextButtonDisabled && visibleAuthPosts.length > 0 && (
          <button onClick={() => handlePageClick(currentPage + 1)}>&gt;</button>
        )}
        {!isNextButtonDisabled && visibleAuthPosts.length > 0 && (
          <button onClick={() => handlePageClick(Math.ceil(allAuthPosts.length / itemsPerPage))}>&gt;&gt;</button>
        )}
      </div>
    </>
  );
};

export default AuthPostList;
