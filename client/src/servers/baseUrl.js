const getBaseUrl = (url) => {
  // let BASE_URL = 'http://132.232.91.198:9001/api/';
  let BASE_URL = 'http://119.45.112.190:9001/api/';
  if (process.env.NODE_ENV === 'development') {
    //开发环境 - 根据请求不同返回不同的BASE_URL
    
  } else {
    // 生产环境
    if (url.includes('/api/')) {
      BASE_URL = ''
    } else if (url.includes('/iatadatabase/')) {
      BASE_URL = ''
    }
  }
  return BASE_URL
}

export default getBaseUrl;