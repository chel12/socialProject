import { Field, reduxForm } from "redux-form";
import { TextArea} from "../../common/FormsControl/FormsControls.tsx";
import {
  maxLengthCreator,
  required,
} from "../../../utils/validators/validators.ts";
const maxLengthCreator50 = maxLengthCreator(50);
export const AddMessageForm = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <div>
        <Field
          component={TextArea}
          validate={[required, maxLengthCreator50]}
          name="newMessageBody"
          placeholder="Enter your message"
        ></Field>
      </div>
      <div>
        <button>Send</button>
      </div>
    </form>
  );
};
export default reduxForm({
  form: "dialogAddMessageForm",
})(AddMessageForm);
