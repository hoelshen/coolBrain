import Taro, { Component } from "@tarojs/taro";
import { View, Image, Text, Button } from "@tarojs/components";
import { observer, inject } from "@tarojs/mobx";
import share from "@/assets/share.png";
import NavBar from "@/components/Navbar/index";
import Comment from '@a/components/Comment/index;'

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
      userStore: { avatarUrl,nickName }
    } = this.props;
    return (
      <View>
        <NavBar text='' color='#8CC9BD' type='2' />
        <Comment />
      </View>
    );
  }
}
export default Index;
