import Taro, { useState, useEffect } from "@tarojs/taro";
import { View, Text } from "@tarojs/components";
import { getResultData_putPost } from "@/servers/servers";

import './index.less'

const Comment = (props)=> {
  const [ pushState, setPushState ] = useState('no');
  const onPush = (CommentId)=>{
    setPushState('yes');
    Taro.showToast({
      title: '发布成功',
      icon: 'none',
      duration: 2000
    })
    getResultData_putPost({id:CommentId, is_public: 'yes'})
  }
  const { created_at, text, showPush, CommentId  } = props
  
  useEffect(()=>{
    setPushState(showPush.key)
  }, [showPush])
  
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
      {
        (pushState == 'no') &&
        <View className='btn' onClick={()=>onPush(CommentId)}><Text>发布</Text></View>
      }
  </View>
  );
}

export default Comment;
