import Taro, { Component } from "@tarojs/taro";
import { View, Image, ScrollView, Button, Text } from "@tarojs/components";
import { observer, inject } from "@tarojs/mobx";
import MDay from "@/components/Mday";
import NavBar from "@/components/Navbar/index";
import MDialog from '@/components/MDialog/index';
import headImg from "@/assets/avatar.png";

import "../../app.less";
import "./index.less";

@inject("userStore")
@observer
class Index extends Component {
  state = {
    fileList:[{
      url: ''
    },{
      url: ''
    },{
      url: ''
    }]
  }
  componentWillMount() {
    const { userStore } = this.props;
    Taro.cloud.init();

    Taro.getSetting({
      success: function (res) {
        if (res.authSetting && res.authSetting["scope.userInfo"]) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          Taro.getUserInfo({
            success(data) {
              userStore.updateInfo(
                data.userInfo.avatarUrl,
                data.userInfo.nickName
              );
            }
          });
        } else {
        }
      }.bind(this)
    });
  }
   componentDidMount() {
    // 如果 ref 的是小程序原生组件，那只有在 didMount 生命周期之后才能通过
    // this.refs.input 访问到小程序原生组件
    if (process.env.TARO_ENV === "weapp") {
      // 这里 this.refs.input 访问的时候通过 `wx.createSeletorQuery` 取到的小程序原生组件
    } else if (process.env.TARO_ENV === "h5") {
      // 这里 this.refs.input 访问到的是 `@tarojs/components` 的 `Input` 组件实例
    }
  }

  componentDidShow() {
    const dayStart =  Taro.getStorageSync('createDay');
    if(!dayStart){
      Taro.setStorage({
        key: "createDay",
        data: new Date().getTime()
      });
      Taro.setStorage({
        key: "useTime",
        data: 0
      });
    }
    Taro.cloud.callFunction({
      // 云函数名称
      name: 'voice',
      // 传给云函数的参数
    }).then(res => {
        const data = res.result.data;
        if (data.length > 0) {
          Taro.cloud.getTempFileURL({
            fileList: [data[0].url,data[1].url,data[2].url],
            success: val => {
              if (val.fileList.length > 0) {
                this.setState({ fileList: val.fileList });
              } else {
                Taro.showToast({ title: "获取音频失败", icon: "none" });
              }
            },
            fail: err => {
              console.log("err: ", err);
              // handle error
            }
          });
        }
      })
      .catch(console.error)
  }

  componentDidHide() { }
  componentWillReact() {
    console.log("componentWillReact");
  }
  onScroll(e) {
    console.log(e);
  }
  onScrollToUpper() { }
  toInfo() {
    Taro.navigateTo({
      url: `/pages/info/index`
    });
  }
  toPlay(obj) {
    Taro.navigateTo({
      url: `/pages/playVideo/index?id=${obj.id}&url=${obj.url}&type=${0}`
    });
  }
  onGotUserInfo(e) {
    const { userStore } = this.props;
    userStore.updateInfo(
      e.detail.userInfo.avatarUrl,
      e.detail.userInfo.nickName
    );
  }
  static config = {
    disableScroll: true
  }
  
  config = {
    disableScroll: true
  }

  render() {
    const scrollStyle = {
      width: "375px",
      "white-space": "nowrap"
    };
    const scrollTop = 0;
    const Threshold = 20;

    const {
      userStore: { avatarUrl, nickName }
    } = this.props;
    const {fileList} = this.state;
    return (
      <View className='home'>
        <NavBar text='' color='white' type='' />
        <View className='head'>
          {!avatarUrl ? (
            <Button
              className='aliasImg'
              v-if='!user.aliasPortrait'
              openType='getUserInfo'
              lang='zh_CN'
              onGetUserInfo={this.onGotUserInfo.bind(this)}
            >
              <Image className='img' src={headImg} />
            </Button>
          ) : (
              <Image onClick={this.toInfo} className='img' src={avatarUrl} />
            )}
        </View>
        <MDay nickName={nickName} time={new Date()}></MDay>
        <View className='pageSectionSpacing'>
          <ScrollView
            className='scrollview'
            scrollX
            scrollWithAnimation
            scrollTop={scrollTop}
            style={scrollStyle}
            lowerThreshold={Threshold}
            upperThreshold={Threshold}
            onScrollToUpper={this.onScrollToUpper.bind(this)}
            onScroll={this.onScroll}
          >
            <View className='vStyleA' onClick={this.toPlay.bind(this, {id:'A',url: fileList[0].tempFileURL})}>
              <Text className='mindName'>冥想的名字</Text>
              <Text className='mindInfo'>
                冥想的介绍信息，冥想的介绍 介绍信息，冥。。。
              </Text>
            </View>
            <View className='vStyleB' onClick={this.toPlay.bind(this, {id:'B',url: fileList[1].tempFileURL})}>
              <Text className='mindName'>冥想的名字</Text>
              <Text className='mindInfo'>
                冥想的介绍信息，冥想的介绍 介绍信息，冥。。。
              </Text>
            </View>
            <View className='vStyleC' onClick={this.toPlay.bind(this, {id:'C',url: fileList[2].tempFileURL})}>
              <Text className='mindName'>冥想的名字</Text>
              <Text className='mindInfo'>
                冥想的介绍信息，冥想的介绍 介绍信息，冥。。。
              </Text>
            </View>
          </ScrollView>
        </View>
        <View />
        <MDialog isShow={false} num={19} />
      </View>
    );
  }
}

export default Index;
