import Taro from "@tarojs/taro";
import { View, Image } from "@tarojs/components";

import play from "@/assets/play.png";
import stop from "@/assets/stop.png";
import "./index.less";
/* 
import Img from ; */

function formatNumber(){
  console.log('1')
}
function play_audio_func() {
  const audio = Taro.getBackgroundAudioManager();
  audio.src = "http://audio.heardtech.com/endAudio.mp3";
  audio.title = "今日片尾";
}
let leftDeg = "";
let rightDeg = "";
let visible = "";
let currentTime = 0;
let duration = 0;
const audio = Taro.getBackgroundAudioManager();

audio.onPlay(() => {
  this.isPlay = true;
  this.isStop = false;
});
audio.onPause(() => {
  this.isPlay = false;
  this.isStop = false;
});
audio.onStop(() => {
  this.isPlay = false;
  this.isStop = true;
});
audio.onEnded(() => {
  // audio.onTimeUpdate(() => {})
  this.percent = 0;
  this.isPlay = false;
  this.isStop = true;
});
audio.onError(e => {
  console.log("音频播放错误", e);
});
audio.onTimeUpdate(() => {
  let audioData = computePercent(audio);
  this.percent = audioData.percent;
  this.time = audioData.time;
  currentTime = audioData.currentTime;
  duration = audioData.duration;
  this.duration = audioData.dtime;
  // 右侧半圆在进度超过一半之后要保持旋转225deg状态,未超过一半，左侧半圆保持原始角度45deg
  if (currentTime / duration <= 0.5) {
    leftDeg = "45deg";
    rightDeg = (currentTime / duration) * 360 + 45 + "deg";
    visible = "hidden";
  } else {
    leftDeg = (currentTime / duration) * 360 + 225 + "deg";
    rightDeg = "225deg";
    visible = "visible";
  }

  this.rightDeg = rightDeg;
  this.leftDeg = leftDeg;
  this.visible = visible;

  this.$apply();
});
function computePercent(audio) {
  let currentTime = parseInt(audio.currentTime);
  let duration = parseInt(audio.duration);
  let min = parseInt(currentTime / 60);
  let sec = parseInt(currentTime % 60);
  let dmin = parseInt(duration / 60);
  let dsec = parseInt(duration % 60);
  let time = formatNumber(min) + ":" + formatNumber(sec);
  let dtime = formatNumber(dmin) + ":" + formatNumber(dsec);
  let percent = parseInt((currentTime / duration) * 100);
  console.log(
    "currentTime:",
    currentTime,
    "percent:",
    percent,
    "duration:",
    duration
  );
  return {
    time,
    dtime,
    percent,
    currentTime,
    duration
  };
}
const Play = props => {
  const { Triangle } = props;
  console.log("props: ", props);
  const rightStyle = {
    transform: `rotate(${leftDeg})`
  };
  const leftStyle = {
    transform: `rotate(${leftDeg}) `
  };
  const visibleStyle = {
    visibility: { visible }
  };

  return (
    <View className='circle_container'>
      <View className='circle_wrapper'>
        <View className='progress_wrapper circle_right'>
          <View
            className='circle_progress right_circle'
            style={rightStyle}
          ></View>
        </View>
        <View className='progress_wrapper circle_left'>
          <View
            className='circle_progress left_circle'
            style={leftStyle}
          ></View>
        </View>
        {Triangle ? (
          <Image className='Triangle' src={play}></Image>
        ) : (
          <Image className='Triangle' src={stop}></Image>
        )}
        {/*        <Image src={Img} className='play_audio' tap='pause_audio'></Image> */}
        <View style={visibleStyle} className='circle_markup'></View>
      </View>
    </View>
  );
};

Play.propTypes = {
  nickName: "",
  isStop: true,
  duration: "",
  percent: 0,
  play: true,
  title: "",
  time: "",
  rightDeg: "",
  leftDeg: "",
  visible: "hidden"
};

export default Play;
