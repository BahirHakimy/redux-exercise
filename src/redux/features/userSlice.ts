import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import store from '../store';

export type stateType = {
  users: string[];
  isLoading: boolean;
  error: any | string;
};

const initialState: stateType = {
  users: [],
  isLoading: false,
  error: null,
};

export const fetchUsers = createAsyncThunk(
  'users/fetchUsers',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('https://randomuser.me/api/?results=5');
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export type AppDispatch = typeof store.dispatch;

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.isLoading = false;
      state.users = action.payload.results;
    });

    builder.addCase(fetchUsers.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
  },
});

export default userSlice.reducer;
