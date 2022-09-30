import { createSlice } from "@reduxjs/toolkit";

const initialAuthState = {
  isAuthenticated: false,
  idToken: "",
  email: "",
  inbox:"",
  cleanEmail: "",
};

const authSlice = createSlice({
  name: "authentication",
  initialState: initialAuthState,
  reducers: {
    login(state, action) {
      state.isAuthenticated = true;
      state.idToken = action.payload;
    },
    
    logout(state) {
      state.isAuthenticated = false;
    },

    setInbox(state, action){
      state.inbox = action.payload;
      console.log(state.inbox = action.payload,'setinbox.........')
    },
   
    setEmail(state, action) {
      state.email = action.payload;
      console.log( state.email = action.payload,'setEmail...')
    },
    
    setCleanEmail(state, action) {
      state.cleanEmail = action.payload;
      console.log(state.cleanEmail = action.payload,'setCleanEmail.......');
    },
  },
});

export const authActions = authSlice.actions;
export default authSlice.reducer;
