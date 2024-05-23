import React from 'react';
import '../styles/Button.css';
import '../components/PostList.tsx';
import AuthPostList from '../components/AuthPostList.tsx';
import NavBar from '../components/NavBar.tsx';

const AuthBoardPage: React.FC = () => {
  return (
    <>
      <div>
        <NavBar />
      </div>
      <div className="page_container">
        <div>
          <button className="custom_board_button confirm_button">인증 게시판</button>
          <div className="auth_board_container">
            <AuthPostList />
          </div>
        </div>
      </div>
    </>
  );
};

export default AuthBoardPage;
