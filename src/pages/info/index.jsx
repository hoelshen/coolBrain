import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import './index.less'


import head from '@/assets/head.png';
import share from '@/assets/share.png';
import btn from '@/assets/btn.png';

export default class Index extends Component {
  config = {
    navigationBarTitleText: '个人页面'
  }

  componentWillMount () { 
    console.log(22)
    console.log(this.$router.params) //
  }

  componentDidMount () { 
    console.log('66')

  }

  componentWillUnmount () { }

  componentDidShow () { 
    console.log('88')

  }

  componentDidHide () { }


  onShareAppMessage (res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: '自定义转发标题',
      path: '/page/user?id=123'
    }
  }
  
  render () {

    return (
      <View className='body'>
        <View className='head'>
          <Text>我的冥想</Text>
        </View>
        <View>
       {/*    <Image
            className='img'
            src={avatarUrl}
          /> */}
        </View>
      </View>
    )
  }
}