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
  //console.log(genres);
  return genres;
});

const arrayOfMovieData = (array, moviesArray, generes) => {
  array.forEach((movie) => {
    const moviesGenres = [];
    //console.log(movie);
    movie.genre_ids.forEach((genre) => {
      const name = generes.find(({ id }) => id === genre);
      //console.log(name);
      if (name) moviesGenres.push(name.name);
    });

    if (movie.backdrop_path) {
      moviesArray.push({
        id: movie.id,
        name: movie?.original_name
          ? movie?.original_name
          : movie?.original_title,
        image: movie?.backdrop_path,
        genres: moviesGenres.slice(0, 3),
      });
    }
  });
};

const getMovieData = async (api, generes, paging = false) => {
  const moviesArray = [];
  for (let i = 1; moviesArray.length < 80 && i < 10; i++) {
    const {
      data: { results },
    } = await axios.get(`${api}${paging ? `&page=${i}` : ""}`);
    arrayOfMovieData(results, moviesArray, generes);
    //console.log(results);
  }
  return moviesArray;
};

export const fetchMovies = createAsyncThunk(
  "netflix/trending",
  async ({ type }, myThunk) => {
    const {
      netflix: { generes },
    } = myThunk.getState();
    const data = getMovieData(
      `${TMDB_BASE_URL}/trending/${type}/week?api_key=${My_API_KEY}`,
      generes,
      true
    );
    return data;
    // console.log(generes);
  }
);

const NetflixSlice = createSlice({
  name: "Netflix",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getGeners.fulfilled, (state, action) => {
      state.generes = action.payload;
      state.generesLoaded = true;
    });
    builder.addCase(fetchMovies.fulfilled, (state, action) => {
      state.movies = action.payload;
    });
  },
});

export const store = configureStore({
  reducer: {
    netflix: NetflixSlice.reducer,
  },
});
