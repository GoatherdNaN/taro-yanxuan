import {
  SET_TOPIC_DETAIL,
} from '../constants/type';

const INITIAL_STATE = {
  recommendList: [],
  topicContent: '',
}

export default function topicDetail (state = INITIAL_STATE, action) {
  switch (action.type) {
    case SET_TOPIC_DETAIL:
      return {
        ...state,
        topicContent: action.data.content,
        recommendList: action.recommendList,
      }
     default:
       return state
  }
}
