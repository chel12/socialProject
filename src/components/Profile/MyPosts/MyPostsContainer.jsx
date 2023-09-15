import React from "react";
import {
  addPostActionCreator,
  updateNewPostTextActionCreator,
} from "../../../redux/profileReducer";
import MyPosts from "./MyPosts";
import { connect } from "react-redux";
import StoreContext from "../../../storeContext";
import { connect } from "react-redux";

const MyPostsContainer = () => {
  return (
    <StoreContext.Consumer>
      {(store) => {
        let state = store.getState();
        let addPost = () => {
          store.dispatch(addPostActionCreator());
        };
        let onPostChange = (text) => {
          let action = updateNewPostTextActionCreator(text);
          store.dispatch(action);
        };
        return (
          <MyPosts
            updateNewPostElement={onPostChange}
            addPost={addPost}
          />
        );
      }}
    </StoreContext.Consumer>
  );
};
let mapStateToProps = (state) => {
  return {
	post:state.profilePage.postData,
	newPostText:state.profilePage.newPostText
  };
};
let mapDispatchToProps = (dispatch) => {
  return {};
};
const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts);

export default MyPostsContainer;
