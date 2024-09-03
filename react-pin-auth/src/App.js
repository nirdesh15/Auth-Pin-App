import React from "react";
import { BrowserRouter,Routes, Route } from "react-router-dom";
import Login from '../src/component/login/login';

import SuccessCard from "./component/home/home";
function App() {
  return (
   <BrowserRouter>
   <Routes>
    <Route exact path="/" element={<Login/>}/>
    <Route exact path="/success" element={<SuccessCard/>}/>
   </Routes>
   </BrowserRouter>
  );
}

export default App;
