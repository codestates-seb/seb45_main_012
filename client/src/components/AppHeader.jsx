import React, { useEffect } from 'react';
import "../styles/Header.css";
import { useDispatch, useSelector } from 'react-redux';
import UserHeader from './UserHeader.jsx';
import GuestHeader from './GuestHeader.jsx';
import { setLoggedIn } from '../store/authSlice.ts';

const AppHeader = () => {
  const dispatch = useDispatch();
  const accessToken = localStorage.getItem('accessToken');

  useEffect(() => {
    if (accessToken) {
      dispatch(setLoggedIn(true));
      return;
    }

    dispatch(setLoggedIn(false));
  }, [accessToken]);

  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  return ( 
    <div>
      <UserHeader isLoggedIn={isLoggedIn} />
      <GuestHeader isLoggedIn={isLoggedIn} />
    </div>
  )
}

export default AppHeader;