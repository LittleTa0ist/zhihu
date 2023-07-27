import React, { useState, useEffect } from 'react'
import { Form, Input, Toast } from 'antd-mobile'
import NavBarAgain from '../components/NavBarAgain'
import ButtonAgain from '../components/ButtonAgain'
import { connect } from 'react-redux'
import action from '../store/action'
import './Login.less'
import api from '../api'
import _ from '../assets/utils'
function Login(props) {
  let { navigate, queryUserInfoAsync, usp } = props
  const [formIns] = Form.useForm(),
    [disable, setDisable] = useState(false),
    [sendText, setSendText] = useState('发送验证码')
  // [sendLoading, setSendLoading] = useState(false),
  // [submitLoading, setsSubmitLoading] = useState(false)

  let timer = null, num = 31;

  useEffect(() => {
    return () => {
      if (timer) {
        clearInterval(timer)
        timer = null;
      }

    };
  }, []);

  // 倒计时函数
  const countdown = () => {
    num--;
    if (num === 0) {
      setSendText(`发送验证码`)
      clearInterval(timer)
      timer = null
      setDisable(false)
      return
    }
    setSendText(`${num}s后重发`)
  }

  // 提交按钮
  const submit = async (values) => {
    try {
      await formIns.validateFields()
      let { phone, code } = formIns.getFieldsValue()
      let { code: codeHttp, token } = await api.login(phone, code)
      if (+codeHttp !== 0) {
        Toast.show({
          icon: 'fail',
          content: '登录失败'
        })
        formIns.resetFields(['code'])
        return;
      }
      // 登录成功：存储token,redux,跳转
      _.storage.set('tk', token)
      await queryUserInfoAsync();
      Toast.show({
        icon: 'success',
        content: '登录/注册成功'
      })
      let to = usp.get('to')
      to ? navigate(to, { replace: true }) : navigate(-1)
    } catch (error) {

    }
  }

  // 发送验证码
  const send = async () => {
    try {
      await formIns.validateFields(['phone'])
      let phone = formIns.getFieldValue('phone')
      let { code } = api.sendPhoneCode(phone)
      if (+code === 0) {
        Toast.show({
          icon: 'fail',
          content: '发送失败'
        })
        return;
      }
      // 手机号校验通过
      setDisable(true)
      countdown()
      if (!timer) timer = setInterval(countdown, 1000)

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
          <ButtonAgain color='primary' size='large' onClick={submit}>
            提交
          </ButtonAgain>
        }
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
          <ButtonAgain color='primary'
            size='small'
            onClick={send}
            disabled={disable}>
            {sendText}
          </ButtonAgain>

        }
          rules={[{ validator: validate.code }]}
        >
          <Input />
        </Form.Item>

      </Form>
    </div>
  )
}

export default connect(
  null,
  action.base
)(Login)