import React, { useEffect, useState } from 'react';
import { PageHeaderWrapper, RouteContext } from '@ant-design/pro-layout';
import { Card, Descriptions, Steps, Button, Tabs } from 'antd';
import classNames from 'classnames';
import { history } from 'umi';
import MultilinePlot from '@/pages/model/components/MultilinePlot/dynamic';
import AreaPlot from '@/pages/model/components/AreaPlot/dynamic';
import { ordinalSuffix } from '@/utils/utils';
import CountyMap from './components/CountyMap';
import TableWrapper from './components/TableWrapper';
import { getRegionDetail, getCropDetails, getModelDetail, getModelResults } from '../../service';
import styles from './index.less';

const { Step } = Steps;

const ModelDetail = (props) => {
  const { id, token } = props;
  const [ info, setInfo ] = useState({});
  const [ regions, setRegions ] = useState([]);
  const [ status, setStatus ] = useState(0);
  const [ crop, setCrop ] = useState([]);
  const [ loading, setLoading ] = useState(true);
  const [ plotData, setData ] = useState({});
  const [ percentiles, setPercentiles ] = useState([]);
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
    if (info.regions) {
      Promise.all(info.regions.map(region => (getRegionDetail({ id: region.id }))))
        .then(results => {
          const formattedRegions = results.map(region => {
            const result = region;
            result.geometry.properties.name = region.name;
            return result;
          })
          setRegions(formattedRegions);
        });
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
    if (info.results) {
      Promise.all(info.results.map(percentile => (getModelResults(percentile.id, token))))
        .then(data => {
          const results = {}
          data.forEach(percentile => {
            results[percentile.percentile] = percentile.values.map((value, index) => (
              // start year is always 1945
              { 'year': 1945 + index, value, percentile: `${ordinalSuffix(percentile.percentile)} percentile`}
            ))
          })
          setPercentiles(data.map(percentile => percentile.percentile));
          setData(results);
        })
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
            bordered
            column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}
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
            <Descriptions.Item label="Number of years to predict">
              {info.n_years}
            </Descriptions.Item>
            <Descriptions.Item label="Reduction year">
              {info.reduction_year}
            </Descriptions.Item>
            <Descriptions.Item label="Water content">
              {`${info.water_content * 100}%`}
            </Descriptions.Item>
            <Descriptions.Item label="Scenario">
              {info.scenario ? info.scenario.name || "" : ""}
            </Descriptions.Item>
            <Descriptions.Item label="Region(s)" span={3}>
              {regions.map(region => region.name).join(', ') || ""}
            </Descriptions.Item>
            <Descriptions.Item label="Number of wells detected in selected region(s)">
              {info.n_wells || "model run not yet finishes"}
            </Descriptions.Item>
            <Descriptions.Item label="Status message" span={3}>
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
          extra={
            <Button
              type="link"
              disabled={!info.complete}
              onClick={() => {
                history.push({
                  pathname: '/charts',
                  query: {
                    id: info.id
                  }
                })
              }}
            >
              View combined model results
            </Button>
          }
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

        {
          percentiles.length === 0 ? null:
          <Card
            title="Run result"
            style={{
              marginBottom: 32,
            }}
            bordered={false}
          >
            <Tabs tabPosition="top" centered>
              <Tabs.TabPane tab="Line Plot" key="LP">
                <MultilinePlot percentiles={percentiles} data={plotData} reductionYear={info.reduction_year}/>
              </Tabs.TabPane>
              <Tabs.TabPane tab="Area Plot" key="AP">
                <AreaPlot percentiles={percentiles} data={plotData} reductionYear={info.reduction_year}/>
              </Tabs.TabPane>
            </Tabs>
          </Card>
        }

        <Card
          title="Crop details"
          bordered={false}
          style={{
            marginBottom: 32,
          }}
        >
          <TableWrapper data={crop} loading={loading} />
        </Card>

        <Card
          title="Region Map"
          bordered={false}
        >
          { regions ? <CountyMap data={regions.map(region => region.geometry)}/> : null }
        </Card>
      </div>
    </PageHeaderWrapper>
  );
}

export default ModelDetail;
