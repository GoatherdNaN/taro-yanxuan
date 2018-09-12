import {
  SET_HELPER,
  CLEAR_HISTORY,
  SET_SEARCH_INDEX,
  CLEAR_LIST_DATA,
  CLEAR_TIPS_DATA,
} from '../constants/type';
import SERVER from '../utils/request';

const setHelper = res => ({
  type: SET_HELPER,
  ...res.data,
});
const clearHistory = () => ({
  type: CLEAR_HISTORY
});
const setSearchIndex = res => ({
  type: SET_SEARCH_INDEX,
  ...res.data,
});
export const clearListData = () => ({
  type: CLEAR_LIST_DATA
});
export const clearTipsData = () => ({
  type: CLEAR_TIPS_DATA
});

// 异步的action
export function asyncGetHelper (params) {
  return dispatch => {
    SERVER.getHelper(params).then(res => {
      dispatch(setHelper(res));
    });
  }
}
export function asyncClearHistory (params) {
  return dispatch => {
    SERVER.clearHistory(params).then(res => {
      if(res.data) {
        dispatch(clearHistory());
      }
    });
  }
}
export function asyncAddHistory (params) {
  return dispatch => {
    SERVER.addHistory(params);
  }
}
export function asyncGetSearchIndex (params) {
  return dispatch => {
    SERVER.getSearchIndex(params).then(res => {
      dispatch(setSearchIndex(res));
    });
  }
}
