import React, { useEffect, useState } from 'react';
import { useLocation, connect } from 'umi';
import NoFoundPage from '@/pages/404';
import { getModelAndBaseModel } from '@/pages/results/service';
import SearchTable from './components/ModelList';

const ResultCompare = (props) => {
  const location = useLocation();
  const { user } = props;
  const { token } = user;
  const [info, setInfo] = useState({});
  const { ids = null } = location.query;
  useEffect(() => {
    if (ids === null) {
      return;
    }
    (async () => {
      const model = [];
      if (typeof model === 'string' && model.startsWith('ERROR')) {
        setInfo({ error: model });
      } else {
        setInfo(model);
      }
    })();
  }, [ids]);

  if (!ids) {
    return <SearchTable />;
  } else if (info.error) {
    return (
      <NoFoundPage
        subTitle="One are more models you selected are inaccessible"
        title="The model you look for is private or cannot be found"
        redirection="/charts/group"
        buttonText="Select models"
      />
    );
  } else {
    return null;
  }
};

export default connect(({ user }) => ({
  user: user.currentUser,
}))(ResultCompare);
