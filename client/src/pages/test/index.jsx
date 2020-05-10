import Taro, { Component } from '@tarojs/taro'
import { View,Text ,Canvas} from '@tarojs/components'

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
  initCanvas() {
    const {
      x0, //原点坐标
      y0,
      r, // 半径
      lineWidth, // 画笔宽度
      strokeStyle, //画笔颜色
      LinearGradientColor1, //起始渐变颜色
      LinearGradientColor2, //结束渐变颜色
      Percentage // 进度百分比
    } = this.props;


    const query = Taro.createSelectorQuery();
    query
      .select("#timeCanvas")
      .fields({ node: true })
      .exec(res => {
        const ele = res[0].node;
        let circle = ele.getContext("2d");
        const dpr = Taro.getSystemInfoSync().pixelRatio;
        //创建背景圆
        circle.lineWidth = lineWidth * dpr;
        console.log("lineWidth: ", lineWidth);
        circle.strokeStyle = strokeStyle;
        console.log("strokeStyle: ", strokeStyle);
        circle.lineCap = "round";
        circle.beginPath(); //开始一个新的路径
        circle.arc(x0, y0, r, 0, 2 * Math.PI, false); ///用于绘制圆弧context.arc(x坐标，y坐标，半径，起始角度，终止角度，顺时针/逆时针)
        circle.stroke(); //对当前路径进行描边
        //创建渐变圆环
        let g = circle.createLinearGradient(
          x0,
          0,
          x0 + r * Math.cos(Percentage * (Math.PI * 2)),
          y0 + r * Math.sin(this.props.Percentage * (Math.PI * 2))
        ); //创建渐变对象  渐变开始点和渐变结束点
        g.addColorStop(0, LinearGradientColor1); //添加颜色点
        g.addColorStop(1, LinearGradientColor2);
        circle.lineWidth = lineWidth; //设置线条宽度
        circle.lineCap = "round";
        circle.strokeStyle = g;
        circle.beginPath(); //开始一个新的路径
        circle.arc(
          x0,
          y0,
          r,
          -Math.PI / 2,
          -Math.PI / 2 - Percentage * (Math.PI * 2),
          true
        );
        circle.stroke(); //对当前路径进行描边
      });
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

        <View style={{ width: 300, height: 400, padding: 10 }}>
        <Canvas type='2d' canvasId='timeCanvas'  width={300} height={400}></Canvas>
      </View>
      </View>

      
    )
  }
}