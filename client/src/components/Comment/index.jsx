import Taro from "@tarojs/taro";
import { View, Image, Text } from "@tarojs/components";

import "./index.less";


const Comment = props => {

  const { avatarUrl, nickName, created_at, text} = props
  return (
    <View className='contain flex column a-center'>
      <View className='left flex column'>
        <Image className='avatarUrl' src={avatarUrl} />
      </View>
      <View className='right flex column'>
        <Text className='name'>{nickName}</Text>
        <Text className='text1'>
          {text}
        </Text>
        <Text className='dayText'>{created_at}</Text>
      </View>
    </View>
  );
};

export default Comment;
