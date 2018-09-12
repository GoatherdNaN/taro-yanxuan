import Taro from '@tarojs/taro'

export function toLogin() {
  const userInfo = Taro.getStorageSync('userInfo');
  if (!userInfo) {
    Taro.navigateTo({
      url: "/pages/login/index"
    });
  } else {
    return true;
  }
}

export function login() {
  const userInfo = Taro.getStorageSync('userInfo');
  if (userInfo) {
    return userInfo;
  }
}

export function getStorageOpenid() {
  const openId = Taro.getStorageSync("openId");
  if (openId) {
    return openId;
  } else {
    return ''
  }
}
