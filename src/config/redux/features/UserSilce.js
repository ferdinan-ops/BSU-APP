import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import toast from "react-hot-toast";
import { auth } from "../../firebase";

export const createUser = createAsyncThunk("user/createUser", async (fields) => {
  try {
    const user = await axios.post("/api/users", fields, { headers: { "Content-Type": "Application/json" } });
    if (user.status === 402) {
      toast("Maaf Akun Anda sudah terdaftar", { icon: '😢' });
    };
    return data;
  } catch (error) {
    return error;
  }
});

export const register = createAsyncThunk("register/registered", async ({ email, username, password }, { dispatch }) => {
  if (!username && !email && !password) {
    return toast.error('Mohon isi data anda dengan benar', { icon: '⚠️' });
  }

  createUserWithEmailAndPassword(auth, email, password)
    .then(async ({ user }) => {
      updateProfile(user, { displayName: username });
      const fields = { username: user.displayName, uid: user.uid, email: user.email };
      await dispatch(createUser(fields));
    })
    .catch((err) => { toast.error(err.message) });
})

const userSlice = createSlice({
  name: "users",
  initialState: { entity: {}, error: "", loading: false },
  extraReducers: {
    [createUser.pending]: (state) => { state.loading = true },
    [createUser.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.entity = payload;
    },
    [createUser.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
    [register.pending]: (state) => { state.loading = true },
    [register.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.entity = payload;
    },
    [register.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
  }
})

export default userSlice.reducer;
