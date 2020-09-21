import React, { useEffect, useState } from 'react';
import { useLocation, connect, history } from 'umi';
import NoFoundPage from '@/pages/404';
import { notification } from 'antd';
import { getModelAndBaseModel } from '@/pages/results/service';

const ResultCompare = props => {
  const location = useLocation();
  const { user } = props;
  const { token } = user;
  const [ info, setInfo ] = useState({});
  const { id = null } = location.query;
  useEffect(() => {
    if (id === null) {
      notification.warn({
        message: "Please choose a model to compare with the base model",
        description: "No model selected",
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
      const model = await getModelAndBaseModel( { id }, token);
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
        subTitle={`The model id with ${id} inaccessible`}
        title="The model you look for is private or cannot be found"
        redirection="/model/overview"
        buttonText="Select model"
      />
    )
  } else {
    return null;
  }
}

export default connect(({ user }) => ({
  user: user.currentUser
}))(ResultCompare);
