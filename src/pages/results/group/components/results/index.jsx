import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Anchor, Card, Select, Tabs, Tooltip, Space, Button, Empty } from 'antd';
import ProTable, { ConfigProvider, enUSIntl } from '@ant-design/pro-table';
import React, { useEffect, useState } from 'react';
import { getModelResults } from '@/pages/model/view/service';
import { ordinalSuffix } from '@/utils/utils';
import { connect } from 'umi';
import { InfoCircleOutlined, SwapOutlined } from '@ant-design/icons';
import AnchorTitle from '@/components/AnchorTitle';
import DifferenceHistogram from '@/components/Plots/BizCharts/DifferenceHistogram/dynamic';
import ComparisonLinePlot from '@/components/Plots/BizCharts/ComparisonLinePlot/dynamic';
import DifferenceHeatmap from '@/components/Plots/BizCharts/DifferenceHeatmap';
import CropTable from '@/pages/results/components/CropTable';
import ThresholdHeatmap from '@/components/Plots/BizCharts/ThresholdHeatmap/dynamic';
import styles from './style.less';

const GroupComparison = ({ models, user, hash }) => {
  const { token } = user;
  const [results, setResults] = useState({});
  const [percentiles, setPercentiles] = useState({});
  const [completedModels, setCompletedModels] = useState([]);
  useEffect(() => {
    const availableModels = [];
    const availableResults = {};
    const availablePercentiles = {};
    models.forEach((model) => {
      if (model && model.results && model.results.length > 0) {
        availableModels.push(model);
        Promise.all(model.results.map((percentile) => getModelResults(percentile.id, token))).then(
          (data) => {
            const modelResults = {};
            data.forEach((percentile) => {
              modelResults[percentile.percentile] = percentile.values.map((value, index) =>
                // start year is always 1945
                ({
                  year: 1945 + index,
                  value,
                  percentile: `${ordinalSuffix(percentile.percentile)} percentile`,
                }),
              );
            });
            availableResults[model.id] = modelResults;
            availablePercentiles[model.id] = data.map((percentile) => percentile.percentile);
          },
        );
      }
    });
    setResults(availableResults);
    setPercentiles(availablePercentiles);
    setCompletedModels(availableModels);
  }, [models]);
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
      subTitle="Compare selected models together"
      content={
        <Anchor affix={false}>
          <Anchor.Link href="#settings" title="Model settings" />
          <Anchor.Link href="#crops" title="Crop selection" />
          <Anchor.Link href="#results-pair" title="Results comparison in pairs" />
          <Anchor.Link href="#results-group" title="Results comparison in group" />
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
                  title: 'Status',
                  dataIndex: 'status',
                  valueEnum: {
                    0: {
                      text: 'Not ready',
                      status: 'Warning',
                    },
                    1: {
                      text: 'In queue',
                      status: 'Default',
                    },
                    2: {
                      text: 'Running',
                      status: 'Processing',
                    },
                    3: {
                      text: 'Complete',
                      status: 'Success',
                    },
                    4: {
                      text: 'Error',
                      status: 'Error',
                    },
                  },
                  width: 100,
                },
                {
                  title: 'Scenario',
                  dataIndex: 'scenario',
                  render: (value) => value.name,
                },
                {
                  title: 'Regions',
                  dataIndex: 'regions',
                  render: (value) => value.map((regions) => regions.name).join(','),
                },
                {
                  title: 'Wells included',
                  dataIndex: 'n_wells',
                  render: (value) => value || 'Not completed',
                },
                {
                  title: 'Year range',
                  dataIndex: 'n_years',
                  render: (value) => `1945 - ${1945 + value}`,
                  width: 100,
                },
                {
                  title: 'Reduction year',
                  dataIndex: 'reduction_year',
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
                  render: (value) => (value ? new Date(value).toLocaleString() : 'Not completed'),
                },
              ]}
              dataSource={models}
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
        <Card
          title={<AnchorTitle anchor="crops" title="Crop Selection" />}
          style={{
            marginBottom: 32,
          }}
        >
          <CropTable models={models} />
        </Card>
        <ResultComparisonInPairs
          models={completedModels}
          results={results}
          percentiles={percentiles}
        />
      </div>
    </PageHeaderWrapper>
  );
};

const ResultComparisonInPairs = ({ models, results, percentiles }) => {
  const [base, setBase] = useState(undefined);
  const [compare, setCompare] = useState(undefined);
  const [modelsMap, setMap] = useState({});
  useEffect(() => {
    const map = {};
    models.forEach((model) => {
      map[model.id] = model;
    });
    setMap(map);
  }, [models]);
  return (
    <Card
      title={<AnchorTitle anchor="results-pair" title="Results comparison in pairs" />}
      style={{
        marginBottom: 32,
      }}
      extra={
        <Space align="baseline">
          <Select
            value={base}
            onChange={setBase}
            placeholder="Baseline model"
            style={{
              width: 150,
            }}
          >
            {models.map((model) => (
              <Select.Option key={model.id} value={model.id}>
                {model.name}
              </Select.Option>
            ))}
          </Select>
          <Button
            type="link"
            style={{
              margin: 0,
              padding: 0,
            }}
            onClick={() => {
              setBase(compare);
              setCompare(base);
            }}
          >
            <Tooltip title="Swap baseline model">
              <SwapOutlined />
            </Tooltip>
          </Button>
          <Select
            value={compare}
            onChange={setCompare}
            placeholder="Compared model"
            style={{
              width: 150,
            }}
          >
            {models.map((model) => (
              <Select.Option key={model.id} value={model.id}>
                {model.name}
              </Select.Option>
            ))}
          </Select>
        </Space>
      }
    >
      {base && compare ? (
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
              baseData={results[base]}
              customData={results[compare]}
              percentiles={percentiles[compare]}
              reductionYear={modelsMap[compare].reduction_year}
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
              baseData={results[base]}
              customData={results[compare]}
              percentiles={percentiles[compare]}
              reductionYear={modelsMap[compare].reduction_year}
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
              baseData={results[base]}
              customData={results[compare]}
              percentiles={percentiles[compare]}
              reductionYear={modelsMap[compare].reduction_year}
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
              baseData={results[base]}
              customData={results[compare]}
              percentiles={percentiles[compare]}
              reductionYear={modelsMap[compare].reduction_year}
            />
          </Tabs.TabPane>
        </Tabs>
      ) : (
        <Empty
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          description="Select baseline and compared models on the top right"
        />
      )}
    </Card>
  );
};

export default connect(({ user }) => ({
  user: user.currentUser,
}))(GroupComparison);
