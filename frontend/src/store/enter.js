import { createSlice } from "@reduxjs/toolkit";

const initialTeamState = {
  isEntered: false,
};
const enterSlice = createSlice({
  name: "enterance",
  initialState: initialTeamState,
  reducers: {
    enter(state) {
      state.isEntered = true;
    },
    exit(state) {
      state.isEntered = false;
    },
  },
});
export const enterActions = enterSlice.actions;
export default enterSlice;
