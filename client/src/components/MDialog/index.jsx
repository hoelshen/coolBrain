import Taro, { Component } from '@tarojs/taro'
import { View, Button } from '@tarojs/components'

import './modal.scss'

class Modal extends Component {
  constructor() {
    super(...arguments)
    this.state = {}
  }

  confirmClick = () => {
    this.props.onConfirmCallback()
  }

  cancelClick = () => {
    this.props.onCancelCallback()
  }

  authConfirmClick = (e) => {
    this.props.onConfirmCallback(e.detail)
    Taro.setStorageSync('isHomeLongHideAuthModal', true)

  }

  preventTouchMove = (e) => {
    e.stopPropagation()
  }

  render() {
    const { title, contentText, cancelText, confirmText} = this.props
    return (
      <View class='toplife_modal' onTouchMove={this.preventTouchMove}>
        <View class='toplife_modal_content'>
          <View class='toplife_modal_title'>{title}</View>
          <View class='toplife_modal_text'>{contentText}</View>
          <View class='toplife_modal_btn'>
            <Button class='toplife_modal_btn_cancel' onClick={this.cancelClick}>{cancelText}</Button>
            {!isAuth ?
              <Button class='toplife_modal_btn_confirm' onClick={this.confirmClick}>{confirmText}</Button> :
            <Button class='toplife_modal_btn_confirm' openType='onGetUserInfo' onGetuserinfo={this.authConfirmClick} onClick={this.cancelClick}>授权</Button> }
          </View>
        </View>
      </View>
    )
  }
}

Modal.defaultProps = {
  title: '', //标题
  contentText: '', //提示的描述
  cancelText: '取消', //取消
  confirmText: '确定', //确定
  isAuth: false, //是否为授权按钮
  cancelCallback: () => {},
  confirmCallback: () => {},
}

export default Modal