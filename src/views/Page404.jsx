import React from 'react'
import { Button, ErrorBlock, Space } from 'antd-mobile'
import styled from 'styled-components'

const Page404Box = styled.div`
    padding-top: 100px;
    font-size: 40px;

    .adm-error-block-image{
        height: 400px;
    }

    .adm-error-block-description,
    .adm-error-block-description-title{
        font-size: 28px;
    }

    .btn{
        margin-top: 50px;
        display: flex;
        justify-content: center;

        .adm-button{
            margin: 0 20px;
        }
    }
`;
const Page404 = (props) => {
  const { navigate } = props
  return (
    <Page404Box>
      <ErrorBlock
        image='https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg'
        title="您访问的页面不存在"
        style={{
          '--image-height': '150px',
        }}
        description={
          <span>
            去逛其他页面吧
          </span>
        }
      >
        <Space style={{ '--gap': '16px' }}>
          <Button color='warning' onClick={() => { navigate(-1) }}>返回上一页</Button>
          <Button color='primary' onClick={() => { navigate('/', { replace: true }) }}>回到首页</Button>
        </Space>


      </ErrorBlock>
    </Page404Box>


  )
}
export default Page404