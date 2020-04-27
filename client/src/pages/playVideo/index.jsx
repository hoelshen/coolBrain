import Taro, { Component } from "@tarojs/taro";
import classNames from "classnames";
import { View, Text, Image, Picker } from "@tarojs/components";
import NavBar from "@/components/Navbar/index";
import Player from "@/components/Player/index";

import * as types from "@/constants/PlayTypes.js";

import "./index.less";

class Index extends Component {
  state = {
    type: 0,
    id: "A",
    videoUrl: "",
    seMin: [1, 2, 3, 5],
    cheMin: 1,
    seVoice: [
      { name: "男声", id: 0 },
      { name: "女声", id: 1 }
    ],
    cheVoice: "男声",
    playState: types.PLAY_START,
  };
  componentWillMount() {

  }

  componentDidMount() {
    let { id, url } = this.$router.params;
    console.log('id, url: ', id, url);
    this.setState({
      videoUrl : url,
      id,
    });
  }

  componentWillUnmount() {}

  componentDidShow() {
  }

  componentDidHide() {}

  onShareAppMessage(res) {
    if (res.from === "button") {
      // 来自页面内转发按钮
      console.log(res.target);
    }
    return {
      title: "自定义转发标题",
      path: "/page/user?id=123"
    };
  }
  onChangeVoice(e) {
    this.setState({
      cheVoice: this.state.seVoice[e.detail.value]["name"]
    });
  }
  onChangeMin(e) {
    this.setState({
      cheMin: e.detail.value
    });
    
    const val = e.detail.value;
    Taro.$backgroundAudioManager.seek(val * 60);
  }

  mind() {
    Taro.reLaunch({ url: `/pages/index/index` });
  }
  toHome() {
    Taro.reLaunch({ url: `/pages/index/index` });
  }

  render() {
    const { id, playState,videoUrl } = this.state;
    console.log('id: ', id);
    const vStyle = classNames({
      playing: true,
      "vStyle-a": id === "A",
      "vStyle-b": id === "B",
      "vStyle-c": id === "C"
    });
    const pStyle = classNames(
      "circle",
      { whiteCircle: playState === "PLAY_START" },
      { loadCircle: playState === "PLAY_LOAD" },
      { blueCircle: playState === "PLAY_STOP" }
    );

    const vColor = classNames({
      "#8CC9BD": id === "A",
      "#578095": id === "B",
      "#DB9598": id === "C"
    });

    const bColor = classNames(
      "min",
       {whiteBtn :id === 'A'},
       {blueBtn:id === 'B'},
       {redBtn:id === 'C'} 
    )
    return (
      <View className='contain'>
        <NavBar text='冥想小程序' color={vColor} type='1' />
          <View className={vStyle} style='background-size: 100% 100%;'>
            <View className={`${pStyle}`}>
              {videoUrl && <Player videoUrl={videoUrl}></Player>}
            </View>
            <View className=''>
              <View class={`${bColor}`} >
                <Picker
                  mode='selector'
                  range={this.state.seMin}
                  onChange={this.onChangeMin}
                >
                  <View className='num'>{this.state.cheMin} Min</View>
                </Picker>
              </View>
              { id=='A' && <View class='voice'>
                  <Picker
                    mode='selector'
                    range={this.state.seVoice}
                    rangeKey="{{'name'}}"
                    onChange={this.onChangeVoice}
                  >
                    <View className='num' >{this.state.cheVoice}</View>
                  </Picker>
              </View>
              }
            </View>
          </View>
      </View>
    );
  }
}

export default Index;
