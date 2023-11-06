import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import jwtDecode from 'jwt-decode';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil, faRightFromBracket, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { setActiveMenu } from 'store/menuSlice.ts';
import { logout, setLoggedIn } from 'store/authSlice.js';
import Cookies from 'js-cookie';

const UserHeader = ( { isLoggedIn } ) => {

  const accessToken = localStorage.getItem('accessToken');
  const [userName, setUserName] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogoClick = () => {
    dispatch(setActiveMenu('전체 글 보기'));
  };

  const handleProfileClick = () => {
    dispatch(setActiveMenu('내가 쓴 글'));
  };

  const handleLogout = () => {
    try {
      localStorage.removeItem('accessToken');
      Cookies.remove('refreshToken')
      dispatch(logout());
      dispatch(setActiveMenu('전체 글 보기'));
      navigate('/');
    } catch (error) {
      console.error('로그아웃 실패: ', error);
    }
  };

  useEffect(() => {
    if (accessToken) {
      dispatch(setLoggedIn(true));
      const decodedToken = jwtDecode(accessToken);
      const userName = decodedToken.userName;
      setUserName(userName);
    }
  }, [accessToken]);

  if (!isLoggedIn) {
    return null;
  }

  return (
    <header className="header_container">
      <div className="header_bar">
        <Link to="/" className="header_logo" onClick={handleLogoClick}>
          <img src={require('../assets/logo.png')} alt="logo" />
        </Link>
        <div className="search">
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </div>
        <div className="header_bar_user">
          <Link to="/mypage/main" className="header_profile" onClick={handleProfileClick}>
            <img className="header_user_picture" src={require('../assets/user_shadow.png')} alt="user profile" />
            <div className="header_user_name">{userName} 님</div>
          </Link>
          <Link to={'/posts/write'}>
            <FontAwesomeIcon icon={faPencil} className="header_icon" />
          </Link>
          <div className="header_icon">
            <FontAwesomeIcon icon={faRightFromBracket} className="header_icon" onClick={handleLogout} />
          </div>
        </div>
      </div>
    </header>
  );
};

UserHeader.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
}

export default UserHeader;
