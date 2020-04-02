/* eslint-disable import/first */
import Taro, { Component } from "@tarojs/taro";
import { Provider } from "@tarojs/mobx";
import Index from "./pages/index";

import upload from "@/utils/upload";
import dayjs from "@/utils/day";
import counterStore from "./store/counter";
import userStore from "./store/user";

import "./app.less";

// 如果需要在 h5 环境中开启 React Devtools
// 取消以下注释：
// if (process.env.NODE_ENV !== 'production' && process.env.TARO_ENV === 'h5')  {
//   require('nerv-devtools')
// }

const store = {
  counterStore,
  userStore
};
/* 
const MyContext = Taro.createContext(defaultValue)
<MyContext.Provider va/> */

// 挂载分享方法 Component

const SHAREINFO = {
  'title': '分享标题',
  'path': '路径',
  'imageUrl': '图片'
}

Component.prototype.onShareAppMessage = function () {
  return SHAREINFO
}
class App extends Component {

  componentWillMount() {
    Taro.$dayjs = dayjs;
    Taro.$upload = upload;
    const nav = Taro.navigateTo
    Taro.navigateTo = (data) => {
        if (Taro.getCurrentPages().length > 8) {
            return Taro.redirectTo(data)
        }
        return nav(data)
    }
  }

  componentDidMount() {
    console.log(2, this.$router.params);
    Taro.getSystemInfo({})
    .then(res  => {
      console.log('res: ', res.statusBarHeight);
      Taro.$navBarMarginTop =  res.statusBarHeight || 0
    })
  }
  
  config = {
    pages: ["pages/index/index", "pages/info/index", "pages/playVideo/index"],
    window: {
      navigationStyle: 'custom',
    },
    requiredBackgroundModes: ["audio"],
    permission: {
      "scope.userLocation": {
        desc: "你的位置信息将用于小程序位置接口的效果展示"
      }
    }
  }
  static options = {
    addGlobalClass: true
  }
  componentDidShow() {}

  componentDidHide() {
    console.log(4);
  }

  componentDidCatchError() {}


  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render() {
    return (
      <Provider store={store}>
        <Index />
      </Provider>
    );
  }
}

Taro.render(<App />, document.getElementById("app"));