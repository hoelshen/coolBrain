import Taro, { Component  } from "@tarojs/taro";
import { View,Image } from "@tarojs/components";
import { observer, inject } from "@tarojs/mobx";
import  MDAY  from "@/components/Mday";

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
  }

  componentWillReact() {
    console.log("componentWillReact");
  }

  componentDidMount() {

  }

  render() {
    const {avatarUrl, name} = this.state;
    return <View className='home'>
          <Image
            className='img'
            src={avatarUrl}
          />
      <MDAY name={name} time={new Date()}></MDAY>
    </View>;
  }
}

export default Index;
