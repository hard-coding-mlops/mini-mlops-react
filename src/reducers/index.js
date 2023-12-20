// reducers/index.js
import { combineReducers } from 'redux';
import sidebarReducer from './sidebarReducer';

const rootReducer = combineReducers({
    sidebar: sidebarReducer,
    // 다른 리듀서 추가 가능
});

export default rootReducer;
