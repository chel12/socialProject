import { Field, reduxForm, InjectedFormProps } from 'redux-form';
import { TextArea } from '../../common/FormsControl/FormsControls.tsx';
import {
	maxLengthCreator,
	required,
} from '../../../utils/validators/validators.ts';
import { NewMessageFormValuesType } from '../Dialogs.ts';
import { createdField } from './../../common/FormsControl/FormsControls.tsx';

const maxLengthCreator50 = maxLengthCreator(50);

type NewMessageFormValuesKeysType = Extract<
	keyof NewMessageFormValuesType,
	string
>;
type PropsType = {};

export const AddMessageForm: React.FC<
	InjectedFormProps<NewMessageFormValuesType, PropsType> & PropsType
> = (props) => {
	return (
		<form onSubmit={props.handleSubmit}>
			<div>
				{createdField<NewMessageFormValuesKeysType>(
					'email',
					'Enter your message',
					'newMessageBody',
					TextArea,
					[required, maxLengthCreator50]
				)}

				<Field
					component={TextArea}
					validate={[required, maxLengthCreator50]}
					name="newMessageBody"
					placeholder="Enter your message"></Field>
			</div>
			<div>
				<button>Send</button>
			</div>
		</form>
	);
};
export default reduxForm<NewMessageFormValuesType>({
	form: 'dialogAddMessageForm',
})(AddMessageForm);
