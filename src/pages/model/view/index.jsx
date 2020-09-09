import React, { useEffect } from 'react';
import { useLocation, connect, history } from "umi";
import { notification } from 'antd';
import NoFoundPage from '@/pages/404';
import ModelDetail from './components/ModelDetail';

const View = props => {
  const location = useLocation();
  const { token } = props;
  const { query = {}, hash } = location;
  const { id = null } = query;
  useEffect(() => {
    if (id === null) {
      notification.warn({
        message: "Please choose a model to view details",
        description: "No model specified",
        duration: 8
      });
      // set 5s timer
      const redirectTimer = setTimeout(() => {
        history.push({
          pathname: '/model/overview'
        });
      }, 5000);
      // componentWillUnmount
      // avoid redirection after leaving current page
      return () => clearTimeout(redirectTimer);
    }
  }, [id]);
  return (
    id ? <ModelDetail id={id} token={token} hash={hash}/> :
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
}))(View);
