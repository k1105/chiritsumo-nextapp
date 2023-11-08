import { configureStore } from "@reduxjs/toolkit";
import { counterSlice } from "./components/ConterSlice";

export const store = configureStore({
  reducer: {
    counter: counterSlice.reducer,
  },
});

// RootStateの型をエクスポート
export type RootState = ReturnType<typeof store.getState>;
// AppDispatch型をエクスポート
export type AppDispatch = typeof store.dispatch;
