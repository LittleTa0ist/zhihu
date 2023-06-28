## 知乎日报-WebApp  zhihu
  技术栈：create-react-app、React18、redux/react-redux「你可以使用mobx或者reduxjs/toolkit」、react-router-dom V6、Fetch、less、AntdMobile...

## 从零开始构建React项目「本项目不采用任何系解决方案（例如：淘系），就是基于最纯正的React实现开发」
  1. 基于create-react-app创建工程化项目
    $ npm i create-react-app -g
    $ create-react-app 项目名
    ---
    $ yarn eject 暴露webpack配置项
    修改脚手架默认的配置
      + 配置less：less/less-loader@8
      + 配置别名 @ 代表 src 目录「选配」
      + 配置浏览器兼容
      + 配置客户端启动服务的信息
      + 配置跨域代理：http-proxy-middleware
      + 配置REM响应式布局的处理：lib-flexible、postcss-pxtorem
      + 配置打包优化
      + ...
  2. 准备一些项目开发必备的材料
    src/api/http.js：fetch请求的二次封装
    src/assets：
      + reset.min.css 清除浏览器默认样式
      + images 静态资源图片
      + utils.js 自己封装的常用方法库
      + ...
  3. 配置好REM响应式布局 && 样式处理
    lib-flexible 设置REM和PX换算比例的
      + 根据设备宽度的变化自动计算
      + html.style.fontSize=设备的宽度/10+'px';
      + 750设计稿中  1REM=75PX : 初始换算比例
      + 375设备上 1REM=37.5PX
    postcss-pxtorem 可以把我们写的PX单位，按照当时的换算比例，自动转换为REM，不需要我们自己算了
    ----
    @1 假设设计稿还是750的，我们测出来多少尺寸，我们写样式的时候，就写多少尺寸，并且不需要手动转换为REM「我们在webpack中，针对postcss-pxtorem做配置，让插件帮我们自动转换」
       const px2rem = require('postcss-pxtorem');
       px2rem({
         rootValue: 75, // 基于lib-flexible,750设计稿,就会设置为1REM=75PX；此时在webpack编译的时候，我们也需要让px2rem插件，按照1REM=75PX，把我们测出来的并且编写的PX样式，自动转换为REM；
         propList: ['*'] // 对所有文件中的样式都生效{AntdMobile组件库中的样式}
       })
    @2 在入口中，我们导入lib-flexible，确保在不同的设备上，可以等比例的对REM的换算比例进行缩放！！
    @3 手动设置：设备宽度超过750PX后，不再继续放大！！

  4. 配置路由管理
  5. 配置redux架子
  6. 其它的基础框架配置
  7. 逐一开发项目，注意组件的抽离封装
  8. 开发完毕后
     + 项目优化
     + 封装提取
     + 内部测试
     + 部署上线 
