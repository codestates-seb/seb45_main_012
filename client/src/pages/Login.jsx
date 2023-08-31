import '../styles/Login.css'

const LogIn = () => {
    return (
        <div className='container'>  
            <div className='logo_container'>
                <img className="logo_leaf" src={require('../assets/logo_only_image.png')} alt='logo'/>
            </div>
            <div className='form_container'>
                <form className='login_form'>
                    <div className='id'>
                        <label for="id">ID 
                            <input id="id"></input>
                        </label>
                    </div>
                    <div className='password'>
                        <label for="password">Password
                            <input id="password"></input>
                        </label>
                    </div>
                    <div className='submit'>
                        <input type="submit" value="로그인" />
                    </div>
                </form>
            </div>
        </div>
    )
}

export default LogIn;