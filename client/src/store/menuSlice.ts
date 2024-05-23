import { createSlice} from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { MenuState } from '../types/types.ts';

// 초기 상태를 정의합니다.
const initialState: MenuState = {
  activeMenu: '전체 글 보기',
};

// 로컬 스토리지에서 값을 읽어와서 초기 상태에 적용합니다.
const storedActiveMenu = localStorage.getItem('activeMenu');
if (storedActiveMenu) {
  initialState.activeMenu = storedActiveMenu;
}

// 슬라이스 생성
const menuSlice = createSlice({
  name: 'menu',
  initialState,
  reducers: {
    setActiveMenu: (state, action: PayloadAction<string>) => {
      state.activeMenu = action.payload;
      // 메뉴가 변경될 때 로컬 스토리지에도 저장합니다.
      localStorage.setItem('activeMenu', action.payload);
    },
  },
});

// 액션 생성자를 내보냅니다
export const { setActiveMenu } = menuSlice.actions;

// 선택자 함수를 내보냅니다 (현재 활성 메뉴를 선택하는 역할)
export const selectActiveMenu = (state: { menu: MenuState }) => state.menu.activeMenu;

// 리듀서 함수를 내보냅니다 (상태 관리 수행 역할)
export default menuSlice.reducer;
