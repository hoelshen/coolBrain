import Taro from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import { useLocalStore,  observer } from '@tarojs/mobx'

import './index.scss'

function Index() {


  const { avatarUrl } = store;
  return (
    <View>
      <Image
        className='img'
        src={avatarUrl}
      />
    </View>
  )
}

export default observer(Index)