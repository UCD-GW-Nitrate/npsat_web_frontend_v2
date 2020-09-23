import React from 'react';
import { PageLoading } from '@ant-design/pro-layout';
import { Redirect, connect } from 'umi';
import { stringify } from 'querystring';

class SecurityLayout extends React.Component {
  state = {
    isReady: false,
  };

  componentDidMount() {
    this.setState({
      isReady: true,
    });
  }

  render() {
    const { isReady } = this.state;
    const { dispatch, children, loading, currentUser } = this.props;

    const cachedUser = JSON.parse(localStorage.getItem('npsat_user_info'));
    if (cachedUser && cachedUser.token && Object.entries(currentUser).length === 0) {
      dispatch({
        type: 'user/loadingCache',
        payload: cachedUser,
      });
    }
    const isLogin = (currentUser && currentUser.token) || (cachedUser && cachedUser.token);

    const queryString = stringify({
      redirect: window.location.href,
    });

    if ((!isLogin && loading) || !isReady) {
      return <PageLoading />;
    }

    if (!isLogin && window.location.pathname !== '/user/login') {
      return <Redirect to={`/user/login?${queryString}`} />;
    }

    return children;
  }
}

export default connect(({ user, loading }) => ({
  currentUser: user.currentUser,
  loading: loading.models.user,
}))(SecurityLayout);
