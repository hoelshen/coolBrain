import Taro, { Component } from "@tarojs/taro";
import classNames from "classnames";
import { View, Text, Image, Picker } from "@tarojs/components";
import topSign from "@/assets/topSign.png";
import NavBar from "@/components/Navbar/index";

import play from "@/assets/play.png";
import stop from "@/assets/stop.png";

import bottomSign from "@/assets/bottomSign.png";
import mindImg from "@/assets/btn-wc.png";
import share from "@/assets/fx.png";

import * as types from "@/constants/PlayTypes.js";

import "./index.less";

class Index extends Component {
  state = {
    type: 0,
    id: "A",
    videoUrl: "cloud://pro-dcxrw.7072-pro-dcxrw-1301694500/837497.6467527878.mp3",
    seMin: [1, 2, 3],
    cheMin: 10,
    seVoice: [
      { name: "男声", id: 0 },
      { name: "女声", id: 1 }
    ],
    cheVoice: "男声",
    playState: types.PLAY_START,
    Triangle: true
  };
  componentWillMount() {
    Taro.cloud.init();
  }

  componentDidMount() {
    let { type, id, url } = this.$router.params;
    this.setState({
      videoUrl : url,
      id,
      type
    });
  }

  componentWillUnmount() {}

  componentDidShow() {}

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
  clickPlay() {
    const { playState, videoUrl } = this.state;
    console.log('videoUrl: ', videoUrl);
    if (!videoUrl) return false;

    if (playState === "PLAY_START") {
      const startTime  = new Date().getTime();
      Taro.setStorage({
        key: "startTime",
        data: startTime
      });
      this.setState({ playState: "PLAY_LOAD", Triangle: false });


      Taro.playBackgroundAudio({
        dataUrl: videoUrl,
        title: "bg1",
        coverImgUrl: ""
      });
  
    } else if (playState === "PLAY_LOAD") {
      this.setState({ playState: "PLAY_STOP", Triangle: true });
      this.processTime();
      Taro.pauseBackgroundAudio();
    } else {
      this.setState({ playState: "PLAY_START", Triangle: false });
      Taro.s
    }
  }

  
   processTime(){

    const countTime =  Taro.getStorageSync('useTime');
    console.log('countTime: ', countTime);
    const startTime =  Taro.getStorageSync('startTime');
    console.log('startTime: ', startTime);

    var dateEnd = parseInt(new Date().getTime()/1000);
    const useTime = dateEnd - parseInt(startTime /1000);
    console.log('useTime: ', useTime);
    

    Taro.setStorage({
      key: "useTime",
      data: countTime + useTime
    });
  }
  mind() {
    Taro.reLaunch({ url: `/pages/index/index` });
  }
  toHome() {
    Taro.reLaunch({ url: `/pages/index/index` });
  }

  render() {
    const { type, id, playState, Triangle } = this.state;
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

    return (
      <View className='contain'>
        <NavBar text='冥想小程序' color={vColor} type='1' />

        {type == 0 ? (
          <View className={vStyle}>
            <View className={`${pStyle}`} onClick={this.clickPlay}>
              {Triangle ? (
                <Image className='Triangle' src={play}></Image>
              ) : (
                <Image className='Triangle' src={stop}></Image>
              )}
            </View>
            <View className=''>
              <View class='min'>
                <Picker
                  mode='selector'
                  range={this.state.seMin}
                  onChange={this.onChangeMin}
                >
                  <View className='num'>{this.state.cheMin} min</View>
                </Picker>
              </View>
              <View class='voice'>
                <Picker
                  mode='selector'
                  range={this.state.seVoice}
                  rangeKey="{{'name'}}"
                  onChange={this.onChangeVoice}
                >
                  <View className='num'>{this.state.cheVoice}</View>
                </Picker>
              </View>
            </View>
          </View>
        ) : (
          <View className='played'>
            <View className='head'>
              <Image
                onClick={this.toHome}
                className='mindImg'
                src={mindImg}
              ></Image>
            </View>
            <Image className='iconImg topSign' src={topSign} />
            <Text class='endText'>冥想是一种认真生活的态度。</Text>
            <Image className='iconImg bottomSign' src={bottomSign} />

            <Image className='shareImg' src={share} />
          </View>
        )}
      </View>
    );
  }
}

export default Index;
