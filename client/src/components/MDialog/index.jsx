
/* eslint-disable import/first */
import Taro, { Component } from '@tarojs/taro'
import { View,  } from '@tarojs/components'

import './index.less'

class Dialog extends Component {

  open(){
    console.log('open')
  }

  render () {
    return (
      <View className='dialog'>
        <View className='header'>
          {this.props.renderHeader}
        </View>
        <View className='body'>
          {this.props.children}
        </View>
        <View className='footer'>
          {this.props.renderFooter}
        </View>
      </View>
    )
  }
}

export default Dialog