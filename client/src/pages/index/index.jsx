import Taro, { Component } from "@tarojs/taro";
import { View, Image, ScrollView, Button, Text } from "@tarojs/components";
import { observer, inject } from "@tarojs/mobx";
import MDay from "@/components/Mday";
import NavBar from "@/components/Navbar/index";
import MDialog from '@/components/MDialog/index';
import headImg from "@/assets/avatar.png";
import { getResultData_badges,getResultData_MyBadge,getResultData_sentencesTody,getResultData_frequencies } from '@/servers/servers'

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
    }],
    loginDay: 0,
    loginText: '',
    isShow: false
  }
  componentWillMount() {
    const { userStore } = this.props;

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
    const { userStore } = this.props;
    // 如果 ref 的是小程序原生组件，那只有在 didMount 生命周期之后才能通过
    // this.refs.input 访问到小程序原生组件
    if (process.env.TARO_ENV === "weapp") {
      // 这里 this.refs.input 访问的时候通过 `wx.createSeletorQuery` 取到的小程序原生组件
    } else if (process.env.TARO_ENV === "h5") {
      // 这里 this.refs.input 访问到的是 `@tarojs/components` 的 `Input` 组件实例
    }
    getResultData_sentencesTody().then(res=>{
      const data = res.data;
      userStore.updateId(
        data.id
      );
      this.setState({loginDay: data.days, loginText: data.text})
    })
  }

  componentDidShow() {
    const dayStart =  Taro.getStorageSync('createDay');
    const isShow =  Taro.getStorageSync('isShow');
    this.setState({isShow: isShow})
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

    getResultData_frequencies().then(res => {
      const data = res.data.objects;
      console.log('data: ', data);
        if (data.length > 0) {
          this.setState({ fileList: data });
        }
      }
    )

      getResultData_badges()

      getResultData_MyBadge()

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
    const {fileList,loginDay, loginText ,isShow} = this.state;

    const ModalComProps = {
      isShow: this.state.isShow,
      onCancelCallback: ()=>{     
        Taro.setStorage({
          key: "isShow",
          data: false
        }); 
        this.setState({isShow: false})
      }
    }


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
            <View className='vStyleA' onClick={this.toPlay.bind(this, {id:'A',url: fileList[0].file})}>
              <Text className='mindName'>正念冥想</Text>
              <Text className='mindInfo'>
                冥想的介绍信息，冥想的介绍 介绍信息，冥。。。
              </Text>
            </View>
            <View className='vStyleB' onClick={this.toPlay.bind(this, {id:'B',url: fileList[1].file})}>
              <Text className='mindName'>白噪音</Text>
              <Text className='mindInfo'>
                冥想的介绍信息，冥想的介绍 介绍信息，冥。。。
              </Text>
            </View>
            <View className='vStyleC' onClick={this.toPlay.bind(this, {id:'C',url: fileList[2].file})}>
              <Text className='mindName'>自然声音</Text>
              <Text className='mindInfo'>
                冥想的介绍信息，冥想的介绍 介绍信息，冥。。。
              </Text>
            </View>
          </ScrollView>
        </View>
        <View />
        <MDialog num={loginDay} text={loginText} isShow={isShow} {...ModalComProps} />
      </View>
    );
  }
}

export default Index;
