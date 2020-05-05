import Taro, { Component } from "@tarojs/taro";
import { View, Image, ScrollView, Button, Text } from "@tarojs/components";
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
      if(data.clock){
        const { clock_date} = data.clock;
        const day = Taro.$dayjs().format('YYYY-MM-DD HH:mm:ss');
        console.log('day: ', day);
        const value = Taro.$dayjs(day).diff(clock_date, 'hour');
        console.log('value: ', value);

        if(value > 0){
          this.setState({showDialog: true})
        } else {
          this.setState({showDialog: false})
        }
      }
    });
  }

  componentDidShow() {
    const dayStart = Taro.getStorageSync("createDay");
    const isShow = true || Taro.getStorageSync("isShow");
    console.log("isShow: ", isShow);
    this.setState({ showDialog: isShow });
    if (!dayStart) {
      Taro.setStorage({
        key: "createDay",
        data: new Date().getTime()
      });
      Taro.setStorage({
        key: "useTime",
        data: 0
      });
    }

    getResultData_badges();

    getResultData_MyBadge();
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
    const scrollStyle = {
      width: "375px",
      "white-space": "nowrap"
    };
    const scrollTop = 0;
    const Threshold = 20;

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
        Taro.setStorage({
          key: "isShow",
          data: false
        });
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
            <View
              className='vStyleA'
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
            <View
              className='vStyleB'
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
            <View
              className='vStyleC'
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
          </ScrollView>
        </View>
        <View />
        <MDialog {...ModalComProps} />
        <BadgeDialog {...BadgeModalComProps} />
      </View>
    );
  }
}

export default Index;
