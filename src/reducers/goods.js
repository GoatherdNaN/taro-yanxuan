import {
  SET_GOODS_DETAIL,
  ADD_COLLECT,
  ADD_CART,
} from '../constants/type';

const INITIAL_STATE = {
  gallery: [],
  info: {},
  allNumber: 0,
  collectFlag: false,
  brand: {},
  attribute: [],
  issueList: [],
  productList: [],
  goods_desc: "",
  goodsId: "",
  allPrise: "",
}

export default function goods (state = INITIAL_STATE, action) {
  switch (action.type) {
    case SET_GOODS_DETAIL:
      return {
        ...state,
        gallery: action.gallery.length ? action.gallery : [{ img_url: action.info.primary_pic_url }],
        info: action.info,
        allPrise: action.info.retail_price,
        goodsId: action.info.id,
        brand: action.brand,
        attribute: action.attribute,
        goods_desc: action.info.goods_desc,
        issueList: action.issue,
        collectFlag: action.collected,
        allNumber: action.allnumber,
        productList: action.productList,
      }
    case ADD_COLLECT:
      return {
        ...state,
        collectFlag: !state.collectFlag,
      }
    case ADD_CART:
      return {
        ...state,
        allNumber: state.allNumber + action.number,
      }
     default:
       return state
  }
}
