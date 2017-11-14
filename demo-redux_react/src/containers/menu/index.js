/**
 * Created by Administrator on 2017/9/22.
 */
import React,{ PropTypes, Component } from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import {Menu, Icon} from 'antd';
import 'pubsub-js';

import './index.less';
import {getMenu} from './actions/menu-action';
import {findMenuByKey} from './utils';

const SubMenu = Menu.SubMenu;

class JobMenu extends React.Component {
    constructor() {
        super();
        this.state = {

        }
    }

    componentDidMount() {
        this.props.getMenu();
    }

    getMenuTitle(icon,name){
        return(
            <span>
                {
                    icon?<Icon type={icon} />:null
                }
                <span>{name}</span>
            </span>
        )
    }

    getMenuItems(menuInfo){
        return menuInfo.map((item)=>{
            if(item.isLeaf == 0){
                return (
                    <SubMenu key={item.id}
                              title={this.getMenuTitle(item.icon,item.name)}>
                        {this.getMenuItems(item.subMenu)}
                    </SubMenu>
                );
            }else {
                return (
                    <Menu.Item
                        key={item.id}
                    >
                        <Link to={item.link}>
                            {this.getMenuTitle(item.icon,item.name)}
                        </Link>
                    </Menu.Item>
                );
            }
        })
    }

    handleClick(e){
        const {menuInfo} = this.props;
        const menuResult = menuInfo?menuInfo.result?menuInfo.result:[]:[];

        const currentMenu = findMenuByKey(e.key,menuResult);
        PubSub.publish("onSelectMenu",{currentMenu:currentMenu});
    }

    render() {
        const {menuInfo,currentMenu} = this.props;

        const menuResult = menuInfo?menuInfo.result?menuInfo.result:[]:[];
        const selectedKeys = currentMenu?[currentMenu.id.toString()]:[''];
        const defaultOpenKeys = currentMenu?
            currentMenu.parentId==0?[currentMenu.id.toString()]:[currentMenu.parentId.toString()]:[''];

        return (
            <div className="ant-layout-sider">
                {
                    (currentMenu)?
                        <Menu
                            mode="inline"
                            selectedKeys={selectedKeys}
                            defaultOpenKeys={defaultOpenKeys}
                            onClick={this.handleClick.bind(this)}
                        >
                            {this.getMenuItems(menuResult)}
                        </Menu>:null
                }
            </div>
        )
    }
}

JobMenu.propTypes = {

};

JobMenu.defaultProps = {

};

JobMenu.contextTypes = {
    history: PropTypes.object.isRequired,
    router: PropTypes.object.isRequired,
    store: PropTypes.object.isRequired
};

function mapStateToProps(state) {
    return {
        menuInfo:state.menuReducer.menuInfo,
        currentMenu:state.menuReducer.currentMenu,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getMenu: bindActionCreators(getMenu, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(JobMenu);