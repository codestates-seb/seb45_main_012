import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import './App.css';
import store from './store/store';

import SignUpPage from './pages/SignUpPage';
import Login from './pages/LoginPage';
import EditerPage from './pages/EditerPage';

import AllBoardPage from './pages/AllBoardPage';
import FreeBoardPage from './pages/FreeBoardPage';
import FreeDetailPage from './pages/FreeDetailPage';
import AuthBoardPage from './pages/AuthBoardPage';
import AuthDetailPage from './pages/AuthDetailPage';
import EnvBoardPage from './pages/EnvBoardPage';

import AppHeader from './components/AppHeader';

import MyPageMain from './pages/MyPageMain';
import MyPageInfo from './pages/MyPageInfo';
import MyPost from './pages/MyPost';

const App: React.FC = () => {
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
            <Route path="/mypage/posts/:postId" element={<MyPost />} />
          </Routes>
        </Router>
      </div>
    </Provider>
  );
}

export default App;