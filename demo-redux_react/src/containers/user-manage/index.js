/**
 * Created by Administrator on 2017/9/25.
 */
import React from 'react';
import {bindActionCreators} from 'redux';
import {} from 'antd';
import {connect} from 'react-redux';

class UserManage extends React.Component {
    constructor() {
        super();
    }

    componentWillMount() {

    }

    render() {
        return (
            <div>
                我是用户管理页面
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {

    }
}

function mapDispatchToProps(dispatch){
    return{

    }
}

export default connect(mapStateToProps,mapDispatchToProps)(UserManage);