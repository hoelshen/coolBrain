import Taro, {useState} from "@tarojs/taro";
import { View, Image } from "@tarojs/components";
import play from "@/assets/play.png";
import stop from "@/assets/stop.png";
import "./index.less";

function onPlay() {
  console.log("111xxx");
  this.isPlay = true;
  this.isStop = false;
}
function onPause() {
  this.isPlay = false;
  this.isStop = false;
}
/* function onStop() {
  this.isPlay = false;
  this.isStop = true;
} */
function onEnded() {
  this.percent = 0;
  this.isPlay = false;
  this.isStop = true;
}
function computePercent(audio) {
  let currentTimes = parseInt(audio.currentTime);
  let durations = parseInt(audio.duration);
  let percent = parseInt((currentTimes / durations) * 100);
/*   console.log(
    "currentTimes:",
    currentTimes,
    "percent:",
    percent,
    "durations:",
    durations
  ); */
  while(percent == 100){
    onEnded();
    return 
  }
  const obj = {
    percent,
    currentTimes,
    durations
  }
  return obj
}
const Play = props => {
  const { Triangle, url } = props;
  let currentTime = 0;
  let duration = 0;
  let [leftDeg, setLeftDeg] = useState("45deg")
  let [rightDeg, setrightDeg] = useState("45deg")


  const audio = Taro.$backgroundAudioManager;
  
  audio.src = url || "http://audio.heardtech.com/endAudio.mp3";
  audio.title = "今日片尾";


  audio.onError(e => {
    console.log("音频播放错误", e);
  });
  audio.onTimeUpdate(() => {
    let audioData = computePercent(audio);
    console.log('obj: ', audioData);

    currentTime = audioData.currentTimes;
    duration = audioData.durations;
    // 右侧半圆在进度超过一半之后要保持旋转225deg状态,未超过一半，左侧半圆保持原始角度45deg
    if (currentTime / duration <= 0.5) {
      leftDeg = "45deg";
      rightDeg = (currentTime / duration) * 360 + 45 + "deg";
    } else {
      leftDeg = (currentTime / duration) * 360 + 225 + "deg";
      rightDeg = "225deg";
    }

    (() => setLeftDeg(leftDeg));
    (()=> setrightDeg(rightDeg));
    console.log("props: ", props, audio);
  });
  
  const rightStyle = {
    transform: `rotate(${rightDeg})`
  };
  
  const leftStyle = {
    transform: `rotate(${leftDeg}) `
  };
  console.log('leftStyle: ', rightStyle, leftStyle);
  return (
    <View className='circle_container'>
      <View class='circleProgress_wrapper'>
        <View class='wrapper right'>
          <View class='circleProgress rightcircle' style={rightStyle}></View>
        </View>
        <View class='wrapper left'>
          <View class='circleProgress leftcircle' style={leftStyle}></View>
        </View>
        {Triangle ? (
          <Image className='Triangle' src={play} onClick={onPlay}></Image>
        ) : (
          <Image className='Triangle' src={stop} onClick={onPause}></Image>
        )}
      </View>
    </View>
  );
};
export default Play;
