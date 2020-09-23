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
  useEffect(() => {
    if (id === null) {
      return;
    }
    (async () => {
      const model = await getModelAndBaseModel({ id }, token);
      if (typeof model === 'string' && model.startsWith('ERROR')) {
        setInfo({ error: model });
        return true;
      } else {
        setInfo(model);
        return false;
      }
    })();
  }, [id]);

  if (!id) {
    return <SearchTable />;
  } else if (info.error) {
    return (
      <NoFoundPage
        subTitle={`The model id with ${id} inaccessible`}
        title="The model you look for is private or cannot be found"
        redirection="/charts/compare"
        buttonText="Select model"
      />
    );
  } else {
    return <BaseComparison info={info} />;
  }
};

export default connect(({ user }) => ({
  user: user.currentUser,
}))(ResultCompare);
