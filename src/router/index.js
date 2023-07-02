import routes from "./routes";
import React, { Suspense } from "react";
import { Routes, Route, useNavigate, useLocation, useParams, useSearchParams } from 'react-router-dom'
import { DotLoading, Mask } from 'antd-mobile'

// 统一路由配置
const Element = function Element(props) {
    const { component: Component, meta } = props
    const navigate = useNavigate(),
        location = useLocation(),
        params = useParams(),
        [usp] = useSearchParams()

    let { title = "知乎日报-WebApp" } = meta || {}
    document.title = title

    return <Component navigate={navigate} location={location} params={params} usp={usp} />
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
