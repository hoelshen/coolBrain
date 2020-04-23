/* eslint-disable import/first */
import Taro, { Component } from "@tarojs/taro";
import { Provider } from "@tarojs/mobx";
import Index from "./pages/index";
import upload from "@/utils/upload";
import dayjs from "@/utils/day";
import counterStore from "./store/counter";
import userStore from "./store/user";
import { getResultData_auth } from '@/servers/servers'

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
  'title': '冥想小程序',
  'path': 'pages/index/index',
  'imageUrl': ''
}

Component.prototype.onShareAppMessage = function () {
  return SHAREINFO
}
class App extends Component {
  componentWillMount() {
    Taro.$backgroundAudioManager = Taro.getBackgroundAudioManager(); 

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
    Taro.getSystemInfo({})
    .then(res  => {
      Taro.$navBarMarginTop =  res.statusBarHeight || 0
    })
  }
  
  config = {
    pages: ["pages/index/index", "pages/info/index", "pages/playVideo/index", "pages/playVideo/success",'pages/Mail/index',"pages/Diary/index"],
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
  componentDidShow() {
     Taro.login({
      success: function (res) {
        if (res.code) {
          console.log('res.code: ', res.code);
          //发起网络请求
             getResultData_auth({ code: res.code}).then(json=>{
               const data = json.data;
              Taro.setStorage({
                key: "Ticket",
                data: data.ticket
              });
              console.log('val: ', data);
            })
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    })
  }

  componentDidHide() {
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