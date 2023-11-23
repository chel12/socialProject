import React, { useState } from 'react';
import classes from './ProfileInfo.module.css';
import Preloader from '../../common/Preloader/Preloader';
import ProfileStatusHook from './ProfileStatusHook';
import userPhoto from './../../../img/avatar-small.png';
import ProfileDataForm from './ProfileDataForm';
import { ContactsType, ProfileType } from '../../../types/types';

type PropsType = {
	profile: ProfileType;
	status: string;
	updateStatus: (status: string) => void;
	isOwner: boolean;
	savePhoto: (file: File) => void;
	saveProfile: (profile: ProfileType) => Promise<any>;
};
const ProfileInfo: React.FC<PropsType> = ({
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
	const mainPhotoSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files?.length) {
			savePhoto(e.target.files[0]);
		}
	};
	const onSubmit = (formData: ProfileType) => {
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

type ProfileDataPropsType = {
	profile: ProfileType;
	isOwner: boolean;
	goToEditMode: () => void;
};
const ProfileData: React.FC<ProfileDataPropsType> = ({
	profile,
	isOwner,
	goToEditMode,
}) => {
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
							contactValue={
								profile.contacts[key as keyof ContactsType] //тут была проблема, надо уточнить в итоге тут тип ключа
							}
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

type ContactsPropsType = {
	contactTitle: string;
	contactValue: string;
};
const Contact: React.FC<ContactsPropsType> = ({
	contactTitle,
	contactValue,
}) => {
	return (
		<div className={classes.contacts}>
			<b>{contactTitle}</b>: {contactValue}
		</div>
	);
};

export default ProfileInfo;
