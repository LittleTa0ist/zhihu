import React, { useState, useEffect } from 'react'
import './Detail.less'
import { LeftOutline, MessageOutline, LikeOutline, MoreOutline, StarOutline } from 'antd-mobile-icons'
import { Badge } from 'antd-mobile'
import api from '../api'
import SkeletionAgain from '../components/SkeletionAgain'
import { flushSync } from 'react-dom'

export default function Detail(props) {
    const { navigate, params } = props
    const [extra, setExtra] = useState(null);
    const [info, setInfo] = useState(null);

    let link;
    const handleStyle = (result) => {
        let { css } = result
        if (!Array.isArray(css)) return;
        css = css[0]
        if (!css) return;
        link = document.createElement('link')
        link.rel = 'stylesheet'
        link.href = css
        document.head.appendChild(link)
    }
    const handleImage = (result) => {
        let imgPlaceHolder = document.querySelector('.img-place-holder')
        let questionTitle = document.querySelector('.question-title')

        questionTitle.innerHTML = result.title
        if (!imgPlaceHolder) return
        let tempImg = new Image()
        tempImg.src = result.image
        tempImg.onload = () => {
            imgPlaceHolder.appendChild(tempImg)
        }
        tempImg.onerror = () => {
            let parent = imgPlaceHolder.parentNode;
            parent.parentNode.removeChild(parent)
        }

    }
    // 第一次渲染完，获取数据
    useEffect(() => {
        (async () => {
            try {
                let result = await api.queryNewsInfo(params.id)
                flushSync(() => {
                    setInfo(result)
                    // 处理样式
                    handleStyle(result)
                })

                handleImage(result)
            } catch (error) {

            }

        })()
        return () => {
            if (link) document.head.removeChild(link)
        }

    }, []);
    useEffect(() => {
        (async () => {
            try {
                let result = await api.queryStoryExtra(params.id)
                // console.log(result);
                setExtra(result)
            } catch (error) {

            }

        })()
    }, []);
    return (
        <div className="detail_box">
            {info ?
                <div className="content" dangerouslySetInnerHTML={{ __html: info.body }}>

                </div>
                : <SkeletionAgain />}


            <div className="tab-bar">
                <div className="back" onClick={() => {
                    navigate(-1)
                }}>
                    <LeftOutline />
                </div>
                <div className="icons">
                    <Badge content={extra ? extra.comments : 0}>
                        <MessageOutline />
                    </Badge>
                    <Badge content={extra ? extra.popularity : 0}>
                        <LikeOutline />
                    </Badge>
                    <span><StarOutline /></span>
                    <span><MoreOutline /></span>
                </div>
            </div>
        </div>
    )
}