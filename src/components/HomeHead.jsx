import React, { useMemo, useEffect } from 'react'
// jsx不能直接写图片的相对地址，不然打包后，地址会发生变化
// 1.可以使用http://...这么部署在服务器上的图片地址
// 2.可以使用es6 module导出的图片
import timeg from '../assets/images/timg.jpg'
import './HomeHead.less'
import { connect } from 'react-redux';
import action from '../store/action';
import { useNavigate } from 'react-router-dom';
function HomeHead(props) {
    let { today, info, queryUserInfoAsync } = props;
    const navigate = useNavigate()
    let time = useMemo(() => {
        let [, month, day] = today.match(/^\d{4}(\d{2})(\d{2})$/),
            area = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九', '十', '十一', '十二'];
        return {
            day,
            month: area[+month]
        }
    }, [today])
    // 第一次渲染完：如果info没有信息，则派发一次尝试获取登录者信息
    useEffect(() => {
        if (!info) {
            queryUserInfoAsync()
        }
    }, []);

    return (
        <div className='HomeHead_box'>
            <div className="info">
                <div className="time">
                    <span>{time.day}</span>
                    <span>{time.month}月</span>
                </div>
                <h2 className="title">
                    知乎日报
                </h2>
            </div>


            <div className="picture" onClick={() => navigate('/personal')}>
                <img src={info ? info.pic : timeg} alt="" />
            </div>
        </div>
    )
}
export default connect(state => state.base, action.base)(HomeHead)