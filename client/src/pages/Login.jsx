import '../styles/Login.css';

const LogIn = () => {
    return (
        <div className='container'>  
            <div className='logo_container'>
                <img className="logo_leaf" src={require('../assets/logo_only_image.png')} alt='logo'/>
            </div>
            <div className='form_container'>
                <form className='login_form'>
                    <div className='id'>
                        <label for="id">ID</label>
                        <input id="id"></input>
                    </div>
                    <div className='password'>
                        <label for="password">Password</label>
                        <input id="password"></input>
                    </div>
                    <div className='submit_button'>
                        <input className='submit' type="submit" value="로그인" />
                    </div>
                </form>
            </div>
            <div className='links'>
                    <a href>비밀번호 찾기 </a>
                    <div className='center'> | </div>
                    <a href> 회원가입</a>
                </div>
        </div>
    )
}

export default LogIn;