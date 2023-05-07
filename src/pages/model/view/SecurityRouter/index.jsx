import React, { useEffect, useState } from 'react';
import { useLocation, connect } from 'umi';
import { notification } from 'antd';
import NoFoundPage from '@/pages/404';
import { getModelDetail, putModel } from '@/pages/model/view/service';
import WaitingSpin from '@/pages/waiting';
import SearchTable from '@/pages/model/view/components/ModelList';
import ModelDetail from '../components/ModelDetail';

const View = (props) => {
  const location = useLocation(); // get the current URL  
  const { user } = props;
  const { token } = user;
  const { query = {}, hash } = location;
  const { id = null } = query; // get the model id from the query
  const [info, setInfo] = useState({}); // information about the model
  const [waiting, setWaiting] = useState(true);

  /**
   * @param {*} model the model that has been created or edited
   * @returns 
   */
  const onClickPublish = (model) =>
    putModel(
      id,
      {
        ...model,
        public: !info.public,
      },
      token,
    ).then((result) => {
      if (typeof result === 'string' && result.startsWith('ERROR')) {
        notification.error({
          message: model.public ? 'un-publish scenario failed' : 'publish scenario failed',
          description: result.substr(5),
        });
      } else {
        setInfo(result);
        notification.success({
          message: 'request succeeded',
          description: model.public ? 'un-published scenario' : 'published scenario',
        });
      }
    });
  useEffect(() => {
    if (id === null) {
      setWaiting(false);
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
  if (!id) {
    return <SearchTable />;
  }
  if (waiting) {
    return <WaitingSpin />;
  }
  return info.error ? (
    <NoFoundPage
      subTitle={`The scenario id with ${id} inaccessible`}
      title="The scenario you look for is private or cannot be found"
      redirection="/model/overview"
      buttonText="Select scenario"
    />
  ) : (
    <ModelDetail
      id={id}
      token={token}
      hash={hash}
      info={info}
      publish={onClickPublish}
      user={user}
    />
  );
};

export default connect(({ user }) => ({
  user: user.currentUser,
}))(View);