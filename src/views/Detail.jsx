import React, { useState, useEffect, useMemo } from 'react'
import './Detail.less'
import { LeftOutline, MessageOutline, LikeOutline, MoreOutline, StarOutline } from 'antd-mobile-icons'
import { Badge, Toast } from 'antd-mobile'
import api from '../api'
import SkeletionAgain from '../components/SkeletionAgain'
import { flushSync } from 'react-dom'
import { connect } from 'react-redux'
import action from '../store/action'
function Detail(props) {
    const { navigate, params, location } = props
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

    // 以下逻辑用于登录/收藏
    let { base: { info: userInfo }, queryUserInfoAsync, store: { list: storeList }, queryStoreListAsync, removeStoreListById } = props
    useEffect(() => {
        (async () => {
            if (!userInfo) {
                let { info } = await queryUserInfoAsync()
                userInfo = info
            }

            // 已经登录且没有收藏列表，需要同步收藏列表
            if (userInfo && !storeList) {
                queryStoreListAsync()
            }

        })()

    }, [])
    //依赖于收藏列表以及路径参数计算是否收藏
    let isStore = useMemo(() => {
        if (!storeList) return false;
        return storeList.some(item => {
            return +item.news.id === +params.id
        })

    }, [storeList, params])
    const handleStore = async () => {
        if (!userInfo) {
            Toast.show({
                icon: 'fail',
                content: '请先登录'
            })
            navigate(`/login?to=${location.pathname}`, { replace: true })
            return;
        }
        if (isStore) {
            let item = storeList.find(item => item.news.id === params.id)
            if (!item) return;
            let { code } = await api.storeRemove(item.id)
            if (+code === 0) {
                removeStoreListById(item.id)
            }
        } else {
            try {
                let { code, codeText } = await api.store(params.id)
                // console.log(codeText, code);
                if (+code === 0) {
                    queryStoreListAsync()
                }
            } catch (error) {

            }

        }
    }

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
                    <span className={isStore ? 'stored' : null} onClick={handleStore}><StarOutline /></span>
                    <span><MoreOutline /></span>
                </div>
            </div>
        </div>
    )
}

export default connect(state => ({
    base: state.base,
    store: state.store
}), {
    ...action.base, ...action.store
})(Detail)