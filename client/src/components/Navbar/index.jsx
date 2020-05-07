import Taro, { Component } from "@tarojs/taro";
import { View, Text, Image } from "@tarojs/components";
import Icon from '@/assets/back_icon.png'
import Group6 from '@/assets/Group6.png'

import "./index.less";


class Navbar extends Component {
  toHome() {
    var pages = Taro.getCurrentPages()    //获取加载的页面

    var currentPage = pages[pages.length-1]    //获取当前页面的对象
    var url = currentPage.route 
    const state = Taro.getStorageSync('playState');
    if(url  == 'pages/playVideo/index' && state == 'PLAY_LOAD'){
      return this.props.onShowExDialog(true)
    }
    Taro.navigateTo({
      url: `/pages/index/index`
    });
  }
  toPrevious() {
    Taro.navigateBack({ delta: 1 })
  }
  render() {
    const { text, color, type } = this.props
    const style = {
      paddingTop: Taro.$navBarMarginTop + "px",
      background: color
    };
    // 将状态栏的区域空余出来
    return (
      <View className='navbarWrap' style={style}>
        {type ?
          <View className='navbar'>
            {type == 1
              ?
              <Image className='iconText' src={Group6} onClick={this.toHome} />
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
