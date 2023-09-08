import { rerenderEntireTree } from "../render";

let state = {
  profilePage: {
    postData: [
      { id: 1, message: "Hello", likeCount: 2 },
      { id: 2, message: "Moto Moto", likeCount: 12 },
      { id: 3, message: "Ahaha,cool", likeCount: 22 },
    ],
  },
  dialogsPage: {
    messagesData: [
      { id: 1, message: "Hello" },
      { id: 2, message: "You Best" },
      { id: 3, message: "Ahaha,cool" },
    ],
    dialogsData: [
      { id: 1, name: "Dimas" },
      { id: 2, name: "Pavel" },
      { id: 3, name: "Piter" },
      { id: 4, name: "Kolya" },
      { id: 5, name: "Anna" },
      { id: 6, name: "Olga" },
      { id: 7, name: "Sveta" },
      { id: 8, name: "Yura" },
      { id: 9, name: "Pancho" },
    ],
  },
};
export let addPost = (postMessage) => {
  let newPost = {
    id: 5,
    message: postMessage,
    likeCount: 0,
  };
  state.profilePage.postData.push(newPost);
  rerenderEntireTree(state);
};
export default state;
