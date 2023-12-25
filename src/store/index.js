// index.js (inside the store folder)
import { createStore } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import sidebarReducer from '../reducers/sidebarReducers';

const store = configureStore({
    reducer: {
        sidebar: sidebarReducer,
    },
});

export default store;
