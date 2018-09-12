import {
  SET_CATEGORY_NAV,
  SET_GOODS_LIST,
} from '../constants/type';

const INITIAL_STATE = {
  nowIndex: 0,
  goodsList: [],
  navData: [],
  currentNav: {},
}

export default function categoryList (state = INITIAL_STATE, action) {
  switch (action.type) {
    case SET_CATEGORY_NAV:
      return {
        ...state,
        navData: action.navData,
        currentNav: action.currentNav,
      }
    case SET_GOODS_LIST:
      return {
        ...state,
        goodsList: action.data,
        currentNav: action.currentNav,
        nowIndex: action.nowIndex,
      }
     default:
       return state
  }
}
