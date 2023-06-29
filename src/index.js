import React from 'react';
import ReactDOM from 'react-dom/client';
import 'lib-flexible'

import './assets/reset.min.css'
import './index.less';

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
    <div>111</div>
);

