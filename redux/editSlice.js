import { createSlice } from "@reduxjs/toolkit";
const editSlice = createSlice({
  name: "edit",
  initialState: null,
  reducers: {
    currentEdit: (state, action) => {
      return (state = action.payload);
    },
  },
});

export const { currentEdit } = editSlice.actions;
export default editSlice.reducer;
