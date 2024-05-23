import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { selectActiveMenu, setActiveMenu } from '../store/menuSlice.ts';
import '../styles/NavBar.css';

const NavBar = () => {
  const activeMenu = useSelector(selectActiveMenu);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const accessToken = localStorage.getItem('accessToken');
  const [isLoggedIn, setIsLoggedIn] = useState(!accessToken);

  useEffect(() => {
    if (accessToken) {
      setIsLoggedIn(true);
      return;
    }

    setIsLoggedIn(false);
  }, [accessToken]);

  const BOARD_MENU = {
    ALL: '전체 글 보기',
    FREE: '자유 게시판',
    AUTH: '인증 게시판',
    ENV: '환경 정보 게시판',
  };

  const MY_MENU = {
    MY_PAGE: '내가 쓴 글',
    MY_INFO: '내 정보',
  };

  const handleMenuClick = (menuName: string) => {
    dispatch(setActiveMenu(menuName));

    const menuRoutes: { [key: string]: string } = {
      [BOARD_MENU.ALL]: '/',
      [BOARD_MENU.FREE]: '/free',
      [BOARD_MENU.AUTH]: '/auth',
      [BOARD_MENU.ENV]: '/env',
      [MY_MENU.MY_PAGE]: '/mypage/main',
      [MY_MENU.MY_INFO]: '/mypage/info',
    };

    if (menuRoutes[menuName]) {
      navigate(menuRoutes[menuName]);
    }
  };

  return (
    <div className="navbar">
      <div className="text_menu_big">게시판</div>
      {Object.values(BOARD_MENU).map(menuName => (
        <button
          key={menuName}
          className={`menu_button ${activeMenu === menuName ? 'active' : ''}`}
          onClick={() => handleMenuClick(menuName)}>
          {menuName}
        </button>
      ))}
      {/* isLoggedIn이 true일 때만 MY_MENU 렌더링합니다. */}
      {isLoggedIn && <div className="text_menu_big">마이 페이지</div>}
      {isLoggedIn &&
        Object.values(MY_MENU).map(menuName => (
          <button
            key={menuName}
            className={`menu_button ${activeMenu === menuName ? 'active' : ''}`}
            onClick={() => handleMenuClick(menuName)}>
            {menuName}
          </button>
        ))}
    </div>
  );
};

export default NavBar;
