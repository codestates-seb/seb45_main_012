import '../styles/Login.css';
import { useState } from 'react';
import { useDispatch } from 'react-redux';


const LogIn = () => {
    const [ id, setId ] = useState("");
    const [ password, setPassword ] = useState("");

    const emailHandler = (e) => {
        setId(e.target.value);
    }
    
    const passwordHandler = (e) => {
        setPassword(e.target.value);
    }

    const submitHandler = (e) => {
        e.preventDefault();
        console.log('id: ', id);
        console.log('password :', password);
    }

    return (
        <div className='container'>  
            <div className='logo_container'>
                <img className="logo_leaf" src={require('../assets/logo_only_image.png')} alt='logo'/>
            </div>
            <div className='form_container'>
                <form className='login_form' onSubmit={submitHandler}>
                    <div className='id'>
                        <label htmlFor="id">ID</label>
                        <input id="id" onChange={emailHandler}></input>
                    </div>
                    <div className='password'>
                        <label htmlFor="password">Password</label>
                        <input id="password" onChange={passwordHandler} />
                    </div>
                    <div className='submit_button'>
                        <input className='submit' type="submit" value="로그인" />
                    </div>
                </form>
            </div>
            <div className='links'>
                    <a>비밀번호 찾기 </a>
                    <div className='center'> | </div>
                    <a>회원가입</a>
                </div>
        </div>
    )
}

export default LogIn;