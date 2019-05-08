// components/like/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    like: {
      type: Boolean,
      value: false
    },
    count: {
      type: Number
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    // count: 9,
    // like: false,
    yesSrc: './images/like.png',
    noSrc: './images/like@dis.png'
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onLike: function(event){
      let like = this.properties.like
      let count = this.properties.count

      count = like? count-1 : count+1
      this.setData({
        count: count,
        like: !like
      })

      let behavior = this.properties.like? 'like' : 'cancel'
      // 激活自定义事件
      // 第二个参数对象 { }  detail
      this.triggerEvent('like', {  
        behavior: behavior
      }, {})
    }
  }
})
