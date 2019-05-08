
import {
  BookModel
} from '../../models/book.js'

const bookModel = new BookModel()

Page({

  data: {
    books: []
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
  }
})
