import React from 'react';
import {
	addPostActionCreator,
	updateNewPostTextActionCreator,
} from '../../../redux/profileReducer';
import MyPosts from './MyPosts';


const MyPostsContainer = (props) => {
	let state = props.store.getState();
	let addPost = () => {
		props.store.dispatch(addPostActionCreator());
	};
	let onPostChange = (text) => {
		let action = updateNewPostTextActionCreator(text)
		props.store.dispatch(action);
	};

	return (
		<MyPosts 
		updateNewPostElement={onPostChange} 
		addPost={addPost}
		post={state.profilePage.postData}
		newPostText={state.profilePage.newPostText}
		/>
	)	
	
};

export default MyPostsContainer;
