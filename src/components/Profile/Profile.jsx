import React from 'react';
import classes from './Profile.module.css';
import MyPosts from './MyPosts/MyPosts';
import ProfileInfo from './ProfileInfo/ProfileInfo';
import { addPost } from '../../redux/state';

const Profile = (props) => {
	return (
		<div className={classes.content}>
			<ProfileInfo />
			<MyPosts 
			postData={props.profilePage.postData} 
			newPostText={props.profilePage.newPostText}
			updateNewPostText={props.updateNewPostText}
			addPost={props.addPost} />
		</div>
	);
};

export default Profile;
