import React, { useEffect, useState } from 'react';
import { PageHeaderWrapper, RouteContext } from '@ant-design/pro-layout';
import { Card, Descriptions, Steps, Table } from 'antd';
import classNames from 'classnames';
import { getCountyDetail, getCropDetails, getModelDetail, getModificationsDetails } from '../../service';
import styles from './index.less';

const { Step } = Steps;

const ModelDetail = (props) => {
  const { id, token } = props;
  const [ info, setInfo ] = useState({});
  const [ county, setCounty ] = useState({});
  const [ status, setStatus ] = useState(0);
  const [ crops, setCrops ] = useState([]);
  useEffect(() => {
    (async () => {
      const model = await getModelDetail( { id }, token);
      setInfo(model);
      if (model.complete) {
        setStatus(3);
      } else if (model.running) {
        setStatus(2);
      } else if (model.ready) {
        setStatus(1);
      }
    })();
  }, []);
  useEffect(() => {
    if (info.county) {
      (async () => {
        const result = await getCountyDetail({ id: info.county });
        setCounty(result);
      })();
    }
  }, [info.county]);
  useEffect(() => {
    const data = [];
    if (info.modifications) {
      info.modifications.forEach(modificationId => {
        (async () => {
          const res = await getModificationsDetails({ id: modificationId }, token);
          const crop = await getCropDetails({ id: res.crop });
          res.name = crop.name;
          data.push(res)
        })();
      });
      setCrops(data);
      console.log(data);
    }
  }, [info.modifications]);
  const desc1 = (
    <div className={classNames(styles.textSecondary, styles.stepDescription)}>
      {info.date_submitted ?
        new Date(info.date_submitted).toLocaleString() : ""}
    </div>
  );
  const desc2 = info.date_completed ?
    (
      <div className={classNames(styles.textSecondary, styles.stepDescription)}>
        {new Date(info.date_completed).toLocaleString() }
      </div>
    ) : null;
  return (
    <PageHeaderWrapper >
      <div className={styles.main}>
        <Card
          title="Model info"
          bordered={false}
          style={{
            marginBottom: 32,
          }}
        >
          <Descriptions
            bordered
          >
            <Descriptions.Item label="Model name">
              {info.name}
            </Descriptions.Item>
            <Descriptions.Item label="Date created">
              {info.date_submitted ?
                new Date(info.date_submitted).toLocaleString() : ""}
            </Descriptions.Item>
            <Descriptions.Item label="Date completed">
              {info.date_completed ?
                new Date(info.date_completed).toLocaleString() : "not yet completed"}
            </Descriptions.Item>
            <Descriptions.Item label="Region">
              {county.name || ""}
            </Descriptions.Item>
            <Descriptions.Item label="Status message" span={2}>
              {info.status_message || "no message"}
            </Descriptions.Item>
            <Descriptions.Item label="Model description" span={3}>
              {info.description || "no description"}
            </Descriptions.Item>
          </Descriptions>
        </Card>

        <Card
          title="Model progress"
          style={{
            marginBottom: 32,
          }}
          bordered={false}
        >
          <RouteContext.Consumer>
            {({ isMobile }) => (
              <Steps
                direction={isMobile ? 'vertical' : 'horizontal'}
                progressDot
                current={status}
              >
                <Step title="Model created" description={desc1}/>
                <Step title="Ready" />
                <Step title="Running" />
                <Step title="Completed" description={desc2}/>
              </Steps>
            )}
          </RouteContext.Consumer>
        </Card>
        <Card
          title="Crop details"
          bordered={false}
        >
          <Table
            columns={[
              {
                title: 'Crops',
                dataIndex: 'name',
                key: 'name'
              },
              {
                title: "Loading",
                dataIndex: 'proportion',
                key: 'proportion',
                render: num => (
                  `${num.toInteger() * 100}%`
                )
              },
              {
                title: "Land area percentage",
                dataIndex: 'land_area_proportion',
                key: 'land_area_proportion',
                render: num => (
                  `${num.toInteger() * 100}%`
                )
              },
            ]}
            dataSource={crops}
          />
        </Card>
      </div>
    </PageHeaderWrapper>
  );
}

export default ModelDetail;
