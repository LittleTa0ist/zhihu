import _ from '../assets/utils'
import qs from 'qs';
import { Toast } from 'antd-mobile';

const http = function http(config) {
    // 初始化配置项以及校验
    if (!_.isPlainObject(config)) config = {}
    config = Object.assign({
        url: '',
        method: 'GET',
        credentials: 'include',
        headers: null,
        body: null,
        params: null,
        responseType: 'json',
        signal: null
    }, config)
    if (!config.url) throw new TypeError('url must be required')
    if (!_.isPlainObject(config.headers)) config.headers = {}
    if (config.params !== null && !_.isPlainObject(config.params)) config.params = null
    // 处理各种细节
    let { url, method, credentials, headers, body, params, responseType, signal } = config

    // 处理问号传参
    if (params) {
        url += `${url.includes('?') ? '&' : '?'}${qs.stringify(params)}`
    }

    // 处理请求体，如果传递的是一个普通对象，我们要把其设置为urlencoded格式
    if (_.isPlainObject(body)) {
        body = qs.stringify(body)
        headers['Content-Type'] = 'application/x-www-form-urlencoded'
    }

    // 处理token
    // 类似于axios中的请求拦截器：每一个请求，送给服务器相同的内容可以在这里处理
    let token = _.storage.get('tk'),
        safeList = ['/user_info', '/user_update', '/store', '/store_remove', '/store_list'];

    if (token) {
        let reg = /\/api(\/[^?#]+)/,
            [, $1] = reg.exec(url) || []
        let isSafe = safeList.some(item => item === $1)
        if (isSafe) headers['authorization'] = token
    }


    // 发送请求
    method = method.toUpperCase()
    config = {
        method,
        credentials,
        headers,
        cache: 'no-cache',
        signal
    }

    if (/^(POST|PUT|PATCH)$/i.test(method) && body) config.body = body
    return fetch(url, config)
        .then(res => {
            let { status, statusText } = res
            if (/^(2|3)\d{2}$/.test(status)) {
                // 请求成功，根据预设的responseType进行处理
                let result
                switch (responseType.toLowerCase()) {
                    case 'text':
                        result = res.text()
                        break;
                    case 'arraybuffer':
                        result = res.arrayBuffer()
                        break;
                    case 'blob':
                        result = res.blob()
                        break;
                    default:
                        result = res.json()
                }
                return result
            }
            return Promise.reject({
                code: -100,
                status,
                statusText
            })
        })
        .catch(reason => {
            Toast.show({
                icon: 'fail',
                content: '网络繁忙，请稍后再试！'
            })
            return Promise.reject(reason)
        })

};

// 在使用[1,2,3,4,5,6]这种方式开头使用数组时，之前必须加上;
// 注意学习js必须加;的几种情况
/* 快捷方法 */
["GET", "HEAD", "DELETE", "OPTIONS"].forEach(item => {
    http[item.toLowerCase()] = function (url, config) {
        if (!_.isPlainObject(config)) config = {};
        config['url'] = url;
        config['method'] = item;
        return http(config);
    };
});


["POST", "PUT", "PATCH"].forEach(item => {
    http[item.toLowerCase()] = function (url, body, config) {
        if (!_.isPlainObject(config)) config = {};
        config['url'] = url;
        config['method'] = item;
        config['body'] = body;
        return http(config);
    };
});

export default http;