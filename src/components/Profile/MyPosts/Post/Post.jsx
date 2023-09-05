import React from 'react';
import classes from './Post.module.css';
const Post = ({ text, like }) => {
	return (
		<div className={classes.item}>
			<img src="https://clck.ru/MqPbZ"></img>
			{text}
			<div className={classes.like}>like: {like}</div>
		</div>
	);
};

export default Post;
