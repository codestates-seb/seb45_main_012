import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from 'App.tsx';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit'; // configureStore를 import합니다.
import menuSliceReducer from './store/menuSlice.ts'; // 리듀서를 import합니다.


// 스토어를 구성합니다.
const store = configureStore({
  reducer: {
    menu: menuSliceReducer, // 'menu'라는 키에 menuSliceReducer를 설정합니다.
    // 다른 리듀서도 필요한 경우 추가할 수 있습니다.
  },
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
         <App /> 
    </Provider>
  </React.StrictMode>
);
