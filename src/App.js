import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./App.css";

// import VideoPlayer from "./components/VideoPlayerWindow";
import VideoPlayer1 from "./components/VideoPlayer1";
import Main from "./pages/main";
import Login from "./pages/login/login";
import Layout from './pages/_layout';

function Root() {
  return (
    <div>
      <Routes>
      <Route path="/VideoPlayer1" element={<VideoPlayer1/>} />
      <Route path="/login" element={<Login/>} />
      <Route path="/" element={<Layout/>}>
        <Route path="/main" element={<Main/>} />
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
