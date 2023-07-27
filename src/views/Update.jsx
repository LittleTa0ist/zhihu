import React, { useState } from "react";
import NavBarAgain from '../components/NavBarAgain';
import ButtonAgain from '../components/ButtonAgain';
import styled from "styled-components";
import { ImageUploader, Input, Toast } from 'antd-mobile';
import { connect } from 'react-redux';
import action from '../store/action';
import api from '../api';

/* 样式 */
const UpdateBox = styled.div`
    .formBox {
        padding: 30px;

        .item {
            display: flex;
            align-items: center;
            height: 110px;
            line-height: 110px;
            font-size: 28px;

            .label {
                width: 20%;
                text-align: center;
            }

            .input {
                width: 80%;
            }
        }
    }

    .submit {
        display: block;
        margin: 0 auto;
        width: 60%;
        height: 70px;
        font-size: 28px;
    }
`;

const Update = function Update(props) {
  const { info, navigate, queryUserInfoAsync } = props
  const [imgSrc, setImgSrc] = useState([{ url: info.pic }]);
  const [username, setUserName] = useState(info.name);
  // 图片上传
  const limitImage = (img) => {
    // console.log(img);
    let limit = 10 * 1024 * 1024
    if (img.size > limit) {
      Toast.show({
        icon: 'file',
        content: '图片必须在1M以内'
      })
      return null
    }
    return img;
  }
  const uploadImage = async (img) => {
    try {
      let { code, pic } = await api.upload(img)
      if (+code !== 0) {
        Toast.show({
          icon: 'file',
          content: '上传失败'
        })
        return []
      }
      setImgSrc([{ url: pic }])
      return {
        url: pic
      }
    } catch (error) {

    }

  }
  // 提交信息
  const submit = async () => {
    if (imgSrc.length === 0) {
      Toast.show({
        icon: 'file',
        content: '请先上传图片'
      })
    }
    if (username.trim() === "") {
      Toast.show({
        icon: 'fail',
        content: '请先属于昵称'
      })
    }
    let [{ url }] = imgSrc
    try {
      let { code } = await api.userUpdate(username.trim(), url)
      if (+code !== 0) {
        Toast.show({
          icon: 'fail',
          content: '上传失败'
        })
        return;
      }
      Toast.show({
        icon: 'success',
        content: '修改成功'
      })
      queryUserInfoAsync()
      navigate(-1)
    } catch (error) {

    }
  }
  return <UpdateBox>
    <NavBarAgain title="修改信息" />
    <div className="formBox">
      <div className="item">
        <div className="label">头像</div>
        <div className="input">
          <ImageUploader
            value={imgSrc}
            maxCount={1}
            onDelete={() => {
              setImgSrc([]);
            }}
            beforeUpload={limitImage}
            upload={uploadImage}
          />
        </div>
      </div>
      <div className="item">
        <div className="label">姓名</div>
        <div className="input">
          <Input placeholder='请输入账号名称'
            value={username}
            onChange={val => {
              setUserName(val);
            }} />
        </div>
      </div>
      <ButtonAgain color='primary' className="submit" onClick={submit}>
        提交
      </ButtonAgain>
    </div>
  </UpdateBox>;
};
export default connect(
  state => state.base,
  action.base
)(Update);