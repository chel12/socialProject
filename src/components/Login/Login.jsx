import React from "react";
import { Field, reduxForm } from "redux-form";
import { Input } from "../common/FormsControl/FormsControls";
import { required } from "../../utils/validators/validators";
import { connect } from "react-redux";

const LoginForm = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <div>
        <Field
          type="text"
          placeholder="Login"
          component={Input}
          name={"login"}
          validate={[required]}
        />
      </div>
      <div>
        <Field
          type="text"
          placeholder="Password"
          component={Input}
          name={"password"}
          validate={[required]}
        />
      </div>
      <div>
        <Field type="checkbox" component={"input"} name={"rememberMe"} />
        remember me
      </div>
      <div>
        <button type="submit">Login</button>
      </div>
    </form>
  );
};
const LoginReduxForm = reduxForm({
  form: "login",
})(LoginForm);

const Login = (props) => {
  const onSubmit = (formData) => {
    console.log(formData);
  };
  return (
    <div>
      <h1>Login</h1>
      <LoginReduxForm onSubmit={onSubmit} />
    </div>
  );
};

export default connect()(Login);
