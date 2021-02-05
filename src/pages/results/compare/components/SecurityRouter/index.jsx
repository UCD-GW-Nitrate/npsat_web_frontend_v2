import React, { useEffect, useState } from 'react';
import { useLocation, connect } from 'umi';
import NoFoundPage from '@/pages/404';
import { getModelAndBaseModel } from '@/pages/results/service';
import BaseComparison from '@/pages/results/compare/components/results';
import WaitingSpin from '@/pages/waiting';
import SearchTable from '@/pages/results/compare/components/ModelList';

const ResultCompare = (props) => {
  const location = useLocation();
  const { user } = props;
  const { token } = user;
  const [info, setInfo] = useState({});
  const { id = null } = location.query;
  const { hash } = location;
  const [waiting, setWaiting] = useState(true);
  useEffect(() => {
    if (id === null) {
      setWaiting(false);
      return;
    }
    (async () => {
      const model = await getModelAndBaseModel({ id }, token);
      if (typeof model === 'string' && model.startsWith('ERROR')) {
        setInfo({ error: 'The model you look for is private or cannot be found' });
      } else if (!model.length) {
        setInfo({ error: 'Select another model to be compared with BAU model' });
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
      subTitle="The model(s) is inaccessible"
      title={info.error}
      redirection="/compare/BAU"
      buttonText="Reselect model"
    />
  ) : (
    <BaseComparison customModel={info[0]} baseModel={info[1]} hash={hash} />
  );
};

export default connect(({ user }) => ({
  user: user.currentUser,
}))(ResultCompare);
