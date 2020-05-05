import Taro, { Component } from "@tarojs/taro";
import { View, Button, Image, Text } from "@tarojs/components";
import topSign from "@/assets/topSign.png";
import bottomSign from "@/assets/bottomSign.png";
import share from "@/assets/fx.png";
import Group6 from "@/assets/Group6.png";
import Group3 from "@/assets/Group3.png";

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
    console.log('param: ', param);
    this.props.onCancelCallback();
    this.props.onShowBadgeCallback(true);
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
    const { loginDay, showDialog, loginText, showBadge, badge } = this.props;
    console.log('title', showDialog, loginDay, loginText, showBadge, badge)
    
    return (
      <View>
        {
          showDialog && 
          <View class='toplife_modal' onTouchMove={this.preventTouchMove}>
            <View class='toplife_modal_content'>
              <View class='toplife_modal_btn'>
                <View className='played'>
                  <View className='head' style='background-size: 100% 100%;'>
                    <View className='top' onClick={this.isClose} >
                      <Image src={Group6} className='Group6Img' />
                    </View>
                    <View className='body'>
                      <View>这是你坚持冥想的</View>
                      <View className='vertical'>
                        <View>第</View>
                        <View className='num'>{loginDay}</View>
                        <View>天</View>
                      </View>
                    </View>
                  </View>
                  <Image className='iconImg topSign' src={topSign} />
                  <Text class='endText'>{loginText}</Text>
                  <Image className='iconImg bottomSign' src={bottomSign} />
                  <View className='badge'>
                   { showBadge && 
                     <Image className='Group3' src={Group3} onClick={this.onRecored}></Image>
                   }
                  <Button className='btn' openType='share'>
                    <Image className='shareImg' src={share} />
                  </Button>
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
  showBadge: false,
  showDialog:false, //不显示
  isShow: false, // /不显示
  isAuth: false, //是否为授权按钮
  cancelCallback: () => {},
  confirmCallback: () => {}
};

export default Modal;
