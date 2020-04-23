import Taro, { useDidShow } from "@tarojs/taro";
import { View, Image, Text } from "@tarojs/components";
import userStore from "@/store/user";
import thumb_up from "@/assets/thumb_up.png";
import thumb_up_y from "@/assets/thumb_up-y.png";

import "./index.less";

console.log("userStore: ", userStore);

const Comment = props => {
  const { avatarUrl, nickName, thumb } = userStore;
  useDidShow(() => {
    console.log("111", props);
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
        <View className='thumDiv'>
        {thumb ? (
          <Image src={thumb_up} className='thumbImg'></Image>
        ) : (
          <Image src={thumb_up_y} className='thumbImg'></Image>
        )}
        <Text className={thumb ? 'thumb_num' : 'thumb_y_num'}>13</Text>
        </View>
      </View>
    </View>
  );
};

export default Comment;