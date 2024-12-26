import { configureStore } from "@reduxjs/toolkit";
import enterSlice from "./enter";

const store = configureStore({
  reducer: { enter: enterSlice.reducer },
});

export default store;
