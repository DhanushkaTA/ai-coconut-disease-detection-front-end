import { useState } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Login from "./view/LoginView";
import Test from "./view/Test";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/test" element={<Test />} />
      </Routes>
    </>
  );
}

export default App;
