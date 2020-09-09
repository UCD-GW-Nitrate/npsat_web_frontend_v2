import { Button, Result } from 'antd';
import React from 'react';
import { history } from 'umi';

const NoFoundPage = ({
  redirection = '/',
  title = '404',
  subTitle = "Sorry, the page you visited does not exist.",
  buttonText = "Back Home"
}) => (
  <Result
    status="404"
    title={title}
    subTitle={subTitle}
    extra={
      <Button type="primary" onClick={() => history.push(redirection)}>
        {buttonText}
      </Button>
    }
  />
);

export default NoFoundPage;
