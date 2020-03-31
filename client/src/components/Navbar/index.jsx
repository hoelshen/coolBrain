import Taro, { Component } from "@tarojs/taro";
import { View } from "@tarojs/components";
import "./index.less";

class Navbar extends Component {
  render() {
    const {text, color} =this.props
    const style = {
      paddingTop: Taro.$navBarMarginTop + "px",
      background: color
    };
    // 将状态栏的区域空余出来
    return (
      <View className='navbarWrap' style={style}>
        <View className='navbar'>{text}</View>
      </View>
    );
  }
}
export default Navbar;
