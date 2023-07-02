import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
// antd-mobile
import { ConfigProvider } from "antd-mobile";
import zhCN from 'antd-mobile/es/locales/zh-CN'


// 改变rem换算比例
import 'lib-flexible'
import './index.less';

// REDUX
import { Provider } from 'react-redux';
import store from './store';
// 处理最大宽度
(function () {
    const handleMax = function () {
        let html = document.documentElement,
            root = document.querySelector('#root'),
            deviceW = html.clientWidth
        root.style.maxWidth = "750px"
        if (deviceW >= 750) {
            html.style.fontSize = '75px'
        }
    }
    handleMax()
    window.addEventListener('resize', handleMax)
})()




const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <ConfigProvider locale={zhCN}>
        <Provider store={store}>
            <App />
        </Provider>

    </ConfigProvider>
);

