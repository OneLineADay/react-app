import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { signInRequest } from "redux/user/user.actions";
import { StyledContainer } from "utils/styles.utils";

const Login = ({ login }) => {
  const handleSubmit = values => {
    const { username, password } = values;
    login(username, password);
  };

  const schema = Yup.object().shape({
    username: Yup.string().required("Please enter username"),
    password: Yup.string().required("Please enter Password")
  });

  const setTitle = () => {
    document.title = "One Line A Day | Login";
  };

  useEffect(setTitle, []);
  return (
    <StyledContainer>
      <h1>Login to your account!</h1>
      <Formik
        initialValues={{
          username: "",
          password: ""
        }}
        validationSchema={schema}
        onSubmit={handleSubmit}
      >
        {() => (
          <Form>
            <div>
              <Field type="text" name="username" />
              <ErrorMessage name="username" component="span" />
            </div>
            <div>
              <Field type="password" name="password" />
              <ErrorMessage name="password" component="span" />
            </div>
            <div>
              <button type="submit">Login</button>
            </div>
          </Form>
        )}
      </Formik>
    </StyledContainer>
  );
};

const mapDispatchToProps = dispatch => ({
  login: (username, password) => dispatch(signInRequest(username, password))
});

export default connect(
  null,
  mapDispatchToProps
)(Login);