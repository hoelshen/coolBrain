import Taro, { Component } from "@tarojs/taro";
import { View, } from "@tarojs/components";
import {
  getResultData_moodTody
} from "@/servers/servers";
import Percentage from '../Percentage';

import "./index.less";

class Modal extends Component {
  constructor() {
    super(...arguments);
    this.state={
      score: 0
    }
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
  onPush(){
    const {score} = this.state;
    const {isDuration} = this.props;
    if(score){
      getResultData_moodTody({mood:score, duration:isDuration})
    }
    this.props.onCancelCallback()
  }
  render() {
    const { isShow } = this.props;
    const PercentageModal = {
      onScore: (item)=>{
        this.setState({score: item})
      }
    }
    return (
      <View>
        {
          isShow && 
          <View class='toplife_modal' onTouchMove={this.preventTouchMove}>
            <View class='toplife_modal_content'>
              <View class='toplife_modal_btn'>
                <View className='played'>
                  <View className='head' style='background-size: 100% 100%;'>
                    <View className='score'>给今天的心情打个分吧</View>
                  </View>
                  <View className='body'>
                      <Percentage {...PercentageModal} />
                     {/*  <Process width='100px' height='100px' canvasWidth='100' canvasHeight='100' score={score}></Process> */}
                      <View className='btn' onClick={this.onPush}>确认提交</View>
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
  isDuration: '', //分钟数
  isShow: false, //不显示
  isAuth: false, //是否为授权按钮
  cancelCallback: () => {},
  confirmCallback: () => {}
};

export default Modal;
