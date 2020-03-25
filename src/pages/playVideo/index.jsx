import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image, Button } from '@tarojs/components'


import bottomSign from '@/assets/bottomSign.png';
import mind from '@/assets/btn-wc .png';



import share from '@/assets/fx.png';

import './index.less'

export default class Index extends Component {
  config = {
    navigationBarTitleText: '播放'
  }

  state = {
    isPlay: true
  }
  componentWillMount() {
  }

  componentDidMount() {
    console.log(this.$router.params)
    const { isPlay } = this.$router.params;
    console.log('isPlay: ', isPlay);
    this.setState({ isPlay: isPlay })
  }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }


  onShareAppMessage(res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: '自定义转发标题',
      path: '/page/user?id=123'
    }
  }
  mind() {
    Taro.navigateTo({ url: `/pages/home/index` })
  }

  render() {
    const { isPlay } = this.state;
    console.log('isPlay: ', isPlay);
    return (
      <View className='contain'>
        {isPlay === 1
          ? <View className='playing'>
            已登录
          </View>
          : <View className='played'>

            <View
              className='head'

            >
              <Button class='mind' onClick={this.mind}>
                <Image
                  className='mindImg'
                  src={mind}
                ></Image>
              </Button>
            </View>
            <Image
              className='iconImg topSign'
              src={topSign}
            />
            <Text class='endText'>冥想是一种认真生活的态度。</Text>
            <Image
              className='iconImg bottomSign'
              src={bottomSign}
            />

            <Image
              className='shareImg'
              src={share}
            />
          </View>
        }
      </View>
    )
  }
}