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
        <View className='body flex column j-between'>
          <View className='head'>
            <View className='boder column'>
              <Text className='name'>正念冥想评论区</Text>
            </View>
          </View>
          <View className='contain flex column a-center'>
            <View className='left flex column'>
              <Image className='avartal' src={avatarUrl} />
            </View>
            <View className='right flex column'>
              <Text className='day'>{nickName}</Text>
              <Text className='dayNum'>这是冥想的内容，这是冥想的内容这是冥想的内容这是冥想的内容这是冥想的内容这是冥想的内容</Text>
              <Text className='dayText'>2020.01.02</Text>
            </View>
          </View>
        </View>
      </View>
    );
  }
}
export default Index;
