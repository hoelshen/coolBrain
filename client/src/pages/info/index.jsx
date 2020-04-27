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
    useDay: 0,
    useTime: 0,
    badgeList:[]
  }
  componentWillMount() {}

   componentDidMount() {

/*     const dayStart =  Taro.getStorageSync('createDay');
    if(dayStart){
      var dateEnd = new Date().getTime();
      const filteDay = (dateEnd - dayStart) / (1000 * 60 * 60 * 24)
      const useDay = Number(filteDay.toFixed(0) + 1)
      this.setState({useDay});
    }
    const time =  Taro.getStorageSync('useTime');
    if(time){
      this.setState({useTime: Math.floor(time%3600/60)});
    } */
  }

  componentWillUnmount() {}

  static options = {
    addGlobalClass: true
  };

  async componentDidShow() {
    const data = await getResultData_MyBadge();

    this.setState({badgeList: data.data})

    console.log('badgeList: ', data.data);
  }

  componentDidHide() {}


  onHome(e) {
    e.stopPropagation()
    Taro.navigateTo({ url: `/pages/index/index` });
  }
  onDiary(e){
    e.stopPropagation()
    Taro.navigateTo({ url: `/pages/Diary/index` });
  }
  render() {
    const {
      userStore: { nickName, avatarUrl,  days, duration  }
    } = this.props;
    const { badgeList } = this.state;
    const ImageList = badgeList.map(element=>{
      return (
        <Image src={element.picture} className='badgeImg'></Image>
      )
    })
    return (
      <View>
        <NavBar text='冥想小程序' color='#8CC9BD' type='2' />
        <View className='body flex column j-between'>
          <View className='head'>
            <View className='shareDiv' style='background-size: 100% 100%;'>
              <Text className='mind'>我的冥想</Text>
              <Button className='btn' openType='share'>
                <Image className='share' src={share} />
              </Button>
              <Image
                className='avatarImg'
                src={avatarUrl}
              />
            </View>
            <View className='border column'>
              <Text className='name'>{nickName}</Text>
              <View className='badgeDiv'>
                {ImageList}
              </View>
            </View>
          </View>
          <View className='contain flex column a-center'>
            <View className='minBlock flex column'>
              <Text className='min'>累计冥想分钟</Text>
              <Text className='minNum'>{duration}</Text>
              <Text className='minText'>MIN</Text>
            </View>
            <View className='dayBlock flex column'>
              <Text className='day'>累计冥想天数</Text>
              <Text className='dayNum'>{days}</Text>
              <Text className='dayText'>DAY</Text>
              <View className='diary' onClick={this.onDiary}>
                <Text>
                  我的冥想日记
                </Text>
                <Image src={Icon} className='iconImg' />
              </View>
            </View>
          </View>
          <View className='foot' onClick={e=>{e.stopPropagation()}}>
            <View className='btn'  onClick={this.onHome}>
              继续冥想
            </View>
          </View>
        </View>
      </View>
    );
  }
}
export default Index;
