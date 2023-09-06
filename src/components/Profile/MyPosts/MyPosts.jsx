import React from 'react';
import classes from './MyPost.module.css';
import Post from './Post/Post';

const MyPosts = (props) => {
	let postElements = props.postData.map((el) => (
		<Post text={el.message} like={el.likeCount} id={el.id} />
	));
	let addPost = () => {
		let text = newPostElement.current.value;
		props.addPost(text);
	};
	let newPostElement = React.createRef();
	return (
		<div>
			<div className={classes.newPost}>
				<div>
					<textarea
						ref={newPostElement}
						name=""
						id=""
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
