import Taro, { Component } from '@tarojs/taro'
import { Swiper, SwiperItem, View, Image, ScrollView, Text } from '@tarojs/components'
import { connect } from '@tarojs/redux'

import { asyncGetIndexData } from '../../actions/home'

import './index.less'


@connect(({ home }) => ({
  home
}), dispatch => ({
  getData () {
    dispatch(asyncGetIndexData())
  }
}))
class Index extends Component {

  config = {
    navigationBarTitleText: '首页'
  }

  // componentWillReceiveProps (nextProps) {
  //   console.log(this.props, nextProps)
  // }

  componentDidMount () {
    this.props.getData();
  }

  componentDidShow () { }

  componentDidHide () { }

  categoryList(id) {
    Taro.navigateTo({
      url: '/pages/categorylist/index?id=' + id
    });
  }

  goodsDetail(id) {
    Taro.navigateTo({
      url: '/pages/goods/index?id=' + id
    });
  }

  goodsList(info) {
    if (info === 'hot') {
      Taro.navigateTo({
        url: '/pages/newgoods/index?isHot=' + 1
      });
    } else {
      Taro.navigateTo({
        url: '/pages/newgoods/index?isNew=' + 1
      });
    }
  }

  topicDetail(id) {
    Taro.navigateTo({ url: '/pages/topicdetail/index?id=' + id });
  }

  toBrandList = () => {
    Taro.navigateTo({ url: '/pages/brand/index' });
  }

  brandDetail(id) {
    Taro.navigateTo({ url: '/pages/branddetail/index?id=' + id });
  }

  toTopic = () => {
    Taro.switchTab({
      url: '/pages/topic/index',
    })
  }

  render () {
    const {
      home: {
        banner,
        channel,
        brandList,
        newGoods,
        hotGoods,
        topicList,
        newCategoryList
      }
    } = this.props;
    return (
      <View className='index'>
        <View className='swiper'>
          <Swiper
            className='swiper-container'
            indicatorDots
            autoplay
            circular
            interval={3000}>
            {
              banner.map((item, index) => (
                <SwiperItem className='swiper-item' key={`banner${index}`}>
                  <Image src={item.image_url} className='slide-image' />
                </SwiperItem>
              ))
            }
          </Swiper>
        </View>
        <View className='channel'>
          {
            channel.map((item, index) => (
              <View
                className='channel-item'
                key={`channel${index}`}
                onClick={this.categoryList.bind(this,item.id)}
              >
                <Image src={item.icon_url} alt='' />
                {/* 下面是数据错误，这里转换一下 */}
                <Text class='channel-name'>{item.name === '服装' ? '饮食' : item.name}</Text>
              </View>
            ))
          }
        </View>
        <View className='brand'>
          <View onClick={this.toBrandList} className='head'>
            品牌制造商直供
          </View>
          <View className='content'>
            {
              brandList.map((item, index) => (
                <View className='brand-item' key={`brandList${index}`} onClick={this.brandDetail.bind(this,item.id)}>
                  <View className='brand-item-text'>
                    <Text className='brand-item-text-name'>{item.name}</Text>
                    <Text className='brand-item-text-price'>{item.floor_price}元起</Text>
                  </View>
                  <Image src={item.new_pic_url} alt='' />
                </View>
              ))
            }
          </View>
        </View>
        <View className='newgoods'>
          <View onClick={this.goodsList.bind(this,'new')} className='newgoods-top'>
            <View className='top'>
              <Text className='top-title'>新品首发</Text>
              <Text className='top-more'>查看全部</Text>
            </View>
          </View>
          <View className='list'>
            <ScrollView className='scroll-view' scrollX>
              {
                newGoods.map((item, index) => (
                  <View key={`newGoods${index}`} className='newGoods-item' onClick={this.goodsDetail.bind(this,item.id)}>
                    <Image src={item.list_pic_url} alt='' />
                    <Text class='newGoods-item-text newGoods-item-name'>{item.name}</Text>
                    <Text class='newGoods-item-text newGoods-item-brief'>{item.goods_brief}</Text>
                    <Text class='newGoods-item-text newGoods-item-price'>￥{item.retail_price}</Text>
                  </View>
                ))
              }
            </ScrollView>
          </View>
        </View>
        <View className='newgoods hotgoods'>
          <View onClick={this.goodsList.bind(this,'hot')} className='newgoods-top'>
            <View className='top'>
              <Text className='top-title'>人气推荐
                · 好物精选</Text>
              <Text className='top-more'>查看全部</Text>
            </View>
          </View>
          <View className='list'>
            <ScrollView className='scroll-view' scrollX>
              {
                hotGoods.map((item, index) => (
                  <View key={`newGoods${index}`} className='newGoods-item' onClick={this.goodsDetail.bind(this,item.id)}>
                    <Image src={item.list_pic_url} alt='' />
                    <Text class='newGoods-item-text newGoods-item-name'>{item.name}</Text>
                    <Text class='newGoods-item-text newGoods-item-brief'>{item.goods_brief}</Text>
                    <Text class='newGoods-item-text newGoods-item-price'>￥{item.retail_price}</Text>
                  </View>
                ))
              }
            </ScrollView>
          </View>
        </View>
        <View className='topicList'>
          <View className='topicList-top' onClick={this.toTopic}>
            专题精选
            <Text className="icon"></Text>
          </View>
          <View className='list'>
            <ScrollView className='scroll-view' scrollX>
              {
                topicList.map((item, index) => (
                  <View key={`topicList${index}`} className='scroll-view-item' onClick={this.topicDetail.bind(this,item.id)}>
                    <Image src={item.item_pic_url} alt='' />
                    <View className='btom'>
                      <View class='btom-item'>
                        <Text className='btom-item-title'>{item.title}</Text>
                        <Text className='btom-item-subtitle'>{item.subtitle}</Text>
                      </View>
                      <View className='btom-price'>
                        {item.price_info}元起
                      </View>
                    </View>
                  </View>
                ))
              }
            </ScrollView>
          </View>
        </View>
        <View className='new-category'>
          {
            newCategoryList.map((item, index) => (
              <View key={`newCategoryList${index}`} className='list'>
                <View className='head'>
                  {item.name}好物
                </View>
                <View className='sublist'>
                  {
                    item.goodsList.map((v, i) => (
                      <View className='sublist-item' key={`item_goodsList${index}`} onClick={this.goodsDetail.bind(this,v.id)}>
                        <Image src={v.list_pic_url} alt='' />
                        <Text className='sublist-item-name'>{v.name}</Text>
                        <Text className='sublist-item-price'>￥{v.retail_price}</Text>
                      </View>
                    ))
                  }
                  <View onClick={this.categoryList.bind(this,item.id)}>
                    <View className='last'>
                      <Text className='last-title'>{item.name}好物</Text>
                      <span className='icon'></span>
                    </View>
                  </View>
                </View>
              </View>
            ))
          }
        </View>
      </View>
    )
  }
}

export default Index
