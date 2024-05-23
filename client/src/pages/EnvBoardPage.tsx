import React from 'react';
import '../styles/Button.css';
import '../components/PostList.tsx';
import EnvPostList from '../components/EnvPostList.tsx';
import NavBar from '../components/NavBar.tsx';

const EnvBoardPage: React.FC = () => {
  return (
    <>
      <div>
        <NavBar />
      </div>
      <div className="page_container">
        <div>
          <button className="custom_board_button confirm_button">환경 정보 게시판</button>
          <div className="env_board_container">
            <EnvPostList />
          </div>
        </div>
      </div>
    </>
  );
};

export default EnvBoardPage;
