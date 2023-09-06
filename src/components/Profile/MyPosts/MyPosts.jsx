import React from 'react';
import NewPost from './NewPost/NewPost';
import Post from './Post/Post';

const MyPosts = (props) => {
	
	let postElements = props.postData.map((el) => (
		<Post text={el.message} like={el.likeCount} id={el.id} />
	));
	return (
		<div>
			<NewPost />

			<div>{postElements}</div>
		</div>
	);
};

export default MyPosts;
