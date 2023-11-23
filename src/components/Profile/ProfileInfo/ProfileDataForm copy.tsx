
import s from './ProfileInfo.module.css';
import { GetStringKeys, ProfileType } from '../../../types/types';

type PropsType = {
	handleSubmit: (profile: ProfileType) => void;
	profile: ProfileType;
	error: string;
};


const ProfileDataForm: React.FC<PropsType> = ({
	handleSubmit,
	profile,
	error,
}) => {
	return (

		<form onSubmit={handleSubmit}>
			{error && <div className={s.formSummaryError}>{error} </div>}
			<div>
				<button onClick={() => {}}>Save</button>
			</div>

			<div>
				<b>Full Name: </b>{' '}
				{createdField<ProfileTypeKeys>(
					'input',
					'Full name',
					'input',
					'fullName',
					[]
				)}
			</div>
			<div>
				<b>Looking for a job</b>:{' '}
				{createdField<ProfileTypeKeys>(
					'checkbox',
					'',
					'input',
					'none',
					[]
				)}
			</div>

			<div>
				<b>My professional skills: </b>

				{createdField(
					'textarea',
					'My professional skills',
					'textarea',
					'lookingForAJobDescription',
					[]
				)}
			</div>

			<div>
				<b>About me: </b>

				{createdField(
					'textarea',
					'About me',
					'textarea',
					'aboutMe',
					[]
				)}
			</div>
			<div>
				<b>Contacts: </b>{' '}
				{Object.keys(profile.contacts).map((key) => {
					return (
						<div className={s.contact} key={key}>
							<b>
								{key}:{' '}
								{createdField(
									'input',
									key,
									'input',
									'contacts.' + key,
									[]
								)}{' '}
							</b>
						</div>
					);
				})}
			</div>
		</form>
	);
};

const ProfileDataFormReduxForm = reduxForm({ form: 'edit-profile' })(
	ProfileDataForm
);
export default ProfileDataFormReduxForm;