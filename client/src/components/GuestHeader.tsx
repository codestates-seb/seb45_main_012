import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil, faRightToBracket } from "@fortawesome/free-solid-svg-icons";
import { GuestHeaderProps } from 'types/types.ts';

const GuestHeader: React.FC<GuestHeaderProps> = ( { isLoggedIn } ) => {

  if (isLoggedIn) {
    return null;
  }
  
  return (
    <header className="header_container">
      <div className="header_bar">
        <Link to='/' className="header_logo">
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

export default GuestHeader;