import React, { useEffect } from 'react';
import { useLocation, connect, history } from "umi";
import NoFoundPage from '@/pages/404';

const Result = props => {
  const location = useLocation();
  const { token } = props;
  const { id = null } = location.query;

  return (
    id ? null :
      <NoFoundPage
        subTitle="This page will be redirected in 5 seconds"
        title="No model found"
        redirection="/model/overview"
        buttonText="Select model"
      />
  );
}

export default connect(({ user }) => ({
  token: user.currentUser.token
}))(Result);
