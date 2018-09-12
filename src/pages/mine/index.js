import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'

import { toLogin, login } from '../../utils'

import './index.less'

const listData = [
  {
    title: '我的订单',
    icon: 'icon-unie64a',
    url: ''
  },
  {
    title: '优惠券',
    icon: 'icon-youhuiquan',
    url: ''
  },
  {
    title: '我的足迹',
    icon: 'icon-zuji',
    url: ''
  },
  {
    title: '我的收藏',
    icon: 'icon-shoucang',
    url: '/pages/collectlist/index'
  },
  {
    title: '地址管理',
    icon: 'icon-dizhiguanli',
    url: '/pages/address/index'
  },
  {
    title: '联系客服',
    icon: 'icon-lianxikefu',
    url: ''
  },
  {
    title: '帮助中心',
    icon: 'icon-bangzhuzhongxin',
    url: ''
  },
  {
    title: '意见反馈',
    icon: 'icon-yijianfankui',
    url: '/pages/feedback/index'
  }
];

class Mine extends Component {

  config = {
    navigationBarTitleText: '我的',
  }

  constructor(props){
    super(props);
    this.state = {
      userInfo: {
        avator: 'http://yanxuan.nosdn.127.net/8945ae63d940cc42406c3f67019c5cb6.png',
      }
    }
  }

  componentWillMount () { }

  componentDidMount () { }

  componentWillUnmout () { }

  componentDidShow () {
    // 可以通过 wx.getSetting 先查询一下用户是否授权了 'scope.record' 这个 scope
    if (login()) {
      const userInfo = login();
      this.setState({
        userInfo,
      })
    }
  }

  componentDidHide () { }

  goTo(url) {
    if (toLogin()) {
      Taro.navigateTo({
        url,
      });
    }
  }

  routeToLogin = () => {
    const { userInfo: { avatarUrl } } = this.state;
    if (!avatarUrl) {
      Taro.navigateTo({
        url: '/pages/login/index'
      });
    }
  }

  render () {
    const { userInfo } = this.state;
    return (
      <View className='my'>
        <View className='myinfo'>
          <Image onClick={this.routeToLogin} src={userInfo.avatarUrl || userInfo.avator} alt='' />
          <View className='myinfo-box' onClick={this.routeToLogin}>
            <Text className='nickname'>{userInfo.nickName}</Text>
            {
              !!userInfo.nickname
              ? <Text className='nickname user-flag'>点击登录</Text>
              : <Text className='nickname user-flag'>微信用户</Text>
            }
          </View>
        </View>
        <View className='iconlist'>
          {
            listData.map((item, index) => (
              <View className='icon-item' onClick={this.goTo.bind(this,item.url)} key={item.id}>
                <Text className={`icon-info iconfont${item.icon ? ' ' + item.icon : ''}`}></Text>
                <Text className='icon-info'>{item.title}</Text>
              </View>
            ))
          }
        </View>
      </View>
    )
  }
}
export default Mine;
