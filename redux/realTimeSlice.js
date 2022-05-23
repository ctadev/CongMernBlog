import { createSlice } from "@reduxjs/toolkit";
const realTimeSlice = createSlice({
  name: "realTime",
  initialState: false,
  reducers: {
    toggleRealTime: (state) => {
      return !state;
    },
  },
});

export const { toggleRealTime } = realTimeSlice.actions;
export default realTimeSlice.reducer;
