import React from 'react';
import { Result, Button, Progress } from 'antd';
import { connect, history } from 'umi';
import styles from './index.less';

const Step4 = (props) => {
  const { dispatch, data } = props;
  const { id, modification = {} } = data;
  const { countTotal = 1, countSuccess = 1 } = modification;
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
      <Button type="primary" onClick={onView}>
        View results
      </Button>
      <Button onClick={onCheck}>
        Check model details
      </Button>
      <Button onClick={onCreate}>
        Create another model
      </Button>
    </>
  );
  return (
    <Result
        status={countTotal === countSuccess ? 'success' : 'warning'}
        title="Model created"
        subTitle={countTotal === countSuccess ? "Model will be running for a few seconds to view results" :
        "Some crops are not attached to model"}
        className={styles.result}
        extra={extra}
    >
      <span>
        Attached crops to the model:&nbsp;
      </span>
      <Progress
        percent={countSuccess / countTotal * 100}
        steps={countTotal}
        status={countTotal === countSuccess ? "success" : "exception"}
        strokeColor={countTotal === countSuccess ? "#52c41a" : "red"}
      />
    </Result>
  )
}

export default connect(({ createModelForm }) => ({
  data: createModelForm.results
}))(Step4);