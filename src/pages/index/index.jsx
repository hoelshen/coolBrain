import Taro, { Component } from "@tarojs/taro";
import { View, Image, ScrollView } from "@tarojs/components";
import { observer, inject } from "@tarojs/mobx";
import MDay from "@/components/Mday";
import home1 from '@/assets/home1.png';
import home2 from '@/assets/home2.png';
import home3 from '@/assets/home3.png';

import '../../app.less';
import "./index.less";


@inject('userStore')
@observer
class Index extends Component {
  refDay = (node) => this.MDay = node //  `this.MDay` 会变成 `MDay` 组件实例的引用
  refDialog = (node) => this.MDialog = node //  `this.MDialog` 会变成 `MDialog` 组件实例的引用

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
    const id = '123'
    Taro.navigateTo({
      url: `/pages/info/index?id=${id}&type=${1}`
    })
  }
  render() {
    const scrollStyle = {
      width: '375px',
      'white-space': 'nowrap'
    }
    const scrollTop = 0
    const Threshold = 20
    const vStyleA = {
      width: '286px',
      height: '483px',
      'background-image': home1,
      'margin-right': '20px',
      display: 'inline-block',
    }
    const vStyleB = {
      width: '286px',
      height: '483px',
      display: 'inline-block',
      'margin-right': '20px',
      'background-image': home2,
    }
    const vStyleC = {
      width: '286px',
      height: '483px',
      'margin-right': '20px',
      display: 'inline-block',
      'background-image': home3,
    }

    const { userStore: { avatarUrl, name } } = this.props

    return <View className='home' onClick={this.toInfo}>
      <Image
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
          <Image style={vStyleA} src={home1}>A</Image>
          <Image style={vStyleB} src={home2}>B</Image>
          <Image style={vStyleC} src={home3}>C</Image>
        </ScrollView>
      </View>
      <View />
    </View>;
  }
}

export default Index;
