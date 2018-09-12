import {
  SET_GOODS_DETAIL,
  ADD_COLLECT,
  ADD_CART,
} from '../constants/type';
import SERVER from '../utils/request';

export function setGoodsDetail(res) {
  return {
    type: SET_GOODS_DETAIL,
    ...res.data,
  }
};
const addCollect = res => ({
  type: ADD_COLLECT,
  ...res.data,
});
const addCart = data => ({
  type: ADD_CART,
  ...data,
});

// 异步的action
// export function asyncGetGoodsDetail (params) {
//   return dispatch => {
//     SERVER.getGoodsDetail(params).then(res => {
//       dispatch(setGoodsDetail(res))
//     });
//   }
// }
export function asyncSubmitAction (params) {
  return dispatch => {
    SERVER.submitAction(params).then(res => {
      if(res.data) {
        console.log('提交成功！')
      }
    });
  }
}
export function asyncAddCollect (params) {
  return dispatch => {
    SERVER.addCollect(params).then(res => {
      dispatch(addCollect(res))
    });
  }
}
export function asyncAddCart (params) {
  return dispatch => {
    SERVER.addCart(params).then(res => {
      if(res.data) {
        dispatch(addCart({
          number: params.number,
        }));
        wx.showToast({
          title: "添加购物车成功",
          icon: "success",
          duration: 1500
        });
      }
    });
  }
}
