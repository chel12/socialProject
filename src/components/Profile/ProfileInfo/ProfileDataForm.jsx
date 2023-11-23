import { reduxForm } from 'redux-form';
import s from './ProfileInfo.module.css';
import {
	createdField,
	TextArea,
} from '../../common/FormsControl/FormsControls';
import { GetStringKeys, ProfileType } from '../../../types/types';




const ProfileDataForm = ({
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
				{createdField(
					'input',
					'Full name',
					'input',
					'fullName',
					[]
				)}
			</div>
			<div>
				<b>Looking for a job</b>:{' '}
				{createdField(
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
