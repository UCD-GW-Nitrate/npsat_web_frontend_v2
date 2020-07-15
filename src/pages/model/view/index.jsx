import React from 'react';
import { useLocation, connect } from "umi";
import ModelDetail from './components/ModelDetail';

const View = (props) => {
  const location = useLocation();
  const { token } = props;
  const { id = null } = location.query;

  return (
    id ? <ModelDetail id={id} token={token} /> : null
  );
}

export default connect(({ user }) => ({
  token: user.currentUser.token
}))(View);
