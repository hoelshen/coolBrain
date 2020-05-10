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
    const { score } = this.props;
    this.initCanvas(score*10, 100,100);
  }
  canvasTap(start, end, time, w, h) {  //传入开始百分比和结束百分比的值，动画执行的时间，还有圆心横纵坐标
    var that = this;
    start++;
    if (start > end) {
      return false;
    }
    that.initCanvas(start, w, h); //调用run方法
    setTimeout(function () {
      that.canvasTap(start, end, time, w, h);
    }, time);
  }
  initCanvas(c=40, w =100, h =100) {  //c是圆环进度百分比   w，h是圆心的坐标
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
        circle.strokeStyle = '#000';//边框颜色
        circle.setLineCap = 'round';
        circle.beginPath();
        // 参数分别：圆心的x坐标；圆心的y坐标；圆半径；起始弧度，单位弧度（在3点钟方向）；终止弧度；弧度的方向是否是逆时针
        circle.arc(100, 50, 50, 0, Math.PI * 2, false);//创建一条弧线
        circle.stroke(); //对当前路径进行描边

        //新得圆弧
        //开始绘制百分比数字
        circle.beginPath();
        circle.font= 49; // 字体大小 注意不要加引号
        circle.fillStyle = '#ff5000';	 // 字体颜色
        circle.setTextAlign = 'center';	 // 字体位置
        circle.setTextBaseline ='middle';	 // 字体对齐方式
        circle.fillText(c + "%", w, h);	 // 文字内容和文字坐标
        var num = (2 * Math.PI / 100 * c) - 0.5 * Math.PI;
        //圆环的绘制
        circle.arc(100, 50, 50, -0.5 * Math.PI, num); //绘制的动作
        circle.strokeStyle='#ff5000'; //圆环线条的颜色
        circle.lineWidth=8;	//圆环的粗细
        circle.setLineCap='butt';	//圆环结束断点的样式  butt为平直边缘 round为圆形线帽  square为正方形线帽
        circle.stroke();
        circle.draw(true);
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
