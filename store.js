import { configureStore } from "@reduxjs/toolkit";
import bucksReducer from "./features/bucksSlice";

export default configureStore({
  reducer: {
    bucks: bucksReducer,
  },
});