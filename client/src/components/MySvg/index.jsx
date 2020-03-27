import Taro from '@tarojs/taro'
import { View, Image } from '@tarojs/components'

import './index.less';


const MySvg = ({ type, color }) => {
  return(
    <View  className={color}>
      <Image src={type} alt='My SVG image' />
    </View>
  )
}

export default MySvg