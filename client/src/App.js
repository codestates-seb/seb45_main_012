import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import SignUpPage from './pages/SignUpPage.jsx';
import AllBoardPage from './pages/AllBoardPage.jsx';
import FreeBoardPage from './pages/FreeBoardPage.jsx';
import FreeDetailPage from './pages/FreeDetailPage.jsx';
import AuthBoardPage from './pages/AuthBoardPage.jsx';
import AuthDetailPage from './pages/AuthDetailPage.jsx';
import EnvBoardPage from './pages/EnvBoardPage.jsx';

// import Header from './components/header.jsx';
// import NavBar from './components/NavBar.jsx';
import MyPageMain from './pages/MyPageMain.jsx';

function App() {
  return (
    <div className="App">
      {/* <Router>
        <Routes>
          <Route path="/" element={<AllBoardPage/>} />
          <Route path="/free" element={<FreeBoardPage/>} />
          <Route path="/free/:postId/:userId" element={<FreeDetailPage />} />
          <Route path="/auth" element={<AuthBoardPage/>} />
          <Route path="/auth/:postId/:userId" element={<AuthDetailPage/>} />
          <Route path="/env" element={<EnvBoardPage/>} />
          <Route path="/mypage/main" element={<MyPageMain />} />
        </Routes>
    </Router> */}
      {/* <FreeDetailPage/> */}
      {/* <SignUpPage /> */}
      {/* <Header /> */}
      {/* <NavBar /> */}
      {/* <FreeBoardPage/> */}
      {/* <MyPageMain /> */}
    </div>
  );
}

export default App;