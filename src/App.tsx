import { useState } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Login from "./view/LoginView";
import Test from "./view/Test";
import RegisterView from "./view/RegisterVIew";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/test" element={<Test />} />
        <Route path="/register" element={<RegisterView />} />
      </Routes>
    </>
  );
}

export default App;
