import Taro from '@tarojs/taro';

export const isWeapp = Taro.getEnv() === Taro.ENV_TYPE.WEAPP;
export const isH5 = Taro.getEnv() === Taro.ENV_TYPE.WEB;
