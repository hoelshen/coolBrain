import Taro, { useDidShow,  } from "@tarojs/taro";
import { View, Text } from "@tarojs/components";
import { getResultData_postsDiary } from "@/servers/servers";

import './index.less'

const Comment = (props)=> {
  useDidShow(()=>{
    console.log('111', props)
  })
  const onPush = (commentText)=>{
    getResultData_postsDiary({'text': commentText, location:'public'})
  }
  const { created_at, text  } = props
  return (
    <View className='body'>
      <View className='left'>
          <Text className='time'>
            {created_at}
          </Text>
      </View>
      <View className='right'>
        <Text className='text1'>
          {text}
        </Text>
      </View> 
      <View className='btn' onClick={onPush(text)}><Text>发布</Text></View>
  </View>
  );
}

export default Comment;
