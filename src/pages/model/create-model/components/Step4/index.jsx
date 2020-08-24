import React from 'react';
import { Result, Button } from 'antd';
import { history } from 'umi';
import { connect } from 'react-redux';
import styles from './index.less';

const Step4 = (props) => {
  const { dispatch, id } = props;
  const onView = () => {
    history.push({
      pathname: '/charts',
      query: {
        id
      }
    })
  }
  const onCheck = () => {
    history.push({
      pathname: '/model/view',
      query: {
        id
      }
    })
  }
  const onCreate = () => {
    if (dispatch) {
      dispatch({
        type: 'createModelForm/saveCurrentStep',
        payload: 'Select Regions',
      });
      dispatch({
        type: 'createModelForm/clearStoredStepInfo'
      })
    }
  }
  const extra = (
    <>
      <Button type="primary" onClick={onView} style={{ marginBottom: 10 }}>
        View results
      </Button>
      <Button onClick={onCheck} style={{ marginBottom: 10 }}>
        Check model details
      </Button>
      <Button onClick={onCreate}>
        Create another model
      </Button>
    </>
  );
  return id === -1 ?
    (
      <Result
        status="error"
        title="Model creation failed"
        subTitle="Please contact the site manager"
        extra={
          <Button onClick={onCreate} type="primary">
            Create another model
          </Button>
        }
      />
    ) : (
    <Result
        status='success'
        title="Model created"
        subTitle="Model will be running for a few seconds to generate results"
        className={styles.result}
        extra={extra}
    />
  )
}

export default connect(({ createModelForm }) => ({
  id: createModelForm.results.id
}))(Step4);
