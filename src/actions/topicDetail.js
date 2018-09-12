import {
  SET_TOPIC_DETAIL,
} from '../constants/type';

export function setTopicDetail(res) {
  return {
    type: SET_TOPIC_DETAIL,
    ...res.data,
  }
};
