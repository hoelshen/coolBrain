import Taro, { Component } from "@tarojs/taro";
import { View, Text, Image } from "@tarojs/components";
import Icon from '@/assets/back_icon.png'

import "./index.less";


class Navbar extends Component {
  toHome() {
    Taro.navigateTo({
      url: `/pages/home/index`
    });
  }
  toPrevious() {
    Taro.navigateBack({ delta: 1 })
  }
  render() {
    const { text, color, type } = this.props
    console.log('color: ', text, color, type);
    const style = {
      paddingTop: Taro.$navBarMarginTop + "px",
      background: color
    };
    // 将状态栏的区域空余出来
    return (
      <View className='navbarWrap' style={style}>
        {type ?
          <View className='navbar'>
            {type == 0
              ?
              <Text className='iconText' onClick={this.toHome}>x</Text>
              :
              <Image className='iconImg' src={Icon} onClick={this.toPrevious} />
            }
            <Text>
              {text}
            </Text>
          </View>
          :
          <View className='navbar'>
            <Text>
              {text}
            </Text>
          </View>
        }

      </View>
    );
  }
}
export default Navbar;
