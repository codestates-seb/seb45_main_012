import { combineReducers } from '@reduxjs/toolkit';
import type { Reducer } from '@reduxjs/toolkit';
import { RootState } from 'types/types.ts';
import authReducer from './authSlice.ts';
import menuReducer from './menuSlice.ts';


const rootReducer: Reducer<RootState> = combineReducers({
    auth: authReducer,
    menu: menuReducer,
});

export default rootReducer;