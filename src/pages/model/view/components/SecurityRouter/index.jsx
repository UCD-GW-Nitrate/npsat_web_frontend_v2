import React, { useEffect, useState } from 'react';
import { useLocation, connect } from 'umi';
import { notification } from 'antd';
import NoFoundPage from '@/pages/404';
import { getModelDetail, putModel } from '@/pages/model/view/service';
import ModelDetail from '../ModelDetail';
import WaitingSpin from '@/pages/waiting';

const View = (props) => {
  const location = useLocation();
  const { user } = props;
  const { token, user_id: userId } = user;
  const { query = {}, hash } = location;
  const { id = null } = query;
  const [info, setInfo] = useState({});
  const [waiting, setWaiting] = useState(true);
  const onClickPublish = (model) => {
    (async () => {
      const result = await putModel(
        id,
        {
          ...model,
          public: !info.public,
        },
        token,
      );
      if (typeof result === 'string' && result.startsWith('ERROR')) {
        notification.error({
          message: model.public ? 'un-publish model failed' : 'publish model failed',
          description: result.substr(5),
        });
      } else {
        setInfo(result);
        notification.success({
          message: 'request succeeded',
          description: model.public ? 'un-published model' : 'published model',
        });
      }
    })();
  };
  useEffect(() => {
    if (id === null) {
      return;
    }
    (async () => {
      const model = await getModelDetail({ id }, token);
      if (typeof model === 'string' && model.startsWith('ERROR')) {
        setInfo({ error: model });
      } else {
        setInfo(model);
      }
      setWaiting(false);
    })();
  }, [id]);
  if (waiting) {
    return (
      <WaitingSpin />
    );
  }
  return (
    info.error ?       <NoFoundPage
        subTitle={`The model id with ${id} inaccessible`}
        title="The model you look for is private or cannot be found"
        redirection="/model/overview"
        buttonText="Select model"
      /> :
    <ModelDetail
      id={id}
      token={token}
      hash={hash}
      info={info}
      publish={onClickPublish}
      userId={userId}
    />
  );
};

export default connect(({ user }) => ({
  user: user.currentUser,
}))(View);
