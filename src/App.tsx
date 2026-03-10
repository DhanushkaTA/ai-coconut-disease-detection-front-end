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
import AlertPage from "./view/sub/AlertPage";
import UserPosrtView from "./view/sub/UserPostView";
import UserManagePost from "./view/sub/UserManagePost";
import Dashboard from "./view/sub/Dashboard";
import LanguageSwitcher from "./view/loca/LanguageSwitcher";
import AIPredictionPage from "./view/sub/AIPredictionPage";

function App() {
  return (
    <>
      <Routes>
        {/* <LanguageSwitcher /> */}
        <Route path="/" element={<Login />} />
        <Route path="/test" element={<Test />} />
        <Route path="/register" element={<RegisterView />} />

        {/* admin all routes */}
        <Route path="/admin" element={<AdminView />}>
          <Route path="dash" element={<Dashboard />} />
          <Route path="notification" element={<NotificationView />} />
          <Route path="post" element={<PostView />} />
          <Route path="user" element={<UserView />} />
          <Route path="chat" element={<ChatPage />} />
          <Route path="alert" element={<AlertPage />} />
          <Route path="feeds" element={<UserPosrtView />} />
          <Route path="ai" element={<AIPredictionPage />} />
        </Route>

        {/* user all routes */}
        <Route path="/user" element={<AdminView />}>
          {/* <Route path="notification" element={<NotificationView />} /> */}
          <Route path="post" element={<UserManagePost />} />
          {/* <Route path="user" element={<UserView />} /> */}
          <Route path="chat" element={<ChatPage />} />
          <Route path="alert" element={<AlertPage />} />
          <Route path="feeds" element={<UserPosrtView />} />
        </Route>

        {/* mer all routes */}
        <Route path="/mer" element={<AdminView />}>
          {/* <Route path="notification" element={<NotificationView />} />  */}
          <Route path="post" element={<UserManagePost />} />
          {/* <Route path="user" element={<UserView />} /> */}
          <Route path="chat" element={<ChatPage />} />
          <Route path="alert" element={<AlertPage />} />
          <Route path="feeds" element={<UserPosrtView />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
