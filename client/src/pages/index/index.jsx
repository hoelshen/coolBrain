import Taro, { Component } from "@tarojs/taro";
import { View, Image, Swiper,SwiperItem, Button, Text } from "@tarojs/components";
import { observer, inject } from "@tarojs/mobx";

import MDay from "@/components/Mday";
import NavBar from "@/components/Navbar/index";
import MDialog from "@/components/MDialog/index";
import BadgeDialog from "@/components/BadgeDialog/index";
import headImg from "@/assets/avatar.png";
import {
  getResultData_badges,
  getResultData_MyBadge,
  getResultData_sentencesTody,
  getResultData_myDetail,
} from "@/servers/servers";

import "../../app.less";
import "./index.less";

@inject("userStore")
@observer
class Index extends Component {
  state = {
    loginDay: 0,
    loginText: "",
    showDialog: false,
    showBadgeDialog: false,
    showBadge: {}
  };
  componentWillMount() {
    const { userStore } = this.props;

    Taro.getSetting({
      success: function(res) {
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
    getResultData_sentencesTody().then(res => {
      const data = res.data;
      this.setState({ loginDay: data.days, loginText: data.text });
      if (data.badge) {
        this.setState({ badge: data.badge, showBadge: true });
      }
      if(data.clock){ //当天登录了
        const { last_time } = data.clock;
        const day = Taro.$dayjs().format('YYYY-MM-DD HH:mm:ss');
        const value = Taro.$dayjs(day).diff(last_time, 'day', true);

        if(value< 1 && value > 0){
          this.setState({showDialog: false})
        } else if(value>1) {
          this.setState({showDialog: true})
        }
      } else {  //当天没有登录
        this.setState({showDialog: true})
      }
    });
  }

  componentDidShow() {
    const { userStore } = this.props;

    getResultData_badges();

    getResultData_MyBadge();
    getResultData_myDetail().then(json=>{
      const data = json.data;
      userStore.update(
       data.days,
       data.duration
     );
    })
  }

  componentDidHide() {}
  componentWillReact() {
    console.log("componentWillReact");
  }
  onScroll(e) {
    console.log(e);
  }
  onScrollToUpper() {}
  toInfo() {
    Taro.navigateTo({
      url: `/pages/info/index`
    });
  }
  toPlay(obj) {
    const {
      userStore: { avatarUrl }
    } = this.props;
    if(!avatarUrl){
      return 
    }
    Taro.navigateTo({
      url: `/pages/playVideo/index?id=${obj.id}&frequency_type=${obj.frequency_type}`
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
  };

  config = {
    disableScroll: true
  };

  render() {
    const {
      userStore: { avatarUrl, nickName }
    } = this.props;
    const {
      loginDay,
      loginText,
      showDialog,
      showBadgeDialog,
      showBadge,
      badge
    } = this.state;

    const ModalComProps = {
      showDialog,
      loginDay,
      loginText,
      showBadge,
      onCancelCallback: () => {
        this.setState({ showDialog: false });
      },
      onShowBadgeCallback:(value)=>{
        this.setState({ showBadgeDialog: value });
      }
    };

    const BadgeModalComProps = {
      showBadgeDialog,
      badge,
      onCancelCallback: () => {
        this.setState({ showBadgeDialog: false });
        Taro.navigateTo({
          url: `/pages/Info/index`
        });
      }
    };

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
          <Swiper
            className='scrollview'
            indicatorDots
            previousMargin='20px'
            nextMargin='15px'
          >
            <SwiperItem >
            <View
              className='vStyleA'
              style='background-size: 100% 100%;'
              onClick={this.toPlay.bind(this, {
                id: "A",
                frequency_type: 'meditation'
              })}
            >
              <Text className='mindName'>正念冥想</Text>
              <Text className='mindInfo'>
                冥想的介绍信息，冥想的介绍 介绍信息，冥。。。
              </Text>
            </View>
            </SwiperItem>
            <SwiperItem>
            <View
              className='vStyleB'
              style='background-size: 100% 100%;'
              onClick={this.toPlay.bind(this, {
                id: "B",
                frequency_type: 'white'
              })}
            >
              <Text className='mindName'>白噪音</Text>
              <Text className='mindInfo'>
                冥想的介绍信息，冥想的介绍 介绍信息，冥。。。
              </Text>
            </View>

            </SwiperItem>
            <SwiperItem>
            <View
              className='vStyleC'
              style='background-size: 100% 100%;'
              onClick={this.toPlay.bind(this, {
                id: "C",
                frequency_type: 'general'
              })}
            >
              <Text className='mindName'>自然声音</Text>
              <Text className='mindInfo'>
                冥想的介绍信息，冥想的介绍 介绍信息，冥。。。
              </Text>
            </View>
            </SwiperItem>
            </Swiper>
        </View>
        <View />
        <MDialog {...ModalComProps} />
        <BadgeDialog {...BadgeModalComProps} />
      </View>
    );
  }
}

export default Index;
