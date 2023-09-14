import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import store from "./redux/redux-store";
import StoreContext, { Provider } from "./storeContext";
const root = ReactDOM.createRoot(document.getElementById("root"));
let rerenderEntireTree = (state) => {
  root.render(
    <React.StrictMode>
      <BrowserRouter>
        <Provider store={store}>
          <App />
        </Provider>
      </BrowserRouter>
    </React.StrictMode>
  );
};
rerenderEntireTree(store.getState());

store.subscribe(() => {
  let state = store.getState();
  rerenderEntireTree(state);
});
reportWebVitals();
//сеттер метод который устанав значения какому-то свойству
//_content - нельзя менять(олд договороенность)
//поэтому для этого используют сеттер и геттер
//bind() - забинтить то есть привзять this к главному родителю, если это не сделать
//то при пропсах появиться undefined
//action - это обьект у которого как минимум есть type и мы его диспатчим в стор
//reducer - это чистая функция, которая принимает state,action и возвращает новый state.
// если action не подошел, то возвращает не измененный state
