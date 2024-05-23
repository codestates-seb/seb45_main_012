import React from 'react';
import '../styles/Button.css';
import PostList from '../components/PostList.tsx';
import NavBar from '../components/NavBar.tsx';

const AllBoardPage: React.FC = () => {
  return (
    <>
      <div>
        <NavBar />
      </div>
      <div className="page_container">
        <button className="custom_board_button confirm_button">전체 게시판</button>
        <div className="free_board_container">
          <PostList type="all" />
        </div>
      </div>
    </>
  );
};

export default AllBoardPage;
