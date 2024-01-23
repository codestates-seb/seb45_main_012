import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import './App.css';
import store from './store/store.ts';

import SignUpPage from './pages/SignUpPage.tsx';
import Login from './pages/LoginPage.jsx';
import EditerPage from './pages/EditerPage.jsx';

import AllBoardPage from './pages/AllBoardPage.tsx';
import FreeBoardPage from './pages/FreeBoardPage.tsx';
import FreeDetailPage from './pages/FreeDetailPage.tsx';
import AuthBoardPage from './pages/AuthBoardPage.tsx';
import AuthDetailPage from './pages/AuthDetailPage.tsx';
import EnvBoardPage from './pages/EnvBoardPage.tsx';

import AppHeader from './components/AppHeader.jsx';

import MyPageMain from 'pages/MyPageMain.jsx';
import MyPageInfo from './pages/MyPageInfo.tsx';
import MyPost from 'pages/MyPost.jsx';

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Router>
          <AppHeader />
          <Routes>
            <Route path="/" element={<AllBoardPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/posts/write" element={<EditerPage />} />

            <Route path="/free" element={<FreeBoardPage />} />
            <Route path="/free/:postId/:userId" element={<FreeDetailPage />} />
            <Route path="/auth" element={<AuthBoardPage />} />
            <Route path="/auth/:postId/:userId" element={<AuthDetailPage />} />
            <Route path="/env" element={<EnvBoardPage />} />

            <Route path="/mypage/main" element={<MyPageMain />} />
            <Route path="/mypage/info" element={<MyPageInfo />} />
            <Route path="mypage/posts/:postId" element={<MyPost />} />
          </Routes>
        </Router>
      </div>
    </Provider>
  );
}

export default App;
