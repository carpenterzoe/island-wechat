
const paginationBev = Behavior({
  data: {
    dataArray: [],
    total: null,
    noneResult: false,
    loading: false
  },

  methods: {
    setMoreData(dataArray){
      const tempArray = this.data.dataArray.concat(dataArray)
      this.setData({
        dataArray: tempArray
      })
    },
    
    getCurrentStart(){
      return this.data.dataArray.length
    },

    setTotal(total){
      this.data.total = total
      if(total == 0){
        this.setData({
          noneResult: true
        })
      }
    },

    hasMore(){
      if(this.data.dataArray.length >= this.data.total){
        return false
      }else{
        return true
      }
    },
    initialize(){
      this.setData({
        dataArray: [],
        noneResult: false,
        loading: false
      })
      // this.data.dataArray = [],
      // dataArray 在页面 wxml 里应用了，所以必须要用setData
      // 使用setData才会通知 wxml 页面去改变对应的值

      this.data.total = null // total没有在页面中用到，所以可以直接赋值
    },

    isLocked(){
      return this.data.loading ? true : false
    },

    locked(){
      this.setData({
        loading: true
      })
    },

    unLocked(){
      this.setData({
        loading: false
      })
    },
  }
})

export { paginationBev }