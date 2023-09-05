import React from 'react';
import classes from './NewPost.module.css';
const NewPost = () => {
	return (
		<div className={classes.newPost}>
			<div>
				<textarea name="" id="" cols="60" rows="5"></textarea>
			</div>
			<div>
				<button>Add post</button>
			</div>
		</div>
	);
};

export default NewPost;
