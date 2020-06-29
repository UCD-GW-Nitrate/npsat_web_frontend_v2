import { LogoutOutlined, UserOutlined } from '@ant-design/icons';
import { Menu, Spin } from 'antd';
import React from 'react';
import { connect } from 'umi';
import HeaderDropdown from '../HeaderDropdown';
import styles from './index.less';

class AvatarDropdown extends React.Component {
  onMenuClick = () => {
    const { dispatch } = this.props;

    if (dispatch) {
      dispatch({
        type: 'user/logout',
      });
    }
  };

  render() {
    const {
      currentUser = {
        avatar: '',
        name: '',
      },
    } = this.props;
    const menuHeaderDropdown = (
      <Menu className={styles.menu} selectedKeys={[]} onClick={this.onMenuClick}>
        <Menu.Item key="logout">
          <LogoutOutlined />
          Log out
        </Menu.Item>
      </Menu>
    );
    return currentUser && currentUser.first_name && currentUser.last_name ? (
      <HeaderDropdown overlay={menuHeaderDropdown}>
        <span className={`${styles.action} ${styles.account}`}>
          <UserOutlined className={styles.avatar} />
          <span className={styles.name}>{`${currentUser.first_name} ${currentUser.last_name}`}</span>
        </span>
      </HeaderDropdown>
    ) : (
      <span className={`${styles.action} ${styles.account}`}>
        <Spin
          size="small"
          style={{
            marginLeft: 8,
            marginRight: 8,
          }}
        />
      </span>
    );
  }
}

export default connect(({ user }) => ({
  currentUser: user.currentUser,
}))(AvatarDropdown);
