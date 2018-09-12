import {
  SET_CATEGORY_LIST,
  SET_CURRENT_CATEGORY,
} from '../constants/type';
import SERVER from '../utils/request';


const setCategoryList = res => ({
  type: SET_CATEGORY_LIST,
  ...res.data,
})
const setCurrentCategory = res => ({
  type: SET_CURRENT_CATEGORY,
  ...res.data,
})

// 异步的action
export function asyncGetCategoryList (params) {
  return dispatch => {
    SERVER.getCategoryList(params).then(res => {
      dispatch(setCategoryList(res));
    });
  }
}
export function asyncGetCurrentCategory (params) {
  return dispatch => {
    SERVER.getCurrentCategory(params).then(res => {
      dispatch(setCurrentCategory(res));
    });
  }
}
