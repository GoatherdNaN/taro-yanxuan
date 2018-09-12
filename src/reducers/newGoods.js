import {
  SET_NEW_GOODS,
  CUT_NEW_GOODS,
} from '../constants/type';

const INITIAL_STATE = {
  originListData: [],
  listData: [],
}

export default function topic (state = INITIAL_STATE, action) {
  switch (action.type) {
    case SET_NEW_GOODS:
      return {
        ...state,
        originListData: action.data,
        listData: action.data.slice(0,10),
      }
    case CUT_NEW_GOODS:
      return {
        ...state,
        listData: state.originListData.slice(0,action.page * 10),
      }
     default:
       return state
  }
}
