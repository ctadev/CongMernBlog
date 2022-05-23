import { configureStore } from "@reduxjs/toolkit";
import realTimeUpdate from "./realTimeSlice";
import ssr from "./ssrSlice";
import editSlice from "./editSlice";
import editState from "./editState";
import loadingState from "./loadingSlice";

const store = configureStore({
  reducer: {
    realTimeUpdate: realTimeUpdate,
    ssr: ssr,
    edit: editSlice,
    editState: editState,
    loadingState: loadingState,
  },
});

export default store;
