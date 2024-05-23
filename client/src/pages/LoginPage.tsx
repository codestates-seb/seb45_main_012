import React, { useState } from 'react';
import { postLogin } from 'api/api.js';
import { useDispatch } from 'react-redux';
import { setActiveMenu } from '../store/menuSlice.ts';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Login.css';

const LogIn: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const emailHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setId(e.target.value);
  };

  const passwordHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const result = await postLogin(id, password);
      if (result === true) {
        dispatch(setActiveMenu('전체 글 보기'));
        navigate('/');
      } else {
        setErrorMessage(result);
      }
    } catch (err) {
      console.error();
    }
  };

  return (
    <>
      <div className="login_container">
        <img className="login_form_logo" src={require('../assets/logo_only_image.png')} alt="logo" />
        <form className="login_form" onSubmit={submitHandler}>
          <div className="login_id">
            <label htmlFor="id">ID</label>
            <input id="id" type="text" onChange={emailHandler}></input>
          </div>
          <div className="login_password">
            <label htmlFor="password">Password</label>
            <input id="password" type="password" onChange={passwordHandler} />
          </div>
          <div className="error_message">{errorMessage ? errorMessage : ''} </div>
          <div className="submit_button">
            <input className="login_submit" type="submit" value="로그인" />
          </div>
        </form>
      </div>
      <div className="links">
        <div>비밀번호 찾기 </div>
        <div className="center"> | </div>
        <Link to={'/signup'}>회원가입</Link>
      </div>
    </>
  );
};

export default LogIn;
