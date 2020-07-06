import React from 'react';
import { Tabs, Divider } from 'antd';
import { connect } from 'umi';
import styles from './index.less';
import CountyForm from './components/CountyForm';

const { TabPane } = Tabs;
const formItemLayout = {
  labelCol: {
    span: 5,
  },
  wrapperCol: {
    span: 19,
  },
};

const Step1 = props => {
  const { dispatch, token } = props;
  const onSubmit = (type, values) => {
    if (dispatch) {
      switch (type) {
        // extensible
        default:
        case "county":
          dispatch({
            type: 'createModelForm/saveStepFormData',
            payload: {
              step1Type: type,
              ...values
            }
          })
      }

      dispatch({
        type: 'createModelForm/saveCurrentStep',
        payload: 'Select Crops'
      })
    }
  }
  return (
    <>
      <Tabs defaultActiveKey="1" tabPosition="top" centered>
        <TabPane tab="County" key="1">
          <CountyForm onSubmit={onSubmit} style={formItemLayout}/>
        </TabPane>
        <TabPane tab="B118 Basin" key="2" disabled>
          Content of Tab Pane 2
        </TabPane>
        <TabPane tab="Cvhm Farm" key="3" disabled>
          Content of Tab Pane 3
        </TabPane>
        <TabPane tab="Subbasin" key="4" disabled>
          Content of Tab Pane 4
        </TabPane>
      </Tabs>
      <Divider
        style={{
          margin: '40px 0 24px',
        }}
      />
      <div className={styles.desc}>
        <h3>Instructions</h3>
        <h4>Select a county</h4>
        <p>
          Select a county for the model.
        </p>
        <h4>Other selections</h4>
        <p>
          Developing...
        </p>
      </div>
    </>
  );
};

export default connect(({ user }) => ({
  token: user.currentUser.token
}))(Step1);
