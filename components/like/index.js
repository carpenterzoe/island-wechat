// components/like/index.js
Component({
  
  properties: {
    like: {
      type: Boolean,
      value: false
    },
    count: {
      type: Number
    },
    readOnly: {
      type: Boolean
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    yesSrc: './images/like.png',
    noSrc: './images/like@dis.png'
  },

  methods: {
    onLike: function(event){
      if(this.properties.readOnly) return
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
