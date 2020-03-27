import Taro, { Component } from '@tarojs/taro'
import classNames from 'classnames';
import { View, Text, Image, Picker } from '@tarojs/components'
import topSign from '@/assets/topSign.png';

import play from '@/assets/play.png';
import stop from '@/assets/stop.png';

import bottomSign from '@/assets/bottomSign.png';
import mindImg from '@/assets/btn-wc.png';
import share from '@/assets/fx.png';



import * as types from '@/constants/PlayTypes.js';

import './index.less'

console.log('types: ', types);


export default class Index extends Component {
  state = {
    type: 0,
    id: 'A',
    seMin: [10, 15, 30],
    cheMin: 10,
    seVoice: [{ name: '男声', id: 0 }, { name: '女声', id: 1 }],
    cheVoice: '男声',
    playState: types.PLAY_START,
    Triangle: true
  }
  
  componentWillMount() {
    Taro.cloud.init();
  }

  async componentDidMount() {
    console.log(this.$router.params)
    const { type, id } = this.$router.params;
    console.log('type: ', type, id);
    this.setState({ type: type, id: id })
    let res = await Taro.cloud.callFunction();
    console.log('res.result.data', res.result.data);
  }

  componentWillUnmount() { }

  config = {
    navigationBarTitleText: '播放'
  }

  componentDidShow() { }

  componentDidHide() { }


  onShareAppMessage(res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: '自定义转发标题',
      path: '/page/user?id=123'
    }
  }
  choiceMin() {

  }
  choiceVideo() {

  }
  onChangeVoice(e) {
    console.log('e222222: ', e.detail.value);
    this.setState({
      cheVoice: this.state.seVoice[e.detail.value]['name']
    })
  }
  onChangeMin(e) {
    this.setState({
      cheMin: this.state.seMin[e.detail.value]
    })
  }
  clickPlay() {
    const { playState } = this.state;
    if (playState === 'PLAY_START') {
      this.setState({ playState: 'PLAY_LOAD', Triangle: false })
    } else if (playState === 'PLAY_LOAD') {
      this.setState({ playState: 'PLAY_STOP', Triangle: true })
    } else {
      this.setState({ playState: 'PLAY_START', Triangle: false })
    }
  }
  mind() {
    Taro.reLaunch({ url: `/pages/index/index` })
  }
  toHome() {
    Taro.reLaunch({ url: `/pages/index/index` })
  }

  render() {
    const { type, id, playState, Triangle } = this.state;
    const vStyle = classNames({
      playing: true,
      'vStyle-a': id === 'A',
      'vStyle-b': id === 'B',
      'vStyle-c': id === 'C'
    });
    const pStyle = classNames(
      'circle',
      { 'whiteCircle': playState === 'PLAY_START' },
      { 'loadCircle': playState === 'PLAY_LOAD' },
      { 'blueCircle': playState === 'PLAY_STOP' }
    )

    return (
      <View className='contain'>
        {type == 0
          ? <View className={vStyle}>
            <View className={`${pStyle}`} onClick={this.clickPlay}>
              {Triangle
                ? <Image className='Triangle' src={play}></Image>
                :
                <Image className='Triangle' src={stop}></Image>
              }
            </View>
            <View class='min'>
              <Picker mode='selector' range={this.state.seMin} onChange={this.onChangeMin}>
                <View className='num'>
                  {this.state.cheMin} min
                  </View>
              </Picker>
            </View>
            <View class='voice'>
              <Picker mode='selector' range={this.state.seVoice}  rangeKey="{{'name'}}" onChange={this.onChangeVoice}>
                <View className='num'>
                  {this.state.cheVoice}
                </View>
              </Picker>
            </View>
          </View>
          : <View className='played'>
            <View className='head'>
              <Image
                onClick={this.toHome}
                className='mindImg'
                src={mindImg}
              ></Image>
            </View>
            <Image
              className='iconImg topSign'
              src={topSign}
            />
            <Text class='endText'>冥想是一种认真生活的态度。</Text>
            <Image
              className='iconImg bottomSign'
              src={bottomSign}
            />

            <Image
              className='shareImg'
              src={share}
            />
          </View>
        }
      </View>
    )
  }
}