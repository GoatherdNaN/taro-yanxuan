import {
  SET_INDEX_DATA,
} from '../constants/type';
import SERVER from '../utils/request';


const setIndexData = res => ({
  type: SET_INDEX_DATA,
  ...res.data,
})

// 异步的action
export function asyncGetIndexData (params) {
  return dispatch => {
    SERVER.getIndexData(params).then(res => {
      dispatch(setIndexData(res));
    });
  }
}
