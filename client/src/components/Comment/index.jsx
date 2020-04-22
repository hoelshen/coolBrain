import Taro, { useState, useContext,useDidShow } from "@tarojs/taro";
import { View, Image, Text, Button } from "@tarojs/components";
import userStore from '@/store/user'

function Comment() {

  const { avatarUrl, nickName } = useContext(userStore);

  useDidShow(()=>{
    console.log('111')
  })
  return (
    <View className='body flex column j-between'>
      <View className='head'>
        <View className='boder column'>
          <Text className='name'>正念冥想评论区</Text>
        </View>
      </View>
      <View className='contain flex column a-center'>
        <View className='left flex column'>
          <Image className='avartal' src={avatarUrl} />
        </View>
        <View className='right flex column'>
          <Text className='day'>{nickName}</Text>
          <Text className='dayNum'>
            这是冥想的内容，这是冥想的内容这是冥想的内容这是冥想的内容这是冥想的内容这是冥想的内容
          </Text>
          <Text className='dayText'>2020.01.02</Text>
        </View>
      </View>
    </View>
  );
}

export default Comment;
