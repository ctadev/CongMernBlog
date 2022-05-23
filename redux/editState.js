import { createSlice } from "@reduxjs/toolkit";
const editStateSlice = createSlice({
  name: "editState",
  initialState: false,
  reducers: {
      editToggle: (state, action) => {
      return (state = action.payload);
    },
  },
});

export const { editToggle } = editStateSlice.actions;
export default editStateSlice.reducer;
