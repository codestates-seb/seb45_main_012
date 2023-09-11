import React, { useState } from "react";
import '../styles/SignUpForm.css';

function SignUpForm() {
  const [view, setView] = useState(false);
  const [selected, setSelected] = useState("기억에 남는 추억의 장소는?");
  const [formData, setFormData] = useState({
    username: '',
    userid: '',
    password: '',
    passwordConfirm: ''
  });
  const [showWarning, setShowWarning] = useState(false);
  const [isValid, setIsValid] = useState(true);
  const [validMessage, setValidMessage] = useState('특수문자 1개 이상, 영문·숫자 포함 8글자 이상');

  const pattern = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;

  const handleKeyDown = () => {
    if (formData.password !== '' && pattern.test(formData.password)) {
      setIsValid(isValid => true);
      setValidMessage('사용가능한 패스워드 입니다');
    } else if (formData.password !== '' && !pattern.test(formData.password)) {
      setIsValid(isValid => false);
      setValidMessage('유효하지 않은 패스워드 입니다');
    } else if (formData.password === '') {
      setIsValid(isValid => true);
      setValidMessage('특수문자 1개 이상, 영문·숫자 포함 8글자 이상');
    }
  }

  const validMessageStyle = {};
  if (validMessage === '특수문자 1개 이상, 영문·숫자 포함 8글자 이상') {
    validMessageStyle.color = 'black';
  } else if (validMessage === '유효하지 않은 패스워드 입니다') {
    validMessageStyle.color = 'red';
  } else if (validMessage === '사용가능한 패스워드 입니다') {
    validMessageStyle.color = 'green';
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validMessage === '사용가능한 패스워드 입니다' && formData.username !== '' && formData.userid !== '' && formData.password !== '' && formData.passwordConfirm !== '') {
      setShowWarning(false);

      // 회원가입 로직 추가 예정
    } else {
      setShowWarning(true);
    }
  };

  const handleDropdown = () => {
    setView(!view);
  }

  const handleSelectedMessagePlace = () => {
    setSelected(selected => '기억에 남는 추억의 장소는?');
  }

  const handleSelectedMessagePet = () => {
    setSelected(selected => '반려동물의 이름은?');
  }

  const handleSelectedMessageDate = () => {
    setSelected(selected => '추억하고 싶은 날짜가 있다면?');
  }



  return (
    <>
      <div className="signUp_wrapper">
        <div className="signUp_title">회원가입</div>
        <div className="signUp_form">

          <div className="name_input_area">&nbsp;이름 <br/>
          <input 
            className="name_input"
            type="text"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
          />
          </div>

          <div className="id_input_area">&nbsp;아이디 <br/>
          <input 
            className="id_input"
            type="text"
            name="userid"
            value={formData.userid}
            onChange={handleInputChange}  
          />
          </div>

          <div className="password_input_area">&nbsp;비밀번호 <br/>
          <input 
            className="password_input"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange} 
            onKeyUp={handleKeyDown}
          />
          <div className="password_infomation" style={validMessageStyle}>{validMessage}</div>
          </div>

          <div className="password_confirm">

            <div className="password_confirm_Q">
              <div className="password_confirm_Q_title">비밀번호 확인 질문</div>
              <div className="select_box" onClick={handleDropdown} aria-hidden="true">
                <div className="arrow_before" style={view ? {transform: 'rotate(-45deg)'} : {transform: 'rotate(45deg)'}}></div>
                <div className="arrow_after" style={view ? {transform: 'rotate(45deg)'} : {transform: 'rotate(-45deg)'}}></div>
              {selected}
              {view &&
                <ul>
                  <li onClick={handleSelectedMessagePlace} aria-hidden="true">기억에 남는 추억의 장소는?</li>
                  <li onClick={handleSelectedMessagePet} aria-hidden="true">반려동물의 이름은?</li>
                  <li onClick={handleSelectedMessageDate} aria-hidden="true">추억하고 싶은 날짜가 있다면?</li>
                </ul>
              }
              </div>
            </div>
           
            <div className="password_confirm_A">
              <div className="password_confirm_A_title">비밀번호 확인 답변</div>
              <input 
                className="password_confirm_answer_input" 
                placeholder="답변을 입력하세요"
                type="text"
                name="passwordConfirm"
                value={formData.passwordConfirm}
                onChange={handleInputChange}
              />
            </div>

          </div>

          <div 
            className="signup_complete" 
            onClick={handleSubmit}
            aria-hidden="true"
          >회원가입
          </div>
          {showWarning && 
          <div style={{fontSize: 11, color: 'red', fontWeight: 550, width: 200, marginTop: 5, textAlign: 'left'}}>
            모든 입력을 채워주세요
          </div>}
        </div>

      </div>
    
    </>  
  );
}

export default SignUpForm;