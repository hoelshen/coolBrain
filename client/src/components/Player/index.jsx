import Taro, { useState, useEffect } from "@tarojs/taro";
import { View, Image } from "@tarojs/components";
import play from "@/assets/play.png";
import stop from "@/assets/stop.png";
import "./index.less";



const Play = props => {

  function onPlay() {
    isPlay = true;
    isStop = false;
  }
  function onPause() {
    isPlay = false;
    isStop = false;
  }
  function onStop() {
    isPlay = false;
    tisStop = true;
  } 
  function onEnded() {
    percent = 0;
    isPlay = false;
    isStop = true;
  }

  const { Triangle, url } = props;
  const audio = Taro.$backgroundAudioManager;
  audio.src = url || "";
  audio.title = "今日片尾";
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [leftDeg, setLeftDeg] = useState("45deg");
  const [rightDeg, setRightDeg] = useState("45deg");

  useEffect(() => {
    setCurrentTime(audio.currentTime);
    setDuration(audio.duration);
    // 右侧半圆在进度超过一半之后要保持旋转225deg状态,未超过一半，左侧半圆保持原始角度45deg
    if(currentTime !==0 && duration !==0){
      if (currentTime / duration <= 0.5) {
        setLeftDeg("45deg");
        setRightDeg((currentTime / duration) * 360 + 45 + "deg");
      } else {
        setLeftDeg((currentTime / duration) * 360 + 225 + "deg" );
        setRightDeg("225deg");
      }
    }
  }, [audio, audio.currentTime, audio.duration, currentTime, duration]);

  const rightStyle = {
    transform: `rotate(${rightDeg})`
  };
  
  const leftStyle = {
    transform: `rotate(${leftDeg}) `
  };
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
