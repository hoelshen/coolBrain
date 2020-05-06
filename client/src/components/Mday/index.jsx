import Taro , { useState, useEffect, useRef, useDidShow } from "@tarojs/taro";
import { View, Text } from "@tarojs/components";
import PropTypes from "prop-types";


import {
  getResultData_greeting,
} from "@/servers/servers";

import "./index.less";

function formatName() {
  const val = Taro.$dayjs().hour();
  let value;
  if (6 <= val && val <= 11) {
    value = "早上好";
  }
  if (11 < val && val <= 13) {
    value = "中午好";
  }
  if (13 < val && val <= 17) {
    value = "下午好";
  }
  if (17 < val && val < 19) {
    value = "傍晚好";
  }
  if (19 <= val && val <= 23) {
    value = "晚上好";
  }
  if (0 <= val && val <= 5) {
    value = "深夜好";
  }
  return value;
}



function formatEnName(){
  const val = Taro.$dayjs().hour();
  let value;
  if (6 <= val && val <= 11) {
    value = "Good morning";
  }
  if (11 < val && val <= 13) {
    value = "Good afternoon";
  }
  if (13 < val && val <= 17) {
    value = "Good afternoon";
  }
  if (17 < val && val < 19) {
    value = "Good evening";
  }
  if (19 <= val && val <= 23) {
    value = "Good evening";
  }
  if (0 <= val && val <= 5) {
    value = "Good night";
  }
  return value;
}

const MDAY = props => {
  useDidShow(
    ()=>{
      const value = getResultData_greeting()
      console.log('getResultData_greeting: ', value);
    }
  )


  const { nickName } = props;
  let flag = nickName ? true : false;
  return (
    <View className='greeting'>
      <Text className='format'>{formatName()}, </Text>
      {flag ? (
        <Text className='name'>{nickName}!</Text>
      ) : (
        <Text className='name'>请登录!</Text>
      )}
      <View>
        <Text className='enName'>
          {formatEnName()}, 
          </Text>
          <Text className='enName'>
            ,welcome back
          </Text>
      </View>
    </View>
  );
};

MDAY.propTypes = {
  nickName: PropTypes.string
};

export default MDAY;
