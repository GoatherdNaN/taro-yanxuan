import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import { asyncGetBrandList } from '../../actions/brand'

import './index.less'

@connect(({ brand }) => ({
  brand
}), dispatch => ({
  getData (params) {
    dispatch(asyncGetBrandList(params))
  }
}))
class Brand extends Component {

  config = {
    navigationBarTitleText: '品牌',
  }
  page = 1;

  componentWillMount () { }

  componentDidMount () {
    this.getListData(true);
  }

  componentWillUnmout () { }

  componentDidShow () { }

  componentDidHide () { }

  onPullDownRefresh() {
    this.page = 1;
    this.getListData(true);
    //刷新完成后关闭
    Taro.stopPullDownRefresh();
  }

  onReachBottom() {
    const { brand: { total } } = this.props;
    this.page += 1;
    if (this.page > total) {
      return false;
    }
    this.getListData();
  }

  getListData = (isFirst=false) => {
    this.props.getData({
      page: this.page,
      isFirst,
    });
  }

  brandDetail(id) {
    Taro.navigateTo({ url: '/pages/branddetail/index?id=' + id });
  }

  render () {
    const { brand: { listData } } = this.props;
    return (
      <View className='brand'>
        {
          listData.map((item, index) => (
            <View onClick={this.brandDetail.bind(this.item.id)} key={item.id} className='list'>
              <Image src={item.app_list_pic_url} alt='' />
                <View className='info'>
                  <Text className='info-item'>{item.name}</Text>
                  <Text className='info-item'>|</Text>
                  <Text className='info-item'>{item.floor_price}元起</Text>
                </View>
              </View>
          ))
        }
      </View>
    )
  }
}
export default Brand;
