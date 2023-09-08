import React from 'react';
import classes from './MyPost.module.css';
import Post from './Post/Post';
//перебор элементов массива и вывод их
const MyPosts = (props) => {
	let postElements = props.postData.map((el) => (
		<Post text={el.message} like={el.likeCount} id={el.id} />
	));
	//ссылочку делаем на значения
	let newPostElement = React.createRef();
	//добавляем значения из текстареа и обнуляем текстареа
	let addPost = () => {
		props.addPost();
	};
let onPostChange = ()=>{
let text = newPostElement.current.value
props.updateNewPostText(text)
}

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
