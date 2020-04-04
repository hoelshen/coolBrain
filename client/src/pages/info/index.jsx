import Taro, { Component } from "@tarojs/taro";
import { View, Image, Text, Button } from "@tarojs/components";
import { observer, inject } from "@tarojs/mobx";
import share from "@/assets/share.png";
import NavBar from "@/components/Navbar/index";

import "./index.less";

@inject("userStore")
@observer
class Index extends Component {
  state ={
    useDay: 0,
    useTime: 0
  }
  componentWillMount() {}

   componentDidMount() {
    const dayStart =  Taro.getStorageSync('createDay');
    if(dayStart){
      var dateEnd = new Date().getTime();
      const filteDay = (dateEnd - dayStart) / (1000 * 60 * 60 * 24)
      const useDay = Number(filteDay.toFixed(0) + 1)
      this.setState({useDay});
    }
    const time =  Taro.getStorageSync('useTime');
    if(time){
      this.setState({useTime: Math.floor(time%3600/60)});
    }
  }

  componentWillUnmount() {}

  static options = {
    addGlobalClass: true
  };

  componentDidShow() {}

  componentDidHide() {}


  toHome() {
    Taro.navigateTo({ url: `/pages/index/index` });
  }
  render() {
    const {
      userStore: { nickName }
    } = this.props;
    const {useTime, useDay} = this.state;
    return (
      <View>
        <NavBar text='冥想小程序' color='#8CC9BD' type='2' />
        <View className='body flex column j-between'>
          <View className='head'>
            <View className='shareDiv'>
              <Text className='mind'>我的冥想</Text>
              <Button className='btn' openType='share'>
                <Image className='share' src={share} />
              </Button>
            </View>
            <View className='boder column'>
              <Text className='name'>{nickName}</Text>
            </View>
          </View>
          <View className='contain flex column a-center'>
            <View className='minBlock flex column'>
              <Text className='min'>累计冥想分钟</Text>
              <Text className='minNum'>{useTime}</Text>
              <Text className='minText'>MIN</Text>
            </View>
            <View className='dayBlock flex column'>
              <Text className='day'>累计冥想天数</Text>
              <Text className='dayNum'>{useDay}</Text>
              <Text className='dayText'>DAY</Text>
            </View>
          </View>
          <View className='foot'>
            <Button className='btn' onClick={this.toHome}>
              继续冥想
            </Button>
          </View>
        </View>
      </View>
    );
  }
}
export default Index;
