
import {
  BookModel
} from '../../models/book.js'

import {
  random
} from '../../util/common.js'

const bookModel = new BookModel()

Page({

  data: {
    books: [],
    searching: false,
    more: 0
  },

  methods: {

  },

  onLoad: function(options){
    bookModel.getHotList()
      .then( res => {
        this.setData({
          books: res
        })
      })
  },

  onSearching(event){
    this.setData({
      searching: true
    })
  },

  onCancel(event){
    this.setData({
      searching: false
    })
  },

  onReachBottom(){
    this.setData({
      more: random(16)
    })
  }
})
