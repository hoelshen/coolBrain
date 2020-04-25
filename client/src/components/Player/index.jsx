import Taro, { useState, useEffect, useRef } from "@tarojs/taro";
import { View, Image } from "@tarojs/components";
import play from "@/assets/play.png";
import stop from "@/assets/stop.png";
import "./index.less";



const Play = props => {
  const { videoUrl } = props;
  if (!videoUrl) return false;

  Taro.$backgroundAudioManager.url = videoUrl;
  const isFirstRender = useRef(true);
  const [isPlay, setIsPlay] = useState(false);
  const [currentTime, setCurrentTime] = useState(1)
  const [duration, setDuration] = useState(0)
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
    }
  }
  
  function processTime(){
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


  useEffect(() => {
    setCurrentTime(Taro.$backgroundAudioManager.currentTime);
    setDuration(Taro.$backgroundAudioManager.duration);
    // 右侧半圆在进度超过一半之后要保持旋转225deg状态,未超过一半，左侧半圆保持原始角度45deg
    if(currentTime !==0 && duration !==0){
      if (currentTime / duration <= 0.5) {
        setLeftDeg("45deg");
        setRightDeg((currentTime / duration) * 360 + 45 + "deg");
      } else {
        setLeftDeg((currentTime / duration) * 360 + 225 + "deg" );
        setRightDeg("225deg");
      }
      console.log('duration', duration)
      if(currentTime && currentTime == duration){
        console.log('🍎🍎🍎🍎🍎🍎🍎🍎', currentTime, duration)
        Taro.$backgroundAudioManager.stop()
        Taro.navigateTo({ url: `/pages/playVideo/success?duration=${duration}`});
      }
    }

  }, [currentTime]);

  useEffect(()=>{
    if(!isFirstRender.current){
      if (playState === "PLAY_LOAD") {
        const startTime  = new Date().getTime();
        Taro.setStorage({
          key: "startTime",
          data: startTime
        });
        Taro.$backgroundAudioManager.title =  ' ';
        Taro.$backgroundAudioManager.src =  Taro.$backgroundAudioManager.url;
      } else if (playState === "PLAY_PAUSE") {
        Taro.$backgroundAudioManager.pause()
      } else {
        Taro.$backgroundAudioManager.stop()
      } 
      processTime();
      setCurrentTime(2)
    }else{
      isFirstRender.current = false
    }
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
