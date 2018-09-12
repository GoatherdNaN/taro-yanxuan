import {
  SET_BRAND_LIST,
} from '../constants/type';
import SERVER from '../utils/request';


const setBrandList = data => ({
  type: SET_BRAND_LIST,
  ...data,
})

// 异步的action
export function asyncGetBrandList (params) {
  return dispatch => {
    SERVER.getBrandList({ page: params.page }).then(res => {
      dispatch(setBrandList({
        isFirst: params.isFirst,
        ...res.data
      }));
    });
  }
}
