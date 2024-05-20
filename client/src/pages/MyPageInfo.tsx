import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setActiveMenu } from '../store/menuSlice.ts';
import NavBar from '../components/NavBar.tsx';
import Modal from '../components/Modal.tsx';
import '../styles/Button.css';
import '../styles/MyPageInfo.css';
import jwtDecode from 'jwt-decode';
import { deleteUser } from '../api/api.js';

const MyPageInfo: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [previewImageUrl, setPreviewImageUrl] = useState<string>('');
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  const [showModal, setShowModal] = useState<boolean>(false);
  const [agreed, setAgreed] = useState<boolean>(false);

  const accessToken: string | null = localStorage.getItem('accessToken');
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(!accessToken);
  const decodedToken: { userId: number } = jwtDecode(accessToken);
  const userId: number = decodedToken.userId;

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleCheckboxChange = () => {
    setAgreed(!agreed);
  };

  const handleConfirm = () => {
    if (agreed) {
      deleteUser(userId)
        .then(() => {
          console.log('회원탈퇴가 완료되었습니다.');

          // 로그아웃 상태로 변경
          localStorage.removeItem('accessToken');
          setIsLoggedIn(false);

          dispatch(setActiveMenu('전체 글 보기'));
          navigate('/');
        })
        .catch(error => {
          console.error('회원탈퇴 오류:', error);
          // 오류 처리
        });

      handleCloseModal();
    } else {
      alert('안내 사항에 동의해야 합니다.');
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = event => {
        const imageUrl = event.target.result as string;
        setPreviewImageUrl(imageUrl);
        setSelectedImage(file);
      };

      reader.readAsDataURL(file);
    }
  };
  
  const handleButtonClick = () => {
    alert('서비스 준비중입니다.');
  };

  useEffect(() => {
    if (accessToken) {
      setIsLoggedIn(true);
      return;
    }

    setIsLoggedIn(false);
  }, [accessToken]);

  return (
    <>
      <NavBar />

      <div className="page_container">
        <h3 className="my_info">내 정보</h3>
        <div className="image_nickname_container">
          <div className="profile_image">
            <input type="file" id="imageInput" className="profile_image_uploader" accept="image/*" onChange={handleImageChange} />
            <img src={previewImageUrl} alt="" className="circle_image" />
          </div>
          <div className="input_container">
            <input type="text" id="nicknameInput" className="nickname_input" placeholder="닉네임" />
          </div>
          <button className="custom_mypage_button confirm_button" onClick={handleButtonClick}>
            수정
          </button>
        </div>

        <div className="id_container">
          <label htmlFor="idInput" className="custom_label_id">
            아이디
          </label>
          <div className="input_container">
            <input type="text" id="idInput" className="id_input" placeholder="아이디" />
          </div>
          <button className="custom_mypage_button confirm_button" onClick={handleButtonClick}>
            수정
          </button>
        </div>

        <div className="password_container">
          <label htmlFor="pwInput" className="custom_label_pw">
            비밀번호
          </label>
          <button className="custom_mypage_button confirm_button" onClick={handleButtonClick}>
            변경 페이지로 이동
          </button>
        </div>
        <div>
          <button className="leave_button" onClick={handleOpenModal}>
            회원탈퇴
          </button>
          {showModal && (
            <Modal
              content={
                <>
                  <h3>탈퇴 안내</h3>
                  <h4>회원탈퇴를 신청하기 전에 안내 사항을 꼭 확인해주세요.</h4>
                  <br />
                  <p>✔ 사용하고 계신 아이디는 탈퇴 시 복구가 불가능합니다.</p>
                  <br />
                  <p>
                    ✔ 탈퇴 후 회원정보 및 개인형 서비스 이용기록은 모두 삭제됩니다.
                    <br />
                    &emsp;삭제된 데이터는 복구되지 않습니다. 삭제되는 내용을 확인하시고
                    <br />
                    &emsp;필요한 데이터는 미리 백업을 해주세요.
                  </p>
                  <br />
                  <p>
                    ✔ 탈퇴 후에도 게시판형 서비스에 등록한 게시물은 그대로 남아 있습니다.
                    <br />
                    &emsp;게시판형 서비스에 남아 있는 게시글은 탈퇴 후 삭제할 수 없습니다.
                  </p>
                  <br />
                  <h4>
                    <input type="checkbox" checked={agreed} onChange={handleCheckboxChange} />
                    안내 사항을 모두 확인하였으며, 이에 동의합니다.
                  </h4>
                </>
              }
              onCancel={handleCloseModal}
              onConfirm={handleConfirm}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default MyPageInfo;
