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
          x0 + r * Math.floor(Math.cos(Percentage * (Math.PI * 2))),
          y0 + r * Math.floor(Math.sin(this.props.Percentage * (Math.PI * 2)))
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
        // ('canvas', this.$scope)
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
