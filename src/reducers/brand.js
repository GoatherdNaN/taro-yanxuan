import {
  SET_BRAND_LIST,
} from '../constants/type';

const INITIAL_STATE = {
  listData: [],
  total: "",
}

export default function topic (state = INITIAL_STATE, action) {
  switch (action.type) {
    case SET_BRAND_LIST:
      return {
        ...state,
        listData: action.isFirst ? action.data : [...state.listData,...action.data],
        total: action.total,
      }
     default:
       return state
  }
}
