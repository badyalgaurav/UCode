import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./App.css";

// import VideoPlayer from "./components/VideoPlayerWindow";
import VideoPlayer1 from "./components/VideoPlayer1";
import Layout from './pages/_layout';

function Root() {
  return (
    <div>
      <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/" element={<VideoPlayer1 />} />
        </Route>
      </Routes>
    </div>);

};

const App = () => {
  return (
    <BrowserRouter>
      <Root />
    </BrowserRouter>
  );
};

export default App;
