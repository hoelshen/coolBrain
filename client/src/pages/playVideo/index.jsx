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

class Index extends Component {
  state = {
    type: 0,
    id: 'A',
    seMin: [10, 15, 30],
    cheMin: 10,
    seVoice: [{ name: '男声', id: 0 }, { name: '女声', id: 1 }],
    cheVoice: '男声',
    videoUrl: '',
    playState: types.PLAY_START,
    Triangle: true
  }
  componentWillMount() {
    Taro.cloud.init();
  }

  async componentDidMount() {
    const that = this;
    console.log(this.$router.params);
    const { type, id } = this.$router.params;
    this.setState({ type: type, id: id })
    await Taro.cloud.callFunction({
      // 云函数名称
      name: 'voice',
      // 传给云函数的参数
    })
    .then(res => {
      const data = res.result.data;
      if(data.length > 0){
        that.fileID = data[0].voicelist;
      }
    })
    .catch(console.error)
    Taro.cloud.getTempFileURL({
      fileList: [this.fileID],
      success: res => {
        console.log('res: ', res);
        if(res.fileList.length >0){
          const { tempFileURL }= res.fileList[0];
          that.setState({videoUrl: tempFileURL})
        } else {
          Taro.showToast({title: '获取音频失败',icon:'none'})
        }
      },
      fail: err => {
        console.log('err: ', err);
        // handle error
      }
    })

  }


  //TODO
  //1.完成背景图片与样式的同步更新
  //2.将背景音乐配合
  //3.登陆的形式（待确认）
  //4.配合调男女、调时间
  //5.本地存储相关时间状态
  componentWillUnmount() { }
  fileID = '';

  config = {
    navigationBarBackgroundColor: '#8cc9bd',
    navigationBarTextStyle: 'white',
    backgroundColor: '#8cc9bd',
    backgroundTextStyle: 'light'
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
    const { playState, videoUrl } = this.state;
    if (playState === 'PLAY_START') {
      this.setState({ playState: 'PLAY_LOAD', Triangle: false })
      Taro.playBackgroundAudio({
        dataUrl: videoUrl,
        title: 'bg1',
        coverImgUrl: ''
      })
    } else if (playState === 'PLAY_LOAD') {
      this.setState({ playState: 'PLAY_STOP', Triangle: true })
      Taro.stopBackgroundAudio()
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


export default Index