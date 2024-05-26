import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil, faRightToBracket } from "@fortawesome/free-solid-svg-icons";
import { GuestHeaderProps } from 'types/types.ts';
import logo from '../assets/logo.png';

const GuestHeader: React.FC<GuestHeaderProps> = ({ isLoggedIn }) => {
  const navigate = useNavigate();

  if (isLoggedIn) {
    return null;
  }
  
  const handleWriteCilck = () => {
    alert('로그인 후 글쓰기가 가능합니다. 로그인 페이지로 이어드릴게요.');
    navigate('/login');
  };

  return (
    <header className="header_container">
      <div className="header_bar">
        <Link to='/' className="header_logo">
          <img src={logo} alt="logo" />
        </Link>
        <div className='header_bar_user'>
          <div onClick={handleWriteCilck} className="header_icon">
              <FontAwesomeIcon icon={faPencil} className="header_icon" />
          </div>
          <Link to='/login' className="header_icon">
              <FontAwesomeIcon icon={faRightToBracket} className="header_icon" />
          </Link>
        </div>
      </div>
    </header>
  )
}

export default GuestHeader;