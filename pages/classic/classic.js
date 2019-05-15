// pages/classic/classic.js

import { ClassicModel } from '../../models/classic.js' // 小程序的模块导入导出只能用相对路径
// let http = new HTTP()  // HTTP是一个类，里面的方法不能直接拿到。要通过实例化一个对象。

import { LikeModel } from '../../models/like.js'

let classicModel = new ClassicModel()
let likeModel = new LikeModel()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    classicData: '',
    latest: true,  // getLatest(); 获取的就是最新一期的期刊，所以默认latest为true
    first: false,
    likeCount: 0,
    likeStatus: false
  },

   // this.setData 拿到服务器的数据之后数据绑定，更新 properties（组件里的） 用 this.setData
   // this.setData 用来更新数据，可以更新页面中的data，或者组件的 properties
   // properties也是 data的一种， 只不过一个是开放的，一个是私有的

  onLoad: function (options) {
    classicModel.getLatest((res) => {

      this.setData({  
        classicData: res,
        likeCount: res.fav_nums,
        likeStatus: res.like_status
      })
    })
  },

  onLike: function(event){
    let behavior = event.detail.behavior
    likeModel.like(behavior, this.data.classicData.id, this.data.classicData.type)
  },

  onNext: function(event){
    this._updateClassic('next')
  },

  onPrevious: function(event){
    this._updateClassic('previous')
  },

  _updateClassic: function(nextOrPrevious){
    let index = this.data.classicData.index
    classicModel.getClassic(index, nextOrPrevious, (res) => {
      this._getLikeStatus(res.id, res.type)
      this.setData({
        classicData: res,
        latest: classicModel.isLatest(res.index),
        first: classicModel.isFirst(res.index)
      })
    })
  },

  _getLikeStatus: function(artID, category){
    likeModel.getClassicLikeStatus(artID, category,
      (res) => {
        this.setData({
          likeCount: res.fav_nums,
          likeStatus: res.like_status
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