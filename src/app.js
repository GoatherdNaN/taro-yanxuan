import Taro, { Component } from '@tarojs/taro'
// import '@tarojs/async-await'
import { Provider } from '@tarojs/redux'

import Index from './pages/index'

import configStore from './store'

import './app.less'

const store = configStore()

class App extends Component {
  config = {
    // 页面前带有 ^ 符号的，会被编译成首页，其他页面可以选填，我们会自动把 webpack entry 里面的入口页面加进去
    pages: [
       'pages/index/index',
       'pages/categorylist/index',
       'pages/goods/index',
       'pages/topic/index',
       'pages/topicdetail/index',
       'pages/brand/index',
       'pages/branddetail/index',
       'pages/newgoods/index',
       'pages/category/index',
       'pages/login/index',
       'pages/mine/index',
       'pages/search/index',
    ],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: '严选',
      navigationBarTextStyle: 'black'
    },
    tabBar: {
      backgroundColor: '#fafafa',
      borderStyle: 'white',
      selectedColor: '#b4282d',
      color: '#666',
      list: [{
          pagePath: 'pages/index/index',
          iconPath: './asset/images/ic_menu_choice_nor.png',
          selectedIconPath: './asset/images/ic_menu_choice_pressed.png',
          text: '首页'
        },
        {
          pagePath: 'pages/topic/index',
          iconPath: './asset/images/ic_menu_topic_nor.png',
          selectedIconPath: './asset/images/ic_menu_topic_pressed.png',
          text: '专题'
        },
        {
          pagePath: 'pages/category/index',
          iconPath: './asset/images/ic_menu_sort_nor.png',
          selectedIconPath: './asset/images/ic_menu_sort_pressed.png',
          text: '分类'
        },
        {
          pagePath: 'pages/mine/index',
          iconPath: './asset/images/ic_menu_me_nor.png',
          selectedIconPath: './asset/images/ic_menu_me_pressed.png',
          text: '我的'
        }
      ]
    }
  }

  componentDidMount () {}

  componentDidShow () {}

  componentDidHide () {}

  componentCatchError () {}

  render () {
    return (
      <Provider store={store}>
        <Index />
      </Provider>
    )
  }
}

Taro.render(<App />, document.getElementById('app'))
