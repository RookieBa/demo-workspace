import fetch from 'isomorphic-fetch';//考虑使用fetch
import * as Cookies from "js-cookie";
import {notification} from 'antd';
import { browserHistory } from 'react-router';

const methods = [
    'get',
    'head',
    'post',
    'put',
    'del',
    'options',
    'patch'
];

class _Api {
    constructor(opts) {
        this.opts = opts || {};

        if (!this.opts.baseURI)
            throw new Error('baseURI option is required');

        methods.forEach(method =>
            this[method] = (path, {params, data, callback, urlType} = {}) => new Promise((resolve, reject) => {
                let url = this.opts.baseURI + path;
                if (urlType){
                    url = this.opts[urlType+'BaseURI'] + path;
                }
                if (path.indexOf('http://') == 0){
                    url = path;
                }

                const opts = {
                    method: method,
                    mode: 'cors', // same-origin|no-cors（默认）|cors(允许不同域的请求，但要求有正确的CORs应答头信息，比如Access-Control-Allow-Origin)
                    credentials: 'omit'//omit（默认，不带cookie）|same-origin(同源带cookie)|include(总是带cookie)
                };
                if (this.opts.headers) {
                    opts.headers = this.opts.headers;
                }
                if (data){
                    opts.headers['Content-Type'] = 'application/json; charset=utf-8';
                    opts.body = JSON.stringify(data);
                }
                if (params) {
                    opts.headers['Content-Type'] = 'application/x-www-form-urlencoded';
                    let queryString = '';
                    for (const param in params){
                        const value = params[param];
                        if (value == null || value == undefined){
                            continue;
                        }
                        queryString += (param+'='+value+'&');
                    }
                    if (opts.method == 'get'){
                        if (url.indexOf('?') != -1){
                            url += ('&' + queryString);
                        }else{
                            url += ('?' + queryString);
                        }
                    }else{
                        opts.body = queryString;
                    }
                }
                const profile = Cookies.getJSON('profile');
                if (profile){
                    opts.headers['authentication'] = profile.code;
                }else{
                    //opts.headers['authentication'] = '';
                    delete opts.headers['authentication'];
                }
                fetch(url, opts).then(function (res) {
                    if(res.ok){
                        const auth = res.headers.get('authentication');
                        if (auth){
                            profile.code = auth;
                            Cookies.set('profile', profile);
                        }
                        return res.json().then(function(json) {
                            if (json.success) {
                                return resolve(json.result);
                            }else{
                                const error = {
                                    errorCode: json.errorCode,
                                    errorMsg: json.errorMsg
                                };
                                if (error.errorCode != '401'){
                                    notification.error({
                                        message: "出错啦",
                                        description: error.errorMsg,
                                        duration: 10
                                    });
                                }else{
                                    notification.error({
                                        message: "出错啦",
                                        description: "会话过期，系统即将跳转到登录界面",
                                        duration: 3,
                                        onClose: ()=>{
                                            Cookies.remove('uid');
                                            Cookies.remove('profile');
                                            //browserHistory.replace('/login');
                                            //location.href = '/login';
                                            location.replace('/login');
                                        }
                                    });
                                }
                                return reject(error);
                            }
                        })
                    }else {
                        const error = {
                            errorCode: res.status,
                            errorMsg: res.status + " - " + res.statusText + ", url=" + res.url
                        };
                        notification.error({
                            message: "出错啦",
                            description: error.errorMsg,
                            duration: 10
                        });
                        return reject(error);
                    }
                }).catch(function (error) {
                    const e = {
                        errorCode: -999,
                        //errorMsg: '连接远程服务器失败，url='+url
                        errorMsg: error+',url='+url
                    };
                    notification.error({
                        message: "出错啦",
                        description: e.errorMsg,
                        duration: 10
                    });
                    return reject(e);
                });
            })
        )
    }

}

const Api = _Api;

export default Api
