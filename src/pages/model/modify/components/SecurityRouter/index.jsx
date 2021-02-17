import React, { useEffect, useState } from 'react';
import { useLocation, connect } from 'umi';
import NoFoundPage from '@/pages/404';
import WaitingSpin from '@/pages/waiting';
import { getModel } from '@/pages/results/service';
import SearchTable from '@/pages/model/modify/components/ModelList';
import StepForm from '@/pages/model/modify/components/ModifyForm';

const ModifyRouter = (props) => {
  const location = useLocation();
  const { dispatch, user } = props;
  const { token } = user;
  const [info, setInfo] = useState({});
  const { id = null } = location.query;
  const [waiting, setWaiting] = useState(true);
  useEffect(() => {
    if (id === null) {
      setWaiting(false);
      return;
    }
    (async () => {
      const model = await getModel({ id }, token);
      if (typeof model === 'string' && model.startsWith('ERROR')) {
        setInfo({ error: 'The model you look for is private or cannot be found' });
      } else {
        setInfo(model);
        if (dispatch) {
          dispatch({
            type: 'CopyAndModifyModelForm/saveTargetModelInfo',
            payload: {
              ...model,
            },
          });
        }
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
      subTitle="The model is inaccessible or unavailable"
      title={info.error}
      redirection="/model/modify"
      buttonText="Reselect model"
    />
  ) : (
    <StepForm />
  );
};

export default connect(({ user }) => ({
  user: user.currentUser,
}))(ModifyRouter);
