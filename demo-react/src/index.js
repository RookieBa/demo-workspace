import React from 'react';
import ReactDOM from 'react-dom';
import {Provider, connect} from 'react-redux';
import {createStore, combineReducers, applyMiddleware} from 'redux';
import { Router, Route, Redirect, IndexRoute, browserHistory, hashHistory } from 'react-router';
import './index.css';
import App from './App';
import HelloMessage from "./components/HelloMessage";
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
ReactDOM.render(<HelloMessage name="bawy"/>, document.getElementById('test'));
registerServiceWorker();
