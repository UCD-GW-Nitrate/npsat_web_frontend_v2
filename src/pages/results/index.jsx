import React, { useEffect } from 'react';
import { useLocation, connect } from "umi";
import NoFoundPage from '@/pages/404';

const Result = props => {
  const location = useLocation();
  const { user } = props;
  const { id = null, ids = null } = location.query;

  return (
    id && ids? null :
      <NoFoundPage
        subTitle="There is no model(s) based on your query."
        title="No model specified"
        redirection="/model/overview"
        buttonText="Select model(s)"
      />
  );
}

export default connect(({ user }) => ({
  user: user.currentUser
}))(Result);
