import {
  SET_BRAND_DETAIL,
  CUT_BRAND_DETAIL,
} from '../constants/type';

const listPageSize = 10;
const INITIAL_STATE = {
  originGoodsList: [],
  goodsList: [],
}

export default function brandDetail (state = INITIAL_STATE, action) {
  switch (action.type) {
    case SET_BRAND_DETAIL:
      return {
        ...state,
        originGoodsList: action.goodsList,
        goodsList: action.goodsList.slice(0, listPageSize),
      }
    case CUT_BRAND_DETAIL:
      return {
        ...state,
        goodsList: state.originGoodsList.slice(0, action.page * listPageSize),
      }
     default:
       return state
  }
}
