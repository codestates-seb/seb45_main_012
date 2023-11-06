import React, { useState, useRef } from 'react';
import '../styles/PostEditer.css';
import { useDispatch } from 'react-redux';
import { setActiveMenu } from '../store/menuSlice.ts';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { postPosts, postVote } from 'api/api.js';
import jwtDecode from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

function PostEditer() {
  const accessToken = localStorage.getItem('accessToken');
  const decodedToken = jwtDecode(accessToken);
  const userId = decodedToken.userId;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    type: 'free',
    title: '',
    body: '',
    open: 'true',
    img: '',
  });

  const handleInputChange = e => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCreatePost = () => {
    if (formData.title !== '' && formData.body !== '') {
      postPosts(formData.type, formData.title, formData.body, formData.open, formData.img, userId)
        .then(resp => {
          postVote(resp.data.postId)
            .then(response => {
              dispatch(setActiveMenu('전체 글 보기'));
              navigate('/${resp.data.type}/${resp.data.postId}/${resp.data.userId}');
            })
            .catch(error => {});
        })
        .catch(err => {});
    } else {
      alert('제목과 내용을 모두 입력해주세요.');
    }
  };

  return (
    <>
      <div className="editer_wrapper wide">
        <button onClick={handleCreatePost} className="post_complete_btn wide">
          작성
        </button>
        <input
          onChange={handleInputChange}
          name="title"
          value={formData.title}
          type="text"
          className="post_title_input"
          placeholder="제목을 입력하세요"
        />
        <textarea
          onChange={handleInputChange}
          name="body"
          value={formData.body}
          className="post_text_area"
          placeholder="내용을 입력하세요."></textarea>
      </div>
    </>
  );
}

function PostEditerWithImage() {
  const accessToken = localStorage.getItem('accessToken');
  const decodedToken = jwtDecode(accessToken);
  const userId = decodedToken.userId;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    type: 'auth',
    title: '',
    body: '',
    open: 'true',
    img: '',
  });
  const [previewImage, setPreviewImage] = useState(null);
  const imageInputRef = useRef(null);

  const handleFileInputChange = e => {
    const file = e.target.files[0];
    setFormData({ ...formData, file });

    if (file) {
      const reader = new FileReader();
      reader.onload = e => {
        setPreviewImage(e.target.result);
      };
      reader.readAsDataURL(file);

      e.target.value = null;

      setFormData({ ...formData, img: file });
    }
  };

  const handleImageClick = () => {
    if (imageInputRef.current) {
      imageInputRef.current.click();
    }
  };

  const handleInputChange = e => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCreatePost = () => {
    if (formData.title !== '' && formData.body !== '' && previewImage !== null) {
      postPosts(formData.type, formData.title, formData.body, formData.open, formData.img, userId)
        .then(resp => {
          postVote(resp.data.postId)
            .then(response => {
              dispatch(setActiveMenu('전체 글 보기'));
              navigate('/');
            })
            .catch(error => {});
        })
        .catch(err => {});
    } else {
      alert('이미지 업로드와 제목 및 내용을 모두 작성해주세요.');
    }
  };

  return (
    <div className="post_editer_with_image">
      <div className="image_upload">
        <input type="file" accept="image/*" onChange={handleFileInputChange} ref={imageInputRef} />
        {previewImage && (
          <img
            className="uploade_img"
            src={previewImage}
            alt="미리보기"
            onClick={handleImageClick}
            aria-hidden="true"
          />
        )}
        <div className={`plus_image_icon ${previewImage ? 'clear' : ''}`}>
          <FontAwesomeIcon className="plus_icon" icon={faPlus} />
          이미지
        </div>
      </div>

      <div className="editer_wrapper">
        <button onClick={handleCreatePost} className="post_complete_btn wide">
          작성
        </button>
        <input
          onChange={handleInputChange}
          name="title"
          value={formData.title}
          type="text"
          className="post_title_input"
          placeholder="제목을 입력하세요"
        />
        <textarea
          onChange={handleInputChange}
          name="body"
          value={formData.body}
          className="post_text_area"
          placeholder="내용을 입력하세요."></textarea>
      </div>
    </div>
  );
}

export { PostEditerWithImage, PostEditer };
