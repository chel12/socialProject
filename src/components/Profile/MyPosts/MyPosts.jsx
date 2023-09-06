import React from 'react';
import NewPost from './NewPost/NewPost';
import Post from './Post/Post';

const MyPosts = () => {
	let postData = [
		{ id: 1, message: 'Hello', likeCount: 2 },
		{ id: 2, message: 'Moto Moto', likeCount: 12 },
		{ id: 3, message: 'Ahaha,cool', likeCount: 22 },
	];
	let postElements = postData.map((el) => (
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
