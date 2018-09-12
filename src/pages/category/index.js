import Taro, { Component } from '@tarojs/taro'
import { ScrollView, View, Text, Image } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import { asyncGetCategoryList, asyncGetCurrentCategory } from '../../actions/category'

import './index.less'

@connect(({ category }) => ({
  category
}), dispatch => ({
  getListData (params) {
    dispatch(asyncGetCategoryList(params))
  },
  selectItem (params) {
    dispatch(asyncGetCurrentCategory(params))
  }
}))
class Category extends Component {

  config = {
    navigationBarTitleText: '分类',
  }
  constructor(props){
    super(props);
    this.state = {
      nowIndex: 0,
      id: '1005000',
    }
  }

  componentWillMount () { }

  componentDidMount () {
    //获取列表数据
    this.props.getListData();
    //获取默认右侧数据
    this.selectItem();
  }

  componentWillUnmout () { }

  componentDidShow () { }

  componentDidHide () { }

  tosearch = () => {
    Taro.navigateTo({ url: '/pages/search/index' });
  }

  handleChoose(id, nowIndex) {
    this.setState({ id, nowIndex },() => {
      this.selectItem();
    });
  }

  selectItem = () => {
    const { id } = this.state;
    this.props.selectItem({ id });
  }

  categoryList(id) {
    Taro.navigateTo({
      url: '/pages/categorylist/index?id=' + id
    });
  }

  render () {
    const { category: { listData, detailData } } = this.props;
    const { nowIndex } = this.state;
    return (
      <View className='category'>
        <View className='search' onClick={this.tosearch}>
          <View className='ser'>
            <Text className='ser-item icon'></Text>
            <Text className='ser-item'>商品搜索,共239款好物</Text>
          </View>

        </View>
        <View className='content'>
          <ScrollView className='left' scrollY>
            {
              listData.map((item, index) => (
                <View
                  className={`iconText${index === nowIndex ? ' active' : ''}`}
                  onClick={this.handleChoose.bind(this,item.id,index)}
                  key={item.id}
                >
                  {item.name}
                </View>
              ))
            }
          </ScrollView>
          <ScrollView className='right' scrollY>
            <View className='banner'>
              <Image src={detailData.banner_url} alt='' />
            </View>
            <View className='title'>
              <Text className='flag'>—</Text>
              <Text className='name'>{detailData.name}分类</Text>
              <Text className='flag'>—</Text>
            </View>
            <View className='bottom'>
              {
                !!detailData.subList && detailData.subList.map((item,index) => (
                  <View onClick={this.categoryList.bind(this,item.id)} key={item.id} className='item'>
                    <Image src={item.wap_banner_url} alt='' />
                    <Text className='name'>{item.name}</Text>
                  </View>
                ))
              }
            </View>
          </ScrollView>
        </View>
      </View>
    )
  }
}
export default Category;
