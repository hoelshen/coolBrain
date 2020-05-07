import Taro, { Component } from "@tarojs/taro";
import { View } from "@tarojs/components";
import classNames from "classnames";

import "./index.less";

class Percentage extends Component {
    constructor(props){
      super(props)
      this.state={
        dotWidth: '',
        dotHeight: '',
        dotLeft: '',
        dotTop: '',
        avd: '',
        ahd: '',
        score: 0,
        isActived:false 
      }
    }

  componentWillMount(){
        // 盒子元素
        const that = this;
        const query = Taro.createSelectorQuery().in(this.$scope);
        query.select('#dot').boundingClientRect(rect=>{
        }).exec(rect=>{
        })
        
        query.select('#container').boundingClientRect(res=>{
        }).exec(res=>{
          that.setState({dotWidth: res[0].width, dotHeight: res[0].height}, function(){
            console.log('dotWidth,dotHeight: ', dotWidth,dotHeight);
          })
          const {dotWidth,dotHeight,} = that.state;
          that.setState({dotLeft: (res[1].width- dotWidth)/2});
          //中心点纵坐标
          that.setState({dotTop:(res[1].height - dotHeight)/2});
        })
        //半径
        //每一个BOX对应的角度;
        this.setState({avd: 360/10},function(){
              //每一个BOX对应的弧度;
          this.setState(prevState=>({ ahd: prevState.avd*Math.PI/180}),function(){
            console.log('ahd: ', this.state.ahd);
          }); 
        })
  }


  clickHandle(item,index){
    console.log('item: ', item, index);
    this.setState({score: index + 1, isActived: true},function(){
      this.props.onScore(index+1);
    });
  }

  render() {
    const {avd, ahd,dotLeft,dotTop,dotWidth, dotHeight, score, isActived} = this.state;
    console.log('ahd,dotLeft,dotTop,dotWidth, dotHeight: ', avd, ahd,dotLeft,dotTop,dotWidth, dotHeight, score);

    const radius = 80;
    //中心点横坐标
    const dotStyle = {
      left: 55 + 'px',
      top: 55 + 'px'
    }
    const boxList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item, index) => {
      let boxStyle = {
        left: Math.cos((ahd*(index -2)))*radius + 80 + 'px',
        top: Math.sin((ahd*(index -2)))*radius + 80+ 'px'
      }
      return (
        <View className={classNames('box', isActived && 'actived')}  style={boxStyle} key={item}  onClick={(ind) => this.clickHandle(ind, index)}>{index+1}</View>
      )
    })
    return (
      <View className='container' id='container'>
        <View className='dot' id='dot' style={dotStyle}>{score} 分</View>
        {boxList} 
      </View>
    );
  }
}

export default Percentage;
