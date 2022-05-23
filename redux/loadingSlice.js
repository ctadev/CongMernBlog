import { createSlice } from "@reduxjs/toolkit";
const loadingSlice = createSlice({
  name: "loadingState",
  initialState: false,
  reducers: {
    loadingToggle: (state, action) => {
      return (state = action.payload);
    },
  },
});

export const { loadingToggle } = loadingSlice.actions;
export default loadingSlice.reducer;
