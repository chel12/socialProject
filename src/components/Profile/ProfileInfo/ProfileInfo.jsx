import React from 'react';
import classes from './ProfileInfo.module.css';
import Preloader from '../../common/Preloader/Preloader';
import ProfileStatusHook from './ProfileStatusHook';
import userPhoto from './../../../img/avatar-small.jfif';
const ProfileInfo = ({ profile, status, updateStatus, isOwner, savePhoto }) => {
	if (!profile) {
		return <Preloader />;
	}
	const mainPhotoSelected = (e) => {
		if (e.target.files.length) {
			savePhoto(e.target.files[0]);
		}
	};
	return (
		<div>
			<div className={classes.descriptionBlock}>
				<img
					src={profile.photos.large || userPhoto}
					className={classes.defaultImg}
				/>
				{isOwner && (
					<input type={'file'} onChange={mainPhotoSelected} />
				)}

				<div>
					<div>
						<b>Looking for a job: </b>
						{profile.lookingForAJob ? 'yes' : 'no'}
					</div>
					{profile.lookingForAJob && (
						<div>
							<b>My professional skills: </b>
							{profile.lookingForAJobDescription}
						</div>
					)}

					<div>
						<b>Full Name: </b>
						{profile.fullName}
					</div>
					<div>
						<b>About me: </b>
						{profile.aboutMe}
					</div>
				</div>

				<ProfileStatusHook
					status={status}
					updateStatus={updateStatus}
				/>
			</div>
		</div>
	);
};

export default ProfileInfo;
