import Taro, { Component } from '@tarojs/taro'
import { View,Text } from '@tarojs/components'

function initChart() {
  // ....
}

export default class Menu extends Component {
  static defaultProps = {
    data: []
  }


  constructor(props) {
    super(props)
    this.state = {
      ec: {
        onInit: initChart
      },
      reachTop: true,
      showPayWay: true,
      aniShowPayWay: true
    }
  }

  componentWillMount() {
    console.log(this) // this -> 组件 Menu 的实例
  }
  onAnimationEnd () {
    if (!this.state.aniShowPayWay) {
      this.setState({
        showPayWay: false
      })
    }
  }

  onPageScroll(e) {
    // e.scrollTop 为 0，且 this.state.reachTop 为 false
    if (!e.scrollTop && !this.state.reachTop) {
      this.setState({
        reachTop: true
      })
    }

    if (this.state.reachTop) {
      this.setState({
        reachTop: false
      })
    }
  }

  config = {
    // 定义需要引入的第三方组件
    usingComponents: {
      'ec-canvas': '../../components/ec-canvas/ec-canvas' // 书写第三方组件的相对路径
    }
  }

  render() {
    const { reachTop, showPayWay,aniShowPayWay } = this.state;
    return (
      <View>
        <View className={reachTop ? 'balance_addr top' : 'balance_addr'}>
          <View className='balance_addr_icon' />
          <Text className='balance_addr_text'> 广东省深圳市宝安区龙光世纪大厦 </Text>
        </View>
        <ec-canvas id='mychart-dom-area' canvas-id='mychart-area' ec={this.state.ec}></ec-canvas>
        {
          showPayWay &&
          <View className={aniShowPayWay ? 'balance_pay_choose show' : 'balance_pay_choose'}>
            <View className='mask' onAnimationEnd={this.onAnimationEnd}></View>
            <View className='main'>...</View>
          </View>
        }
      </View>
    )
  }
}