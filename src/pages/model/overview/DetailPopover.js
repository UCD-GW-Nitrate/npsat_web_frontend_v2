import React from 'react';
import { Card, Descriptions, Steps, Button, Tabs, Tooltip, notification, Space } from 'antd';
import {
  getModelsStatus,
  MODEL_STATUS_MACROS,
  DEPTH_RANGE_CONFIG,
  SCREEN_LENGTH_RANGE_CONFIG,
} from '@/services/model';
import CountyMap from '../../../components/Maps/CountyMap';
//import TableWrapper from './components/TableWrapper';
import styles from '../view/components/ModelDetail/index.less';
import AnchorTitle from '../../../components/AnchorTitle';



const detailPopover = (info) => {
 
    const {regions} = info;

    return (
        <div className={styles.main}>
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
                <Descriptions.Item label="is public model">
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

    {/* reserve the possibility to add map in the future  */}
            {/* <Card
            title={<AnchorTitle title="Region included in this model run" anchor="region-map" />}
            bordered={false}
            >
            {regions ? <CountyMap data={regions.map((region) => region.geometry)} /> : null}
            </Card> */}
        </div>
    );
    };

export default detailPopover;