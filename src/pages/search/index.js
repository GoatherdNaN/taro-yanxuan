import Taro, { Component } from '@tarojs/taro'
import { connect } from '@tarojs/redux'
import { View, Text, Image, Input } from '@tarojs/components'

import {
  asyncGetHelper,
  asyncClearHistory,
  asyncAddHistory,
  asyncGetSearchIndex,
  clearListData,
  clearTipsData,
} from '../../actions/search'

import './index.less'

@connect(({ search }) => ({
  search
}), dispatch => ({
  getHelper (params) {
    dispatch(asyncGetHelper(params))
  },
  clearHistory (params) {
    dispatch(asyncClearHistory(params))
  },
  addHistory (params) {
    dispatch(asyncAddHistory(params))
  },
  getSearchIndex (params) {
    dispatch(asyncGetSearchIndex(params))
  },
  clearListData (params) {
    dispatch(clearListData(params))
  },
  clearTipsData (params) {
    dispatch(clearTipsData(params))
  },
}))
class Search extends Component {

  config = {
    navigationBarTitleText: '搜索',
  }

  constructor(props){
    super(props);
    this.state = {
      nowIndex: 0,
      words: '',
      order: '',
    }
  }

  componentWillMount () {
    this.openid = Taro.getStorageSync('openid') || '';
    this.props.getSearchIndex({openid: this.openid});
  }

  componentDidMount () { }

  componentWillUnmout () { }

  componentDidShow () { }

  componentDidHide () { }

  searchWords = () => {
    const { words } = this.state;
    this.props.addHistory({
      openId: this.openid,
      keyword: words,
    });
    //获取历史数据
    this.props.getSearchIndex({openid: this.openid});
    //获取商品列表
    this.getlistData();
  }

  getlistData = (e, isSearchTips=false) => {
    const keyword = isSearchTips ? this.state.words : e.detail.value;
    const { order } = this.state;
    const params = {
      keyword,
    };
    if(!isSearchTips) {
      this.setState({
        words: keyword,
      });
      params.order = order;
    }
    //获取商品列表
    this.props.getHelper(params);
  }


  goodsDetail(id) {
    Taro.navigateTo({
      url: '/pages/goods/index?id=' + id
    });
  }

  cancel = () => {
    Taro.navigateBack({
      delta: 1 //返回的页面数，如果 delta 大于现有页面数，则返回到首页,
    });
  }

  clearInput = () => {
    this.setState({
      words: '',
    });
    this.props.clearListData();
    this.props.clearTipsData();
  }

  inputFocus = () => {
    //商品清空
    this.props.clearListData();
    //展示搜索提示信息
    this.getlistData('', true);
  }

  changeTab(nowIndex) {
    this.setState(preState => ({
      nowIndex,
      order: nowIndex === 1 ? preState.order === 'asc' ? 'desc' : 'asc' : '',
    }),() => {
      this.getlistData();
    });
  }

  topicDetail(id) {
    Taro.navigateTo({
      url: '/pages/topicdetail/index?id=' + id
    });
  }

  clearHistory = () => {
    this.props.clearHistory({openid: this.openid});
  }

  render () {
    const {
      search: {
        historyData,
        hotData,
        tipsData,
        listData
      }
    } = this.props;
    const { words, nowIndex } = this.state;
    return (
      <View className='search'>
        <View className='head'>
          <View className='head-content'>
            <Image src='http://nos.netease.com/mailpub/hxm/yanxuan-wap/p/20150730/style/img/icon-normal/search2-2fb94833aa.png' alt='' />
            <Input
              focus
              type='text'
              // value={words}
              className='search-input'
              confirmType='search'
              onFocus={this.inputFocus}
              onInput={this.getlistData}
              onConfirm={this.searchWords}
              placeholderClass='search-placeholder'
              placeholder='商品搜索'
            />
            <Image
              className='del'
              onClick={this.clearInput}
              src='http://nos.netease.com/mailpub/hxm/yanxuan-wap/p/20150730/style/img/icon-normal/clearIpt-f71b83e3c2.png'
              alt=''
            />
          </View>
          <View className='cancel-btn' onClick={this.cancel}>取消</View>
        </View>
        {
          !!words && (
            <View className='searchtips'>
              {
                !!tipsData.length
                ? tipsData.map((item,index) => (
                  <View
                    className='searchtips-item'
                    onClick={this.searchWords.bind(this,item.name)}
                    key={item.id}
                  >
                    { item.name }
                  </View>
                )) : (
                  <View className='nogoods'>
                    数据库暂无此类商品...
                  </View>
                )
              }
            </View>
          )
        }
        {
          !!historyData && (
            <View className='history'>
              <View className='t'>
                <View>历史记录</View>
                <View className='t-icon' onClick={this.clearHistory}>

                </View>
              </View>
              <View className='cont'>
                {
                  historyData.map((item,index) => (
                    <View
                      className='history-item'
                      onClick={this.searchWords.bind(this,item.keyword)}
                      key={item.id}
                    >
                      {item.keyword}
                    </View>
                  ))
                }
              </View>
            </View>
          )
        }
        <View className='history hotsearch'>
          <View className='t'>
            <View>热门搜索</View>
          </View>
          <View className='cont'>
            {
              hotData.map((item,index) => (
                <View
                  key={item.id}
                  className={index ? '' : 'active'}
                  onClick={this.searchWords.bind(this,item.keyword)}
                >
                  {item.keyword}
                </View>
              ))
            }
          </View>
        </View>
        {
          !!listData.length && (
            <View className='goodsList'>
              <View className='sortnav'>
                <View
                  onClick={this.changeTab.bind(this,0)}
                  className={`sortnav-item${nowIndex ? '' : ' active'}`}
                >综合</View>
                <View
                  onClick={this.changeTab.bind(this,1)}
                  className={`sortnav-item price${1 === nowIndex ? ' active':''}${order === 'desc'? ' desc':' asc'}`}
                >价格</View>
                <View
                  onClick={this.changeTab.bind(this,2)}
                  className={`sortnav-item${nowIndex === 2 ? '' : ' active'}`}
                >分类</View>
              </View>
              <View className='sortlist'>
                {
                  listData.map((item,index) => (
                    <View
                      onClick={this.goodsDetail.bind(this,item.id)}
                      key={item.id}
                      className={`item${listData.length % 2 ? ' none' : ' active'}`}
                    >
                      <Image src={item.list_pic_url} alt='' />
                      <Text className='name' className='name'>{item.name}</Text>
                      <Text className='price'>￥{item.retail_price}</Text>
                    </View>
                  ))
                }
              </View>
            </View>
          )
        }
      </View>
    )
  }
}
export default Search;
