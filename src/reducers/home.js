import { SET_INDEX_DATA } from '../constants/type';

const INITIAL_STATE = {
  banner: [],
  channel: [],
  brandList: [],
  newGoods: [],
  hotGoods: [],
  topicList: [],
  newCategoryList: []
}

export default function home (state = INITIAL_STATE, action) {
  switch (action.type) {
    case SET_INDEX_DATA:
      return {
        ...state,
        banner: action.banner,
        channel: action.channel,
        brandList: action.brandList,
        newGoods: action.newGoods,
        hotGoods: action.hotGoods,
        topicList: action.topicList,
        newCategoryList: action.newCategoryList,
      }
     default:
       return state
  }
}
