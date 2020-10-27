import React, { useState, useEffect } from 'react';
import { connect } from 'umi';
import { GridContent } from '@ant-design/pro-layout';
import { Row, Col, Tag } from 'antd';
import { getFeed } from '@/pages/dashboard/service';
import RecentModelTable from '@/pages/dashboard/components/RecentModelTable';


const Dashboard = ({ user }) => {
  const [data, setData] = useState({});
  const { token } = user;
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      fixed: 'left',
      ellipsis: true,
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
      width: 200
    },
  ];
  useEffect(() => {
    (async () => {
      const payload = await getFeed(token);
      setData(payload);
    })();
  })
  return (
    <GridContent>
      <Row>

      </Row>
      <Row
        gutter={24}
      >
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
            extra={<Tag color="#1890ff">public</Tag>}
          />
        </Col>
      </Row>
    </GridContent>
  );
};

export default connect(({ user }) => ({
  user: user.currentUser,
}))(Dashboard);
