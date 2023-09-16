import "./App.css";
import React from "react";
import { Route, Routes } from "react-router";
import Header from "./components/Header/Header";
import Profile from "./components/Profile/Profile";
import Navbar from "./components/Navbar/Navbar";
import DialogsContainer from "./components/Dialogs/DialogsContainer";
import Users from "./components/Users/Users";
import UsersContainer from "./components/Users/UsersContainer";

function App(props) {
  return (
    <div className="app-wrapper">
      <Header />
      <Navbar />
      <div className="app-wrapper-conten">
        <Routes>
          <Route path="/dialogs" element={<DialogsContainer />}></Route>
          <Route path="/profile" element={<Profile />}></Route>
          <Route path="/users" element={<UsersContainer />}></Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;
