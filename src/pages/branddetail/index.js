import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import { connect } from '@tarojs/redux'

import SERVER from '../../utils/request'
import { asyncGetBrandDetail } from '../../actions/brandDetail'

import './index.less'

export const listPageSize = 10;

@connect(({ brandDetail }) => ({
  brandDetail
}), dispatch => ({
  getData (params) {
    dispatch(asyncGetBrandDetail(params))
  }
}))
class BrandDetail extends Component {

  config = {
    navigationBarTitleText: '品牌详情',
  };
  page = 1;

  componentWillMount () { }

  componentDidMount () {
    const id = this.$router.params.id;
    this.getDetail({ id }, true);
  }

  componentWillUnmout () { }

  componentDidShow () { }

  componentDidHide () { }

  onReachBottom() {
    const { brandDetail: { originGoodsList } } = this.props;
    this.page += 1;
    if (this.page > Math.ceil(originGoodsList.length / listPageSize)) {
      return false;
    }
    this.getDetail({page: this.page});
  }

  getDetail = (params, isFirst=false) => {
    this.props.getData({
      isFirst,
      ...params,
    });
  }

  toGoodsDetail(id) {
    Taro.navigateTo({
      url: '/pages/goods/index?id=' + id
    });
  }

  render () {
    const { brandDetail: { originGoodsList: goodsList } } = this.props;
    return (
      <View className='branddetail'>
          <View className='banner'>
              <Image src='http://yanxuan.nosdn.127.net/1541445967645114dd75f6b0edc4762d.png' alt='' />
              <View className='info'>
                  <Text className='info-text'>MUJI制造商</Text>
              </View>
          </View>
          <View className='info-desc'>
              严选精选了MUJI制造商和生产原料， 用几乎零利润的价格，剔除品牌溢价， 让用户享受原品牌的品质生活。
          </View>
          {
            !!goodsList.length && (
              <View className='sortlist'>
                {
                  goodsList.map((item, index) => (
                    <View onClick={this.toGoodsDetail.bind(this,item.id)} key={item.id} className='item'>
                        <Image src={item.list_pic_url} alt='' />
                        <Text className='name'>{item.name}</Text>
                        <Text className='price'>￥{item.retail_price}</Text>
                    </View>
                  ))
                }
              </View>
            )
          }
      </View>
    )
  }
}
export default BrandDetail;
