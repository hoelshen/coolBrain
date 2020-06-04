import Taro, { Component } from "@tarojs/taro";
import { View, Image, Text, Button } from "@tarojs/components";
import { observer, inject } from "@tarojs/mobx";
import share from "@/assets/share.png";
import Icon from '@/assets/mingleft.png'
import NavBar from "@/components/Navbar/index";
import { getResultData_MyBadge } from "@/servers/servers";



import "./index.less";

@inject("userStore")
@observer
class Index extends Component {
  state ={
    badgeList:[]
  }
  componentWillMount() {}

  componentDidMount() {
  }

  componentWillUnmount() {}

  async componentDidShow() {
    const data = await getResultData_MyBadge();
    this.setState({badgeList: data.data})
  }

  onHome(e) {
    e.stopPropagation()
    Taro.navigateTo({ url: `/pages/index/index` });
  }
  onDiary(e){
    e.stopPropagation()
    Taro.navigateTo({ url: `/pages/Diary/index` });
  }
  render() {
    const { badgeList } = this.state;
    const ImageList = badgeList.map(element=>{
      return (
        <Image TaroKey={element.picture} src={element.picture} className='badgeImg'></Image>
      )
    })
    return (
      <View>
        <NavBar text='酷炫脑冥想' color='#8CC9BD' type='2' />
        <View className='body flex column j-between'>
        <View className='badgeDiv'>
          {ImageList}
        </View>
        </View>
      </View>
    );
  }
}
export default Index;
