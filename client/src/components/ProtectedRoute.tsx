import React, { useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const logout = (): void => {
  localStorage.removeItem('accessToekn');
}

const ProtectedRoute: React.FC = () => {
  const getAccessToken = (): string | null => {
    return localStorage.getItem('accessToken');
  }
  
  const isTokenExpired = (token: string | null): boolean => {
    if (!token) return true;
  
    const payload = JSON.parse(atob(token.split('.')[1]));
    const currentTime = Math.floor(Date.now() / 1000);
  
    return payload.exp < currentTime;
  }
  
  const token = getAccessToken();
  const isExpired = isTokenExpired(token);

  if (isExpired) {
    logout();
    return <Navigate to="/login" />;
  }
   
  return <Outlet />;
};
  
export default ProtectedRoute;