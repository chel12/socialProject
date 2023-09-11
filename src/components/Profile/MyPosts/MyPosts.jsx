import React from 'react';
import classes from './MyPost.module.css';
import Post from './Post/Post';
import {
	addPostActionCreator,
	updateNewPostTextActionCreator,
} from '../../../redux/profileReducer';
//перебор элементов массива и вывод их

const MyPosts = (props) => {
	let postElements = props.postData.map((el) => (
		<Post text={el.message} like={el.likeCount} id={el.id} />
	));
	//ссылочку делаем на значения
	let newPostElement = React.createRef();
	//добавляем значения из текстареа и обнуляем текстареа
	let addPost = () => {
		props.dispatch(addPostActionCreator());
		newPostElement.current.value = '';
	};
	let onPostChange = () => {
		let text = newPostElement.current.value;
		let action = updateNewPostTextActionCreator(text); //для удобства можно делать ТАК
		props.dispatch(action);
	};

	return (
		<div>
			<div className={classes.newPost}>
				<div>
					<textarea
						onChange={onPostChange}
						ref={newPostElement}
						value={props.newPostText}
						cols="60"
						rows="5"></textarea>
				</div>
				<div>
					<button onClick={addPost}>Add post</button>
				</div>
			</div>
			<div className={classes.posts}>{postElements}</div>
		</div>
	);
};

export default MyPosts;
