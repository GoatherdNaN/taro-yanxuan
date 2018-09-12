import Taro, { Component } from '@tarojs/taro'
import { View, Button } from '@tarojs/components'

import './index.less'

class Login extends Component {

  config = {
    navigationBarTitleText: '登录',
  }

  componentWillMount () { }

  componentDidMount () { }

  componentWillUnmout () { }

  componentDidShow () { }

  componentDidHide () { }

  doLogin = data => {
    Taro.showLoading({
      title: '登录中...', //提示的内容,
      mask: true, //显示透明蒙层，防止触摸穿透,
    });
    Taro.setStorage({
      key: 'userInfo',
      data: data.detail.userInfo,
      success: () => {
        Taro.hideLoading();
        if(this.$router.params.page) {
          Taro.navigateTo({
            url: `/pages/${this.$router.params.page}/index`,
          })
        } else {
          Taro.switchTab({
            url: '/pages/index/index',
          })
        }
      }
    });
  }

  render () {
    return (
      <View className='login'>
        <View className='logo'></View>
        <Button
          className='login-btn'
          openType='getUserInfo'
          lang='zh_CN'
          onGetUserInfo={this.doLogin}
        >微信登录</Button>
      </View>
    )
  }
}
export default Login;
