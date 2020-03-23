import Taro, { Component  } from "@tarojs/taro";
import { View,Image } from "@tarojs/components";
import { observer, inject } from "@tarojs/mobx";
import  MDAY  from "@/components/Mday";
import { getResultData_servers } from '@/servers/servers'

import "./index.less";


@inject("counterStore")
@observer
class Index extends Component {


  state ={
    avatarUrl: "",
    name: ""
  }

  componentWillMount() {
    const that = this;
    Taro.loadFontFace({
      family: 'Bitstream Vera Serif Bold',
      source: 'url("https://sungd.github.io/Pacifico.ttf")',
      success: console.log
    })
    Taro.getSetting({
      success: function(res) {
        if (res.authSetting["scope.userInfo"]) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          Taro.getUserInfo({
            success: function(data) {
              console.log('res: ', data);
              that.setState({
                avatarUrl: data.userInfo.avatarUrl,
                name: data.userInfo.nickName
              })
            }
          });
        }
      }.bind(this)
    });

    const params = {
      data:1,
      user:1
    }
    getResultData_servers(params).then(res => {
      console.log(res)
    }).catch(err => {
      console.log(err)
    })
    console.log(5)

  }

  componentDidMount () {
    console.log(6,this.$router.params)
  }

  componentDidShow () {
    console.log(7)

  }

  componentDidHide () {
    console.log(8)
  }
  componentWillReact() {
    console.log("componentWillReact");
  }
  scroll(e) {
    console.log(e)
  }

  toInfo(){
    const id = '123'
    Taro.navigateTo({
      url: `/pages/info/index?id=${id}&type=${1}`
    })
    console.log('22')
  }
  render() {
    const {avatarUrl, name} = this.state;
    return <View className='home' onClick={this.toInfo}>
          <Image
            className='img'
            src={avatarUrl}
          />
      <MDAY name={name} time={new Date()}></MDAY>
      <view className='page-section-spacing'>
        <scroll-view className='scroll-view_H' scroll-x onScroll={this.scroll} style='width: 100%'>
          <view  className='scroll-view-item demo-text-1'></view>
          <view  className='scroll-view-item demo-text-2'></view>
          <view  className='scroll-view-item demo-text-3'></view>
        </scroll-view>
      </view>

      <View />

      <View></View>

      <View>{false}</View>

      <View>{null}</View>

      <View>{undefined}</View>

      <View>{true}</View>
    </View>;
  }
}

export default Index;
