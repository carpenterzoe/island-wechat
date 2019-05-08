// components/episode/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    // index: Number  // 初始 0
    index: {
      type: Number,
      observer: function(newVal, oldVal, changedPath){
        let val = newVal < 10? '0' + newVal : newVal
        this.setData({
          // index: val, 不能在observer函数里修改properties里属性本身的值，会引起无限递归
          _index: val
        })
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    months: [
      '一月','二月','三月','四月','五月','六月',
      '七月','八月','九月','十月','十一月','十二月'
    ],
    year: 0,
    month: '',
    _index: ''
  },

  // 组件的生命周期函数，当组件对页面加载的时候执行
  attached: function(){
    let date = new Date()
    let year = date.getFullYear()
    let month = date.getMonth()

    this.setData({
      year,
      month: this.data.months[month]
    })
  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})
