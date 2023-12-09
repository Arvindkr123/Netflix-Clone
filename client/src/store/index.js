import {
  configureStore,
  createSlice,
  createAsyncThunk,
} from "@reduxjs/toolkit";
import axios from "axios";
import { My_API_KEY, TMDB_BASE_URL } from "../utils/constants";

const initialState = {
  movies: [],
  generesLoaded: false,
  generes: [],
};

export const getGeners = createAsyncThunk("netflix/geners", async () => {
  const {
    data: { genres },
  } = await axios.get(
    `${TMDB_BASE_URL}/genre/movie/list?api_key=${My_API_KEY}`
  );
  console.log(genres);
  return genres;
});

const NetflixSlice = createSlice({
  name: "Netflix",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getGeners.fulfilled, (state, action) => {
      state.generes = action.payload;
      state.generesLoaded = true;
    });
  },
});

export const store = configureStore({
  reducer: {
    netflix: NetflixSlice.reducer,
  },
});
