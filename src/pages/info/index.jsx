import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import './index.less'

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
      <View className='head'>
        <Text>1</Text>
      </View>
    )
  }
}