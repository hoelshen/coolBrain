import Taro, { useDidShow,  } from "@tarojs/taro";
import { View, Text } from "@tarojs/components";
import { getResultData_putPost } from "@/servers/servers";

import './index.less'

const Comment = (props)=> {

  const onPush = (CommentId)=>{
    getResultData_putPost({id:CommentId, is_public: 'yes'})
  }
  const { created_at, text, showPush, CommentId  } = props
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
        (showPush.key == 'no') &&
        <View className='btn' onClick={()=>onPush(CommentId)}><Text>发布</Text></View>
      }
  </View>
  );
}

export default Comment;
