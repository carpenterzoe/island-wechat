
import { KeywordModel } from '../../models/keywords.js'
const keywordModel = new KeywordModel()

Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    historyWords: [],
    hotWords: [],
    dataArray: [],
    searching: false,
    q: ''
  },

  attached(){

    this.setData({
      historyWords: keywordModel.getHistory()
    })

    keywordModel.getHot().then(res => {
      this.setData({
        hotWords: res.hot
      })
    })
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onCancel(event){
      this.triggerEvent('cancel', {}, {})
    },

    onDelete(){
      this.setData({
        searching: false
      })
    },

    onConfirm(event){
      this.setData({
        searching: true
      })

      // input 标签的 value || v-tag 自定义事件里，标签的文本 text
      const q = event.detail.value || event.detail.text
      keywordModel.search(0, q)
      .then(res => {
        this.setData({
          dataArray: res.books,
          q
        })

        keywordModel.addToHistory(q)
      })
    }
  }
})
