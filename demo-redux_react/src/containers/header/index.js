/**
 * Created by Administrator on 2017/9/22.
 */
import React,{ PropTypes, Component } from 'react';
import {Row, Col} from 'antd';

import './index.less';

export default class Header extends React.Component {
    constructor() {
        super();
        this.state = {

        }
    }

    render() {
        return (
            <Row type="flex"
                 align="middle"
                 justify="space-between"
                 className='layout-header'>
                <Col span={4}>
                    <img src="/assets/images/logo.png"/>
                </Col>

                <Col span={1}>
                    <img src="/assets/images/boy.svg"
                         alt="头像"
                         width='70%'/>
                </Col>
            </Row>
        )
    }
}

Header.propTypes = {

};

Header.defaultProps = {

};