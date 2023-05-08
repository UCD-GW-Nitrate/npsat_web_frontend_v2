import React, {useContext} from 'react';
import { connect } from 'react-redux';
import SearchTable from "@/components/Model/ModelList";
import { RouteContext } from '@ant-design/pro-layout';
import ModelAction from '@/components/Model/ModelList/ModelAction';

const SearchTableGroup = ({ user }) => {
  const { isMobile } = useContext(RouteContext);
  return (
    <SearchTable user = {user} modelAction={ModelAction.Group} isMobile={isMobile}/>
  );
};

export default connect(({ user }) => ({
  user: user.currentUser,
}))(SearchTableGroup);
