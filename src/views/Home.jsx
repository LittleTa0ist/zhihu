import React, { useState, useEffect, useRef } from 'react'
import './Home.less'
import HomeHead from '../components/HomeHead'
import NewsItem from '../components/NewsItem'
import SkeletionAgain from '../components/SkeletionAgain'
import _ from '../assets/utils'
import api from '../api'
import { Swiper, Image, Divider, DotLoading } from 'antd-mobile'
import { Link } from 'react-router-dom'
export default function Home() {
    let [today, setToday] = useState(_.formatTime(null, '{0}{1}{2}')),
        [bannerData, setBannerData] = useState([]),
        [newsList, setNewsList] = useState([]);
    let loadMore = useRef()
    useEffect(() => {
        (async () => {
            try {
                let { date, stories, top_stories } = await api.queryNewsLatest()
                setToday(date)
                setBannerData(top_stories)
                newsList.push({
                    date,
                    stories
                })
                setNewsList([...newsList])
            } catch (error) {

            }

        })()


    }, [])

    // 第一次渲染完毕：设置监听器，实现触底加载
    useEffect(() => {
        let ob = new IntersectionObserver(async change => {
            let { isIntersecting } = change[0]
            if (isIntersecting) {
                // 加载更多的盒子出现在视口中
                try {
                    let time = newsList[newsList.length - 1]['date']
                    let res = await api.queryNewsBefore(time)
                    newsList.push(res)
                    console.log(newsList);
                    setNewsList([...newsList])
                } catch (_) {

                }


            }
        })
        let loadMoreBox = loadMore.current
        ob.observe(loadMore.current)
        return () => {
            ob.unobserve(loadMoreBox)
            ob = null
        }
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

            {newsList.length === 0 ?
                <SkeletionAgain /> :
                newsList.map((item, index) => {
                    let { date, stories } = item
                    return <div className="news_box" key={date}>
                        {index !== 0 ?
                            <Divider contentPosition='left'>
                                {_.formatTime(date, '{1}月{2}日')}
                            </Divider>
                            : null}

                        <div className="list">
                            {stories.map(cur => {
                                return <NewsItem key={cur.id} info={cur} />
                            })}
                        </div>
                    </div>
                })}

            {/* 加载更多 */}
            <div className="loadmore_box" ref={loadMore} style={{ display: newsList.length === 0 ? 'none' : 'block' }}>
                <DotLoading />
                数据加载中
            </div>
        </div>

    )
}
