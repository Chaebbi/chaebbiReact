import { configureStore } from "@reduxjs/toolkit";
import foodSlice from "./slices/foodSlice";
import ingredientsSlice from "./slices/ingredientsSlice";

export const store = configureStore({
  reducer: {
    foodlist: foodSlice,
    ingredientlist: ingredientsSlice
  },
});