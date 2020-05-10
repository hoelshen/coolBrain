import Taro, { Component } from "@tarojs/taro";
import { View, Button, Image, Text } from "@tarojs/components";
import Group6 from "@/assets/Group6.png";
import Group8 from "@/assets/Group8.png";
import Qrcode from '@/assets/qrcode.png';

import "./index.less";

class Modal extends Component {
  constructor() {
    super(...arguments);
  }

  confirmClick = () => {
    this.props.onConfirmCallback();
  };

  isClose = () => {
    ('2222')
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
    e.stopPropagation();
  };

  onPreviewImage = e =>{
    // const current = e.target.dataset.src
/*     Taro.saveImageToPhotosAlbum({
      current: current,
      urls: [current]
    }) */
  }
  render() {
    const { showFMDialog,  } = this.props;
    
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
                      <View className='text'>去荔枝微课 跟主创学习如何冥想吧</View>
                      <Image src={Group8} className='btn'  onClick={this.onPreviewImage}></Image>  
                    </View>
                  </View>
                  <Image src={Qrcode} className='qrcode' show-menu-by-longpress></Image>  
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
