import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Anchor, Card, Select, Tabs, Tooltip, Space, Button, Empty, Spin } from 'antd';
import ProTable, { ConfigProvider, enUSIntl } from '@ant-design/pro-table';
import React, { useEffect, useState } from 'react';
import { getModelResults } from '@/pages/model/view/service';
import { isObjectEmpty, ordinalSuffix } from '@/utils/utils';
import { connect } from 'umi';
import { InfoCircleOutlined, SwapOutlined, SelectOutlined } from '@ant-design/icons';
import AnchorTitle from '@/components/AnchorTitle';
import DifferenceHistogram from '@/components/Plots/BizCharts/DifferenceHistogram/dynamic';
import ComparisonLinePlot from '@/components/Plots/BizCharts/ComparisonLinePlot/dynamic';
import DifferenceHeatmap from '@/components/Plots/BizCharts/DifferenceHeatmap';
import CropTable from '@/pages/results/components/CropTable';
import ThresholdHeatmap from '@/components/Plots/BizCharts/ThresholdHeatmap/dynamic';
import GroupComparisonLinePlot from '@/components/Plots/BizCharts/GroupComparisonLinePlot/dynamic';
import styles from './style.less';

const GroupComparison = ({ models, user, hash }) => {
  const { token } = user;
  const [results, setResults] = useState({});
  const [percentiles, setPercentiles] = useState({});
  const [completedModels, setCompletedModels] = useState([]);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const availableModels = [];
    const availableResults = {};
    const availablePercentiles = {};
    models.forEach((model) => {
      if (model && model.results && model.results.length > 0) {
        availableModels.push(model);
      }
    });
    Promise.all(
      availableModels.map((model) => {
        return Promise.all(
          model.results.map((percentile) => getModelResults(percentile.id, token)),
        );
      }),
    ).then((data) => {
      availableModels.forEach((model, index) => {
        const modelData = data[index];
        const modelResults = {};
        modelData.forEach((percentile) => {
          modelResults[percentile.percentile] = percentile.values.map((value, i) =>
            // start year is always 1945
            ({
              year: 1945 + i,
              value,
              percentile: `${ordinalSuffix(percentile.percentile)} percentile`,
            }),
          );
        });
        availableResults[model.id] = modelResults;
        availablePercentiles[model.id] = modelData.map((percentile) => percentile.percentile);
      });
      setReady(true);
      setResults(availableResults);
      setPercentiles(availablePercentiles);
      setCompletedModels(availableModels);
    });
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
      title="Group models comparison"
      subTitle="Compare selected models together"
      // content={
      //   <Anchor affix={false}>
      //     <Anchor.Link href="#settings" title="Model settings" />
      //     <Anchor.Link href="#crops" title="Crop selection" />
      //     <Anchor.Link href="#results-pair" title="Results comparison in pairs" />
      //     <Anchor.Link href="#results-group" title="Results comparison in group" />
      //   </Anchor>
      // }
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
                  title: 'BAU',
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
                  title: 'Well Type Scenario',
                  dataIndex: 'welltype_scenario',
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
                  render: (value) => value || 'Not completed',
                },
                {
                  title: 'Year range',
                  dataIndex: 'sim_end_year',
                  render: (value) => `1945 - ${value}`,
                  width: 100,
                },
                {
                  title: 'Implementation start year',
                  dataIndex: 'reduction_start_year',
                },
                {
                  title: 'Implementation complete year',
                  dataIndex: 'reduction_end_year',
                },
                {
                  title: 'Water content',
                  dataIndex: 'water_content',
                  render: (value) => `${(value * 100).toFixed(0)}%`,
                },
                {
                  title: 'Date Created',
                  dataIndex: 'date_submitted',
                  sorter: (a, b) => new Date(a.date_submitted) > new Date(b.date_submitted),
                  valueType: 'dateTime',
                },
                {
                  title: 'Date Completed',
                  dataIndex: 'date_completed',
                  sorter: (a, b) => new Date(a.date_completed) > new Date(b.date_completed),
                  valueType: 'dateTime',
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
        {ready ? (
          <>
            <ResultComparisonInPairs
              models={completedModels}
              results={results}
              percentiles={percentiles}
            />
            <ResultComparisonInGroup
              models={completedModels}
              results={results}
              percentiles={percentiles}
            />
          </>
        ) : (
          <Spin />
        )}
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
              additionalInfo={{
                reduction_start_year: modelsMap[compare].reduction_start_year,
                reduction_end_year: modelsMap[compare].reduction_end_year,
                is_base: modelsMap[compare].is_base,
              }}
            />
          </Tabs.TabPane>
          <Tabs.TabPane
            tab={
              <Tooltip title="Reduction in nitrate concentration under the custom scenario, relative to the BAU scenario. Note that positive numbers indicate a reduction, while negative numbers indicate an increase in concentration under the custom scenario (the increase is a negative reduction)">
                Difference histogram <InfoCircleOutlined />
              </Tooltip>
            }
            key="DH"
          >
            <DifferenceHistogram
              baseData={results[base]}
              customData={results[compare]}
              percentiles={percentiles[compare]}
              additionalInfo={{
                reduction_start_year: modelsMap[compare].reduction_start_year,
                reduction_end_year: modelsMap[compare].reduction_end_year,
                is_base: modelsMap[compare].is_base,
              }}
            />
          </Tabs.TabPane>
          <Tabs.TabPane
            tab={
              <Tooltip title="Aggregated (i.e., average) reduction in nitrate concentration over the selected period under the custom scenario, relative to the BAU scenario. Note that positive numbers indicate a reduction, while negative numbers indicate an increase in concentration under the custom scenario (the increase is a negative reduction)">
                Threshold heatmap <InfoCircleOutlined />
              </Tooltip>
            }
            key="THP"
          >
            <ThresholdHeatmap
              baseData={results[base]}
              customData={results[compare]}
              percentiles={percentiles[compare]}
              additionalInfo={{
                reduction_start_year: modelsMap[compare].reduction_start_year,
                reduction_end_year: modelsMap[compare].reduction_end_year,
                is_base: modelsMap[compare].is_base,
              }}
            />
          </Tabs.TabPane>
          <Tabs.TabPane
            tab={
              <Tooltip title="Aggregated (i.e., average) reduction in nitrate concentration over the selected period under the custom scenario, relative to the BAU scenario. Note that positive numbers indicate a reduction, while negative numbers indicate an increase in concentration under the custom scenario (the increase is a negative reduction)">
                Difference heatmap <InfoCircleOutlined />
              </Tooltip>
            }
            key="DHP"
          >
            <DifferenceHeatmap
              baseData={results[base]}
              customData={results[compare]}
              percentiles={percentiles[compare]}
              additionalInfo={{
                reduction_start_year: modelsMap[compare].reduction_start_year,
                reduction_end_year: modelsMap[compare].reduction_end_year,
                is_base: modelsMap[compare].is_base,
              }}
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

const ResultComparisonInGroup = ({ models, results, percentiles }) => {
  const [chosenModels, setChosenModels] = useState([]);
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
      title={<AnchorTitle anchor="results-group" title="Results comparison in group" />}
      extra={
        <Space align="baseline">
          <Select
            value={chosenModels}
            showArrow
            mode="multiple"
            onChange={setChosenModels}
            placeholder="Select models to compare"
            style={{
              width: 300,
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
              setChosenModels(models.map((m) => m.id));
            }}
          >
            <Tooltip title="Select all completed models">
              <SelectOutlined />
            </Tooltip>
          </Button>
        </Space>
      }
    >
      {chosenModels.length > 0 && !isObjectEmpty(results) ? (
        <Tabs tabPosition="top" centered>
          <Tabs.TabPane tab="Comparison Line Plot" key="GCLP">
            <GroupComparisonLinePlot
              percentiles={percentiles[chosenModels[0]]}
              models={chosenModels.reduce((acc, cur) => [...acc, modelsMap[cur]], [])}
              results={chosenModels.reduce((acc, cur) => ({ ...acc, [cur]: results[cur] }), {})}
            />
          </Tabs.TabPane>
        </Tabs>
      ) : (
        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="Select models on the top right" />
      )}
    </Card>
  );
};

export default connect(({ user }) => ({
  user: user.currentUser,
}))(GroupComparison);
