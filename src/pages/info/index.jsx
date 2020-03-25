import Taro, { Component } from '@tarojs/taro'
import { View, Image, Text, Button } from "@tarojs/components";
import { observer, inject } from "@tarojs/mobx";
import share from '@/assets/share.png';


import './index.less'



@inject('userStore')
@observer
export default class Index extends Component {


  componentWillMount() {
    console.log(22)
    console.log(this.$router.params) //
  }


  componentDidMount() {
    console.log('66')

  }

  componentWillUnmount() { }

  static options = {
    addGlobalClass: true
  }

  config = {
    navigationBarTitleText: '个人页面'
  }

  componentDidShow() {
    console.log('88')

  }

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
  toHome() {
    Taro.navigateTo({ url: `/pages/home/index` })
  }
  static externalClasses = ['flex']
  render() {
    const { userStore: { avatarUrl, name, useTime, useDay } } = this.props

    return (
      <View className='body flex column j-around'>
        <View className='head'>
          <View className='shareDiv'>
            <Text className='mind'>我的冥想</Text>
            <Image className='share' src={share}></Image>
          </View>
          <View className='boder column'>
            <Image
              className='avatarImg'
              src={avatarUrl}
            />
            <Text className='name'>{name}</Text>
          </View>
        </View>
        <View className='contain flex column a-center'>
          <Text className='min'>累计冥想分钟</Text>
          <Text className='minNum'>{useTime}</Text>
          <Text className='minText'>MIN</Text>
          <Text className='day'>累计冥想天数</Text>
          <Text className='dayNum'>{useDay}</Text>
          <Text className='dayText'>DAY</Text>
        </View>
        <View className='foot'>
          <Button className='btn' onClick={this.toHome}>继续冥想</Button>
        </View>
      </View>
    )
  }
}