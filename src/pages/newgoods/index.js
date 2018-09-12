import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import { connect } from '@tarojs/redux'

import { asyncGetNewGoods } from '../../actions/newGoods'

import './index.less'


@connect(({ newGoods }) => ({
  newGoods
}), dispatch => ({
  getData (params) {
    dispatch(asyncGetNewGoods(params))
  }
}))
class NewGoods extends Component {

  config = {
    navigationBarTitleText: '',
  };
  page = 1;
  constructor(props){
    super(props);
    this.state = {
      nowIndex: 0,
      order: '',
    }
  }

  componentWillMount () {
    if(this.$router.params.isHot) {
      Taro.setNavigationBarTitle({
        title: '人气推荐',
      });
    }
    if(this.$router.params.isNew) {
      Taro.setNavigationBarTitle({
        title: '新品首发',
      });
    }
  }

  componentDidMount () {
    this.getData(true);
  }

  componentWillUnmout () { }

  componentDidShow () { }

  componentDidHide () { }

  onReachBottom() {
    const { newGoods: { originListData } } = this.props;
    this.page += 1;
    if (this.page > Math.ceil(originListData.length / 10)) {
      return false;
    }
    this.getData(false, {page: this.page});
  }

  changeTab(index) {
    const { order } = this.state;
    let newOrder = '';
    if (index === 1) {
      newOrder = order == 'asc' ? 'desc' : 'asc';
    }
    this.setState({
      nowIndex: index,
      order: newOrder,
    },() => {
      this.getData(true);
    });
  }

  getData = (isFirst=false, params={}) => {
    const { isHot, isNew } = { isHot: false, isNew: false, ...this.$router.params };
    const { order } = this.state;
    this.props.getData({
      isHot,
      isNew,
      order,
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
    const { newGoods: { listData } } = this.props;
    const { nowIndex, order } = this.state;
    return (
      <View className='newgoods'>
        <View className='banner'>
          <Image src='http://yanxuan.nosdn.127.net/8976116db321744084774643a933c5ce.png' alt='' />
        </View>
        <View className='sortnav'>
          <View
            onClick={this.changeTab.bind(this,0)}
            className={`sortnav-item${0 === nowIndex ? ' active' : ''}`}
          >综合</View>
          <View
            onClick={this.changeTab.bind(this,1)}
            className={`sortnav-item price${1 === nowIndex ? ' active':''}${order === 'desc'? ' desc':' asc'}`}
          >价格</View>
          <View
            onClick={this.changeTab.bind(this,2)}
            className={`sortnav-item${2 === nowIndex ? ' active' : ''}`}
          >分类</View>
        </View>
        <View className='sortlist'>
          {
            listData.map((item, index) => (
              <View onClick={this.toGoodsDetail.bind(this,item.id)} key={item.id} className='item'>
                <Image src={item.list_pic_url} alt='' />
                <Text className='name'>{item.name}</Text>
                <Text className='price'>￥{item.retail_price}</Text>
              </View>
            ))
          }
        </View>
      </View>
    )
  }
}
export default NewGoods;
