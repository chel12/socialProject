import { Field, reduxForm } from 'redux-form';
import { TextArea } from '../../common/FormsControl/FormsControls';
import {
	maxLengthCreator,
	required,
} from '../../../utils/validators/validators';
import { createdField } from '../../common/FormsControl/FormsControls';

const maxLengthCreator50 = maxLengthCreator(50);

export const AddMessageForm = (props) => {
	return (
		
		<form onSubmit={props.handleSubmit}>
			<div>
				{createdField(
					'email',
					'Enter your message',
					'newMessageBody',
					TextArea,
					[required, maxLengthCreator50]
				)}
			</div>
			<div>
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
export default reduxForm({
	form: 'dialogAddMessageForm',
})(AddMessageForm);
