import Taro, { useDidShow,  } from "@tarojs/taro";
import { View, Image, Text } from "@tarojs/components";
import userStore from '@/store/user'

console.log('userStore: ', userStore);

const Comment = (props)=> {
  const {avatarUrl,nickName } = userStore
  useDidShow(()=>{
    console.log('111', props)
  })
  return (
    <View className='contain flex column a-center'>
      <View className='left flex column'>
        <Image className='avatarUrl' src={avatarUrl} />
      </View>
      <View className='right flex column'>
        <Text className='name'>{nickName}</Text>
        <Text className='text1'>
          这是冥想的内容，这是冥想的内容这是冥想的内容这是冥想的内容这是冥想的内容这是冥想的内容
        </Text>
        <Text className='dayText'>2020.01.02</Text>
      </View>
    </View>
  );
}

export default Comment;
