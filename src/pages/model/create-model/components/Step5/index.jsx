import React from 'react';
import { Result, Button, Spin } from 'antd';
import { history } from 'umi';
import { connect } from 'react-redux';
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
        type: 'createModelForm/saveCurrentStep',
        payload: 'Select Settings',
      });
      dispatch({
        type: 'createModelForm/clearStoredStepInfo',
      });
    }
  };
  const onPrev = () => {
    if (dispatch) {
      dispatch({
        type: 'createModelForm/saveCurrentStep',
        payload: 'Model Info',
      });
      dispatch({
        type: 'createModelForm/saveCreateModelResult',
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
      <Button onClick={onCreate} size="large">
        Create another scenario
      </Button>
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
      title="Scenario created"
      subTitle="Scenario will be running for a few seconds to generate results"
      className={styles.result}
      extra={extra}
    />
  );
};

export default connect(({ createModelForm }) => ({
  id: createModelForm.results.id,
}))(Step5);
