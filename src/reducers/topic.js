import {
  SET_TOPIC_LIST,
} from '../constants/type';

const INITIAL_STATE = {
  topicList: [],
  total: "",
}

export default function topic (state = INITIAL_STATE, action) {
  switch (action.type) {
    case SET_TOPIC_LIST:
      return {
        ...state,
        topicList: action.isFirst ? action.data : [...state.topicList,...action.data],
        total: action.total,
      }
     default:
       return state
  }
}
