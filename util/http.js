import {config} from '../config.js' //  只能用相对路径import，否则小程序解析错误

const tips = {
  1: '抱歉，出现了一个错误',
  1005: 'appykey无效，请重新申请',
  3000: '期刊不存在'
}

class HTTP{
  request(params){
    // url, data, method, success
    if(!params.method){
      params.method = 'GET'  // 默认GET方法不一定要传入
    }
    wx.request({
      url:  config.api_base_url + params.url,
      // 这里url不能直接拿params里传入的，因为传进来的只有后半段接口，就是不同请求有差异的部分。
      // 通用接口在 config.js 里配置了。 所以要从那里导出， 在这里引用。
      method: params.method,
      data: params.data,
      header: {
        'content-type': 'application/json',
        'appkey': config.appkey
      },
      success: (res) => {
        // startsWith  es6 字符串函数
        // endsWith

        let code = res.statusCode.toString()  // http 状态码
        // res.statusCode 是数字，不是字符串，所以不能直接用 startWith(字符串方法)，需要先 toString();
        
        if (code.startsWith('2')){  // 查一下 es6 startsWith
          
          params.success && params.success(res.data)
        
        }else{
          
          let error_code = res.data.error_code
          this._show_error(error_code)
        
        }
      },
      fail: (err) => {
        this._show_error(1)
      }
    })
  }

  _show_error(error_code){  // 私有方法
    if(!error_code){
      error_code = 1
    }
    const tip = tips[error_code]
    wx.showToast({
      title: tip ? tip : tips[1],
      icon: 'none',
      duration: 2000
    })
  }
}

export { HTTP }