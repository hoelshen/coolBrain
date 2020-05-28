import Taro, { Component } from "@tarojs/taro";
import { View,  Image  } from "@tarojs/components";
import Group7 from "@/assets/Group7.png";

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

  onInfo = () => {
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
    const { showBadgeDialog, badge } = this.props;
    return (
      <View>
        {showBadgeDialog && (
          <View class='toplife_modal' onTouchMove={this.preventTouchMove}>
            <View
              class='toplife_modal_content'
              style='background-size: 100% 100%;'
            >
              <View className='head'>
                <View className='close' onClick={this.isClose}></View>
              </View>
              <View className='body'>
                <View className='text'>打卡成功</View>
                <Image className='iconImg' src={badge.picture} />
              </View>
              <View className='foot'>
                <Image
                  className='Group7'
                  src={Group7}
                  onClick={this.onInfo}
                ></Image>
              </View>
            </View>
          </View>
        )}
      </View>
    );
  }
}

Modal.defaultProps = {
  title: "", //标题
  text: "", //提示的描述
  cancelText: "取消", //取消
  confirmText: "确定", //确定
  showBadgeDialog: false, //不显示
  isAuth: false, //是否为授权按钮
  cancelCallback: () => {},
  confirmCallback: () => {}
};

export default Modal;
