import React from 'react';
import '../styles/Button.css';
import PostList from '../components/PostList.tsx';
import NavBar from '../components/NavBar.tsx';

const FreeBoardPage: React.FC = () => {
  return (
    <>
      <div>
        <NavBar />
      </div>
      <div className="page_container">
        <button className="custom_board_button confirm_button">자유 게시판</button>
        <div className="free_board_container">
          <PostList type="free" />
        </div>
      </div>
    </>
  );
};

export default FreeBoardPage;
