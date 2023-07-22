import React, { useState } from 'react'
import { Button } from 'antd-mobile'
export default function ButtonAgain(props) {
    // console.log(props);
    let options = { ...props }
    let { children, onClick: handle } = options
    delete options.children

    const [loading, setLoading] = useState(false);
    const clickHandle = async () => {
        setLoading(true)
        try {
            await handle()
        } catch (error) {

        }

        setLoading(false)
    }
    if (handle) options.onClick = clickHandle
    return (
        <Button {...options} loading={loading}>
            {children}
        </Button>
    )
}
