import Taro, { Component  } from "@tarojs/taro";
import { View,Image } from "@tarojs/components";
import { observer, inject } from "@tarojs/mobx";
import  MDay from "@/components/Mday";
import  MList  from "@/components/MList";
import Dialog  from '@/components/MDialog';

import { getResultData_servers } from '@/servers/servers'

import "./index.less";


@inject("counterStore")
@observer
class Index extends Component {

  state ={
    avatarUrl: "",
    name: ""
  }

  refDay = (node) => this.MDay = node //  `this.MDay` 会变成 `MDay` 组件实例的引用
  refDialog = (node) => this.MDialog  = node //  `this.MDialog` 会变成 `MDialog` 组件实例的引用

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
    // 如果 ref 的是小程序原生组件，那只有在 didMount 生命周期之后才能通过
    // this.refs.input 访问到小程序原生组件
    if (process.env.TARO_ENV === 'weapp') {
      // 这里 this.refs.input 访问的时候通过 `wx.createSeletorQuery` 取到的小程序原生组件
    } else if (process.env.TARO_ENV === 'h5') {
      // 这里 this.refs.input 访问到的是 `@tarojs/components` 的 `Input` 组件实例
    }
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
    console.log('this.MDay', this.MDay)
    this.MDialog.open()
    this.MDay.tell()
    return 
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
      <MDay ref={this.refDay} name={name} time={new Date()}></MDay>
      <MList/>
      <Dialog
          renderHeader={
            <View className='welcome-message'>Welcome!</View>
          }
          renderFooter={
            <Button className='close'>Close</Button>
          }
          ref={this.refDialog}
        >
          <View className="dialog-message">
            Thank you for using Taro.
          </View>
        </Dialog>
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
