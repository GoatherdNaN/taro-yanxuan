import Taro, { Component } from '@tarojs/taro'
import { View, ScrollView, Text, Image } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import { asyncGetGoodsList, asyncGetCategoryNav, changeTab } from '../../actions/categoryList'

import './index.less'

@connect(({ categoryList }) => ({
  categoryList
}), dispatch => ({
  getGoodsList (params) {
    dispatch(asyncGetGoodsList(params))
  },
  getCategoryNav (params) {
    dispatch(asyncGetCategoryNav(params))
  },
}))
class CategoryList extends Component {

  config = {
    navigationBarTitleText: '分类商品'
  }

  componentWillMount () { }

  componentDidMount () {
    const id = this.$router.params.id;
    this.props.getCategoryNav({
      id,
    });
  }

  componentWillUnmout () { }

  componentDidShow () { }

  componentDidHide () { }

  handleChangeTab(nowIndex, categoryId) {
    this.fetchData({
      nowIndex,
      categoryId,
    });
  }

  goodsDetail(id) {
    Taro.navigateTo({
      url: '/pages/goods/index?id=' + id
    });
  }

  fetchData = ({ nowIndex, categoryId}) => {
    this.props.getGoodsList({
      nowIndex,
      categoryId,
    });
  }

  render () {
    const {
      categoryList: {
        nowIndex,
        goodsList,
        navData,
        currentNav
      }
    } = this.props;
    return (
      <View className='categoryList'>
        <ScrollView
           scrollX
           className='head'
           scrollLeft={nowIndex > 4 ? nowIndex * 60 : 0}
          >
          {
            navData.map((item, index) => (
              <View
                key={`navData${index}`}
                onClick={this.handleChangeTab.bind(this,index,item.id)}
                className={nowIndex === index ? 'head-item active' : 'head-item'}
              >
                {item.name}
              </View>
            ))
          }
        </ScrollView>
        <View className='info'>
          <Text className='info-name'>{currentNav.name}</Text>
          <Text className='info-desc'>{currentNav.front_desc}</Text>
        </View>
        {
          goodsList.length
          ? (
            <View className='list'>
              {
                goodsList.map((item, index) => (
                  <View
                    key={`goodsList${index}`}
                    className='item'
                    onClick={this.goodsDetail.bind(this,item.id)}
                  >
                    <Image src={item.list_pic_url} alt='' />
                    <Text className='name'>{item.name}</Text>
                    <Text className='price'>￥{item.retail_price}</Text>
                  </View>
                ))
              }
            </View>
          ) : null
        }
      </View>
    )
  }
}
export default CategoryList;
