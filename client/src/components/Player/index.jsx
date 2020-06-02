import Taro, { useState, useEffect, useRef } from "@tarojs/taro";
import { View, Image } from "@tarojs/components";
import play from "@/assets/play.png";
import stop from "@/assets/stop.png";
import "./index.less";

const Play = (props) => {
  const { videoUrl, fileId } = props;
  if (!videoUrl) return false;


  const [isIOS, setIsIos] = useState(true);
  const isFirstRender = useRef(true);
  const isInter = useRef({});
  const [isPlay, setIsPlay] = useState(false);
  const [showRight, setShowRight] = useState("display");
  const [duration, setDuration] = useState(0);
  const [leftDeg, setLeftDeg] = useState("45deg");
  const [rightDeg, setRightDeg] = useState("45deg");
  const [playState, setPlayState] = useState("PLAY_START");
  const [visible, setVisible] = useState("visible");
  let res = Taro.getSystemInfoSync();
  function onPlay() {
    console.log("plas", playState);
    if (playState === "PLAY_START") {
      setPlayState("PLAY_LOAD");
      Taro.setStorage({
        key: "playState",
        data: "PLAY_LOAD",
      });
      setIsPlay(true);
    } else if (playState === "PLAY_LOAD") {
      setPlayState("PLAY_PAUSE");
      Taro.setStorage({
        key: "playState",
        data: "PLAY_PAUSE",
      });
      setIsPlay(false);
    } else if (playState === "PLAY_PAUSE") {
      setPlayState("PLAY_CONTINUE");
      Taro.setStorage({
        key: "playState",
        data: "PLAY_CONTINUE",
      });
      setIsPlay(true);
    } else if (playState === "PLAY_CONTINUE") {
      setPlayState("PLAY_PAUSE");
      Taro.setStorage({
        key: "playState",
        data: "PLAY_PAUSE",
      });
      setIsPlay(false);
    }
  }

  function initialization() {
    setPlayState("PLAY_START");

    clearInterval(isInter.current);

    Taro.setStorage({
      key: "playState",
      data: "PLAY_START",
    });
    setIsPlay(false);
    setLeftDeg("45deg");
    setRightDeg("45deg");
    setDuration(0);
  }

  Taro.$backgroundAudioManager.onEnded(() => {
    Taro.navigateTo({
      url: `/pages/playVideo/success?duration=${duration}&fileId=${fileId}`,
    });
  });

  useEffect(() => {
    console.log("video变化了", videoUrl);
    initialization();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [videoUrl]);

  useEffect(() => {
    if (!isFirstRender.current) {
      if (playState === "PLAY_LOAD") {
        Taro.$backgroundAudioManager.title = " ";
        Taro.$backgroundAudioManager.src = props.videoUrl;
        setDuration(Taro.$backgroundAudioManager.duration);
        isInter.current = setInterval(() => {
          const curTime = Taro.$backgroundAudioManager.currentTime;
          const durTime = Taro.$backgroundAudioManager.duration;
          // 右侧半圆在进度超过一半之后要保持旋转225deg状态,未超过一半，左侧半圆保持原始角度45deg
          if (curTime && durTime) {
            if (curTime / durTime <= 0.5) {
              setLeftDeg("45deg");
              setRightDeg((curTime / durTime) * 360 + 45 + "deg");
              setVisible("visible");
            } else {
              setLeftDeg((curTime / durTime) * 360 + 225 + "deg");
              setRightDeg("225deg");
              setVisible("hidden");
              setShowRight("none");
            }
          }
          if (curTime == 0 && curTime == durTime) {
            Taro.$backgroundAudioManager.stop();
            clearInterval(isInter.current);
          }
          setDuration(durTime);
        }, 500);
      } else if (playState === "PLAY_PAUSE") {
        Taro.$backgroundAudioManager.pause();
      } else if (playState === "PLAY_CONTINUE") {
        Taro.$backgroundAudioManager.play();
      } else {
        Taro.$backgroundAudioManager.stop();
      }
    } else {
      isFirstRender.current = false;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playState]);

  useEffect(() => {
    let isiOS = res.system.indexOf("iOS") > -1;
    setIsIos(isiOS);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const rightStyle = {
    transform: `rotate(${rightDeg})`,
    display: `${showRight}`,
  };

  const leftStyle = {
    transform: `rotate(${leftDeg}) `,
  };

  const markStyle = {
    visibility: `${visible}`,
  };
  const android = {
    visibility: `${visible}`,
    bottom: "4rpx",
  };

  const ios = {
    visibility: `${visible}`,
    bottom: "0rpx",
  };

  return (
    <View className='circle_container' onClick={onPlay}>
      <View class='circleProgress_wrapper'>
        <View style={markStyle} class='circle_markup_top'></View>
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
        <View style={isIOS ? ios : android} class='circle_markup_bottom'></View>
      </View>
    </View>
  );
};
export default Play;
