# 聚有品智慧商城 - H5移动电商平台

## 项目介绍
**聚有品** 是一款专注于提供高品质商品和服务的H5移动电商平台。平台采用了 Vue.js 作为主要的前端开发框架，并结合了Vant UI组件库来实现高性能、美观且易于维护的用户界面。


### 首页：
![](https://my-website-assets-1323233637.cos.ap-guangzhou.myqcloud.com/imgs/%E6%99%BA%E6%85%A7%E5%95%86%E5%9F%8E%E9%A6%96%E9%A1%B5.png)

### 分类页：
![](https://my-website-assets-1323233637.cos.ap-guangzhou.myqcloud.com/imgs/%E6%99%BA%E6%85%A7%E5%95%86%E5%9F%8E%E5%88%86%E7%B1%BB%E9%A1%B5.png)

### 商品详情页：
![](https://my-website-assets-1323233637.cos.ap-guangzhou.myqcloud.com/imgs/%E6%99%BA%E6%85%A7%E5%95%86%E5%9F%8E%E5%95%86%E5%93%81%E8%AF%A6%E6%83%85.png)

### 购物车页：
![](https://my-website-assets-1323233637.cos.ap-guangzhou.myqcloud.com/imgs/%E6%99%BA%E6%85%A7%E5%95%86%E5%9F%8E%E8%B4%AD%E7%89%A9%E8%BD%A6.png)

### 个人中心页：
![](https://my-website-assets-1323233637.cos.ap-guangzhou.myqcloud.com/imgs/%E6%99%BA%E6%85%A7%E5%95%86%E5%9F%8E%E6%88%91%E7%9A%84.png)


## 技术栈

**前端**: 
  - Vue.js
  - Vant UI 组件库
  - Vue CLI 脚手架
  - Axios 请求库

 **部署**: 
  - 服务器：腾讯云 Linux 服务器(OpenCloudOS) + Nginx
  - 域名：阿里云域名
  - 域名解析：阿里云域名解析
  - 静态资源部署：腾讯云CDN
  - 支付：微信/支付宝支付（待接入）
  - 短信验证：阿里云短信服务
  - 部署上线/管理运维：宝塔 Linux 运维面板

## 主要功能

- 用户注册与登录: 支持手机号验证码、微信登录（待开发）等多种方式登录，确保用户信息的安全性。
- 商品展示: 提供清晰的商品分类，支持商品搜索、排序等功能。
- 购物车管理: 用户可以将商品添加至购物车并进行统一结算。
- 订单处理: 包括订单创建、支付、取消以及查看历史订单等操作。

### 说明

 - 测试环境，请使用 246810 作为短信验证码登录（后端不再提供真实的短信验证服务）
 - 测试环境，手机验证码登录时，输入任意4位验证码即可（后端不对验证码进行校验）
 - 使用 PC 浏览器（Chrome/Edge）访问项目时可以点击鼠标右键 -> 检查(或直接按下F12) -> 模拟移动设备以获得更好的访问体验
 ![](https://my-website-assets-1323233637.cos.ap-guangzhou.myqcloud.com/imgs/%E6%99%BA%E6%85%A7%E5%95%86%E5%9F%8E%E6%A8%A1%E6%8B%9F%E5%99%A8.png)