import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CounterState {
  value: number;
}

const initialState: CounterState = {
  value: 1,
};

export const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    setCount: (state, action: PayloadAction<number>) => {
      state.value = action.payload;
    },
    // payloadを使ったアクションを追加する場合、以下のように定義する
    // incrementByAmount: (state, action: PayloadAction<number>) => {
    //   state.value += action.payload;
    // },
  },
});

export const { setCount } = counterSlice.actions;

export default counterSlice.reducer;
