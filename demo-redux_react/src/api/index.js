import Api from './api';

const api = new Api({
    /*baseURI:process.env.baseURI,*/
    /*baseURI: 'http://10.10.169.202:11100/shjob',*/
    baseURI:'/',

    headers: {
        //'Accept': 'application/json',
        'Accept': '*/*',
        //'Content-Type': 'application/x-www-form-urlencoded'
        'Content-Type': 'application/json; charset=utf-8'
        //'x-access-token': window.localStorage.getItem('token')
    }
});

export default api;
