import React, { useState } from 'react';
import { PostEditerWithImage, PostEditer } from '../components/PostEditer.tsx';
import '../styles/EditerPage.css';
import NavBar from 'components/NavBar.tsx';

function EditerPage() {
  const [selectFreeBoard, setSelectFreeBoard] = useState(true);
  const [selectPhotoBoard, setSelectPhotoBoard] = useState(false);

  const handleSelectFreeBoard = () => {
    setSelectFreeBoard(selectFreeBoard => true);
    setSelectPhotoBoard(selectPhotoBoard => false);
  };

  const handleSelectPhotoBoard = () => {
    setSelectFreeBoard(selectFreeBoard => false);
    setSelectPhotoBoard(selectPhotoBoard => true);
  };

  return (
    <>
      <NavBar />

      <div className="page_container editCenter">
        <div className="board_btn_container">
          <button onClick={handleSelectFreeBoard} className={`free_board_btn ${selectFreeBoard ? '' : 'unselected'}`}>
            자유 게시판
          </button>
          <button onClick={handleSelectPhotoBoard} className={`photo_board_btn ${selectPhotoBoard ? 'selected' : ''}`}>
            인증 게시판
          </button>
        </div>

        {selectFreeBoard ? <PostEditer /> : <PostEditerWithImage />}
      </div>
    </>
  );
}

export default EditerPage;
