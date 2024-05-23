import React from 'react';
import SignUpForm from '../components/SignUpForm.tsx';
import '../styles/SignUpPage.css';

function SignUpPage() {
  return (
    <>
      <div className="signUpPage_wrapper">
        <SignUpForm />
      </div>
    </>
  );
}

export default SignUpPage;
