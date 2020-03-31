import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'

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
      }
    }
  }

  componentWillMount() {
    console.log(this) // this -> 组件 Menu 的实例
  }

  config = {
    // 定义需要引入的第三方组件
    usingComponents: {
      'ec-canvas': '../../components/ec-canvas/ec-canvas' // 书写第三方组件的相对路径
    }
  }
  
  render() {
    return (
      <View>
        <ec-canvas id='mychart-dom-area' canvas-id='mychart-area' ec={this.state.ec}></ec-canvas>
      </View>
    )
  }
}