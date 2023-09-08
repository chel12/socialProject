import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Routes } from "react-router-dom";
import state, { addPost, subscribe, updateNewPostText } from "./redux/state";
const root = ReactDOM.createRoot(document.getElementById("root"));
let rerenderEntireTree = (state) => {
  root.render(
    <React.StrictMode>
      <BrowserRouter>
        <App
          state={state}
          addPost={addPost}
          updateNewPostText={updateNewPostText}
        />
      </BrowserRouter>
    </React.StrictMode>
  );
};
rerenderEntireTree(state);
subscribe(rerenderEntireTree);
reportWebVitals();
