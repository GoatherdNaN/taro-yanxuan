import { isWeapp } from './env'
const METHOD = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE',
};
const POST = isWeapp ? 'https://www.heyuhsuo.xyz/heyushuo' : 'http://localhost:3000';
const getApi = (url, method = METHOD.GET) => ({url: POST + url, method});
/*************************************下面是请求的地址和请求方式集合****************************************/
export const GET_INDEX_DATA = getApi('/index/index');

export const GET_GOODS_LIST = getApi('/goods/goodsList');
export const GET_CATEGORY_NAV = getApi('/category/categoryNav');

export const SUBMIT_ACTION = getApi('/order/submitAction',METHOD.POST);
export const ADD_COLLECT = getApi('/collect/addcollect',METHOD.POST);
export const ADD_CART = getApi('/cart/addCart',METHOD.POST);
export const GET_GOODS_DETAIL = getApi('/goods/detailaction');

export const GET_TOPIC_LIST = getApi('/topic/listaction');

export const GET_TOPIC_DETAIL = getApi('/topic/detailaction');

export const GET_BRAND_LIST = getApi('/brand/listaction');

export const GET_BRAND_DETAIL = getApi('/brand/detailaction');

export const GET_CATEGORY_LIST = getApi('/category/indexaction');
export const GET_CURRENT_CATEGORY = getApi('/category/currentaction');

export const GET_HELPER = getApi('/search/helperaction');
export const CLEAR_HISTORY = getApi('/search/clearhistoryAction');
export const ADD_HISTORY = getApi('/search/addhistoryaction');
export const GET_SEARCH_INDEX = getApi('/search/indexaction');
