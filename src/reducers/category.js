import {
  SET_CATEGORY_LIST,
  SET_CURRENT_CATEGORY,
} from '../constants/type';

const INITIAL_STATE = {
  listData: [],
  detailData: {},
}

export default function category (state = INITIAL_STATE, action) {
  switch (action.type) {
    case SET_CATEGORY_LIST:
      return {
        ...state,
        listData: action.categoryList,
      }
    case SET_CURRENT_CATEGORY:
      return {
        ...state,
        detailData: action.data.currentOne,
      }
     default:
       return state
  }
}
