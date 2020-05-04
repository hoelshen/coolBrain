import Taro, { useState, useEffect, useRef } from "@tarojs/taro";
import { View, Image } from "@tarojs/components";
import play from "@/assets/play.png";
import stop from "@/assets/stop.png";
import "./index.less";



const Play = props => {
  const { videoUrl } = props;
  if (!videoUrl) return false;

  const isFirstRender = useRef(true);
  const [isPlay, setIsPlay] = useState(false);
  const [currentTime, setCurrentTime] = useState(1)
  const [duration, setDuration] = useState(0)
  const useDurationTime = useRef(duration);
  const [leftDeg, setLeftDeg] = useState("45deg");
  const [rightDeg, setRightDeg] = useState("45deg");
  const [playState, setPlayState] = useState("PLAY_START");

  function onPlay() {
    console.log('playState: ', playState);
    if (playState === "PLAY_START") {
      setPlayState('PLAY_LOAD');
      setIsPlay(true);
    } else if( playState === "PLAY_LOAD") {
      setPlayState('PLAY_PAUSE');
      setIsPlay(false);
    } else if(playState === "PLAY_PAUSE"){
      setPlayState('PLAY_LOAD');
      setIsPlay(true)
    }
  }
  
  function processTime(){
    const countTime =  Taro.getStorageSync('useTime');
    // console.log('countTime: ', countTime);
    const startTime =  Taro.getStorageSync('startTime');
    // console.log('startTime: ', startTime);

    var dateEnd = parseInt(new Date().getTime()/1000);
    const useTime = dateEnd - parseInt(startTime /1000);
    // console.log('useTime: ', useTime);
    

    Taro.setStorage({
      key: "useTime",
      data: countTime + useTime
    });
  }
  
  useEffect(()=>{
    if(!isFirstRender.current){
      if (playState === "PLAY_LOAD") {
        const startTime  = new Date().getTime();
        Taro.setStorage({
          key: "startTime",
          data: startTime
        });
        Taro.$backgroundAudioManager.title =  ' ';
        Taro.$backgroundAudioManager.src = props.videoUrl;
      } else if (playState === "PLAY_PAUSE") {
        Taro.$backgroundAudioManager.pause()
      } else {
        Taro.$backgroundAudioManager.stop()
      } 
      let interval = null ;
      let nexTime = 0;
      if (isPlay) {
        interval = setInterval(() => {
          const curTime = Taro.$backgroundAudioManager.currentTime;
          const durTime = Taro.$backgroundAudioManager.duration;
          // 右侧半圆在进度超过一半之后要保持旋转225deg状态,未超过一半，左侧半圆保持原始角度45deg
          if(curTime && durTime && curTime !==0 && durTime !==0){
            if (curTime / durTime <= 0.5) {
              setLeftDeg("45deg");
              setRightDeg((curTime / durTime) * 360 + 45 + "deg");
            } else {
              setLeftDeg((curTime / durTime) * 360 + 225 + "deg" );
              setRightDeg("225deg");
            }
          }
          if(curTime == 0 && curTime == durTime){
            // console.log('🍎🍎🍎🍎🍎🍎🍎🍎', curTime, durTime)
            Taro.$backgroundAudioManager.stop()
            clearInterval(interval)
            processTime();
            Taro.navigateTo({ url: `/pages/playVideo/success?duration=${nexTime}`});
          } 
          nexTime = durTime;
        }, 1000)
      }
    }else{
      isFirstRender.current = false
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[playState])

  const rightStyle = {
    transform: `rotate(${rightDeg})`
  };
  
  const leftStyle = {
    transform: `rotate(${leftDeg}) `
  };


  return (
    <View className='circle_container' onClick={onPlay}>
      <View class='circleProgress_wrapper'>
        <View class='wrapper right'>
          <View class='circleProgress rightcircle' style={rightStyle}></View>
        </View>
        <View class='wrapper left'>
          <View class='circleProgress leftcircle' style={leftStyle}></View>
        </View>
        {!isPlay ? (
          <Image className='Triangle' src={play}></Image>
        ) : (
          <Image className='Triangle' src={stop}></Image>
        )}
      </View>
    </View>
  );
};
export default Play;
