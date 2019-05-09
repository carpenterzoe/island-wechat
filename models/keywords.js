
import { HTTP } from '../util/http-p.js'

class KeywordModel extends HTTP{
  key = 'q'
  maxLength = 10
  getHistory(){
    const words = wx.getStorageSync(this.key)
    if(!words){
      return []
    }
    return words
  }

  getHot(){
    return this.request({
      url: '/book/hot_keyword'
    })
  }

  search(start, q){
    return this.request({
      url: 'book/search?summary=1',
      data:{
        q,
        start
      }
    })
  }

  addToHistory(keyword){
    let words = this.getHistory()
    const has = words.includes(keyword)
    if(!has){
      
      const length = words.length

      if(length >= this.maxLength){
        words.pop()
        // pop() 方法用于删除并返回数组的最后一个元素。
      }

      words.unshift(keyword)
      wx.setStorageSync(this.key, words)
    }
  }
}

export { KeywordModel }