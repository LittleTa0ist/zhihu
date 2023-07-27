import routes from "./routes";
import React, { Suspense, useEffect, useState } from "react";
import { Routes, Route, useNavigate, useLocation, useParams, useSearchParams } from 'react-router-dom'
import { DotLoading, Mask, Toast } from 'antd-mobile'
import store from "../store";
import action from "../store/action";
// 统一路由配

// 判断是否需要进行登录校验
const isCheckLogin = path => {
    // 登录态校验
    let { base: { info } } = store.getState(),
        checkList = ['/personal', '/store', '/update']
    return !info && checkList.includes(path)
}

const Element = function Element(props) {
    const navigate = useNavigate(),
        location = useLocation(),
        params = useParams(),
        [usp] = useSearchParams()
    const { component: Component, meta, path } = props;
    const [, setRandom] = useState(0);

    let isShow = !isCheckLogin(path)
    useEffect(() => {
        if (isShow) return;
        (async function () {
            let infoAction = await action.base.queryUserInfoAsync(),
                info = infoAction.info
            if (!info) {
                Toast.show({
                    icon: 'fail',
                    content: '请先登录'
                })
                navigate({
                    pathname: '/login',
                    search: `?to=${path}`
                }, {
                    replace: true
                })
                return;
            }
            store.dispatch(infoAction)
            setRandom(+new Date())

        })()
    });

    let { title = "知乎日报-WebApp" } = meta || {}
    document.title = title

    return <>
        {
            isShow ?
                <Component navigate={navigate} location={location} params={params} usp={usp} />
                : <Mask visible={true}>
                    <DotLoading color='white'></DotLoading>
                </Mask>
        }
    </>

}


export default function RouterView() {
    return (
        <Suspense fallback={<Mask
            visible={true}
        >
            <DotLoading color='white'></DotLoading>
        </Mask>}>
            <Routes>
                {routes.map(item => {
                    let { name, path } = item
                    return <Route key={name} path={path} element={<Element {...item} />} />
                })}
            </Routes>
        </Suspense>
    )
}
