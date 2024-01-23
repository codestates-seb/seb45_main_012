import React, { useEffect } from 'react';
import "../styles/Header.css";
import { useDispatch, useSelector } from 'react-redux';
import UserHeader from './UserHeader.jsx';
import GuestHeader from './GuestHeader.jsx';
import { setLoggedIn } from '../store/authSlice.ts';
import { RootState } from 'types/types.ts';

const AppHeader: React.FC = () => {
  const dispatch = useDispatch();
  const accessToken = localStorage.getItem('accessToken');

  useEffect(() => {
    if (accessToken) {
      dispatch(setLoggedIn(true));
      return;
    }

    dispatch(setLoggedIn(false));
  }, [accessToken]);

  const isLoggedIn: boolean = useSelector((state: RootState) => state.auth.isLoggedIn);

  return ( 
    <div>
      <UserHeader isLoggedIn={isLoggedIn} />
      <GuestHeader isLoggedIn={isLoggedIn} />
    </div>
  )
}

export default AppHeader;