import React, { useState } from 'react';
import classes from './ProfileInfo.module.css';
import Preloader from '../../common/Preloader/Preloader';
import ProfileStatusHook from './ProfileStatusHook';
import userPhoto from './../../../img/avatar-small.jfif';
import ProfileDataForm from './ProfileDataForm';
const ProfileInfo = ({
	profile,
	status,
	updateStatus,
	isOwner,
	savePhoto,
	saveProfile,
}) => {
	const [editMode, setEditMode] = useState(false);
	if (!profile) {
		return <Preloader />;
	}
	const mainPhotoSelected = (e) => {
		if (e.target.files.length) {
			savePhoto(e.target.files[0]);
		}
	};
	const onSubmit = (formData) => {
		saveProfile(formData).then(() => {
			setEditMode(false);
		});
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
				{editMode ? (
					<ProfileDataForm
						initialValues={profile}
						profile={profile}
						onSubmit={onSubmit}
					/>
				) : (
					<ProfileData
						goToEditMode={() => {
							setEditMode(true);
						}}
						profile={profile}
						isOwner={isOwner}
					/>
				)}

				<ProfileStatusHook
					status={status}
					updateStatus={updateStatus}
				/>
			</div>
		</div>
	);
};
const ProfileData = ({ profile, isOwner, goToEditMode }) => {
	return (
		<div>
			{isOwner && (
				<div>
					<button onClick={goToEditMode}>edit</button>
				</div>
			)}
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
				<b>Contacts: </b>{' '}
				{Object.keys(profile.contacts).map((key) => {
					return (
						<Contact
							key={key}
							contactTitle={key}
							contactValue={profile.contacts[key]}
						/>
					);
				})}
			</div>

			<div>
				<b>About me: </b>
				{profile.aboutMe}
			</div>
		</div>
	);
};

const Contact = ({ contactTitle, contactValue }) => {
	return (
		<div className={classes.contacts}>
			<b>{contactTitle}</b>: {contactValue}
		</div>
	);
};

export default ProfileInfo;
