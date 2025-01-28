import { User } from "@/types/event";
import { createSlice } from "@reduxjs/toolkit";

type State = {
  user: User | null
}

const initialState: State = {
  user: null
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload
    },
    clearUser: (state) => {
      state.user = null
    }
  }
})

export default userSlice.reducer;

export const { setUser, clearUser } = userSlice.actions;