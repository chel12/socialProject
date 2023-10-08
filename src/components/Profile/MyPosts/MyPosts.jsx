import React from "react";
import classes from "./MyPost.module.css";
import Post from "./Post/Post";
import { Field, reduxForm } from "redux-form";

const AddNewPostForm = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <Field name="newPostText" component={"textarea"} />
      <div>
        <button>Add post </button>
      </div>
    </form>
  );
};
const AddNewPostFormRedux = reduxForm({
  form: "ProfileAddNewPostForm",
})(AddNewPostForm);

const MyPosts = (props) => {
  let postElements = props.post.map((el) => (
    <Post text={el.message} like={el.likeCount} id={el.id} />
  ));
  //ссылочку делаем на значения
  let newPostElement = React.createRef();
  //добавляем значения из текстареа и обнуляем текстареа
  let onAddPost = (values) => {
    props.addPost(values.newPostText);
  };

  return (
    <div className={classes.newPost}>
      <div>
        <AddNewPostFormRedux onSubmit={onAddPost} />
      </div>
      <div className={classes.posts}>{postElements}</div>
    </div>
  );
};

export default MyPosts;
