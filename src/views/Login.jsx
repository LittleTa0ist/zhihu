import React from 'react'
import { Form, Button, Input, Toast } from 'antd-mobile'
import NavBarAgain from '../components/NavBarAgain'
import './Login.less'
export default function Login() {

  const [formIns] = Form.useForm()
  const submit = (values) => {
    Toast.show({
      icon: 'success',
      content: '整体校验成功'
    })
  }
  const send = async () => {
    try {
      await formIns.validateFields(['phone'])
      Toast.show({
        icon: 'success',
        content: '手机号验证成功'
      })
      // 手机号校验通过
    } catch (error) {

    }
  }
  // 自定义表单校验规则
  const validate = {
    phone(_, value) {
      if (!value || value.length === 0) return Promise.reject(new Error('手机号必填'))
      value = value.trim()
      let reg = /^(?:(?:\+|00)86)?1[3-9]\d{9}$/

      if (!reg.test(value)) return Promise.reject(new Error('手机号格式有误'))
      return Promise.resolve()
    },
    code(_, value) {
      if (!value || value.length === 0) return Promise.reject(new Error('验证码必填'))
      value = value.trim()
      let reg = /^\d{6}$/
      if (!reg.test(value)) return Promise.reject(new Error('验证码格式有误'))
      return Promise.resolve()
    }
  }
  return (
    <div className="login_box">
      <NavBarAgain title='登录/注册' />
      <Form
        layout='horizontal'
        style={{ '--border-top': 'none' }}
        footer={
          <Button type='submit' color='primary' size='large'>
            提交
          </Button>
        }
        onFinish={submit}
        form={formIns}
        requiredMarkStyle='none'
      >
        <Form.Item
          name='phone'
          label='手机号'
          rules={[{ validator: validate.phone }]}
        >
          <Input placeholder='请输入手机号' />
        </Form.Item>
        <Form.Item name='code' label='验证码' extra={
          <Button color='primary' size='small' onClick={send}>
            发送验证码
          </Button>
        }
          rules={[{ validator: validate.code }]}
        >
          <Input />
        </Form.Item>

      </Form>
    </div>
  )
}
