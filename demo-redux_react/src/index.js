/**
 * Created by bips on 2017/09/21
 */
import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {Router, Route, IndexRedirect, useRouterHistory} from 'react-router';
import {createHistory} from 'history';
import configureStore from './store/configure-store';
import DevTools from "./tools/ReduxDevTools";

const history = useRouterHistory(createHistory)({basename: ''});
const store = configureStore();

const root = document.createElement('div');
document.body.appendChild(root);

const consoleFun = (oriConsoleFunc)=>function(str){
    if (process.env.NODE_ENV == 'development'){
        oriConsoleFunc.apply(console, arguments);
    }
}
console.log = consoleFun(console.log);
console.debug = consoleFun(console.debug);
console.info = consoleFun(console.info);

import App from './containers/app';
import Home from './containers/home';
import UserManage from './containers/user-manage';

ReactDOM.render(
    <div>
        <Provider store={store}>
            <Router history={history} onUpdate={() => window.scrollTo(0, 0)}>
                <Route path="/">
                    <IndexRedirect to="home"/>
                    <Route component={App}>
                        <Route name="首页" path="home" component={Home}/>
                        <Route name="用户管理" path="user-manage" component={UserManage}/>
                    </Route>
                </Route>
            </Router>
        </Provider>
        {process.env.NODE_ENV=='development'?(<DevTools store={store}/>):(<div/>)}
    </div>,
    root
);