import React, { useEffect } from 'react';
import { useLocation, connect } from "umi";
import NoFoundPage from '@/pages/404';

const ResultCompare = props => {
  const location = useLocation();
  const { user } = props;
  const { ids = null } = location.query;
  const models = decodeURI(ids).split(" ");
  console.log(models)
  if (!ids) {
    return (
      <NoFoundPage
        subTitle="No model selected for comparison"
        title="No model selected"
        redirection="/model/select"
        buttonText="Select model(s)"
      />
    )
  }

  return null;
}

export default connect(({ user }) => ({
  user: user.currentUser
}))(ResultCompare);
