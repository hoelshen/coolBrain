import Taro, { Component } from "@tarojs/taro";
import { View, Button, Image, Text } from "@tarojs/components";
import Group6 from "@/assets/Group6.png";
import Group8 from "@/assets/Group8.png";

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

  onRecored = (param)=>{
    this.props.onCancelCallback();
  }
  authConfirmClick = e => {
    this.props.onConfirmCallback(e.detail);
    Taro.setStorageSync("isHomeLongHideAuthModal", true);
  };

  preventTouchMove = e => {
    console.log('e', e)
    e.stopPropagation();
  };

  render() {
    const { loginDay, showFMDialog, loginText, showBadge, badge } = this.props;
    console.log('title', showFMDialog, loginDay, loginText, showBadge, badge)
    
    return (
      <View>
        {
          showFMDialog && 
          <View class='toplife_modal' onTouchMove={this.preventTouchMove}>
            <View class='toplife_modal_content'>
              <View class='toplife_modal_btn'>
                <View className='played'>
                  <View className='head' style='background-size: 100% 100%;'>
                    <View className='top' onClick={this.isClose} >
                      <Image src={Group6} className='Group6Img' />
                    </View>
                    <View className='body'>
                      <View className='text'>退出后, 冥想进度不会保存 是否确认退出？</View>
                    </View>
                  </View>
                  <Image src='' className='qrcode'></Image>  
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
  showBadge: false,
  isShow: false, //不显示
  isAuth: false, //是否为授权按钮
  cancelCallback: () => {},
  confirmCallback: () => {}
};

export default Modal;
