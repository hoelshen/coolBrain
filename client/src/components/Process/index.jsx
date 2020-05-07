import Taro, { Component } from "@tarojs/taro";
import { View, Canvas } from "@tarojs/components";

class Process extends Component {
  static defaultProps = {
    canvasWidth: 100, // 画布宽度
    canvasHeight: 100, // 画布高度
    x0: 50,
    y0: 50,
    r: 50,
    lineWidth: 5,
    strokeStyle: "rgba(248, 248, 248, 1)",
    LinearGradientColor1: "#3EECED",
    LinearGradientColor2: "#499BE6"
  };

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.initCanvas();
  }

  componentDidUpdate() {
    this.initCanvas();
  }

  initCanvas() {
    const lineWidth = 1; 
    const query = Taro.createSelectorQuery().in(this.$scope)
    query.select('#canvas').fields({
      node: true,
      size: true
    }).exec(res => {
        const canvas = res[0].node
        const circle = canvas.getContext('2d')        
        console.log('circle: ', circle);
        const dpr = Taro.getSystemInfoSync().pixelRatio;
        console.log('dpr: ', dpr);
        //创建背景圆
        circle.lineWidth = (lineWidth * dpr );
        circle.lineCap = "round";
        circle.beginPath(); //开始一个新的路径
        circle.strokeStyle = '#000';//边框颜色
        circle.setLineCap = 'round';
        circle.beginPath();
        // 参数分别：圆心的x坐标；圆心的y坐标；圆半径；起始弧度，单位弧度（在3点钟方向）；终止弧度；弧度的方向是否是逆时针
        circle.arc(100, 100, 50, 0, 2 * Math.PI, false);//创建一条弧线
        circle.stroke(); //对当前路径进行描边


      });
  }

  render() {
    const { width, height, canvasWidth, canvasHeight } = this.props;
    console.log(
      "width, height, canvaswidth, canvasheight: ",
      width,
      height,
      canvasWidth,
      canvasHeight
    );
    const cStyle = {
      width:canvasWidth, 
      height:canvasHeight 
    }
    return (
      <View style={{ width: '100%', height: height,margin: '0 auto'}}>
        <Canvas
          type='2d'
          id='canvas'
          style={cStyle}
        ></Canvas>
      </View>
    );
  }
}
export default Process;
