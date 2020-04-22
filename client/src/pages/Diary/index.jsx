import Taro, { Component } from "@tarojs/taro";
import { View, Image, Text, Button } from "@tarojs/components";
import { observer, inject } from "@tarojs/mobx";
import NavBar from "@/components/Navbar/index";
import Comment from '@/components/Comment/index';
import Comment2 from '@/components/Comment2/index';

import "./index.less";

@inject("userStore")
@observer
class Index extends Component {
  componentWillMount() {}

  componentDidMount() {

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

    return (
      <View>
        <NavBar text='' color='#ffffff' type='2' />
        <View className='head'>我的冥想日记</View>
        <Comment />
        <View className='foot'>
          <Text class='text1'>评论区</Text>
          <Text class='text2'>查看全部</Text>
        </View>
        <Comment2 />
      </View>
    );
  }
}
export default Index;
