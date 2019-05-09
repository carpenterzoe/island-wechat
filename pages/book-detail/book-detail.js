
import {
  BookModel
} from '../../models/book.js'

import {
  LikeModel
} from '../../models/like.js'

const bookModel = new BookModel()
const likeModel = new LikeModel()

Page({

  data: {
    comments: [],
    book: null,
    likeStatus: false,
    likeCount: 0,
    posting: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    wx.showLoading()

    const bid = options.bid   // 外部传来的 id
    const detail = bookModel.getDetail(bid)
    const comments = bookModel.getComments(bid)
    const likeStatus = bookModel.getLikeStatus(bid)

    Promise.all([detail, comments, likeStatus])
    .then( res => {
      this.setData({
        book: res[0],
        comments: res[1].comments,
        likeStatus: res[2].like_status,
        likeCount: res[2].fav_nums
      })
      wx.hideLoading()
    })
    // detail.then(res => {
    //   this.setData({
    //     book: res
    //   })
    // })

    // comments.then(res => {
    //   this.setData({
    //     comments: res.comments
    //   })
    // })

    // likeStatus.then(res => {
    //   this.setData({
    //     likeStatus: res.like_status,
    //     likeCount: res.fav_nums
    //   })
    // })
  },

  onLike(event){
    const like_or_cancel = event.detail.behavior
    likeModel.like(like_or_cancel, this.data.book.id, 400)
  },

  onFakePost(event){
    this.setData({
      posting: true
    })
  },

  onCancel(event){
    this.setData({
      posting: false
    })
  },

  onPost(event){
    const comment = event.detail.text || event.detail.value
    // const commentInput = event.detail.value
    // 两个值 一个有另一个就没有，不是同时共存的，所以 || 合并成一个。
    // 可以 console 输出对比

    if(!comment) return

    if(comment.length > 12){
      wx.showToast({
        title: '短评最多12个字',
        icon:'none'
      })
      return
    }

    bookModel.postComment(this.data.book.id, comment)
    .then( res=> {
      wx.showToast({
        title: '+1',
        icon: 'none'
      })
      
      this.data.comments.unshift({
        content: comment,
        nums: 1
      })

      this.setData({
        comments: this.data.comments,
        posting: false
      })
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})