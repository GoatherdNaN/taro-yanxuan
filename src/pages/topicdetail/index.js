import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import { connect } from '@tarojs/redux'

import { isWeapp, isH5 } from '../../constants/env'
import SERVER from '../../utils/request'
import { setTopicDetail } from '../../actions/topicDetail'

import './index.less'
const WxParse = isWeapp ? require('../../components/wxParse/wxParse') : {};

@connect(({ topicDetail }) => ({
  topicDetail
}), dispatch => ({
  getData (params) {
    dispatch(setTopicDetail(params))
  }
}))
class TopicDetail extends Component {

  config = {
    navigationBarTitleText: '专题详情',
  }

  componentWillMount () { }

  componentDidMount () {
    const id = this.$router.params.id;
    this.getData({ id });
  }

  componentWillUnmout () { }

  componentDidShow () { }

  componentDidHide () { }

  getData(params) {
    SERVER.getTopicDetail(params).then(res => {
      if(res.data) {
        if(isWeapp && res.data.data.content) { // 小程序环境才加载
          WxParse.wxParse('topic_Detail', 'html', res.data.data.content, this.$scope, 0)
        }
        this.props.getData(res);
      }
    });
  }

  render () {
    const { topicDetail: { recommendList, topicContent } } = this.props;
    return (
      <View className='topicdetail'>
        <View className='content'>
          {
            isWeapp && (
              <View className='detail'>
                <import src='../../components/wxParse/wxParse.wxml' />
                <template is='wxParse' data='{{wxParseData:topic_Detail.nodes}}'/>
              </View>
            )
          }
          {
            isH5 && !!topicContent && (
              <View className='detail' dangerouslySetInnerHTML={topicContent}></View>
            )
          }
        </View>
        <View className='list'>
          <Text className='title'>专题推荐</Text>
          {
            recommendList.map((item, index) => (
              <View key={item.id} className='item'>
                <Image src={item.scene_pic_url} alt='' />
                <Text className='item-title'>{item.title}</Text>
              </View>
            ))
          }
        </View>
      </View>
    )
  }
}
export default TopicDetail;
