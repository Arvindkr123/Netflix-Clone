import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import {
  LoginPage,
  MoviePage,
  Netflix,
  Player,
  SignUpPage,
  TvShow,
} from "./pages";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/player" element={<Player />} />
        <Route path="/tv" element={<TvShow />} />
        <Route path="/" element={<Netflix />} />
        <Route path="/movie" element={<MoviePage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
