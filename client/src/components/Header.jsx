import React, { useState, useEffect } from 'react';
import "../styles/Header.css";
import { Link, useNavigate } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil, faRightToBracket, faRightFromBracket, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

const HeaderLoggedOut = ( { isLoggedIn } ) => {
  if (isLoggedIn) {
    return null;
  }

  return (
    <header className="header_container">
      <div className="header_bar">
        <Link to='/' className="logout_logo">
          <img src={require("../assets/logo.png")} alt="logo" />
        </Link>
        <div className='header_bar_user'>
          <Link to='/login' className="header_icon">
              <FontAwesomeIcon icon={faPencil} className="header_icon" />
          </Link>
          <Link to='/login' className="header_icon">
              <FontAwesomeIcon icon={faRightToBracket} className="header_icon" />
          </Link>
        </div>
      </div>
    </header>
  )
}

HeaderLoggedOut.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
}


const HeaderLoggedIn = ( { isLoggedIn, handleLogout } ) => {

  const accessToken = localStorage.getItem('accessToken');
  const [ userName, setUserName ] = useState('');


  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
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
        <Link to='/' className="logo">
          <img src={require("../assets/logo.png")} alt="logo" />
        </Link>
        <div className="search">
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </div>
        <div className='header_bar_user'>
          <Link to='/mypage/posts' className="profile">
            <img className="w55 user_info" src={require("../assets/user_shadow.png")} alt="user profile" />
            <span className="user_info">{userName} 님</span>
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
  )
}

HeaderLoggedIn.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  handleLogout: PropTypes.func.isRequired
}


const Header = () => {

  const accessToken = localStorage.getItem('accessToken')
  const [ isLoggedIn, setIsLoggedIn] = useState(!accessToken);

  const navigate = useNavigate();

  const handleLogout = () => {
    try {
      localStorage.removeItem('accessToken');
      setIsLoggedIn(false);
      navigate('/');
    } catch (error) {
      console.error('로그아웃 실패: ', error);
    }
  };

  useEffect(() => {
    if (accessToken) {
      setIsLoggedIn(true)
    } else {
      setIsLoggedIn(false);
    }
  }, [accessToken]);

  return (
    <div>
      <HeaderLoggedIn handleLogout={handleLogout} isLoggedIn={isLoggedIn} />
      <HeaderLoggedOut isLoggedIn={isLoggedIn} />
    </div>
  )
}


export default Header;