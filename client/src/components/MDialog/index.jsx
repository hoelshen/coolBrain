import Taro, { Component } from "@tarojs/taro";
import { View, Button, Image, Text } from "@tarojs/components";
import topSign from "@/assets/topSign.png";
import bottomSign from "@/assets/bottomSign.png";
import share from "@/assets/fx.png";
import Group6 from "@/assets/Group6.png";

import "./index.less";

class Modal extends Component {
  constructor() {
    super(...arguments);
  }

  confirmClick = () => {
    this.props.onConfirmCallback();
  };

  isClose = () => {
    this.props.onCancelCallback();
  };

  authConfirmClick = e => {
    this.props.onConfirmCallback(e.detail);
    Taro.setStorageSync("isHomeLongHideAuthModal", true);
  };

  preventTouchMove = e => {
    console.log('e', e)
    e.stopPropagation();
  };

  onClose(e){
    console.log('1111',e)
    e.stopPropagation()
  }
  render() {
    const { num, title, contentText,isShow } = this.props;
    console.log('title', title, contentText)
    return (
      isShow && 
      <View class='toplife_modal' onTouchMove={this.preventTouchMove}>
        <View class='toplife_modal_content'>
          <View class='toplife_modal_btn'>
            <View className='played'>
              <View className='head'>
                <View className='top' onClick={this.onClose} >
                  <Image src={Group6} className='Group6Img' />
                </View>
                <View className='body'>
                  <View>这是你坚持冥想的</View>
                  <View className='velign' onClick={this.onClose}>
                    <View>第</View>
                    <View className='num'>{num}</View>
                    <View>天</View>
                  </View>
                </View>
              </View>
              <Image className='iconImg topSign' src={topSign} />
              <Text class='endText'>冥想是一种认真生活的态度。</Text>
              <Image className='iconImg bottomSign' src={bottomSign} />
              <Button className='btn' >
                <Image className='shareImg' src={share} />
              </Button>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

Modal.defaultProps = {
  title: "", //标题
  contentText: "", //提示的描述
  cancelText: "取消", //取消
  confirmText: "确定", //确定
  isAuth: false, //是否为授权按钮
  cancelCallback: () => {},
  confirmCallback: () => {}
};

export default Modal;
