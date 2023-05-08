import React, {useContext} from 'react';
import { connect } from 'react-redux';
import SearchTable from "@/components/Model/ModelList";
import { RouteContext } from '@ant-design/pro-layout';

const SearchTableModify = ({ user }) => {
  const { isMobile } = useContext(RouteContext);
  return (
    <SearchTable user = {user} isEditing isMobile={isMobile}/>
  );
};

export default connect(({ user }) => ({
  user: user.currentUser,
}))(SearchTableModify);
