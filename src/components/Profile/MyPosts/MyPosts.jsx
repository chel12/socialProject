import React from 'react';
import classes from './MyPost.module.css';
import Post from './Post/Post';

const MyPosts = (props) => {
	let postElements = props.post.map((el) => (
		<Post text={el.message} like={el.likeCount} id={el.id} />
	));
	//ссылочку делаем на значения
	let newPostElement = React.createRef();
	//добавляем значения из текстареа и обнуляем текстареа
	let onAddPost = () => {
		props.addPost();
	};
	let onPostChange = () => {
		let text = newPostElement.current.value;
		props.updateNewPostElement(text);
		
	};

	return (
		<div>
			<div className={classes.newPost}>
				<div>
					<textarea
						onChange={onPostChange}
						ref={newPostElement}
						value={props.newPostText}
						></textarea>
				</div>
				<div>
					<button onClick={onAddPost}>Add post</button>
				</div>
			</div>
			<div className={classes.posts}>{postElements}</div>
		</div>
	);
};

export default MyPosts;
