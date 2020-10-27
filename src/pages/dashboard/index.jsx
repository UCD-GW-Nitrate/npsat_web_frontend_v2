import React, { useState, useEffect } from 'react';
import { connect } from 'umi';
import { GridContent } from '@ant-design/pro-layout';
import { Row, Col, Tag, Tooltip, Card, Statistic, Divider } from 'antd';
import { getFeed } from '@/pages/dashboard/service';
import RecentModelTable from '@/pages/dashboard/components/RecentModelTable';
import styles from './index.less';

const Dashboard = ({ user }) => {
  const [data, setData] = useState({});
  const { token } = user;
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      fixed: 'left',
      render: (value, record) => (
        <Tooltip title="Check model details">
          <a href={`/model/view?id=${record.id}`}>{value}</a>
        </Tooltip>
      ),
    },
    {
      title: 'Description',
      dataIndex: 'description',
      ellipsis: true,
      width: 225,
    },
    // {
    //   title: 'Scenario',
    //   dataIndex: 'scenario',
    //   width: 150,
    //   render: s => s.name
    // },
    {
      title: 'Date Completed',
      dataIndex: 'date_completed',
      render: (value) => new Date(value).toLocaleString(),
      width: 200,
    },
  ];
  useEffect(() => {
    (async () => {
      const payload = await getFeed(token);
      setData(payload);
    })();
  }, []);
  return (
    <GridContent>
      <Row gutter={[24, 24]}>
        <Col xl={18} lg={24} md={24} sm={24} xs={24}>
          <Card title="Model scatter plot">

          </Card>
        </Col>
        <Col xl={6} lg={24} md={24} sm={24} xs={24}>
          <Card title="Model stats">
            <Statistic
              title={
                <>
                  Models created by you <Tag color="volcano">original</Tag>
                </>
              }
              value={data.total_created_number}
            />
            <Statistic
              title="Completed models created by you"
              value={data.total_completed_number}
            />
            <Divider />
            <Statistic
              title={
                <>
                  Public models <Tag color="blue">public</Tag>
                </>
              }
              value={data.total_public_number}
            />
            <Statistic title="Models published by you" value={data.total_published_number} />
          </Card>
        </Col>
      </Row>
      <Row gutter={[24, 24]}>
        <Col xl={12} lg={24} md={24} sm={24} xs={24}>
          <RecentModelTable
            data={data.recent_completed_models}
            title="Recently completed models"
            columns={columns}
            extra={<Tag color="#a0d911">completed</Tag>}
          />
        </Col>
        <Col xl={12} lg={24} md={24} sm={24} xs={24}>
          <RecentModelTable
            data={data.recent_published_models}
            title="Recently published models"
            columns={columns}
            extra={<Tag color="processing">public</Tag>}
          />
        </Col>
      </Row>
    </GridContent>
  );
};

export default connect(({ user }) => ({
  user: user.currentUser,
}))(Dashboard);
