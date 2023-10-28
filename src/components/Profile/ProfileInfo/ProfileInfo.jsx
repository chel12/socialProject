import React from 'react';
import classes from './ProfileInfo.module.css';
import Preloader from '../../common/Preloader/Preloader';
import ProfileStatusHook from './ProfileStatusHook';
const ProfileInfo = ({ profile, status, updateStatus }) => {
	if (!profile) {
		return <Preloader />;
	}

	return (
		<div>
			<div className={classes.descriptionBlock}>
				<img src={profile.photos.large}></img>
				<ProfileStatusHook
					status={status}
					updateStatus={updateStatus}
				/>
			</div>
		</div>
	);
};

export default ProfileInfo;
