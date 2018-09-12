import Taro from '@tarojs/taro'
import {
  SET_GOODS_LIST,
  SET_CATEGORY_NAV,
} from '../constants/type';
import SERVER from '../utils/request';


const setGoodsList = data => ({
  type: SET_GOODS_LIST,
  ...data,
});
const setCategoryNav = data => ({
  type: SET_CATEGORY_NAV,
  ...data,
});

// 异步的action
export function asyncGetCategoryNav (params) {
  return (dispatch, getState) => {
    SERVER.getCategoryNav(params).then(res => {
      const nowIndex = res.data.navData.findIndex(v => v.id == params.id);
      dispatch(setCategoryNav({
        ...res.data,
      }));
      dispatch(asyncGetGoodsList({
        categoryId: params.id,
        nowIndex,
      }));
    });
  }
}
export function asyncGetGoodsList (params) {
  return dispatch => {
    SERVER.getGoodsList({
      categoryId: params.categoryId
    }).then(res => {
      dispatch(setGoodsList({
        ...res.data,
        nowIndex: params.nowIndex
      }))
    });
  }
}
