import Taro from "@tarojs/taro";

const PAGE_LEVEL_LIMIT = 10;
/**
 * @description 获取当前页url
 */
export const getCurrentPageUrl = () => {
  let pages = Taro.getCurrentPages()
  let currentPage = pages[pages.length - 1]
  let url = currentPage.route
  return url
}

export const pageToLogin = () => {
  let path = getCurrentPageUrl()
  if (!path.includes('login')) {
    Taro.navigateTo({
      url: "/pages/login/login"
    });
  }
}

// 处理微信跳转超过10层
function jumpUrl (url, options = {} ) {
  const pages = Taro.getCurrentPages()
  let method = options.method || 'navigateTo'
  if (url && typeof url === 'string') {
    if (method === 'navigateTo' && pages.length >= PAGE_LEVEL_LIMIT - 3) {
      method = 'redirectTo'
    }

    if (method === 'navigateToByForce') {
      method = 'navigateTo'
    }

    if (method === 'navigateTo' && pages.length == PAGE_LEVEL_LIMIT) {
      method = 'redirectTo'
    }

    Taro[method]({
      url
    })
  }
}

export default jumpUrl;