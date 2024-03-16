import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api";

export const fetchAllUsers = createAsyncThunk("users/fetchAll", async (_, thunkApi) => {
  try {
    const response = await api.getUsers();
    return response.data;
  } catch (err) {
    return thunkApi.rejectWithValue(err.response ? err.response.data : err.message);
  }
});

export const deleteUsers = createAsyncThunk("users/deleteUser", async (userId, thunkApi) => {
  try {
    await api.deleteUser(userId);
    return userId;
  } catch (err) {
    return thunkApi.rejectWithValue(err.response ? err.response.data : err.message);
  }
});

export const createUsers = createAsyncThunk("users/createUser", async (userData, thunkApi) => {
  try {
    const response = await api.createUser(userData);
    return response.data;
  } catch (err) {
    return thunkApi.rejectWithValue(err.response ? err.response.data : err.message);
  }
});

export const updateUser = createAsyncThunk("users/updateUser", async (payload, thunkApi) => {
  try {
    const response = await api.updateUser(payload.userId, payload.userData);
    return response.data;
  } catch (err) {
    return thunkApi.rejectWithValue(err.response ? err.response.data : err.message);
  }
});

const userSlice = createSlice({
  name: "users",
  initialState: {
    users: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchAllUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = state.users.filter((user) => user.id !== action.payload);
      })
      .addCase(deleteUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = [...state.users, action.payload];
      })
      .addCase(createUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loading = false;
        state.users = state.users.map((user) =>
          user.id === action.payload.id ? { ...user, ...action.payload } : user
        );
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default userSlice.reducer;