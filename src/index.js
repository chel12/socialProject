import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Routes } from "react-router-dom";
import store from "./redux/state";
const root = ReactDOM.createRoot(document.getElementById("root"));
let rerenderEntireTree = (state) => {
  root.render(
    <React.StrictMode>
      <BrowserRouter>
        <App
          state={state}
          dispatch={store.dispatch.bind(store)}
        />
      </BrowserRouter>
    </React.StrictMode>
  );
};
rerenderEntireTree(store.getState());
store.subscribe(rerenderEntireTree);
reportWebVitals();
//сеттер метод который устанав значения какому-то свойству
//_content - нельзя менять(олд договороенность)
//поэтому для этого используют сеттер и геттер
