import Taro, { Component } from '@tarojs/taro'
import { connect } from '@tarojs/redux'
import { View, Swiper, SwiperItem, Text, Image, RichText, Input } from '@tarojs/components'

import { isWeapp, isH5 } from '../../constants/env'
import SERVER from '../../utils/request'
import { toLogin, login, getStorageOpenid } from '../../utils'
import { setGoodsDetail, asyncSubmitAction, asyncAddCollect, asyncAddCart } from '../../actions/goods'
import shoppingCarNor from '../../asset/images/ic_menu_shoping_nor.png';
import './index.less'
const WxParse = isWeapp ? require('../../components/wxParse/wxParse') : {};


@connect(({ goods }) => ({
  goods
}), dispatch => ({
  setGoodsDetail (params) {
    dispatch(setGoodsDetail(params))
  },
  submit (params) {
    dispatch(asyncSubmitAction(params))
  },
  addCollect (params) {
    dispatch(asyncAddCollect(params))
  },
  addCart (params) {
    dispatch(asyncAddCart(params))
  },
}))
export default class Toptic extends Component {

  config = {
    navigationBarTitleText: '商品详情',
  }
  constructor(props){
    super(props);
    this.state = {
      number: 0,
      showPop: false,
    }
  }

  componentDidMount() {
    if (login()) {
      this.userInfo = login();
    }
    const id = this.$router.params.id;
    const openId = getStorageOpenid();
    this.goodsDetail({id, openId});
  }
  toGoodsDetail(id) {
    Taro.navigateTo({
      url: '/pages/goods/index?id=' + id
    });
  }
  add = () => {
    this.setState(preState => ({
      number: preState.number + 1,
    }));
  }
  reduce = () => {
    const { number } = this.state;
    if (number > 1) {
      this.setState(preState => ({
        number: preState.number - 1,
      }));
    }
  }
  buy = () => {
    const { goods: { goodsId, allPrise } } = this.props;
    const { number, showPop } = this.state;
    if (toLogin()) {
      if (showPop) {
        if (!number) {
          Taro.showToast({
            title: '请选择商品数量', //提示的内容,
            duration: 2000, //延迟时间,
            icon: 'none',
            mask: true, //显示透明蒙层，防止触摸穿透,
            success: res => {}
          });
          return false;
        }

        this.props.submit({
          goodsId: goodsId,
          openId: this.userInfo.openId,
          allPrise: allPrise
        });
      } else {
        this.setState({
          showPop: true,
        });
      }
    } else {
      Taro.navigateTo({
        url: '/pages/login/index?page=good',
      });
    }
  }
  collect = () => {
    const { goods: { goodsId } } = this.props;
    if (toLogin()) {
      this.collectFlag = !this.collectFlag;
      this.props.addCollect({
        openId: this.userInfo.openId,
        goodsId: goodsId,
      });
    } else {
      Taro.navigateTo({
        url: '/pages/login/index?page=good',
      });
    }
  }
  addCart = () => {
    const { goods: { goodsId } } = this.props;
    const { number, showPop } = this.state;
    if (toLogin()) {
      if (showPop) {
        if (!number) {
          Taro.showToast({
            title: '请选择商品数量', //提示的内容,
            duration: 2000, //延迟时间,
            icon: 'none',
            mask: true, //显示透明蒙层，防止触摸穿透,
            success: res => {}
          });
          return false;
        }
        this.props.addCart({
          openId: this.userInfo.openId,
          goodsId: goodsId,
          number: number
        });
      } else {
        this.setState({
          showPop: true,
        });
      }
    } else {
      Taro.navigateTo({
        url: '/pages/login/index?page=good',
      });
    }
  }
  toCart = () => {
    Taro.switchTab({
      url: '/pages/cart/main'
    });
  }
  goodsDetail = (params) => {
    SERVER.getGoodsDetail(params).then(res => {
      if(res.data) {
        if(isWeapp && res.data.info.goods_desc) { // 小程序环境才加载
          WxParse.wxParse('goodsDesc', 'html', res.data.info.goods_desc, this.$scope, 0)
        }
        this.props.setGoodsDetail(res);
      }
    })
  }
  showType = () => {
    this.setState(preState => ({
      showPop: !preState.showPop,
    }));
  }
  render () {
    const {
      goods: {
        gallery,
        info,
        allNumber,
        collectFlag,
        brand,
        attribute,
        issueList,
        productList,
        goods_desc,
      }
    } = this.props;
    const { number, showPop } = this.state;
    return (
      <View className='goods'>
        <View className='swiper'>
          <Swiper
            className='swiper-container'
            indicatorDots={gallery.length > 1}
            autoplay
            circular
            interval={3000}>
            {
              gallery.map((item, index) => (
                <SwiperItem className='swiper-item' key={`gallery${index}`}>
                  <Image src={item.img_url} className='slide-image' />
                </SwiperItem>
              ))
            }
          </Swiper>
        </View>
        <View className='swiper-b'>
          <View className='item'>30天无忧退货</View>
          <View className='item'>48小时快速退款</View>
          <View className='item'>满88元免邮费</View>
        </View>
        <View className='goods-info'>
          <View className='c'>
            <Text className='c-info'>{info.name}</Text>
            <Text className='c-info'>{info.goods_brief}</Text>
            <Text className='c-info'>￥{info.retail_price}</Text>
            {
              !!brand.name && (
                <View className='brand'>
                  <Text className='brand-name'>{brand.name}</Text>
                </View>
              )
            }
          </View>
        </View>
        <View onClick={this.showType} className='section-nav'>
          <View>请选择规格数量</View>
          <View className='icon-box'></View>
        </View>
        {/*
          <View onClick='showType' className='section-nav'>
            <View>用户评价</View>
            <View></View>
          </View>
          */}
        {
          !!attribute.length && (
            <View className='attribute'>
              <View className='head'>
                商品参数
              </View>
              {
                attribute.map((item,index) => (
                  <View
                    key={`attribute${index}`}
                    className={
                      index === 0
                      ? 'item first'
                      : index === attribute.length
                        ? 'item last'
                        : 'item'
                    }
                  >
                    <View className='item-name'>{item.name}</View>
                    <View className='item-value'>{item.value}</View>
                  </View>
                ))
              }
            </View>
          )
        }
        {
          isWeapp && (
            <View className='detail'>
              <import src='../../components/wxParse/wxParse.wxml' />
              <template is='wxParse' data='{{wxParseData:goodsDesc.nodes}}'/>
            </View>
          )
        }
        {
          isH5 && (
            <div className='detail-h5' dangerouslySetInnerHTML={{__html: goods_desc}}></div>
          )
        }
        <View className='common-problem'>
          <View className='h'>
            <View className='line'></View>
            <Text className='title'>常见问题</Text>
            <View className='line'></View>
          </View>
          <View className='b'>
            {
              issueList.map((item, index) => (
                <View className='item' key={`issueList${index}`}>
                  <View className='question-box'>
                    <Text className='spot'></Text>
                    <Text className='question'>{item.question}</Text>
                  </View>
                  <View className='answer'>
                    {item.answer}
                  </View>
                </View>
              ))
            }
          </View>
        </View>

        <View className='common-problem'>
          <View className='h'>
            <View className='line'></View>
            <Text className='title'>大家都在看</Text>
            <View className='line'></View>
          </View>
          <View className='sublist'>
            {
              productList.map((subitem, subindex) => (
                <View
                  key={`subindex${subindex}`}
                  onClick={this.toGoodsDetail.bind(this,subitem.id)}
                  className='sublist-item'
                  >
                  <Image className='info' src={subitem.list_pic_url} alt='' />
                  <Text className='info name'>{subitem.name}</Text>
                  <Text className='info price'>￥{subitem.retail_price}</Text>
                </View>
              ))
            }
          </View>
        </View>
        <View className='bottom-fixed'>
          <View className='collect-box' onClick={this.collect}>
            <View className={collectFlag ? 'collect active' : 'collect'}></View>
          </View>
          <View className='shop-car' onClick={this.toCart}>
            <View className='car'>
              <View className='dots'>
                {allNumber}
              </View>
              <Image src={shoppingCarNor} alt='' />
            </View>
          </View>
          <View className='shoping-now' onClick={this.buy}>立即购买</View>
          <View className='add-to-car' onClick={this.addCart}>加入购物车</View>
        </View>
        <View onClick={this.showType} className={showPop ? 'pop' : 'pop hide'}></View>
        <View className={showPop ? 'attr-pop fadeup' : 'attr-pop fadedown'}>
          <View className='top'>
            <View className='left'>
              <Image src={info.primary_pic_url} alt='' />
            </View>
            <View className='right'>
              <View>
                <Text className='right-item right-price'>价格￥{info.retail_price}</Text>
                <Text className='right-item'>请选择数量</Text>
              </View>
            </View>
            <View onClick={this.showType} className='close'>
              X
            </View>
          </View>
          <View className='b'>
            <Text className='b-title'>数量</Text>
            <View className='count'>
              <View onClick={this.reduce} className='cut'>-</View>
              <Input className='number' disabled='' value={number} />
              <View onClick={this.add} className='add'>+</View>
            </View>
          </View>
        </View>
      </View>
    )
  }
}
