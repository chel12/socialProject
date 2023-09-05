import React from 'react';
import NewPost from './NewPost/NewPost';
import Post from './Post/Post';

const MyPosts = () => {
	let postData = [
		{ id: 1, message: 'Hello', likeCount: 2 },
		{ id: 2, message: 'Moto Moto', likeCount: 12 },
		{ id: 3, message: 'Ahaha,cool', likeCount: 22 },
	];
	return (
		<div>
			<NewPost />

			<div>
				<Post text="Hello" like="23" />
				<Post text="Moto Moto" like="2" />
			</div>
		</div>
	);
};

export default MyPosts;
