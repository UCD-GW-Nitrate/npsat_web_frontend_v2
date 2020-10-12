import React, { useEffect, useState } from 'react';
import { useLocation, connect } from 'umi';
import NoFoundPage from '@/pages/404';
import { getModel } from '@/pages/results/service';
import GroupComparison from '@/pages/results/group/components/results';
import SearchTable from './components/ModelList';

const ResultCompare = (props) => {
  const location = useLocation();
  const { user } = props;
  const { token } = user;
  const [info, setInfo] = useState([]);
  const [error, setError] = useState(false);
  const [errorMsg, setMsg] = useState("");
  const { hash } = location;
  const { ids = null } = location.query;
  useEffect(() => {
    if (ids === null) {
      return;
    }
    (async () => {
      const models = await Promise.all(ids.split(',').map((id) => getModel({ id }, token)));
      if (models.length > 5) {
        setError(true);
        setMsg("Too many models selected.");
        return;
      } else if (models.length < 2) {
        setError(true);
        setMsg("Too few models selected.")
        return;
      }
      models.forEach((model) => {
        if (typeof model === 'string' && model.startsWith('ERROR')) {
          setError(true);
        }
      });
      setInfo(models);
    })();
  }, [ids]);

  if (!ids) {
    return <SearchTable />;
  } else if (error) {
    return errorMsg ? <NoFoundPage
      subTitle="You should select not more than 5 models and no less than 2 models"
      title={errorMsg}
      redirection="/charts/group"
      buttonText="Select models"
    /> : (
      <NoFoundPage
        subTitle="One are more models you selected are inaccessible"
        title="The model you look for is private or cannot be found"
        redirection="/charts/group"
        buttonText="Select models"
      />
    );
  } else {
    return <GroupComparison user={user} hash={hash} models={info} />;
  }
};

export default connect(({ user }) => ({
  user: user.currentUser,
}))(ResultCompare);
