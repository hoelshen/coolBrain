import Taro, { useDidShow,  } from "@tarojs/taro";
import { View, Text } from "@tarojs/components";

import './index.less'

const Comment = (props)=> {
  useDidShow(()=>{
    console.log('111', props)
  })
  const onPush = ()=>{
    console.log('111')
  }
  const { created_at,text  } = props
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
      <View className='btn' onClick={onPush}><Text>发布</Text></View>
  </View>
  );
}

export default Comment;
