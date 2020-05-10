import Taro, { Component } from "@tarojs/taro";
import { View } from "@tarojs/components";
import classNames from "classnames";

import "./index.less";

class Percentage extends Component {
    constructor(props){
      super(props)
      this.state={
        list: [{
          id: 1,
          isActived: true
        },{
          id:2,
          isActived: false
        },{
          id:3,
          isActived: false
        },{
          id: 4,
          isActived: true
        },{
          id:5,
          isActived: false
        },{
          id:6,
          isActived: false
        },{
          id: 7,
          isActived: false
        },{
          id:8,
          isActived: false
        },{
          id:9,
          isActived: false
        },{
          id:10,
          isActived: false
        }],
        dotWidth: '',
        dotHeight: '',
        dotLeft: '',
        dotTop: '',
        avd: '',
        ahd: '',
        score: 1,
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
    const {list} = this.state;
    list.forEach((item,index)=>{
      item.isActived = false
    })
    list[index].isActived = true;
    this.setState({
      score: index + 1, 
      list: list
      },function(){
      this.props.onScore(index+1);
    })
  }

  render() {
    const {list,avd, ahd,dotLeft,dotTop,dotWidth, dotHeight, score} = this.state;
    console.log('ahd,dotLeft,dotTop,dotWidth, dotHeight: ', avd, ahd,dotLeft,dotTop,dotWidth, dotHeight, score);

    const radius = 80;
    //中心点横坐标
    const dotStyle = {
      left: 55 + 'px',
      top: 55 + 'px'
    }
    const boxList = list.map((item, index) => {
      let boxStyle = {
        left: Math.cos((ahd*(index -2)))*radius + 80 + 'px',
        top: Math.sin((ahd*(index -2)))*radius + 80+ 'px'
      }
      return (
        <View className={classNames('box', item.isActived ? 'actived' : '')}  style={boxStyle} key={item}  onClick={(ind) => this.clickHandle(ind, index)}>{index+1}</View>
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
