import React, { useEffect, useState } from 'react';
import { useLocation, connect, history } from "umi";
import { notification } from 'antd';
import NoFoundPage from '@/pages/404';
import { getModelDetail } from '@/pages/model/view/service';
import ModelDetail from './components/ModelDetail';

const View = props => {
  const location = useLocation();
  const { token } = props;
  const { query = {}, hash } = location;
  const { id = null } = query;
  const [ info, setInfo ] = useState({});
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
    (async () => {
      const model = await getModelDetail( { id }, token);
      if (typeof model === "string" && model.startsWith("ERROR")) {
        setInfo({ error: model });
        return true;
      } else {
        setInfo(model);
        return false;
      }
    })();
  }, [id]);
  if (!id) {
    return (
      <NoFoundPage
        subTitle="This page will be redirected in 5 seconds"
        title="No model specified"
        redirection="/model/overview"
        buttonText="Select model"
      />)
  } else if (info.error) {
    return (
      <NoFoundPage
        subTitle={`Model id with ${id} not found`}
        title="The model you look for cannot be found"
        redirection="/model/overview"
        buttonText="Select model"
      />
    )
  } else {
    return <ModelDetail id={id} token={token} hash={hash} info={info}/>
  }
}

export default connect(({ user }) => ({
  token: user.currentUser.token
}))(View);
