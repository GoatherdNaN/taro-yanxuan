import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import { asyncGetTopicList } from '../../actions/topic'

import './index.less'

@connect(({ topic }) => ({
  topic
}), dispatch => ({
  getData (params) {
    dispatch(asyncGetTopicList(params))
  }
}))
class Topic extends Component {

  config = {
    navigationBarTitleText: '专题',
    enablePullDownRefresh: true, // 小程序下拉刷新配置
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
    const { topic: { total } } = this.props;
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

  topicDetail(id) {
    Taro.navigateTo({ url: '/pages/topicdetail/index?id=' + id });
  }

  render () {
    const { topic: { topicList } } = this.props;
    return (
      <View className='topic'>
        <View className='list'>
          {
            topicList.map((item, index) => (
              <View className='topic-item' onClick={this.topicDetail.bind(this,item.id)} key={item.id}>
                <View className='t-img'>
                  <Image src={item.scene_pic_url} alt='' />
                </View>
                <View>
                  <Text className='info title'>{item.title}</Text>
                  <Text className='info subtitle'>{item.subtitle}</Text>
                  <Text className='info price'>{item.price_info}元起</Text>
                </View>
              </View>
            ))
          }
        </View>
      </View>
    )
  }
}
export default Topic;
