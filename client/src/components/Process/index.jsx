import Taro, { Component } from "@tarojs/taro";
import { View, Canvas } from "@tarojs/components";

class Process extends Component {
  constructor(props) {
    super(props);
    this.initCanvas = this.initCanvas.bind(this);
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
    const query = Taro.createSelectorQuery().in(this.$scope);
    console.log("query: ", query);
    query
      .select("#timeCanvas")
      .fields({ node: true, size: true })
      .exec(res => {
        console.log("res[0]: ", res);
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
  componentDidMount() {
    this.initCanvas();
  }
  componentDidUpdate() {
    this.initCanvas();
  }
  static defaultProps = {
    canvaswidth: 93, // 画布宽度
    canvasheight: 93, // 画布高度
    x0: 80,
    y0: 80,
    r: 72,
    lineWidth: 16,
    strokeStyle: "rgba(248, 248, 248, 1)",
    LinearGradientColor1: "#3EECED",
    LinearGradientColor2: "#499BE6"
  };
  render() {
    const { width, height, canvaswidth, canvasheight } = this.props;
    return (
      <View style={{ width: width, height: height, padding: 10 }}>
        <Canvas type='2d 'className='timeCanvas'  width={200} height={200}></Canvas>
      </View>
    );
  }
}
export default Process;
