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
        description: "No model specified"
      });
      history.push({
        pathname: '/model/overview'
      });
    }
  }, [id]);

  return (
    id ? <ModelDetail id={id} token={token} hash={hash}/> : <NoFoundPage />
  );
}

export default connect(({ user }) => ({
  token: user.currentUser.token
}))(View);
