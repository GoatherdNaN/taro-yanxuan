import { combineReducers } from 'redux'
import home from './home'
import categoryList from './categoryList'
import goods from './goods'
import topic from './topic'
import topicDetail from './topicDetail'
import brand from './brand'
import brandDetail from './brandDetail'
import newGoods from './newGoods'
import category from './category'
import search from './search'

export default combineReducers({
  home,
  categoryList,
  goods,
  topic,
  topicDetail,
  brand,
  brandDetail,
  newGoods,
  category,
  search,
})
