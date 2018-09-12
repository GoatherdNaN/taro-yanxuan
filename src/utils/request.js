import Taro from '@tarojs/taro';
import * as URL from '../constants/url';

export function request(base, data = null, jsonType = false) {
  const options = {
    ...base,
    data,
    header: {
      'Content-Type': jsonType
        ? 'application/json;charset=UTF-8'
        : 'application/x-www-form-urlencoded;charset=UTF-8',
    },
    complete: () => {
      Taro.hideLoading();
    },
  };
  Taro.showLoading({
    title:'数据加载中...',
    mask: true
  });
  return Taro.request(options);
}

export default {
  getIndexData: params => request(URL.GET_INDEX_DATA, params),
  getGoodsList: params => request(URL.GET_GOODS_LIST, params),
  getCategoryNav: params => request(URL.GET_CATEGORY_NAV, params),
  submitAction: params => request(URL.SUBMIT_ACTION, params),
  addCollect: params => request(URL.ADD_COLLECT, params),
  addCart: params => request(URL.ADD_CART, params),
  getGoodsDetail: params => request(URL.GET_GOODS_DETAIL, params),
  getTopicList: params => request(URL.GET_TOPIC_LIST, params),
  getTopicDetail: params => request(URL.GET_TOPIC_DETAIL, params),
  getBrandList: params => request(URL.GET_BRAND_LIST, params),
  getBrandDetail: params => request(URL.GET_BRAND_DETAIL, params),
  getCategoryList: params => request(URL.GET_CATEGORY_LIST, params),
  getCurrentCategory: params => request(URL.GET_CURRENT_CATEGORY, params),
  getHelper: params => request(URL.GET_HELPER, params),
  clearHistory: params => request(URL.CLEAR_HISTORY, params),
  addHistory: params => request(URL.ADD_HISTORY, params),
  getSearchIndex: params => request(URL.GET_SEARCH_INDEX, params),
}
