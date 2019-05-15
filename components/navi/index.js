
Component({

  properties: {
    title: String,
    first: Boolean,  // 当前期刊是不是第一期
    latest: Boolean  // 当前期刊是不是最后一期
  },

  data: {
    disLeftSrc: 'images/triangle.dis@left.png',
    leftSrc: 'images/triangle@left.png',
    disRightSrc: 'images/triangle.dis@right.png',
    rightSrc: 'images/triangle@right.png'
  },

  methods: {
    onLeft: function(event){
      if(!this.properties.latest){ // 不是最新一期才触发 左点击事件
        this.triggerEvent('left', {}, {})
      }
    },
    onRight: function(event){
      if(!this.properties.first){
        this.triggerEvent('right', {}, {})
      }
    }
  }
})
