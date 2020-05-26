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
    frequency_type: '',
    seMin: [],
    cheMin: "5 Min",
    seVoice: [],
    cheVoice: "男声",
    fileList: [],
    playState: types.PLAY_START,
    isShowFM: false,
    isShowEx: false
  };

  componentWillMount() {
    let { id, frequency_type } = this.$router.params;
    this.initList(id, frequency_type);
  }

  /**
   * 
   * @param {*} id 
   * @param {*} frequency_type 
   */
  async initList(id, frequency_type){
    const res =  await getResultData_subtype_duration()
    let obj = {}
    const data = res.data;
    Object.keys(data).forEach(item=>{
      if(item == frequency_type){
        obj = data[item]
      }
    })

    if(frequency_type == 'meditation'){
      this.setState({frequency_type, seMin:[...obj.durations,{ id: "more", duration: "更多" }],cheMin: obj.durations[0].duration, seVoice: obj.types, cheVoice: obj.types[0].name})
    } else {
      this.setState({frequency_type,seMin: obj.durations ,cheMin: obj.durations[0].duration, seVoice: obj.types, cheVoice: obj.types[0].name})
    }

    const duration_id = obj.durations[0].id
    const sub_type_id = obj.types[0].id
    getResultData_frequencies({frequency_type, duration_id  , sub_type_id }).then(resp => {
      const datal = resp.data;
      console.log('datal: ', datal);

      if (JSON.stringify(datal) !== '{}' && datal.objects.length > 0) {
        this.setState({
          fileList: datal.objects
        });
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

  //选择声音
  onChangeVoice(e) {
    const { seVoice, seMin, cheMin, frequency_type } = this.state

    this.setState({
      cheVoice: seVoice[e.detail.value]["name"]
    });
    Taro.$backgroundAudioManager.stop();
    const sub_type_id = seVoice[e.detail.value].id
    let duration_id 
    console.log('seMin', seMin, cheMin)
    for(let i in seMin){
      if(seMin[i].duration == cheMin){
        duration_id  = seMin[i].id
      }
    }
    getResultData_frequencies({frequency_type, duration_id , sub_type_id }).then(resp => {
      const datal = resp.data;
      console.log('datal: ', datal);

      if (JSON.stringify(datal) !== '{}' && datal.objects.length > 0) {
        this.setState({
          fileList: datal.objects
        });
      } else {
        Taro.showToast({
          title: '没有列表数据',
          icon: 'none',
          duration: 2000
        })
      }
    });
  }

  // 选择分钟数
  onChangeMin(id,e) {
    const { seMin, seVoice, cheVoice, frequency_type } = this.state

    if (e.detail.value == 3) {
      return this.setState({ isShowFM: true });
    }
    Taro.$backgroundAudioManager.stop();
    this.setState({
      cheMin: seMin[e.detail.value]["duration"]
    });
    const duration_id = seMin[e.detail.value].id
    let sub_type_id 
    for(let i in seVoice){
      if(seVoice[i].name == cheVoice){
        sub_type_id  = seVoice[i].id
      }
    }
    getResultData_frequencies({frequency_type, duration_id , sub_type_id }).then(resp => {
      const datal = resp.data;
      console.log('datal: ', datal);

      if (JSON.stringify(datal) !== '{}' && datal.objects.length > 0) {
        this.setState({
          fileList: datal.objects
        });
      } else {
        Taro.showToast({
          title: '没有列表数据',
          icon: 'none',
          duration: 2000
        })
      }
    });
  }

  getPropsShowExDialog(value) {
    this.setState({
      isShowEx: value
    });
  }

  mind() {
    Taro.reLaunch({ url: `/pages/index/index` });
  }

  toHome() {
    Taro.reLaunch({ url: `/pages/index/index` });
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
                rangeKey="{{'duration'}}"
                onChange={this.onChangeMin.bind(this,'A')}
              >
                <View className='num'> {this.state.cheMin}</View>
              </Picker>),
              'B':  (<Picker
                mode='selector'
                range={this.state.seMin}
                rangeKey="{{'duration'}}"
                onChange={this.onChangeMin.bind(this,'B')}
              >
                <View className='num'> {this.state.cheMin}</View>
              </Picker>),
              'C':  (<Picker
                mode='selector'
                range={this.state.seMin}
                rangeKey="{{'duration'}}"
                onChange={this.onChangeMin.bind(this,'C')}
              >
                <View className='num'> {this.state.cheMin}</View>
              </Picker>),
            }[id]
            }
            </View>
            <View className='voice' class={`${bColor}`}>
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
        <FM showFMDialog={isShowFM} {...FMModal} />
        <Ex showExDialog={isShowEx} {...ExModal} />
      </View>
    );
  }
}

export default Index;
