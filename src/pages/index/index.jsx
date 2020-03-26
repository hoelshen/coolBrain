import Taro, { Component } from "@tarojs/taro";
import { View, Image, ScrollView } from "@tarojs/components";
import { observer, inject } from "@tarojs/mobx";
import MDay from "@/components/Mday";


import '../../app.less';
import "./index.less";


@inject('userStore')
@observer
class Index extends Component {

  componentWillMount() {
    const { userStore } = this.props;
    Taro.loadFontFace({
      family: 'Bitstream Vera Serif Bold',
      source: 'url("https://sungd.github.io/Pacifico.ttf")',
      success: console.log
    })
    Taro.getSetting({
      success: function (res) {
        if (res.authSetting["scope.userInfo"]) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          Taro.getUserInfo({
            success: function (data) {
              userStore.updateInfo(data.userInfo.avatarUrl, data.userInfo.nickName)
            }
          });
        }
      }.bind(this)
    });
    const refDay = (node) => this.MDay = node //  `this.MDay` 会变成 `MDay` 组件实例的引用
    const refDialog = (node) => this.MDialog = node //  `this.MDialog` 会变成 `MDialog` 组件实例的引用
  
    /*     const params = {
          data: 1,
          user: 1
        }
        getResultData_servers(params).then(res => {
          console.log(res)
        }).catch(err => {
          console.log(err)
        })
        console.log(5) */
  }



  componentDidMount() {
    // 如果 ref 的是小程序原生组件，那只有在 didMount 生命周期之后才能通过
    // this.refs.input 访问到小程序原生组件
    if (process.env.TARO_ENV === 'weapp') {
      // 这里 this.refs.input 访问的时候通过 `wx.createSeletorQuery` 取到的小程序原生组件
    } else if (process.env.TARO_ENV === 'h5') {
      // 这里 this.refs.input 访问到的是 `@tarojs/components` 的 `Input` 组件实例
    }
  }

  componentDidShow() {
  }

  componentDidHide() {
  }
  componentWillReact() {
    console.log("componentWillReact");
  }
  onScroll(e) {
    console.log(e)
  }
  scrollTop(e) {
    console.log('e: ', e);
  }
  onScrollToUpper() {

  }
  toInfo() {
    Taro.navigateTo({
      url: `/pages/info/index`
    })
  }
  toPlay(id) { 
    Taro.navigateTo({
      url: `/pages/playVideo/index?id=${id}&type=${0}`
    })
  }
  render() {
    const scrollStyle = {
      width: '375px',
      'white-space': 'nowrap'
    }
    const scrollTop = 0
    const Threshold = 20
    const { userStore: { avatarUrl, name } } = this.props

    return <View className='home'>
      <Image
        onClick={this.toInfo}
        className='img'
        src={avatarUrl}
      />
      <MDay ref={this.refDay} name={name} time={new Date()} className='MDay'></MDay>
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
          <View className='vStyleA' onClick={this.toPlay.bind(this, 'A')}>A</View>
          <View className='vStyleB' onClick={this.toPlay.bind(this, 'B')}>B</View>
          <View className='vStyleC' onClick={this.toPlay.bind(this, 'C')}>C</View>
        </ScrollView>
      </View>
      <View />
    </View>;
  }
}

export default Index;
