import {
  SET_HELPER,
  CLEAR_HISTORY,
  SET_SEARCH_INDEX,
  CLEAR_LIST_DATA,
  CLEAR_TIPS_DATA,
} from '../constants/type';

const INITIAL_STATE = {
  historyData: [],
  hotData: [],
  tipsData: [],
  listData: [],
}

export default function search (state = INITIAL_STATE, action) {
  switch (action.type) {
    case SET_HELPER:
      return {
        ...state,
        listData: action.keywords,
        tipsData: []
      }
    case CLEAR_HISTORY:
      return {
        ...state,
        historyData: []
      }
    case SET_SEARCH_INDEX:
      return {
        ...state,
        hotData: action.hotKeywordList,
        historyData: action.historyData,
      }
    case CLEAR_LIST_DATA:
      return {
        ...state,
        listData: []
      }
    case CLEAR_TIPS_DATA:
      return {
        ...state,
        tipsData: []
      }
     default:
       return state
  }
}
