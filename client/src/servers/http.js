import Taro from '@tarojs/taro'
import getBaseUrl from './baseUrl'
import interceptors from './interceptors'

interceptors.forEach(interceptorItem => Taro.addInterceptor(interceptorItem))

const lock = { wait: null, runing: null };

class httpRequest {
  baseOptions(config, params, method = "GET") {
    let { url, data } = params;
    const BASE_URL = getBaseUrl(url);
    let contentType = "application/json";
    contentType = params.contentType || contentType;
    const option = {
      url: BASE_URL + url,
      data: data,
      method: method,
      header: {
        'content-type': contentType,
        'Authorization': Taro.getStorageSync('Authorization'),
        'Ticket': Taro.getStorageSync('Ticket')
      }
    };
    const request =  async (
      opts = { withOutLock: false, lockOthers: false, hasErr: false }, 
      argument
    )=>{
      if(opts.withOutLock){
        const res = await Taro.request(option);
        console.log('res: ', res);
        return
      }
      console.log('lock.runing', lock.runing)
      if(lock.runing){
        console.log(`${argument}---------------wating...`)
        await lock.runing;
      }
    
    
      // 锁住之后进来的请求
      if (opts.lockOthers) {
        lock.runing = Taro.request(argument);
        let res = await lock.runing;
        // 清空进行锁
        lock.runing = null;
    
        // 模拟关键请求失败的 需要再次等待其他操作的情况 例如重新登陆等
        if (opts.hasErr) {
          lock.wait = Taro.request(argument);
        } else {
          return res;
        }
      }
      
      // 等待模拟关键请求失败的处理
      if (lock.wait) {
        console.log(`等待关键请求异常处理中...`);
        await lock.wait;
        // 清空等待锁
        lock.wait = null;
        console.log(`关键请求异常处理完成`);
      }
      const res = await Taro.request(argument);
      console.log('wating: ', res);
    
      return res;
    }
    
    return request(config, option)
  }

  get(url, data = "", option) {
    let params = { url, data };
    return this.baseOptions(option, params);
  }

  post(url, data, contentType, option) {
    let params = { url, data, contentType };
    return this.baseOptions(option, params, "POST");
  }

  put(url, data = "", option) {
    let params = { url, data };
    return this.baseOptions(option, params, "PUT");
  }

  delete(url, data = "", option) {
    let params = { url, data };
    return this.baseOptions(option, params, "DELETE");
  }

}

export default new httpRequest()