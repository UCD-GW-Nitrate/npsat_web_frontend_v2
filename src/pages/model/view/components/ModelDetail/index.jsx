import React, { useEffect, useState } from 'react';
import { PageHeaderWrapper, RouteContext } from '@ant-design/pro-layout';
import { Card, Descriptions, Steps } from 'antd';
import classNames from 'classnames';
import CountyMap from './components/CountyMap';
import TableWrapper from './components/TableWrapper';
import { getCountyDetail, getCropDetails, getModelDetail } from '../../service';
import styles from './index.less';

const { Step } = Steps;

const ModelDetail = (props) => {
  const { id, token } = props;
  const [ info, setInfo ] = useState({});
  const [ county, setCounty ] = useState({});
  const [ status, setStatus ] = useState(0);
  const [ crop, setCrop ] = useState([]);
  const [ loading, setLoading ] = useState(true);
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
    if (info.modifications) {
      Promise.all(info.modifications.map(item => (getCropDetails({ id: item.crop }))))
        .then(results => {
          const data = [];
          results.forEach((item, index) => {
            const { name } = item;
            data.push({
              ...info.modifications[index], name
            })
          })
          setCrop(data);
          setLoading(false);
        });
    }
  }, [info]);
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
            column={3}
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
          title="Region Map"
          style={{
            marginBottom: 32,
          }}
          bordered={false}
        >
          { county ? <CountyMap data={county}/> : null }
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
          <TableWrapper data={crop} loading={loading} />
        </Card>
      </div>
    </PageHeaderWrapper>
  );
}

export default ModelDetail;
