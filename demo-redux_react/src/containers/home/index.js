/**
 * Created by bips on 2017/09/21
 */
import React from 'react';
import {bindActionCreators} from 'redux';
import {Row, Col, Spin, Collapse, Alert,Form,notification} from 'antd';
import {connect} from 'react-redux';

import './index.less'

class Home extends React.Component {
    constructor() {
        super();
    }

    componentWillMount() {

    }

    render() {
        return (
             <div>
                我是首页
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

export default connect(mapStateToProps,mapDispatchToProps)(Home);
