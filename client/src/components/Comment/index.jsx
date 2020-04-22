import Taro, { useDidShow,  } from "@tarojs/taro";
import { View, Text , Button} from "@tarojs/components";

import './index.less'

const Comment = (props)=> {
  useDidShow(()=>{
    console.log('111', props)
  })
  const onPush = ()=>{
    console.log('111')
  }
  return (
    <View className='body'>
      <View className='left'>
          <Text className='time'>
            2020.01.02
          </Text>
      </View>
      <View className='right'>
        <Text className='text1'>
          这是冥想的内容，这是冥想的内容这是冥想的内容这是冥想的内容这是冥想的内容这是冥想的内容
        </Text>
      </View> 
      <View className='btn' onClick={onPush}><Text>发布</Text></View>
  </View>
  );
}

export default Comment;
