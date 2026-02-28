import { useState } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Login from "./view/LoginView";
import Test from "./view/Test";
import RegisterView from "./view/RegisterVIew";
import NotificationView from "./view/sub/NotificationView";
import AdminView from "./view/AdminView";
import PostView from "./view/sub/PostView";
import UserView from "./view/sub/UserView";
import ChatPage from "./view/chat/CharPage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/test" element={<Test />} />
        <Route path="/register" element={<RegisterView />} />

        {/* admin all routes */}
        <Route path="/admin" element={<AdminView />}>
          <Route path="notification" element={<NotificationView />} />
          <Route path="post" element={<PostView />} />
          <Route path="user" element={<UserView />} />
          <Route path="chat" element={<ChatPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
