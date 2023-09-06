import React from 'react';
import classes from './Profile.module.css';
import MyPosts from './MyPosts/MyPosts';
import ProfileInfo from './ProfileInfo/ProfileInfo';
import { addPost } from '../../redux/state';

const Profile = (props) => {
	return (
		<div className={classes.content}>
			<ProfileInfo />
			<MyPosts postData={props.state.postData} addPost={props.addPost} />
		</div>
	);
};

export default Profile;
