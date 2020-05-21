import Taro, { Component } from "@tarojs/taro";
import classNames from "classnames";
import { View, Picker } from "@tarojs/components";
import NavBar from "@/components/Navbar/index";
import Player from "@/components/Player/index";
import FM from "@/components/FM/index";
import Ex from "@/components/Exit/index";

import * as types from "@/constants/PlayTypes.js";
import { getResultData_frequencies,getResultData_subtype_duration } from "@/servers/servers";

import "./index.less";

class Index extends Component {
  state = {
    id: "A",
    frequency_type: "",
    seMin: [
      { verbose: "5 Min", id: "5min" },
      { verbose: "10 Min", id: "10min" },
      { id: "15min", verbose: "15 Min" },
      { id: "more", verbose: "更多" }
    ],
    seMin2:[
      { verbose: "5 Min", id: "5min" },
      { verbose: "10 Min", id: "10min" },
      { id: "15min", verbose: "15 Min" },
    ],
    cheMin: "5 Min",
    fileList: [],
    originList: [],
    seVoice: [
      { name: "男声", id: "male_voice" },
      { name: "女声", id: "female_voice" }
    ],
    cheVoice: "男声",
    playState: types.PLAY_START,
    isShowFM: false,
    isShowEx: false
  };

  componentWillMount() {
    let { id, frequency_type } = this.$router.params;

    getResultData_frequencies().then(res => {
      const data = res.data;

      if (JSON.stringify(data) !== '{}' && data.objects.length > 0) {
        console.log('frequency_type, data',frequency_type, data)
        this.filterList("key", frequency_type, data.objects);
      } else {
        Taro.showToast({
          title: '没有列表数据',
          icon: 'none',
          duration: 2000
        })
      }
      this.setState({
        id
      });
    });

    getResultData_subtype_duration().then(res => {
      console.log('res: ', res);

    })
  }

  onShareAppMessage(res) {
    if (res.from === "button") {
      // 来自页面内转发按钮
      console.log(res.target);
    }
    return {
      title: "冥想小程序",
      path: "/page/index/index"
    };
  }

  onChangeVoice(e) {
    const { originList } = this.state;
    console.log("originList: ", originList);
    this.setState({
      cheVoice: this.state.seVoice[e.detail.value]["name"]
    });
    Taro.$backgroundAudioManager.stop();

    if (originList.length > 0) {
      this.cheVoiceList(
        "key",
        this.state.seMin[e.detail.value]["id"],
        originList
      );
    }
  }

  onChangeMin(id,e) {
    if (e.detail.value == 3) {
      return this.setState({ isShowFM: true });
    }
    const { originList } = this.state;
    Taro.$backgroundAudioManager.stop();
    if(id =='A'){
      this.setState({
        cheMin: this.state.seMin[e.detail.value]["verbose"]
      });
      if (originList.length > 0) {
        this.cheMinList(
          "key",
          this.state.seMin[e.detail.value]["id"],
          originList
        );
      }
    } else {
      this.setState({
        cheMin: this.state.seMin2[e.detail.value]["verbose"]
      });
      if (originList.length > 0) {
        this.cheMinList(
          "key",
          this.state.seMin2[e.detail.value]["id"],
          originList
        );
      }
    }
  }

  mind() {
    Taro.reLaunch({ url: `/pages/index/index` });
  }

  toHome() {
    Taro.reLaunch({ url: `/pages/index/index` });
  }

  filterList(key, item, list) {
    const newlist = list.filter(l => l.frequency_type[key] == item);
    this.setState({
      originList: newlist,
      fileList: newlist
    });
  }

  cheMinList(key, item, list) {
    const newlist = list.filter(l => l.name[key] == item);
    this.setState({
      fileList: newlist
    });
  }

  cheVoiceList(key, item, list) {
    const newlist = list.filter(l => l.name[key] == item);
    this.setState({
      fileList: newlist
    });
  }

  getPropsShowExDialog(value) {
    this.setState({
      isShowEx: value
    });
  }

  render() {
    const { id, playState, fileList, isShowFM, isShowEx } = this.state;
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
      { whiteBtn: id === "A" },
      { blueBtn: id === "B" },
      { redBtn: id === "C" }
    );

    const FMModal = {
      isShowFM: this.state.isShowFM,
      onCancelCallback: () => {
        this.setState({ isShowFM: false });
      }
    };

    const ExModal = {
      isShowEx: this.state.isShowEx,
      onCancelCallback: () => {
        this.setState({ isShowEx: false });
      }
    };

    return (
      <View className='contain'>
        <NavBar
          text=' '
          color={vColor}
          type='1'
          onShowExDialog={this.getPropsShowExDialog.bind(this)}
        />
        <View className={vStyle} style='background-size: 100% 100%;'>
          <View className={`${pStyle}`}>
            {fileList[0] && <Player videoUrl={fileList[0].file} fileId={fileList[0].id}></Player>}
          </View>
          <View className=''>
            <View class={`${bColor}`}>
            { {
              'A': (<Picker
                mode='selector'
                range={this.state.seMin}
                rangeKey="{{'verbose'}}"
                onChange={this.onChangeMin.bind(this,'A')}
              >
                <View className='num'> {this.state.cheMin}</View>
              </Picker>),
              'B':  (<Picker
                mode='selector'
                range={this.state.seMin2}
                rangeKey="{{'verbose'}}"
                onChange={this.onChangeMin.bind(this,'B')}
              >
                <View className='num'> {this.state.cheMin}</View>
              </Picker>),
              'C':  (<Picker
                mode='selector'
                range={this.state.seMin2}
                rangeKey="{{'verbose'}}"
                onChange={this.onChangeMin.bind(this,'A')}
              >
                <View className='num'> {this.state.cheMin}</View>
              </Picker>),
            }[id]

            }
            </View>
            {id == "A" && (
              <View className='voice'>
                <Picker
                  mode='selector'
                  range={this.state.seVoice}
                  rangeKey="{{'name'}}"
                  onChange={this.onChangeVoice}
                >
                  <View className='num'>{this.state.cheVoice}</View>
                </Picker>
              </View>
            )}
          </View>
        </View>
        <FM showFMDialog={isShowFM} {...FMModal} />
        <Ex showExDialog={isShowEx} {...ExModal} />
      </View>
    );
  }
}

export default Index;
