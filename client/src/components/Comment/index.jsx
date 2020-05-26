import Taro, { useDidShow } from "@tarojs/taro";
import { View, Image, Text } from "@tarojs/components";
import userStore from "@/store/user";
import thumb_up from "@/assets/thumb_up.png";
import thumb_up_y from "@/assets/thumb_up-y.png";

import "./index.less";


const Comment = props => {
  const { avatarUrl, nickName } = userStore;
  useDidShow(() => {
  });
  const { created_at,text} = props
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
