import {
  SET_NEW_GOODS,
  CUT_NEW_GOODS,
} from '../constants/type';
import SERVER from '../utils/request';


const setNewGoods = res => ({
  type: SET_NEW_GOODS,
  ...res.data,
})
const cutNewGoods = params => ({
  type: CUT_NEW_GOODS,
  ...params,
})

// 异步的action
export function asyncGetNewGoods (params) {
  return dispatch => {
    if(params.isFirst) {
      SERVER.getGoodsList(params).then(res => {
        dispatch(setNewGoods(res));
      });
    } else {
      dispatch(cutNewGoods(params));
    }
  }
}
