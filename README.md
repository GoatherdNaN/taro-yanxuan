# taro-yanxuan
Taro多端开发个人实践
## 前言

6月中旬，京东-凹凸实验室开源了[Taro](https://taro.aotu.io/)，旨在打造一套遵循 React 语法规范的多端统一开发框架。作为一个react爱好者，不免想上手实践一把。
刚好无意中发现一个网友基于mpvue写了一个[网易严选商城](https://react.ctolib.com/heyushuo-mpvue-shop-node.html)的例子，数据表也提供了出来，就开始着手写这个demo了。目前实现了代码h5端和小程序端的共用，也踩了一些坑。

### 此项目仅供学习参考

## 技术栈

小程序（部分原生组件）、Taro、redux、Node
## 运行方法

    npm install  下载依赖
    npm run dev:weapp  小程序端
    npm run dev:h5     h5端
## 小程序、h5端都实现的功能

* 首页、专题、分类、我的
* 首页包含品牌制造页、品牌制造详情页面、新品首发页面、人气推荐页面、各分类列表
* 商品详情页面，包含常见问题、大家都在看商品列表、加入购物车
* 搜索功能，包含历史记录、热门搜索
* 商品列表部分包含综合、价格高低进行排序
* 专题功能，包含专题详情、专题推荐列表
* 分类，包含左边大分类和右边详细分类
* 我的
## 踩过的部分坑
1. 初次编译直接报错：检查node版本，尽量用最新的
2. 静态引用（比如wxparse.wxml）,编译后发现报静态资源找不到的错：在config/dev配置个copy插件，每次编译自动把资源拷贝进dist
3. 很多React原生的东西不支持，当然，这也是受限于小程序的环境

## 后记
目前市面上小程序的开发框架多种多样，有基于vue的weyp、mpvue问道在前，现在支持react语法的Taro又面世了，还有去哪儿的react开发小程序的框架。总的来说，Taro无疑是一个好的方案，虽然还是存在很多坑，但对react语法的支持，以及良好的开发体验，对多端的同时支持，都是它的优点。刚刚发布的1.0版本，对RN端也进行了支持，并且修复了很多的bug，后期将跟进，期待它越来越好。

## 部分效果展示（左：小程序 右：H5）
### 1. 商城首页
---

![image](https://github.com/GoatherdNaN/taro-yanxuan/blob/master/screenshots/weapp_index.gif?raw=true) 
![image](https://github.com/GoatherdNaN/taro-yanxuan/blob/master/screenshots/h5_index.gif?raw=true)

### 2. 分类列表
---
![image](https://github.com/GoatherdNaN/taro-yanxuan/blob/master/screenshots/weapp_category.gif?raw=true) 
![image](https://github.com/GoatherdNaN/taro-yanxuan/blob/master/screenshots/h5_category.gif?raw=true)

### 3. 商品详情
---
![image](https://github.com/GoatherdNaN/taro-yanxuan/blob/master/screenshots/weapp_goodsdetail.gif?raw=true) 
![image](https://github.com/GoatherdNaN/taro-yanxuan/blob/master/screenshots/h5_goodsdetail.gif?raw=true)

### 4. 专题
---
![image](https://github.com/GoatherdNaN/taro-yanxuan/blob/master/screenshots/weapp_topic.gif?raw=true) 
![image](https://github.com/GoatherdNaN/taro-yanxuan/blob/master/screenshots/h5_topic.gif?raw=true)

### 5. 全部分类
---
![image](https://github.com/GoatherdNaN/taro-yanxuan/blob/master/screenshots/weapp_allcategory.gif?raw=true) 
![image](https://github.com/GoatherdNaN/taro-yanxuan/blob/master/screenshots/h5_allcategory.gif?raw=true)

