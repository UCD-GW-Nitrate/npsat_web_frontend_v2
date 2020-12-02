import React, { useEffect, useState } from 'react';
import { useLocation, connect } from 'umi';
import NoFoundPage from '@/pages/404';
import { getModelAndBaseModel } from '@/pages/results/service';
import BaseComparison from '@/pages/results/compare/components/results';
import SearchTable from '@/pages/results/compare/components/ModelList';

const ResultCompare = (props) => {
  const location = useLocation();
  const { user } = props;
  const { token } = user;
  const [info, setInfo] = useState({});
  const { id = null } = location.query;
  const { hash } = location;
  useEffect(() => {
    if (id === null) {
      return;
    }
    (async () => {
      const model = await getModelAndBaseModel({ id }, token);
      if (typeof model === 'string' && model.startsWith('ERROR')) {
        setInfo({ error: 'The model you look for is private or cannot be found' });
      } else if (!model.length) {
        setInfo({ error: 'BAU is private or cannot be found' });
      } else {
        setInfo(model);
      }
    })();
  }, [id]);

  if (!id) {
    return <SearchTable />;
  } else if (info.error) {
    return (
      <NoFoundPage
        subTitle="The model(s) is inaccessible"
        title={info.error}
        redirection="/compare/BAU"
        buttonText="Reselect model"
      />
    );
  } else {
    return <BaseComparison customModel={info[0]} baseModel={info[1]} hash={hash} />;
  }
};

export default connect(({ user }) => ({
  user: user.currentUser,
}))(ResultCompare);
