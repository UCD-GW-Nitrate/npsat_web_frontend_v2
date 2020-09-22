import React, { useEffect, useState } from 'react';
import { useLocation, connect } from 'umi';
import NoFoundPage from '@/pages/404';
import { Tag, Tooltip } from 'antd';
import { getModelAndBaseModel } from '@/pages/results/service';
import BaseComparison from '@/pages/results/compare/components/results';
import SearchTable from '@/components/ModelList';

const ResultCompare = props => {
  const location = useLocation();
  const { user } = props;
  const { token } = user;
  const [ info, setInfo ] = useState({});
  const { id = null } = location.query;
  useEffect(() => {
    if (id === null) {
      return;
    }
    (async () => {
      const model = await getModelAndBaseModel( { id }, token);
      if (typeof model === "string" && model.startsWith("ERROR")) {
        setInfo({ error: model });
        return true;
      } else {
        setInfo(model);
        return false;
      }
    })();
  }, [id]);

  if (!id) {
    return (
      <SearchTable
        subTitle={<span>Compare completed custom model with base model under same scenario</span>}
        columns={[
          {
            title: 'Name',
            dataIndex: 'name',
            fixed: 'left'
          },
          {
            title: 'Description',
            dataIndex: 'description',
            ellipsis: true,
            width: 250
          },
          {
            title: 'Scenario',
            dataIndex: 'scenario_name',
          },
          {
            title: 'Reduction year',
            dataIndex: 'reduction_year'
          },
          {
            title: 'Water content',
            dataIndex: 'water_content',
            render: value => `${value * 100}%`
          },
          {
            title: 'Date Created',
            dataIndex: 'date_submitted',
            sorter: (a, b) => new Date(a.date_submitted) > new Date(b.date_submitted),
            render: value => new Date(value).toLocaleString()
          },
          {
            title: 'Date Completed',
            dataIndex: 'date_completed',
            sorter: (a, b) => new Date(a.date_completed) > new Date(b.date_completed),
            render: value => new Date(value).toLocaleString()
          },
          {
            title: 'Types',
            key: 'tags',
            dataIndex: 'tags',
            render: (tags, record) => (
              <span>
        {tags.map(tag => {
          let color;
          let title;
          switch (tag) {
            default:
            case "original":
              color = "volcano";
              title = "created by you"
              break;
            case "public":
              color = "geekblue"
              title = "accessible by everyone"
              break;
            case "base":
              color = "green"
              title = `base model of ${record.scenario.name}`
          }
          return (
            <Tooltip title={title} key={record.key + tag}>
              <Tag color={color} key={tag}>
                {tag}
              </Tag>
            </Tooltip>
          );
        })}
        </span>
            )
          },
          {
            title: 'Action',
            dataIndex: 'option',
            valueType: 'option',
            fixed: 'right',
            render: (_, record) => (
              !record.isBase ?
              <Tooltip
                title={`Compare with base model of scenario ${record.scenario.name}`}
              >
                <a
                  href={`/charts/compare?id=${record.id}`}
                >
                  Compare
                </a>
              </Tooltip>
                :
                <Tooltip
                  title="Base model cannot compare with itself, check its detail instead"
                >
                  <a
                    href={`/model/view?id=${record.id}`}
                  >
                    Details
                  </a>
                </Tooltip>
            ),
          },
        ]}
      />
    );
  } else if (info.error) {
    return (
      <NoFoundPage
        subTitle={`The model id with ${id} inaccessible`}
        title="The model you look for is private or cannot be found"
        redirection="/model/overview"
        buttonText="Select model"
      />
    )
  } else {
    return <BaseComparison info={info} />;
  }
}

export default connect(({ user }) => ({
  user: user.currentUser
}))(ResultCompare);
