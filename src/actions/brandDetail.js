import {
  SET_BRAND_DETAIL,
  CUT_BRAND_DETAIL,
} from '../constants/type';
import SERVER from '../utils/request';


const setBrandDetail = res => ({
  type: SET_BRAND_DETAIL,
  ...res.data,
})
const cutBrandDetail = params => ({
  type: CUT_BRAND_DETAIL,
  ...params,
})

// 异步的action
export function asyncGetBrandDetail (params) {
  return dispatch => {
    if(params.isFirst) {
      SERVER.getBrandDetail(params).then(res => {
        dispatch(setBrandDetail(res));
      });
    } else {
      dispatch(cutBrandDetail(params));
    }
  }
}
