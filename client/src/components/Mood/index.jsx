import Taro, { Component } from "@tarojs/taro";
import { View, Button, Image, Text } from "@tarojs/components";
import topSign from "@/assets/topSign.png";
import bottomSign from "@/assets/bottomSign.png";
import share from "@/assets/fx.png";
import Group6 from "@/assets/Group6.png";

import Process from "../Process/index";

import "./index.less";

class Modal extends Component {
  constructor() {
    super(...arguments);
  }

  confirmClick = () => {
    this.props.onConfirmCallback();
  };

  isClose = () => {
    console.log('2222')
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
  onPush(mood, duration){

  }
  render() {
    const { num, isShow, text } = this.props;
    console.log('title', isShow, num, text)
    return (
      <View>
        {
          isShow && 
          <View class='toplife_modal' onTouchMove={this.preventTouchMove}>
            <View class='toplife_modal_content'>
              <View class='toplife_modal_btn'>
                <View className='played'>
                  <View className='head' style='background-size: 100% 100%;'>
                    <View className='top' onClick={this.isClose} >
                      <Image src={Group6} className='Group6Img' />
                    </View>
                  </View>
                  <View className='body'>
                      <Process></Process>
                      <View className='btn' onClick={this.onPush}><Text>确认提交</Text></View>
                    </View>
                </View>
              </View>
            </View>
          </View>
        }
      </View>

    );
  }
}

Modal.defaultProps = {
  title: "", //标题
  text: "", //提示的描述
  cancelText: "取消", //取消
  confirmText: "确定", //确定
  isShow: false, //不显示
  isAuth: false, //是否为授权按钮
  cancelCallback: () => {},
  confirmCallback: () => {}
};

export default Modal;
