
import { KeywordModel } from '../../models/keywords.js'
import { BookModel } from '../../models/book.js'
import { paginationBev } from '../behaviors/pagination.js'
const keywordModel = new KeywordModel()
const bookModel = new BookModel()

Component({
  /**
   * 组件的属性列表
   */
  behaviors: [paginationBev],
  
  properties: {
    more: {
      type: String,
      observer: 'loadMore'
      // 数据监听器监听的是 setData 涉及到的数据字段，
      // 即使这些数据字段的值没有发生变化，数据监听器依然会被触发。
    }
  },

  data: {
    historyWords: [],
    hotWords: [],
    // dataArray: [],
    searching: false,
    q: '',
    loading: false,
    loadingCenter: false
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

    loadMore(){

      if(!this.data.q) return
      // 数据监听器监听的是 setData 涉及到的数据字段，
      // 即使这些数据字段的值没有发生变化，数据监听器依然会被触发。
      // q 没有值就运行后面的函数会报错， 所以这里需要判断。

      if( this.isLocked() ) return

      // const length = this.data.dataArray.length
      
      if( this.hasMore() ){

        this.locked()  // 数据请求开始，就把loading锁死，避免执行多次数据请求。

        bookModel.search(this.getCurrentStart(), this.data.q)
        .then( res => {
          // start 的值 从自己定义的length 改成 behaviors 里的方法获取

          // const tempArray = this.data.dataArray.concat(res.books)
          this.setMoreData(res.books)

          this.unLocked()  // 数据请求完成，解锁loading，可以执行下次请求
        }, () => {
          this.unLocked()  // 失败回调里也需要解锁，比如断网后恢复，继续加载数据
        })
      }
    },

    onCancel(event){
      this.initialize()
      this.triggerEvent('cancel', {}, {})
    },

    onDelete(){
      this.initialize()
      this._closeResult()
    },

    onConfirm(event){
      
      this._showResult()
      this._showLoadingCenter()
      // this.initialize()

      // input 标签的 value || v-tag 自定义事件里，标签的文本 text
      const q = event.detail.value || event.detail.text
      bookModel.search(0, q)
      .then(res => {

        this.setMoreData(res.books) // behaviors
        this.setTotal(res.total)    // behaviors

        this.setData({
          // dataArray: res.books,
          q
        })

        keywordModel.addToHistory(q)
        this._hideLoadingCenter()
      })
    },

    _showLoadingCenter(){
      this.setData({
        loadingCenter: true
      })
    },

    _hideLoadingCenter(){
      this.setData({
        loadingCenter: false
      })
    },

    _showResult(){
      this.setData({
        searching: true
      })
    },

    _closeResult(){
      this.setData({
        searching: false,
        q: ''
      })
    }
  }
})
