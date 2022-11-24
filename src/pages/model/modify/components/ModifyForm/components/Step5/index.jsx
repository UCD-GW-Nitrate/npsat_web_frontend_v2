import React from 'react';
import { Result, Button, Spin, Menu, Dropdown } from 'antd';
import { history } from 'umi';
import { connect } from 'react-redux';
import { DownOutlined, CopyOutlined } from '@ant-design/icons';
import styles from './index.less';

const Step5 = (props) => {
  const { dispatch, id } = props;
  const onView = () => {
    history.push({
      pathname: '/model/view',
      query: {
        id,
      },
    });
  };
  const onCheck = () => {
    history.push({
      pathname: '/compare/BAU',
      query: {
        id,
      },
    });
  };
  const onCreate = () => {
    if (dispatch) {
      dispatch({
        type: 'copyAndModifyModelForm/saveCurrentStep',
        payload: 'Modify Regions',
      });
      dispatch({
        type: 'copyAndModifyModelForm/clearStoredStepInfoAndReload',
      });
    }
  };
  const menu = (
    <Menu>
      <Menu.Item key="1">
        <a onClick={() => onCreate()}>
          <CopyOutlined
            style={{
              marginRight: 5,
            }}
          />{' '}
          the original scenario
        </a>
      </Menu.Item>
      <Menu.Item>
        <a href={`/model/modify?id=${id}`}>
          <CopyOutlined
            style={{
              marginRight: 5,
            }}
          />{' '}
          the new scenario
        </a>
      </Menu.Item>
    </Menu>
  );
  const onPrev = () => {
    if (dispatch) {
      dispatch({
        type: 'copyAndModifyModelForm/saveCurrentStep',
        payload: 'Model Info',
      });
      dispatch({
        type: 'copyAndModifyModelForm/saveCreateModelResult',
        payload: null,
      });
    }
  };
  const extra = (
    <>
      <Button type="primary" onClick={onView} style={{ marginBottom: 10 }} size="large">
        View scenario run
      </Button>
      <Button onClick={onCheck} style={{ marginBottom: 10 }} size="large">
        Compare with BAU
      </Button>
      <Dropdown overlay={menu} placement="bottomCenter" arrow>
        <Button size="large">
          Copy and modify again <DownOutlined />
        </Button>
      </Dropdown>
    </>
  );
  if (id === null) {
    return (
      <div
        style={{
          textAlign: 'center',
        }}
      >
        <Spin size="large" tip="Creating..." />
      </div>
    );
  }
  return id === -1 ? (
    <Result
      status="error"
      title="Scenario creation failed"
      subTitle="Please contact the site manager"
      extra={
        <>
          <Button onClick={onCreate} type="primary">
            Create another scenario
          </Button>
          <Button onClick={onPrev}>Prev</Button>
        </>
      }
    />
  ) : (
    <Result
      status="success"
      title="Scenario copied, modified, and created"
      subTitle="Scenario will be running for a few seconds to generate results"
      className={styles.result}
      extra={extra}
    />
  );
};

export default connect(({ copyAndModifyModelForm }) => ({
  id: copyAndModifyModelForm.results.id,
}))(Step5);
