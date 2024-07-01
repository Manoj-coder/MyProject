// src/store/index.js
import { configureStore } from '@reduxjs/toolkit';
import itemsReducer from './slices/itemsSlice.js';

const store = configureStore({
    reducer: {
        items: itemsReducer,
    },
});

export default store;
