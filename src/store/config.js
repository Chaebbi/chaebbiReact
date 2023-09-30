import { configureStore } from "@reduxjs/toolkit";
import foodSlice from "./slices/foodSlice";

export const store = configureStore({
  reducer: {
    foodlist: foodSlice,
  },
});