import {
  ClassicModel
} from '../../models/classic.js'
import {
  BookModel
} from '../../models/book.js'

const classicModel = new ClassicModel()
const bookModel = new BookModel()

Page({
  
  data: {
    authorized: false,
    userInfo: null,
    bookCount: 0,
    classics: null
  },

  onLoad(options){
    // wx.getUserInfo()

    this.userAuthorized()
    this.getMyBookCount()
    this.getMyFavor()
  },

  getMyFavor(){
    classicModel.getMyFavor( res => {
      this.setData({
        classics: res
      })
    })
  },

  getMyBookCount(){
    bookModel.getMyBookCount()
    .then( res => {
      this.setData({
        bookCount: res.count
      })
    })
  },

  getUserInfo(event){
    // console.log(event)
  },

  onGetUserInfo(){
    const userInfo = event.detail.userInfo
    if(userInfo){
      this.setData({
        userInfo,
        authorized: true
      })
    }
  },

  userAuthorized(){
    wx.getSetting({
      success: data => {
        if( data.authSetting['scope.userInfo']){
          wx.getUserInfo({
            success: data => {
              this.setData({
                authorized: true,
                userInfo: data.userInfo
              })
            }
          })
        }else{
          console.log('err')
        }
      }
    })
  }
})
