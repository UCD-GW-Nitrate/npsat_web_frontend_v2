import React, { useContext, useEffect, useState } from 'react';
import { PageHeaderWrapper, RouteContext } from '@ant-design/pro-layout';
import { Card, Descriptions, Steps, Button, Tabs, Tooltip, notification, Space } from 'antd';
import classNames from 'classnames';
import { history } from 'umi';
import MultilinePlot from '@/components/Plots/BizCharts/MultilinePlot/dynamic';
import AreaPlot from '@/components/Plots/BizCharts/AreaPlot/dynamic';
import BoxPlot from '@/components/Plots/BizCharts/BoxPlot/dynamic';
import {
  getModelsStatus,
  MODEL_STATUS_MACROS,
  DEPTH_RANGE_CONFIG,
  SCREEN_LENGTH_RANGE_CONFIG,
} from '@/services/model';
import { useModelRegions, useModelResults } from '@/hooks/model';
import areaPerCrop from '@/pages/model/logic/CropAreas/areaPerCrop';
import CountyMap from '../../../../../components/Maps/CountyMap';
import TableWrapper from './components/TableWrapper';
import styles from './index.less';
import AnchorTitle from '../../../../../components/AnchorTitle';

const { Step } = Steps;

/**
 * @param token the token provided by the user
 * @param user info on the user that is logged in
 * @param hash the hash property of the current url
 * @param info the parameters of a model retrieved from /pages/model/view/service#getModelDetail
 * @param publish callback function for publishing the model
 * @returns 
 */
const ModelDetail = ({ token, user, hash, info, publish }) => {
  const { user_id: userId } = user;
  const regions = useModelRegions(info.regions);
  const [plotData, percentiles] = useModelResults(info.results, token);
  const [crop, setCrop] = useState([]);
  const [loading, setLoading] = useState(true);
  const [publishLoading, setPublishLoading] = useState(false);
  const [progress, setProgress] = useState({});
  const { isMobile } = useContext(RouteContext);
  const load_scenario = info.flow_scenario.scenario_type;// load_scenario type was assigned to flow_scenario, needs to be fixed 
  const mapType = info.regions[0].region_type;

  const getRegions = (regions) => {
    const regionNames = [];
    regions.forEach((region) => {
      regionNames.push(region.mantis_id);
    });
    return regionNames;
  };

  const getCrops = (modifications) => {
    const cropCAML = [];
    modifications.forEach((m) => {
      cropCAML.push(m.crop.caml_code);
    });
    return cropCAML;
  };

  useEffect(() => {
    if (info.modifications) {
      const cropAreas = areaPerCrop(getCrops(info.modifications), getRegions(info.regions), mapType, load_scenario);
      const crops = info.modifications.map((item) => ({
        ...item,
        ...item.crop,
        area: cropAreas[item.crop.caml_code ? item.crop.caml_code : 0],
      }));
      setCrop(crops);
      setLoading(false);
    }
    console.log("model detail log");
  }, [info]);
  // scroll into view if the requested url contains an anchor only when first loading
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
  // periodic fetch model status to see if a refresh is required
  useEffect(() => {
    let interval;
    if (
      info.status &&
      info.status !== MODEL_STATUS_MACROS.COMPLETED &&
      info.status !== MODEL_STATUS_MACROS.ERROR
    ) {
      interval = setInterval(() => {
        getModelsStatus({ ids: info.id }, user).then(({ results }) => {
          // there is a status update
          if (results[0].status !== info.status) {
            // prompt user to refresh the screen and clear the interval
            notification.info({
              message: 'Scenario Status Update',
              description:
                "Currently viewing scenario status has been updated. Click 'Refresh' to" +
                ' see the new status and results.',
              btn: (
                <Button onClick={() => window.location.reload()} type="primary" size="small">
                  Refresh
                </Button>
              ),
              duration: 0,
            });
            clearInterval(interval);
          }
          // do nothing otherwise, keep fetching
        });
      }, 5000);
    }
    return () => {
      // clear interval if it hasn't been or not initialized
      if (interval) {
        clearInterval(interval);
      }
    };
  }, []);
  const desc1 = (
    <div className={classNames(styles.textSecondary, styles.stepDescription)}>
      {info.date_submitted ? new Date(info.date_submitted).toLocaleString() : ''}
    </div>
  );
  const desc2 = info.date_completed ? (
    <div className={classNames(styles.textSecondary, styles.stepDescription)}>
      {new Date(info.date_completed).toLocaleString()}
    </div>
  ) : null;
  useEffect(() => {
    if (!info) {
      setProgress({
        status: 'wait',
        current: MODEL_STATUS_MACROS.NOT_READY,
      });
    } else if (info.status === MODEL_STATUS_MACROS.ERROR) {
      setProgress({
        status: 'error',
        current: MODEL_STATUS_MACROS.RUNNING,
      });
    } else if (info.status === MODEL_STATUS_MACROS.RUNNING) {
      setProgress({
        status: 'process',
        current: info.status,
      });
    } else {
      setProgress({
        status: 'finish',
        current: info.status,
      });
    }
  }, [info]);
  return (
    <PageHeaderWrapper subTitle="The complete information of scenario.">
      <div className={styles.main}>
        <Card
          title={<AnchorTitle title="Scenario info" anchor="info" />}
          bordered={false}
          style={{
            marginBottom: 32,
          }}
          extra={
            <Space>
              <Tooltip title="Copy and modify these scenario presets to create another scenario">
                <Button
                  onClick={() => {
                    history.push({
                      pathname: '/model/modify',
                      query: {
                        id: info.id,
                      },
                    });
                  }}
                >
                  Copy & modify this scenario
                </Button>
              </Tooltip>
              <Tooltip title="Only scenario creator can publish/un-publish the scenario">
                <Button
                  type="primary"
                  disabled={userId !== info.user}
                  loading={publishLoading}
                  onClick={() => {
                    setPublishLoading(true);
                    publish(info).then(() => setPublishLoading(false));
                  }}
                >
                  {info.public ? 'Make scenario private' : 'Share scenario publicly'}
                </Button>
              </Tooltip>
            </Space>
          }
        >
          <Descriptions bordered column={{ xxl: 4, xl: 3, lg: 3, md: 2, sm: 1, xs: 1 }}>
            <Descriptions.Item label="Scenario name">{info.name}</Descriptions.Item>
            <Descriptions.Item label="Date created">
              {info.date_submitted ? new Date(info.date_submitted).toLocaleString() : ''}
            </Descriptions.Item>
            <Descriptions.Item label="Date completed">
              {info.date_completed
                ? new Date(info.date_completed).toLocaleString()
                : 'not yet completed'}
            </Descriptions.Item>
            <Descriptions.Item label="Stimulation end year">{info.sim_end_year}</Descriptions.Item>
            <Descriptions.Item label="Implementation start year">
              {info.reduction_start_year}
            </Descriptions.Item>
            <Descriptions.Item label="Implementation complete year">
              {info.reduction_end_year}
            </Descriptions.Item>
            <Descriptions.Item label="Flow Scenario">
              {info.flow_scenario ? info.flow_scenario.name || '' : ''}
            </Descriptions.Item>
            <Descriptions.Item label="Load Scenario">
              {info.load_scenario ? info.load_scenario.name || '' : ''}
            </Descriptions.Item>
            <Descriptions.Item label="Well Type Scenario">
              {info.welltype_scenario ? info.welltype_scenario.name || '' : ''}
            </Descriptions.Item>
            <Descriptions.Item label="Unsat Scenario">
              {info.unsat_scenario ? info.unsat_scenario.name || '' : ''}
            </Descriptions.Item>
            <Descriptions.Item label="Water content">
              {`${(info.water_content * 100).toFixed(0)}%`}
            </Descriptions.Item>
            <Descriptions.Item label="is public scenario">
              {info.public ? 'yes' : 'no'}
            </Descriptions.Item>
            <Descriptions.Item label="is BAU">{info.is_base ? 'yes' : 'no'}</Descriptions.Item>
            <Descriptions.Item label="Number of wells detected in selected region(s)">
              {info.n_wells || 'scenario run not yet complete'}
            </Descriptions.Item>
            <Descriptions.Item label="Status message" span={3}>
              {info.status_message || 'no message'}
            </Descriptions.Item>
            <Descriptions.Item label="Scenario description" span={3}>
              {info.description || 'no description'}
            </Descriptions.Item>
            <Descriptions.Item label="Region(s)" span={3}>
              {regions.map((region) => region.name).join(', ') || ''}
            </Descriptions.Item>
            {info.applied_simulation_filter ? (
              <>
                <Descriptions.Item label="Depth range" span={1.5}>{`${info.depth_range_min} ~ ${
                  // intentionally using "==" instead of "===" to compare float and string
                  info.depth_range_max == DEPTH_RANGE_CONFIG.max + 1 ? 'max' : info.depth_range_max
                }`}</Descriptions.Item>
                <Descriptions.Item label="Screen length range" span={1.5}>{`${
                  info.screen_length_range_min
                } ~ ${
                  // intentionally using "==" instead of "===" to compare float and string
                  info.screen_length_range_max == SCREEN_LENGTH_RANGE_CONFIG.max + 1
                    ? 'max'
                    : info.screen_length_range_max
                }`}</Descriptions.Item>
              </>
            ) : null}
          </Descriptions>
        </Card>

        <Card
          title={<AnchorTitle title="Scenario progress" anchor="progress" />}
          style={{
            marginBottom: 32,
          }}
          bordered={false}
        >
          <Steps direction={isMobile ? 'vertical' : 'horizontal'} {...progress}>
            <Step title="Scenario created" description={desc1} />
            <Step title="In queue" />
            <Step title="Running" />
            <Step title="Completed" description={desc2} />
          </Steps>
        </Card>

        {percentiles.length === 0 ? null : (
          <Card
            title={<AnchorTitle title="Run results" anchor="results" />}
            bodyStyle={{ paddingTop: 10 }}
            style={{
              marginBottom: 32,
            }}
            bordered={false}
            extra={
              <Tooltip
                title={() => {
                  if (info.status !== 3) {
                    return "Scenario hasn't finished running";
                  } if (info.is_base) {
                    return 'Select another scenario to be compared with BAU';
                  } 
                  return 'Compare this scenario with BAU results';
                  
                }}
              >
                <Button
                  type="link"
                  disabled={info.status !== 3 || info.is_base}
                  onClick={() => {
                    history.push({
                      pathname: '/compare/BAU',
                      query: {
                        id: info.id,
                      },
                    });
                  }}
                >
                  Compare with BAU run
                </Button>
              </Tooltip>
            }
          >
            <Tabs tabPosition="top" centered>
              <Tabs.TabPane tab="Line Plot" key="LP">
                <MultilinePlot
                  percentiles={percentiles}
                  data={plotData}
                  additionalInfo={{
                    reduction_start_year: info.reduction_start_year,
                    reduction_end_year: info.reduction_end_year,
                    is_base: info.is_base,
                  }}
                />
              </Tabs.TabPane>
              <Tabs.TabPane tab="Area Plot" key="AP">
                <AreaPlot
                  percentiles={percentiles}
                  data={plotData}
                  additionalInfo={{
                    reduction_start_year: info.reduction_start_year,
                    reduction_end_year: info.reduction_end_year,
                    is_base: info.is_base,
                  }}
                />
              </Tabs.TabPane>
              <Tabs.TabPane tab="Box Plot" key="BP">
                <BoxPlot
                  percentiles={percentiles}
                  data={plotData}
                  additionalInfo={{
                    reduction_start_year: info.reduction_start_year,
                    reduction_end_year: info.reduction_end_year,
                    is_base: info.is_base,
                  }}
                />
              </Tabs.TabPane>
            </Tabs>
          </Card>
        )}

        <Card
          title={<AnchorTitle title="Crop loading details" anchor="crop-details" />}
          bordered={false}
          style={{
            marginBottom: 32,
          }}
        >
          <TableWrapper data={crop} loading={loading} />
        </Card>

        <Card
          title={<AnchorTitle title="Region included in this scenario run" anchor="region-map" />}
          bordered={false}
        >
          {regions ? <CountyMap data={regions.map((region) => region.geometry)} /> : null}
        </Card>
      </div>
    </PageHeaderWrapper>
  );
};

export default ModelDetail;
