import Taro, { Component } from "@tarojs/taro";
import { View, Image, Text, Button } from "@tarojs/components";
import { observer, inject } from "@tarojs/mobx";
import share from "@/assets/share.png";
import NavBar from "@/components/Navbar/index";

import "./index.less";

@inject("userStore")
@observer
class Index extends Component {
  componentWillMount() {
    console.log(22);
    console.log(this.$router.params);
  }

  componentDidMount() {
    console.log("66");
  }

  componentWillUnmount() {}

  static options = {
    addGlobalClass: true
  };

  config = {
    navigationBarTitleText: "个人页面",
    navigationBarBackgroundColor: "#8cc9bd",
    navigationBarTextStyle: "white"
  };

  componentDidShow() {
    console.log("88");
  }

  componentDidHide() {}

  onShareAppMessage(res) {
    console.log("res11111111: ", res);
    if (res.from === "button") {
      // 来自页面内转发按钮
      console.log(res.target);
    }
    return {
      title: "冥想小程序",
      path: "/pages/index/index"
      /* imageUrl: '/common/images/xxx.png' //分享图片 宽高比 5:4 */
    };
  }
  
  toHome() {
    Taro.navigateTo({ url: `/pages/index/index` });
  }
  render() {
    const {
      userStore: { nickName, useTime, useDay }
    } = this.props;

    return (
      <View>
        <NavBar  text='冥想小程序' color='#8CC9BD' />
        <View className='body flex column j-between'>
        <View className='head'>
          <View className='shareDiv'>
            <Text className='mind'>我的冥想</Text>
            <Button className='btn' open-type='share'>
              <Image className='share' src={share}></Image>
            </Button>
          </View>
          <View className='boder column'>
            <Text className='name'>{nickName}</Text>
          </View>
        </View>
        <View className='contain flex column a-center'>
          <Text className='min'>累计冥想分钟</Text>
          <Text className='minNum'>{useTime}</Text>
          <Text className='minText'>MIN</Text>
          <Text className='day'>累计冥想天数</Text>
          <Text className='dayNum'>{useDay}</Text>
          <Text className='dayText'>DAY</Text>
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
