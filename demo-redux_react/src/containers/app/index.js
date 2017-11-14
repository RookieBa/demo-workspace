/**
 * Created by bips on 2017/09/21
 */
import React, {PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Affix,Row,Col,Tabs } from 'antd';
import 'pubsub-js';

import './index.less';
import Header from '../header';
import JobMenu from '../menu';
import Home from '../home';

import {findMenuByPath} from '../menu/utils';
import {setCurrentMenu} from '../menu/actions/menu-action';

const TabPane = Tabs.TabPane;

class App extends React.Component {
    constructor(props) {
        super(props);
        this.newTabIndex = 0;
        this.state={
            panes:[],
        }
    }

    componentWillMount() {

    }

    componentDidMount() {
        PubSub.subscribe("onSelectMenu",this.refreshTabPanel.bind(this));
    }

    componentWillUnmount() {

    }

    componentWillReceiveProps(nextProps){
        const {menuInfo} = this.props;
        if(nextProps.menuInfo && menuInfo
            && nextProps.menuInfo.result
            && nextProps.menuInfo.result!=menuInfo.result){
            const menuItems = nextProps.menuInfo.result;
            const currentMenu = findMenuByPath(window.location.pathname,menuItems);
            this.addTabPanel(currentMenu);
            this.props.setCurrentMenu(currentMenu);
        }
    }

    addTabPanel(currentMenu){
        const panes = this.state.panes;
        const activeKey = `newTab${this.newTabIndex++}`;
        panes.push({ title: currentMenu.name, content: this.props.children, key: activeKey });
        this.setState({ panes, activeKey });
    }

    refreshTabPanel(msg,data){
        const currentMenu = data.currentMenu;

        this.addTabPanel(currentMenu);
    }

    render() {

        return (
            <div className="ant-layout-aside">
                <Affix >
                    <Header />
                </Affix>

                <div className="ant-layout-main" >
                    <Row >
                        <Col span={4}>
                            <JobMenu />
                        </Col>
                        <Col span={20} className="ant-layout-main-children">
                            <Tabs
                                activeKey={this.state.activeKey}
                            >
                                {this.state.panes.map(pane => <TabPane tab={pane.title} key={pane.key} closable={pane.closable}>{pane.content}</TabPane>)}
                            </Tabs>
                        </Col>
                    </Row>
                </div>
            </div>
        );
    }
}

App.propTypes = {

};

App.contextTypes = {
    history: PropTypes.object.isRequired,
    router: PropTypes.object.isRequired,
    store: PropTypes.object.isRequired
};

function mapStateToProps(state) {
    return {
        menuInfo:state.menuReducer.menuInfo,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        setCurrentMenu: bindActionCreators(setCurrentMenu, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);