import React, { useState, useEffect } from 'react'
import './Home.less'
import HomeHead from '../components/HomeHead'
import _ from '../assets/utils'
import api from '../api'
import { Swiper ,Image} from 'antd-mobile'
import { Link } from 'react-router-dom'
export default function Home() {
    let [today, setToday] = useState(_.formatTime(null, '{0}{1}{2}')),
        [bannerData, setBannerData] = useState([])
    useEffect(() => {
        (async () => {
            try {
                let { date, stories, top_stories } = await api.queryNewsLatest()
                setToday(date)
                setBannerData(top_stories)
            } catch (error) {

            }

        })()
    }, [])
    return (
        <div className="home_box">
            {/* 头部 */}
            <HomeHead today={today} />
            {/* 轮播图 */}
            <div className="swiper_box">
                {bannerData.length > 0 ? <Swiper autoplay={true} loop={true}>
                    {bannerData.map(item => {
                        let { id, image, title, hint } = item
                        return <Swiper.Item key={id} >
                            <Link to={`/detail/${id}`}>
                                <Image src={image} lazy />
                                {/* <img src={image} alt="" /> */}
                                <div className="desc">
                                    <h3 className="title">{title}</h3>
                                    <p className="author">{hint}</p>
                                </div>
                            </Link>
                        </Swiper.Item>
                    })}

                </Swiper> : null}

            </div>
            {/* 新闻列表 */}
            
        </div>

    )
}
