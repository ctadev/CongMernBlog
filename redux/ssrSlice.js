import { createSlice } from "@reduxjs/toolkit";
const ssrSlice = createSlice({
  name: "ssr",
  initialState: false,
  reducers: {
    toggleSSR: (state, action) => {
      return (state = action.payload);
    },
  },
});

export const { toggleSSR } = ssrSlice.actions;
export default ssrSlice.reducer;
