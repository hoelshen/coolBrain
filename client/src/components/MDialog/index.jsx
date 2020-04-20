import Taro, { Component } from "@tarojs/taro";
import { View, Button, Image, Text } from "@tarojs/components";
import topSign from "@/assets/topSign.png";
import bottomSign from "@/assets/bottomSign.png";
import share from "@/assets/fx.png";
import "./index.less";

class Modal extends Component {
  constructor() {
    super(...arguments);
    this.state = {};
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
    e.stopPropagation();
  };

  render() {
    const { title, contentText } = this.props;
    return (
      <View class='toplife_modal' onTouchMove={this.preventTouchMove}>
        <View class='toplife_modal_content'>
          <View class='toplife_modal_btn'>
            <View className='played'>
              <View className='head'>
                <View>这是你坚持冥想的</View>
                <View>
                  <View>第</View>
                  <View>19</View>
                  <View>天</View>
                </View>
              </View>
              <Image className='iconImg topSign' src={topSign} />
              <Text class='endText'>冥想是一种认真生活的态度。</Text>
              <Image className='iconImg bottomSign' src={bottomSign} />
              <Button className='btn' openType='share'>
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
