import { Alert } from 'antd';
import React from 'react';
import { connect } from 'react-redux';
import LoginForm from './components/Login';
import styles from './style.less';

const { UserName, Password, Submit } = LoginForm;

const LoginMessage = ({ content }) => (
  <Alert
    style={{
      marginBottom: 24,
    }}
    message={content}
    type="error"
    showIcon
  />
);

const Login = props => {
  const { userLogin = {}, submitting } = props;
  const { status = { status: "unknown" } } = userLogin;

  const handleSubmit = values => {
    const { dispatch } = props;
    dispatch({
      type: 'user/login',
      payload: { ...values },
    });
  };

  return (
    <div className={styles.main}>
      <LoginForm onSubmit={handleSubmit}>
        {status.status === 'error' && !submitting && (
          <LoginMessage content={status.message} />
        )}

        <UserName
          name="username"
          placeholder="username or email"
          rules={[
            {
              required: true,
              message: 'Please enter your username or email!',
            },
          ]}
        />
        <Password
          name="password"
          placeholder="password"
          rules={[
            {
              required: true,
              message: 'Please enter your password!',
            },
          ]}
        />
        <Submit loading={submitting}>Log In</Submit>
      </LoginForm>
    </div>
  );
};

export default connect(({ user, loading }) => ({
  userLogin: user,
  submitting: loading.effects['user/login'],
}))(Login);
