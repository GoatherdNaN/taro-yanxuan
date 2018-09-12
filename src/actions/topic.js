import {
  SET_TOPIC_LIST,
} from '../constants/type';
import SERVER from '../utils/request';


const setTopicList = data => ({
  type: SET_TOPIC_LIST,
  ...data,
})

// 异步的action
export function asyncGetTopicList (params) {
  return dispatch => {
    SERVER.getTopicList({ page: params.page }).then(res => {
      dispatch(setTopicList({
        isFirst: params.isFirst,
        ...res.data
      }));
    });
  }
}
