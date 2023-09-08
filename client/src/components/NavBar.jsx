import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectActiveMenu, setActiveMenu } from '../store/menuSlice.js';
import '../styles/NavBar.css';

const NavBar = () => {
  const activeMenu = useSelector(selectActiveMenu);
  const dispatch = useDispatch();

  const handleMenuClick = (menuName) => {
    dispatch(setActiveMenu(menuName));
  };

  return (
    <div className="navbar">
      <div className="text_menu_big">게시판</div>
      <button
        className={`menu_button ${activeMenu === '전체 글 보기' ? 'active' : ''}`}
        onClick={() => handleMenuClick('전체 글 보기')}
      >
        전체 글 보기
      </button>
      <button
        className={`menu_button ${activeMenu === '자유 게시판' ? 'active' : ''}`}
        onClick={() => handleMenuClick('자유 게시판')}
      >
        자유 게시판
      </button>
      <button
        className={`menu_button ${activeMenu === '인증 게시판' ? 'active' : ''}`}
        onClick={() => handleMenuClick('인증 게시판')}
      >
        인증 게시판
      </button>
      <button
        className={`menu_button ${activeMenu === '환경 정보 게시판' ? 'active' : ''}`}
        onClick={() => handleMenuClick('환경 정보 게시판')}
      >
        환경 정보 게시판
      </button>
      <div className="text_menu_big">마이 페이지</div>
      <button
        className={`menu_button ${activeMenu === '내가 쓴 글' ? 'active' : ''}`}
        onClick={() => handleMenuClick('내가 쓴 글')}
      >
        내가 쓴 글
      </button>
      <button
        className={`menu_button ${activeMenu === '내 정보' ? 'active' : ''}`}
        onClick={() => handleMenuClick('내 정보')}
      >
        내 정보
      </button>
    </div>
  );
};

export default NavBar;
