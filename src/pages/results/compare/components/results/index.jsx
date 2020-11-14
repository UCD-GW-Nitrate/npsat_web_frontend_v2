import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Anchor, Card, Spin, Tabs, Tooltip } from 'antd';
import ProTable, { ConfigProvider, enUSIntl } from '@ant-design/pro-table';
import React, { useEffect, useState } from 'react';
import { getModelResults } from '@/pages/model/view/service';
import { ordinalSuffix } from '@/utils/utils';
import { connect } from 'umi';
import { InfoCircleOutlined } from '@ant-design/icons';
import AnchorTitle from '@/components/AnchorTitle';
import DifferenceHistogram from '@/components/Plots/BizCharts/DifferenceHistogram/dynamic';
import ComparisonLinePlot from '@/components/Plots/BizCharts/ComparisonLinePlot/dynamic';
import DifferenceHeatmap from '@/components/Plots/BizCharts/DifferenceHeatmap/dynamic';
import ThresholdHeatmap from '@/components/Plots/BizCharts/ThresholdHeatmap/dynamic';
import CropTable from '@/pages/results/components/CropTable';
import styles from './style.less';

const getResults = (model, token, resultsSetter, PercentileSetter) => {
  if (model && model.results) {
    Promise.all(model.results.map((percentile) => getModelResults(percentile.id, token))).then(
      (data) => {
        const results = {};
        data.forEach((percentile) => {
          results[percentile.percentile] = percentile.values.map((value, index) =>
            // start year is always 1945
            ({
              year: 1945 + index,
              value,
              percentile: `${ordinalSuffix(percentile.percentile)} percentile`,
            }),
          );
        });
        PercentileSetter(data.map((percentile) => percentile.percentile));
        resultsSetter(results);
      },
    );
    return true;
  }
  return false;
};

const BaseComparison = ({ customModel, baseModel, user, hash }) => {
  const { token } = user;
  const [baseResults, setBaseResults] = useState([]);
  const [basePercentile, setBasePercentile] = useState([]);
  const [customResults, setCustomResults] = useState([]);
  const [customPercentile, setCustomPercentile] = useState([]);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    if (
      getResults(baseModel, token, setBaseResults, setBasePercentile) &&
      getResults(customModel, token, setCustomResults, setCustomPercentile)
    ) {
      setReady(true);
    }
  }, [baseModel, customModel]);
  useEffect(() => {
    if (!hash || hash[0] !== '#') {
      return;
    }
    const view = hash.substr(1);
    const card = document.getElementById(view);
    if (card) {
      card.scrollIntoView({
        behavior: 'smooth',
      });
    }
  }, []);
  return (
    <PageHeaderWrapper
      title="Base model comparison"
      subTitle="Compare a custom model with the base model under same scenario"
      content={
        <Anchor affix={false}>
          <Anchor.Link href="#settings" title="Model settings" />
          <Anchor.Link href="#results" title="Results comparison" />
          <Anchor.Link href="#crops" title="Crop selection" />
        </Anchor>
      }
    >
      <div className={styles.main}>
        <Card
          title={<AnchorTitle anchor="settings" title="Model settings" />}
          style={{
            marginBottom: 32,
          }}
        >
          <ConfigProvider
            value={{
              intl: enUSIntl,
            }}
          >
            <ProTable
              columns={[
                {
                  title: 'Name',
                  dataIndex: 'name',
                  render: (value, record) => (
                    <Tooltip title="Check model details">
                      <a href={`/model/view?id=${record.id}`}>{value}</a>
                    </Tooltip>
                  ),
                  fixed: true,
                },
                {
                  title: 'Base Model',
                  dataIndex: 'is_base',
                  render: (value) => (value ? 'Yes' : 'No'),
                },
                {
                  title: 'Description',
                  dataIndex: 'description',
                  ellipsis: true,
                  width: 250,
                },
                {
                  title: 'Flow Scenario',
                  dataIndex: 'flow_scenario',
                  render: (v) => v.name,
                },
                {
                  title: 'Load Scenario',
                  dataIndex: 'load_scenario',
                  render: (v) => v.name,
                },
                {
                  title: 'Unsat Scenario',
                  dataIndex: 'unsat_scenario',
                  render: (v) => v.name,
                },
                {
                  title: 'Regions',
                  dataIndex: 'regions',
                  render: (value) => value.map((regions) => regions.name).join(','),
                },
                {
                  title: 'Wells included',
                  dataIndex: 'n_wells',
                },
                {
                  title: 'Year range',
                  dataIndex: 'n_years',
                  render: (value) => `1945 - ${1945 + value}`,
                  width: 100,
                },
                {
                  title: 'Implementation start year',
                  dataIndex: 'reduction_start_year',
                },
                {
                  title: 'Implementation end year',
                  dataIndex: 'reduction_end_year',
                },
                {
                  title: 'Water content',
                  dataIndex: 'water_content',
                  render: (value) => `${value * 100}%`,
                },
                {
                  title: 'Date Created',
                  dataIndex: 'date_submitted',
                  render: (value) => new Date(value).toLocaleString(),
                },
                {
                  title: 'Date Completed',
                  dataIndex: 'date_completed',
                  render: (value) => new Date(value).toLocaleString(),
                },
              ]}
              dataSource={customModel && baseModel ? [customModel, baseModel] : []}
              scroll={{
                x: 'max-content',
              }}
              rowKey="id"
              bordered
              search={false}
              options={false}
              pagination={false}
            />
          </ConfigProvider>
        </Card>
        {ready ? (
          <Card
            title={<AnchorTitle anchor="results" title="Results comparison" />}
            style={{
              marginBottom: 32,
            }}
          >
            <Tabs tabPosition="top" centered>
              <Tabs.TabPane
                tab={
                  <Tooltip title="Comparison under same percentile">
                    Comparison Line Plot <InfoCircleOutlined />
                  </Tooltip>
                }
                key="LP"
              >
                <ComparisonLinePlot
                  baseData={baseResults}
                  customData={customResults}
                  percentiles={customPercentile}
                  reductionYear={customModel ? customModel.reduction_year : undefined}
                />
              </Tabs.TabPane>
              <Tabs.TabPane
                tab={
                  <Tooltip title="Difference between base model and custom model">
                    Difference histogram <InfoCircleOutlined />
                  </Tooltip>
                }
                key="DH"
              >
                <DifferenceHistogram
                  baseData={baseResults}
                  customData={customResults}
                  percentiles={customPercentile}
                  reductionYear={customModel ? customModel.reduction_year : undefined}
                />
              </Tabs.TabPane>
              <Tabs.TabPane
                tab={
                  <Tooltip title="Aggregated difference between base mode and custom model">
                    Threshold heatmap <InfoCircleOutlined />
                  </Tooltip>
                }
                key="THP"
              >
                <ThresholdHeatmap
                  baseData={baseResults}
                  customData={customResults}
                  percentiles={customPercentile}
                  reductionYear={customModel ? customModel.reduction_year : undefined}
                />
              </Tabs.TabPane>
              <Tabs.TabPane
                tab={
                  <Tooltip title="Aggregated difference between base mode and custom model">
                    Difference heatmap <InfoCircleOutlined />
                  </Tooltip>
                }
                key="DHP"
              >
                <DifferenceHeatmap
                  baseData={baseResults}
                  customData={customResults}
                  percentiles={customPercentile}
                  reductionYear={customModel ? customModel.reduction_year : undefined}
                />
              </Tabs.TabPane>
            </Tabs>
          </Card>
        ) : (
          <Spin />
        )}
        <Card title={<AnchorTitle anchor="crops" title="Crop Selection" />}>
          <CropTable models={customModel && baseModel ? [customModel, baseModel] : []} />
        </Card>
      </div>
    </PageHeaderWrapper>
  );
};

export default connect(({ user }) => ({
  user: user.currentUser,
}))(BaseComparison);
